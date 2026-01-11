export type SubscriptionTier = 'free' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  passwordHash?: string; // Optional - won't exist for OAuth users
  googleId?: string; // Google OAuth ID
  image?: string; // Profile picture URL
  
  // Subscription
  subscriptionTier: SubscriptionTier;
  subscriptionStatus?: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionEndsAt?: Date;
  
  // Usage tracking
  usage: {
    documentsGenerated: number; // Total generated (resets monthly)
    documentsSaved: number; // Total saved documents
    lastResetDate: Date;
  };
  
  // Legal
  disclaimerAccepted: boolean;
  disclaimerAcceptedAt?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  _id: string;
}
