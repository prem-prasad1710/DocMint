/**
 * Utility helper functions
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: 'USD' | 'INR' = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

/**
 * Format date
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Generate random ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sleep helper (for testing/delays)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate invoice totals
 */
export function calculateInvoiceTotals(amount: number, taxRate: number = 0) {
  const subtotal = amount;
  const tax = (amount * taxRate) / 100;
  const total = subtotal + tax;
  
  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  };
}

/**
 * Render template with field values
 */
export function renderTemplate(
  template: string,
  values: Record<string, any>
): string {
  let result = template;
  
  // Handle special fields like invoice calculations
  if (values.amount && values.taxRate !== undefined) {
    const totals = calculateInvoiceTotals(
      parseFloat(values.amount),
      parseFloat(values.taxRate || '0')
    );
    values.taxAmount = totals.tax;
    values.totalAmount = totals.total;
  }
  
  // Replace all {{fieldName}} placeholders
  Object.keys(values).forEach((key) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    const value = values[key] || '[NOT PROVIDED]';
    result = result.replace(placeholder, value.toString());
  });
  
  return result;
}

/**
 * Get subscription status badge color
 */
export function getSubscriptionStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    trialing: 'bg-blue-100 text-blue-800',
    canceled: 'bg-gray-100 text-gray-800',
    past_due: 'bg-red-100 text-red-800',
    incomplete: 'bg-yellow-100 text-yellow-800',
    unpaid: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Check if user can save document
 */
export function canSaveDocument(
  subscriptionTier: string,
  currentSavedCount: number
): boolean {
  if (subscriptionTier === 'pro') return true;
  return currentSavedCount < 5; // Free tier limit
}

/**
 * Get days until date
 */
export function getDaysUntil(date: Date | string): number {
  const target = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Generate document filename
 */
export function generateDocumentFilename(
  documentType: string,
  clientName: string,
  date: Date = new Date()
): string {
  const dateStr = date.toISOString().split('T')[0];
  const sanitizedName = sanitizeFilename(clientName || 'document');
  return `${documentType}-${sanitizedName}-${dateStr}.pdf`;
}
