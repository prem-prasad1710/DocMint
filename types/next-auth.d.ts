/**
 * Extend NextAuth types with custom fields
 */

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      subscriptionTier: string;
      disclaimerAccepted: boolean;
      stripeCustomerId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    subscriptionTier?: string;
    disclaimerAccepted?: boolean;
    stripeCustomerId?: string;
    passwordHash?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    subscriptionTier: string;
    disclaimerAccepted: boolean;
    stripeCustomerId?: string;
  }
}
