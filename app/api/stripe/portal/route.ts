/**
 * Stripe Customer Portal API Route
 * POST /api/stripe/portal - Create portal session for managing subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { stripe } from '@/lib/stripe/client';
import { getUserById } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const dbUser = await getUserById(user.id);
    if (!dbUser || !dbUser.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }
    
    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: dbUser.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe portal error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
