/**
 * Common database queries
 * Reusable functions for database operations
 */

import {
  User,
  DocumentTemplate,
  GeneratedDocument,
  Subscription,
  ComplianceChecklist,
} from './models';
import connectDB from './mongodb';

// ============ USER QUERIES ============

export async function getUserByEmail(email: string, includePassword: boolean = false) {
  await connectDB();
  const query = User.findOne({ email });
  if (includePassword) {
    return query.select('+passwordHash');
  }
  return query.select('-passwordHash');
}

export async function getUserById(userId: string) {
  await connectDB();
  return User.findById(userId).select('-passwordHash');
}

export async function createUser(data: {
  email: string;
  name: string;
  passwordHash?: string;
  googleId?: string;
  image?: string;
}) {
  await connectDB();
  return User.create({
    ...data,
    disclaimerAccepted: false,
    subscriptionTier: 'free',
    usage: {
      documentsGenerated: 0,
      documentsSaved: 0,
      lastResetDate: new Date(),
    },
  });
}

export async function updateUserSubscription(
  userId: string,
  subscriptionData: {
    subscriptionTier: 'free' | 'pro';
    subscriptionStatus?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionEndsAt?: Date;
  }
) {
  await connectDB();
  return User.findByIdAndUpdate(
    userId,
    { $set: subscriptionData },
    { new: true }
  );
}

export async function acceptDisclaimer(userId: string) {
  await connectDB();
  return User.findByIdAndUpdate(
    userId,
    {
      disclaimerAccepted: true,
      disclaimerAcceptedAt: new Date(),
    },
    { new: true }
  );
}

export async function incrementUserUsage(
  userId: string,
  field: 'documentsGenerated' | 'documentsSaved'
) {
  await connectDB();
  return User.findByIdAndUpdate(
    userId,
    { $inc: { [`usage.${field}`]: 1 } },
    { new: true }
  );
}

// ============ TEMPLATE QUERIES ============

export async function getActiveTemplate(
  country: string,
  documentType: string,
  industry: string
) {
  await connectDB();
  return DocumentTemplate.findOne({
    country,
    documentType,
    industry,
    isActive: true,
  });
}

export async function getAllActiveTemplates() {
  await connectDB();
  return DocumentTemplate.find({ isActive: true }).sort({ country: 1, documentType: 1 });
}

export async function getTemplatesByCountry(country: string) {
  await connectDB();
  return DocumentTemplate.find({ country, isActive: true });
}

// ============ DOCUMENT QUERIES ============

export async function createGeneratedDocument(data: {
  userId: string;
  templateId: string;
  country: string;
  documentType: string;
  industry: string;
  documentTitle: string;
  generatedContent: string;
  fieldValues: Record<string, any>;
  isWatermarked: boolean;
}) {
  await connectDB();
  return GeneratedDocument.create({
    ...data,
    isSaved: false,
    pdfGenerated: false,
  });
}

export async function saveDocument(documentId: string, userId: string) {
  await connectDB();
  const doc = await GeneratedDocument.findOne({ _id: documentId, userId });
  if (!doc) throw new Error('Document not found');
  
  doc.isSaved = true;
  await doc.save();
  
  // Increment user's saved document count
  await incrementUserUsage(userId, 'documentsSaved');
  
  return doc;
}

export async function getUserDocuments(userId: string, savedOnly: boolean = true) {
  await connectDB();
  const query = savedOnly ? { userId, isSaved: true } : { userId };
  return GeneratedDocument.find(query)
    .sort({ createdAt: -1 })
    .limit(100);
}

export async function getDocumentById(documentId: string, userId: string) {
  await connectDB();
  return GeneratedDocument.findOne({ _id: documentId, userId });
}

export async function deleteDocument(documentId: string, userId: string) {
  await connectDB();
  const doc = await GeneratedDocument.findOneAndDelete({ _id: documentId, userId });
  if (doc && doc.isSaved) {
    // Decrement saved count
    await User.findByIdAndUpdate(userId, {
      $inc: { 'usage.documentsSaved': -1 },
    });
  }
  return doc;
}

// ============ SUBSCRIPTION QUERIES ============

export async function createSubscription(data: {
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}) {
  await connectDB();
  return Subscription.create(data);
}

export async function updateSubscription(
  stripeSubscriptionId: string,
  updates: {
    status?: string;
    cancelAtPeriodEnd?: boolean;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    canceledAt?: Date;
  }
) {
  await connectDB();
  return Subscription.findOneAndUpdate(
    { stripeSubscriptionId },
    { $set: updates },
    { new: true }
  );
}

export async function getUserSubscription(userId: string) {
  await connectDB();
  return Subscription.findOne({ userId });
}

export async function deleteSubscription(stripeSubscriptionId: string) {
  await connectDB();
  return Subscription.findOneAndDelete({ stripeSubscriptionId });
}

// ============ COMPLIANCE CHECKLIST QUERIES ============

export async function getChecklist(country: string, industry: string) {
  await connectDB();
  return ComplianceChecklist.findOne({
    country,
    industry,
    isActive: true,
  });
}

export async function getAllChecklists() {
  await connectDB();
  return ComplianceChecklist.find({ isActive: true });
}
