/**
 * Zod validation schemas for API requests and forms
 */

import { z } from 'zod';

// ============ AUTH SCHEMAS ============

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const acceptDisclaimerSchema = z.object({
  accepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the disclaimer to continue',
  }),
});

// ============ DOCUMENT GENERATION SCHEMAS ============

export const generateDocumentSchema = z.object({
  country: z.enum(['US', 'India'], {
    required_error: 'Country is required',
  }),
  documentType: z.enum(['contract', 'nda', 'invoice'], {
    required_error: 'Document type is required',
  }),
  industry: z.enum(['tech', 'creative', 'consulting'], {
    required_error: 'Industry is required',
  }),
  fields: z.record(z.any()).refine(
    (fields) => Object.keys(fields).length > 0,
    { message: 'At least one field is required' }
  ),
});

export const saveDocumentSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
});

export const generatePdfSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
});

// ============ USER PROFILE SCHEMAS ============

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// ============ STRIPE SCHEMAS ============

export const createCheckoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

// ============ FIELD VALIDATION SCHEMAS ============

// Service Contract Fields
export const contractFieldsSchema = z.object({
  freelancerName: z.string().min(1, 'Your name is required'),
  freelancerAddress: z.string().min(1, 'Your address is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientAddress: z.string().min(1, 'Client address is required'),
  serviceDescription: z.string().min(10, 'Service description must be at least 10 characters'),
  projectScope: z.string().min(10, 'Project scope must be at least 10 characters'),
  paymentAmount: z.coerce.number().positive('Payment amount must be positive'),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  startDate: z.string().min(1, 'Start date is required'),
  completionDate: z.string().min(1, 'Completion date is required'),
  freelancerGSTIN: z.string().optional(),
  freelancerPAN: z.string().optional(),
  clientGSTIN: z.string().optional(),
  gstApplicable: z.string().optional(),
});

// NDA Fields
export const ndaFieldsSchema = z.object({
  party1Name: z.string().min(1, 'Your name is required'),
  party1Address: z.string().min(1, 'Your address is required'),
  party2Name: z.string().min(1, 'Other party name is required'),
  party2Address: z.string().min(1, 'Other party address is required'),
  purposeDescription: z.string().min(10, 'Purpose must be at least 10 characters'),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  termYears: z.string().min(1, 'Term is required'),
});

// Invoice Fields
export const invoiceFieldsSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  freelancerName: z.string().min(1, 'Your name is required'),
  freelancerEmail: z.string().email('Invalid email address'),
  freelancerAddress: z.string().min(1, 'Your address is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientAddress: z.string().min(1, 'Client address is required'),
  serviceDescription: z.string().min(10, 'Service description must be at least 10 characters'),
  amount: z.coerce.number().positive('Amount must be positive'),
  taxRate: z.coerce.number().min(0).max(100).optional(),
  paymentInstructions: z.string().min(10, 'Payment instructions must be at least 10 characters'),
});

// ============ TYPE EXPORTS ============

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GenerateDocumentInput = z.infer<typeof generateDocumentSchema>;
export type SaveDocumentInput = z.infer<typeof saveDocumentSchema>;
export type ContractFields = z.infer<typeof contractFieldsSchema>;
export type NdaFields = z.infer<typeof ndaFieldsSchema>;
export type InvoiceFields = z.infer<typeof invoiceFieldsSchema>;
