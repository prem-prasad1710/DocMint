export interface ISubscription {
  _id: string;
  userId: string;
  
  // Stripe
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  
  // Status
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'unpaid';
  cancelAtPeriodEnd: boolean;
  
  // Billing
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  canceledAt?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // in dollars
  stripePriceId: string;
  features: string[];
  limits: {
    savedDocuments: number; // -1 for unlimited
    documentsPerMonth: number;
    pdfWatermark: boolean;
    checklistExport: boolean;
  };
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    stripePriceId: '',
    features: [
      'Generate unlimited documents',
      'Preview before download',
      'Save up to 5 documents',
      'Basic compliance checklist',
    ],
    limits: {
      savedDocuments: 5,
      documentsPerMonth: 100,
      pdfWatermark: true,
      checklistExport: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 9,
    stripePriceId: process.env.STRIPE_PRICE_ID_MONTHLY || '',
    features: [
      'Everything in Free',
      'Save unlimited documents',
      'No PDF watermarks',
      'Export compliance checklists',
      'Priority support',
      'Early access to new features',
    ],
    limits: {
      savedDocuments: -1, // unlimited
      documentsPerMonth: 500,
      pdfWatermark: false,
      checklistExport: true,
    },
  },
};
