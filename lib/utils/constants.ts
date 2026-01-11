/**
 * Application-wide constants
 */

export const APP_NAME = 'DocMint';
export const APP_DESCRIPTION = 'AI-Powered Legal Document Generation & Compliance Platform for Modern Businesses';

// Subscription limits
export const FREE_TIER_LIMITS = {
  SAVED_DOCUMENTS: 5,
  DOCUMENTS_PER_MONTH: 100,
  PDF_WATERMARK: true,
  CHECKLIST_EXPORT: false,
} as const;

export const PRO_TIER_LIMITS = {
  SAVED_DOCUMENTS: -1, // unlimited
  DOCUMENTS_PER_MONTH: 500,
  PDF_WATERMARK: false,
  CHECKLIST_EXPORT: true,
} as const;

// Supported options
export const SUPPORTED_COUNTRIES = [
  { value: 'US', label: 'United States', flag: '🇺🇸' },
  { value: 'India', label: 'India', flag: '🇮🇳' },
] as const;

export const DOCUMENT_TYPES = [
  { value: 'contract', label: 'Service Contract', icon: '📄' },
  { value: 'nda', label: 'Non-Disclosure Agreement', icon: '🔒' },
  { value: 'invoice', label: 'Invoice', icon: '💰' },
  { value: 'proposal', label: 'Project Proposal', icon: '📋' },
  { value: 'quotation', label: 'Quotation', icon: '💵' },
  { value: 'agreement', label: 'Service Agreement', icon: '🤝' },
] as const;

export const INDUSTRIES = [
  { value: 'tech', label: 'Technology', icon: '💻' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'consulting', label: 'Consulting', icon: '💼' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'finance', label: 'Finance', icon: '💳' },
  { value: 'education', label: 'Education', icon: '📚' },
] as const;

// Pricing
export const PRICING = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: '',
    features: [
      'Generate unlimited documents',
      'Preview before download',
      'Save up to 5 documents',
      'Basic compliance checklist',
      'Watermarked PDFs',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRICE_ID_MONTHLY || '',
    features: [
      'Everything in Free',
      'Save unlimited documents',
      'No PDF watermarks',
      'Export compliance checklists',
      'AI-powered document suggestions',
      'Document version history',
      'Team collaboration',
      'Advanced analytics',
      'Priority support',
      'Early access to new features',
      'API access',
      'Custom branding',
    ],
  },
} as const;

// Legal disclaimers
export const DISCLAIMER_TEXT = `
⚠️ IMPORTANT DISCLAIMER

This service provides template documents for informational purposes only.

This is NOT legal advice. We are not a law firm.

By using this service, you agree:
• Documents should be reviewed by a qualified attorney
• Tax/compliance checklists are guidance only
• You are responsible for ensuring documents meet your needs
• We assume no liability for your use of generated documents
`.trim();

export const FOOTER_DISCLAIMER = 'Not legal advice. Templates for informational purposes only.';

// Rate limits
export const RATE_LIMITS = {
  DOCUMENT_GENERATION: 50, // per hour
  API_CALLS: 100, // per minute
} as const;

// Document expiry
export const UNSAVED_DOCUMENT_EXPIRY_DAYS = 7;

// UI
export const TOAST_DURATION = 5000; // milliseconds

// Routes
export const PUBLIC_ROUTES = ['/', '/login', '/signup', '/pricing', '/terms', '/privacy'];
export const AUTH_ROUTES = ['/login', '/signup'];
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/generate',
  '/document',
  '/checklist',
  '/settings',
  '/billing',
];
