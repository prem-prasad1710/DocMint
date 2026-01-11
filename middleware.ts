/**
 * NextAuth.js Middleware for route protection
 * Runs on Edge Runtime for fast authentication checks
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For now, allow all requests through
  // Auth will be checked server-side in protected routes
  return NextResponse.next();
}

export const config = {
  // Match all routes except static files and API routes
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
