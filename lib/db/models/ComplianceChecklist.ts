import mongoose, { Model, Schema } from 'mongoose';
import { IComplianceChecklist, ChecklistItem } from '@/types/document';

const ChecklistItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['registration', 'ongoing', 'annual', 'quarterly', 'monthly'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const TaxDeadlineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'annual'],
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    penalty: String,
  },
  { _id: false }
);

const ResourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['official', 'guide', 'calculator'],
      required: true,
    },
  },
  { _id: false }
);

const ComplianceChecklistSchema = new Schema<IComplianceChecklist>(
  {
    country: {
      type: String,
      enum: ['US', 'India'],
      required: true,
      index: true,
    },
    industry: {
      type: String,
      enum: ['tech', 'creative', 'consulting'],
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: {
      type: [ChecklistItemSchema],
      required: true,
    },
    taxDeadlines: {
      type: [TaxDeadlineSchema],
      required: true,
    },
    resources: {
      type: [ResourceSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast lookup
ComplianceChecklistSchema.index({ country: 1, industry: 1, isActive: 1 });

// Static method to find checklist by country and industry
ComplianceChecklistSchema.statics.findActiveChecklist = function (
  country: string,
  industry: string
) {
  return this.findOne({ country, industry, isActive: true });
};

// Method to get items by category
ComplianceChecklistSchema.methods.getItemsByCategory = function (category: string) {
  return this.items.filter((item: ChecklistItem) => item.category === category);
};

// Method to get high priority items
ComplianceChecklistSchema.methods.getHighPriorityItems = function () {
  return this.items.filter((item: ChecklistItem) => item.priority === 'high');
};

const ComplianceChecklist: Model<IComplianceChecklist> =
  mongoose.models.ComplianceChecklist ||
  mongoose.model<IComplianceChecklist>('ComplianceChecklist', ComplianceChecklistSchema);

export default ComplianceChecklist;
