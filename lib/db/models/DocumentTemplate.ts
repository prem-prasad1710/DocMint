import mongoose, { Model, Schema } from 'mongoose';
import { IDocumentTemplate } from '@/types/document';

const TemplateFieldSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'textarea', 'email', 'number', 'date', 'select'],
      required: true,
    },
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
    options: [String], // For select fields
    validation: {
      min: Number,
      max: Number,
      pattern: String,
    },
  },
  { _id: false }
);

const DocumentTemplateSchema = new Schema<IDocumentTemplate>(
  {
    country: {
      type: String,
      enum: ['US', 'India'],
      required: true,
      index: true,
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
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    templateContent: {
      type: String,
      required: true,
    },
    fields: {
      type: [TemplateFieldSchema],
      required: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast template lookup
DocumentTemplateSchema.index({ country: 1, documentType: 1, industry: 1, isActive: 1 });

// Method to render template with field values
DocumentTemplateSchema.methods.render = function (fieldValues: Record<string, any>): string {
  let content = this.templateContent;
  
  // Replace all {{fieldName}} placeholders with actual values
  Object.keys(fieldValues).forEach((key) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(placeholder, fieldValues[key] || '');
  });
  
  return content;
};

// Static method to find template by criteria
DocumentTemplateSchema.statics.findActiveTemplate = function (
  country: string,
  documentType: string,
  industry: string
) {
  return this.findOne({ country, documentType, industry, isActive: true });
};

const DocumentTemplate: Model<IDocumentTemplate> =
  mongoose.models.DocumentTemplate ||
  mongoose.model<IDocumentTemplate>('DocumentTemplate', DocumentTemplateSchema);

export default DocumentTemplate;
