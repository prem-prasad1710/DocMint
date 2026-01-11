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
      usage?: {
        documentsGenerated: number;
        documentsSaved: number;
        lastResetDate: Date;
      };
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    subscriptionTier?: string;
    disclaimerAccepted?: boolean;
    stripeCustomerId?: string;
    passwordHash?: string;
    usage?: {
      documentsGenerated: number;
      documentsSaved: number;
      lastResetDate: Date;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    subscriptionTier: string;
    disclaimerAccepted: boolean;
    stripeCustomerId?: string;
    usage?: {
      documentsGenerated: number;
      documentsSaved: number;
      lastResetDate: Date;
    };
  }
}
