import mongoose, { Model, Schema, Document } from 'mongoose';
import { IUser } from '@/types/user';

// Interface for User document methods
interface IUserMethods {
  canSaveDocument(): boolean;
  resetMonthlyUsage(): void;
}

// User document type that includes methods
type UserDocument = IUser & Document & IUserMethods;

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      select: false, // Don't include in queries by default
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values, only enforces uniqueness when present
      index: true,
    },
    image: {
      type: String,
    },
    
    // Subscription
    subscriptionTier: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
      index: true,
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'trialing', 'incomplete'],
    },
    stripeCustomerId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    stripeSubscriptionId: {
      type: String,
      sparse: true,
    },
    subscriptionEndsAt: {
      type: Date,
    },
    
    // Usage tracking
    usage: {
      documentsGenerated: {
        type: Number,
        default: 0,
      },
      documentsSaved: {
        type: Number,
        default: 0,
      },
      lastResetDate: {
        type: Date,
        default: Date.now,
      },
    },
    
    // Legal
    disclaimerAccepted: {
      type: Boolean,
      default: false,
      required: true,
    },
    disclaimerAcceptedAt: {
      type: Date,
    },
    
    // Metadata
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Note: All indexes are defined inline in the schema above
// to avoid Edge runtime issues with .index() method

// Virtual for checking if user is pro
UserSchema.virtual('isPro').get(function () {
  return this.subscriptionTier === 'pro' && this.subscriptionStatus === 'active';
});

// Method to check if user can save documents
UserSchema.methods.canSaveDocument = function (this: UserDocument): boolean {
  if (this.subscriptionTier === 'pro' && this.subscriptionStatus === 'active') {
    return true;
  }
  return this.usage.documentsSaved < 5; // Free tier limit
};

// Method to reset monthly usage
UserSchema.methods.resetMonthlyUsage = function (this: UserDocument): void {
  const now = new Date();
  const lastReset = this.usage.lastResetDate;
  
  // Check if a month has passed
  const monthsPassed = 
    (now.getFullYear() - lastReset.getFullYear()) * 12 + 
    (now.getMonth() - lastReset.getMonth());
  
  if (monthsPassed >= 1) {
    this.usage.documentsGenerated = 0;
    this.usage.lastResetDate = now;
  }
};

// Pre-save middleware
UserSchema.pre('save', function (this: UserDocument, next) {
  // Auto-reset usage if needed
  if (this.isModified('usage.documentsGenerated')) {
    this.resetMonthlyUsage();
  }
  next();
});

// Ensure model is not recompiled in hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
