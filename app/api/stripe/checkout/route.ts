/**
 * Stripe Checkout API Route
 * POST /api/stripe/checkout - Create checkout session
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { stripe, STRIPE_PRICE_ID } from '@/lib/stripe/client';
import { getUserById } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const dbUser = await getUserById(user.id);
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Create or retrieve Stripe customer
    let customerId = dbUser.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name!,
        metadata: {
          userId: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Save customer ID
      dbUser.stripeCustomerId = customerId;
      await dbUser.save();
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
