/**
 * NextAuth.js initialization and helper functions
 */

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { getUserByEmail, createUser } from '@/lib/db/queries';
import { loginSchema } from '@/lib/validation/schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    
    // Email/Password Provider
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Validate input
          const validatedFields = loginSchema.safeParse(credentials);
          
          if (!validatedFields.success) {
            return null;
          }
          
          const { email, password } = validatedFields.data;
          
          // Find user with password hash
          const user = await getUserByEmail(email, true);
          
          if (!user || !user.passwordHash) {
            return null;
          }
          
          // Verify password
          const isValidPassword = await bcrypt.compare(
            password,
            user.passwordHash
          );
          
          if (!isValidPassword) {
            return null;
          }
          
          // Return user object (without password)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            subscriptionTier: user.subscriptionTier,
            disclaimerAccepted: user.disclaimerAccepted,
            usage: user.usage ? {
              documentsGenerated: user.usage.documentsGenerated || 0,
              documentsSaved: user.usage.documentsSaved || 0,
              lastResetDate: user.usage.lastResetDate || new Date(),
            } : undefined,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    
    // Handle OAuth sign in
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await getUserByEmail(user.email!);
          
          if (!existingUser) {
            // Create new user from OAuth
            await createUser({
              email: user.email!,
              name: user.name || 'User',
              googleId: account.providerAccountId,
              image: user.image,
            });
          }
          
          return true;
        } catch (error) {
          console.error('OAuth sign in error:', error);
          return false;
        }
      }
      
      return true;
    },
    
    // Add custom fields to JWT
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Initial sign in
        const dbUser = await getUserByEmail(user.email!);
        
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.subscriptionTier = dbUser.subscriptionTier;
          token.disclaimerAccepted = dbUser.disclaimerAccepted;
          token.stripeCustomerId = dbUser.stripeCustomerId;
          // Include usage data
          if (dbUser.usage) {
            token.usage = {
              documentsGenerated: dbUser.usage.documentsGenerated || 0,
              documentsSaved: dbUser.usage.documentsSaved || 0,
              lastResetDate: dbUser.usage.lastResetDate || new Date(),
            };
          }
        }
      }
      
      // Handle session updates (e.g., after subscription change)
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      
      return token;
    },
    
    // Add custom fields to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.subscriptionTier = token.subscriptionTier as string;
        session.user.disclaimerAccepted = token.disclaimerAccepted as boolean;
        session.user.stripeCustomerId = token.stripeCustomerId as string;
        // Include usage data
        if (token.usage) {
          session.user.usage = {
            documentsGenerated: (token.usage as any).documentsGenerated || 0,
            documentsSaved: (token.usage as any).documentsSaved || 0,
            lastResetDate: (token.usage as any).lastResetDate || new Date(),
          };
        }
      }
      
      return session;
    },
  },
});

/**
 * Get current session on server
 */
export async function getSession() {
  return await auth();
}

/**
 * Get current user from session
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}

/**
 * Check if user is pro subscriber
 */
export async function isPro() {
  const session = await auth();
  return session?.user?.subscriptionTier === 'pro';
}

/**
 * Require authentication (throw error if not authenticated)
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  
  return session.user;
}

/**
 * Require pro subscription (throw error if not pro)
 */
export async function requirePro() {
  const user = await requireAuth();
  
  if (user.subscriptionTier !== 'pro') {
    throw new Error('Pro subscription required');
  }
  
  return user;
}
