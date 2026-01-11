export type Country = 'US' | 'India';
export type DocumentType = 'contract' | 'nda' | 'invoice';
export type Industry = 'tech' | 'creative' | 'consulting';

export interface IDocumentTemplate {
  _id: string;
  country: Country;
  documentType: DocumentType;
  industry: Industry;
  name: string; // e.g., "Service Contract - Tech - US"
  description: string;
  templateContent: string; // Template with placeholders like {{clientName}}
  fields: TemplateField[];
  version: number; // For template versioning
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateField {
  name: string; // Field identifier, e.g., "clientName"
  label: string; // Display label, e.g., "Client Name"
  type: 'text' | 'textarea' | 'email' | 'number' | 'date' | 'select';
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select fields
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface IGeneratedDocument {
  _id: string;
  userId: string;
  templateId: string;
  
  // Document metadata
  country: Country;
  documentType: DocumentType;
  industry: Industry;
  documentTitle: string; // e.g., "Service Contract - John Doe"
  
  // Content
  generatedContent: string; // Final rendered document
  fieldValues: Record<string, any>; // User-provided values
  
  // PDF
  pdfGenerated: boolean;
  pdfUrl?: string; // Future: S3/CDN URL
  
  // Status
  isSaved: boolean; // Only paid users can save
  isWatermarked: boolean; // Free tier gets watermarks
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt?: Date;
}

export interface IComplianceChecklist {
  _id: string;
  country: Country;
  industry: Industry;
  name: string;
  description: string;
  
  items: ChecklistItem[];
  taxDeadlines: TaxDeadline[];
  resources: Resource[];
  
  isActive: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'registration' | 'ongoing' | 'annual' | 'quarterly' | 'monthly';
  priority: 'high' | 'medium' | 'low';
  isRequired: boolean;
}

export interface TaxDeadline {
  name: string; // e.g., "Quarterly GST Filing"
  description: string;
  frequency: 'monthly' | 'quarterly' | 'annual';
  dueDate: string; // e.g., "20th of following month"
  penalty?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'official' | 'guide' | 'calculator';
}
