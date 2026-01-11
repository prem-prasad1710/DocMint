/**
 * Stripe Webhook Handler
 * POST /api/stripe/webhook - Handle Stripe events
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe/client';
import { updateUserSubscription } from '@/lib/db/queries';
import { getUserByEmail } from '@/lib/db/queries';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          // Update user subscription
          await updateUserSubscription(session.metadata.userId, {
            subscriptionTier: 'pro',
            subscriptionStatus: 'active',
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;

        // Find user by customer ID
        const customer = await stripe.customers.retrieve(subscription.customer);
        if (!customer.deleted && customer.email) {
          const user = await getUserByEmail(customer.email);
          if (user) {
            await updateUserSubscription(user._id.toString(), {
              subscriptionTier: subscription.status === 'active' ? 'pro' : 'free',
              subscriptionStatus: subscription.status,
              subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
            });
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;

        // Find user and downgrade
        const customer = await stripe.customers.retrieve(subscription.customer);
        if (!customer.deleted && customer.email) {
          const user = await getUserByEmail(customer.email);
          if (user) {
            await updateUserSubscription(user._id.toString(), {
              subscriptionTier: 'free',
              subscriptionStatus: 'canceled',
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
