/**
 * NextAuth.js v5 Configuration
 * Handles email/password and Google OAuth authentication
 */

import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  providers: [],
  
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    newUser: '/dashboard',
  },
  
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      
      // Auth routes (redirect to dashboard if logged in)
      if ((pathname === '/login' || pathname === '/signup') && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
      
      // Protected routes
      const isProtectedRoute = pathname.startsWith('/dashboard') || 
                              pathname.startsWith('/generate') || 
                              pathname.startsWith('/document') || 
                              pathname.startsWith('/checklist') || 
                              pathname.startsWith('/settings') || 
                              pathname.startsWith('/billing');
      
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }
      
      return true;
    },
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === 'development',
};
