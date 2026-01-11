import mongoose, { Model, Schema } from 'mongoose';
import { IGeneratedDocument } from '@/types/document';

const GeneratedDocumentSchema = new Schema<IGeneratedDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    templateId: {
      type: String,
      required: true,
      index: true,
    },
    
    // Document metadata
    country: {
      type: String,
      enum: ['US', 'India'],
      required: true,
    },
    documentType: {
      type: String,
      enum: ['contract', 'nda', 'invoice'],
      required: true,
      index: true,
    },
    industry: {
      type: String,
      enum: ['tech', 'creative', 'consulting'],
      required: true,
    },
    documentTitle: {
      type: String,
      required: true,
      trim: true,
    },
    
    // Content
    generatedContent: {
      type: String,
      required: true,
    },
    fieldValues: {
      type: Schema.Types.Mixed,
      required: true,
    },
    
    // PDF
    pdfGenerated: {
      type: Boolean,
      default: false,
    },
    pdfUrl: {
      type: String,
    },
    
    // Status
    isSaved: {
      type: Boolean,
      default: false,
      index: true,
    },
    isWatermarked: {
      type: Boolean,
      default: true,
    },
    
    // Metadata
    lastAccessedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common queries
GeneratedDocumentSchema.index({ userId: 1, isSaved: 1, createdAt: -1 });
GeneratedDocumentSchema.index({ userId: 1, documentType: 1 });

// Virtual for document age in days
GeneratedDocumentSchema.virtual('ageInDays').get(function () {
  const now = new Date();
  const created = this.createdAt;
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Method to update last accessed timestamp
GeneratedDocumentSchema.methods.markAccessed = function () {
  this.lastAccessedAt = new Date();
  return this.save();
};

// Static method to get user's saved documents
GeneratedDocumentSchema.statics.getUserSavedDocuments = function (userId: string) {
  return this.find({ userId, isSaved: true })
    .sort({ createdAt: -1 })
    .limit(100);
};

// Static method to count user's saved documents
GeneratedDocumentSchema.statics.countUserSavedDocuments = function (userId: string) {
  return this.countDocuments({ userId, isSaved: true });
};

// Pre-save middleware: Auto-delete old unsaved documents (7 days)
GeneratedDocumentSchema.pre('save', function (next) {
  if (!this.isSaved && this.isNew === false) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (this.createdAt < sevenDaysAgo) {
      // Document is old and unsaved, could be marked for deletion
      // In production, use a cron job instead
    }
  }
  next();
});

const GeneratedDocument: Model<IGeneratedDocument> =
  mongoose.models.GeneratedDocument ||
  mongoose.model<IGeneratedDocument>('GeneratedDocument', GeneratedDocumentSchema);

export default GeneratedDocument;
