import mongoose, { Model, Schema } from 'mongoose';
import { ISubscription } from '@/types/subscription';

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    
    // Stripe
    stripeSubscriptionId: {
      type: String,
      required: true,
      unique: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
      index: true,
    },
    stripePriceId: {
      type: String,
      required: true,
    },
    
    // Status
    status: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'trialing', 'incomplete', 'unpaid'],
      required: true,
      default: 'incomplete',
      index: true,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    
    // Billing
    currentPeriodStart: {
      type: Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
      index: true,
    },
    canceledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
// Note: stripeSubscriptionId already has unique index from schema definition
SubscriptionSchema.index({ userId: 1, status: 1 });
SubscriptionSchema.index({ currentPeriodEnd: 1, status: 1 });

// Virtual to check if subscription is active
SubscriptionSchema.virtual('isActive').get(function () {
  return this.status === 'active' || this.status === 'trialing';
});

// Virtual to check if subscription is ending soon (within 7 days)
SubscriptionSchema.virtual('isEndingSoon').get(function () {
  const now = new Date();
  const daysUntilEnd = Math.ceil(
    (this.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilEnd <= 7 && daysUntilEnd > 0;
});

// Method to check if subscription has expired
SubscriptionSchema.methods.hasExpired = function (): boolean {
  return new Date() > this.currentPeriodEnd && this.status !== 'active';
};

// Static method to find active subscription by user ID
SubscriptionSchema.statics.findActiveByUserId = function (userId: string) {
  return this.findOne({
    userId,
    status: { $in: ['active', 'trialing'] },
  });
};

// Static method to find subscriptions ending soon (for reminders)
SubscriptionSchema.statics.findEndingSoon = function (days: number = 7) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  
  return this.find({
    status: 'active',
    cancelAtPeriodEnd: true,
    currentPeriodEnd: { $lte: targetDate, $gte: new Date() },
  });
};

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
