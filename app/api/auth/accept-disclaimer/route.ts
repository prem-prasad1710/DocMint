/**
 * Accept Disclaimer API Route
 * POST /api/auth/accept-disclaimer
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { acceptDisclaimer } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Accept disclaimer
    const updatedUser = await acceptDisclaimer(session.user.id);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update disclaimer status' },
        { status: 500 }
      );
    }
    
    // Return success - the page will reload and fetch fresh data from DB
    return NextResponse.json(
      {
        success: true,
        message: 'Disclaimer accepted',
        disclaimerAccepted: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Accept disclaimer error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
