import { IDocumentTemplate } from '@/types/document';

/**
 * Seed data for document templates
 * These are production-ready legal document templates
 */

export const SEED_TEMPLATES: Partial<IDocumentTemplate>[] = [
  // US - Tech - Service Contract
  {
    country: 'US',
    documentType: 'contract',
    industry: 'tech',
    name: 'Service Contract - Tech - US',
    description: 'Standard service agreement for technology services (software development, IT consulting)',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'freelancerName',
        label: 'Your Full Name',
        type: 'text',
        required: true,
        placeholder: 'John Doe',
      },
      {
        name: 'freelancerAddress',
        label: 'Your Business Address',
        type: 'textarea',
        required: true,
        placeholder: '123 Main St, San Francisco, CA 94102',
      },
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
        placeholder: 'Acme Corporation',
      },
      {
        name: 'clientAddress',
        label: 'Client Address',
        type: 'textarea',
        required: true,
        placeholder: '456 Corporate Blvd, New York, NY 10001',
      },
      {
        name: 'serviceDescription',
        label: 'Service Description',
        type: 'textarea',
        required: true,
        placeholder: 'Web application development, API integration, testing',
      },
      {
        name: 'projectScope',
        label: 'Project Scope',
        type: 'textarea',
        required: true,
        placeholder: 'Build a responsive e-commerce platform with payment integration',
      },
      {
        name: 'paymentAmount',
        label: 'Total Payment Amount (USD)',
        type: 'number',
        required: true,
        placeholder: '5000',
      },
      {
        name: 'paymentTerms',
        label: 'Payment Terms',
        type: 'select',
        required: true,
        options: ['50% upfront, 50% on completion', 'Net 30', 'Net 15', 'Upon completion', 'Monthly retainer'],
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: true,
      },
      {
        name: 'completionDate',
        label: 'Expected Completion Date',
        type: 'date',
        required: true,
      },
    ],
    templateContent: `
SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of {{startDate}}, by and between:

SERVICE PROVIDER:
{{freelancerName}}
{{freelancerAddress}}

CLIENT:
{{clientName}}
{{clientAddress}}

1. SERVICES
The Service Provider agrees to provide the following services ("Services"):
{{serviceDescription}}

Project Scope:
{{projectScope}}

2. COMPENSATION
Client agrees to pay Service Provider ${{paymentAmount}} USD for the Services.
Payment Terms: {{paymentTerms}}

3. TERM
This Agreement shall commence on {{startDate}} and continue until {{completionDate}}, unless terminated earlier in accordance with this Agreement.

4. INTELLECTUAL PROPERTY
Upon full payment, all intellectual property rights in the deliverables created under this Agreement shall be transferred to the Client. Service Provider retains the right to use the work for portfolio purposes.

5. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary information disclosed during this engagement.

6. INDEPENDENT CONTRACTOR
Service Provider is an independent contractor and not an employee of Client. Service Provider is responsible for all taxes and insurance.

7. TERMINATION
Either party may terminate this Agreement with 14 days written notice. Client agrees to pay for all work completed up to the termination date.

8. WARRANTY
Service Provider warrants that all Services will be performed in a professional and workmanlike manner.

9. LIMITATION OF LIABILITY
Service Provider's liability shall not exceed the total amount paid under this Agreement.

10. GOVERNING LAW
This Agreement shall be governed by the laws of the state where the Service Provider is located.

11. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements.

SERVICE PROVIDER SIGNATURE: _______________________
Date: _______________________

CLIENT SIGNATURE: _______________________
Date: _______________________

⚠️ DISCLAIMER: This is a template document for informational purposes only. This is NOT legal advice. 
You should consult with a qualified attorney before using this agreement.
    `.trim(),
  },

  // US - Tech - NDA
  {
    country: 'US',
    documentType: 'nda',
    industry: 'tech',
    name: 'Non-Disclosure Agreement - Tech - US',
    description: 'Mutual NDA for technology projects and software development',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'party1Name',
        label: 'Your Name/Company',
        type: 'text',
        required: true,
        placeholder: 'John Doe or ABC Tech LLC',
      },
      {
        name: 'party1Address',
        label: 'Your Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'party2Name',
        label: 'Other Party Name',
        type: 'text',
        required: true,
      },
      {
        name: 'party2Address',
        label: 'Other Party Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'purposeDescription',
        label: 'Purpose of Disclosure',
        type: 'textarea',
        required: true,
        placeholder: 'Exploration of potential business collaboration in software development',
      },
      {
        name: 'effectiveDate',
        label: 'Effective Date',
        type: 'date',
        required: true,
      },
      {
        name: 'termYears',
        label: 'NDA Term (Years)',
        type: 'select',
        required: true,
        options: ['1', '2', '3', '5'],
      },
    ],
    templateContent: `
MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of {{effectiveDate}}, by and between:

PARTY 1 ("Disclosing Party"):
{{party1Name}}
{{party1Address}}

PARTY 2 ("Receiving Party"):
{{party2Name}}
{{party2Address}}

(Each a "Party" and collectively the "Parties")

WHEREAS, the Parties wish to explore: {{purposeDescription}}

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by either Party, including but not limited to: technical data, trade secrets, business information, product plans, designs, source code, algorithms, customer lists, financial information, and any other proprietary information marked as "Confidential" or that reasonably should be considered confidential.

2. EXCLUSIONS FROM CONFIDENTIAL INFORMATION
Confidential Information does not include information that:
a) Is or becomes publicly available through no breach of this Agreement
b) Was known to the Receiving Party prior to disclosure
c) Is independently developed by the Receiving Party
d) Is rightfully received from a third party without breach of any obligation

3. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to any third party without prior written consent
c) Use Confidential Information solely for the Purpose stated above
d) Protect Confidential Information using the same degree of care used for its own confidential information, but no less than reasonable care
e) Limit access to Confidential Information to employees and contractors with a legitimate need to know

4. TERM
This Agreement shall remain in effect for {{termYears}} year(s) from the Effective Date. The obligations regarding Confidential Information shall survive termination for an additional {{termYears}} year(s).

5. RETURN OF MATERIALS
Upon request or termination of this Agreement, each Party shall return or destroy all Confidential Information and certify such destruction in writing.

6. NO LICENSE
Nothing in this Agreement grants any license or right to use Confidential Information except as expressly stated herein.

7. NO WARRANTY
All Confidential Information is provided "AS IS" without warranty of any kind.

8. REMEDIES
The Parties acknowledge that breach of this Agreement may cause irreparable harm, and the non-breaching Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies.

9. GOVERNING LAW
This Agreement shall be governed by the laws of the United States and the state where Party 1 is located.

10. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the Parties regarding the subject matter herein.

PARTY 1 SIGNATURE: _______________________
Date: _______________________

PARTY 2 SIGNATURE: _______________________
Date: _______________________

⚠️ DISCLAIMER: This is a template document for informational purposes only. This is NOT legal advice.
Consult with a qualified attorney before using this agreement.
    `.trim(),
  },

  // India - Tech - Service Contract
  {
    country: 'India',
    documentType: 'contract',
    industry: 'tech',
    name: 'Service Contract - Tech - India',
    description: 'Service agreement for technology freelancers in India (GST compliant)',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'freelancerName',
        label: 'Your Full Name',
        type: 'text',
        required: true,
      },
      {
        name: 'freelancerAddress',
        label: 'Your Business Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'freelancerGSTIN',
        label: 'Your GSTIN (if applicable)',
        type: 'text',
        required: false,
        placeholder: '22AAAAA0000A1Z5',
      },
      {
        name: 'freelancerPAN',
        label: 'Your PAN',
        type: 'text',
        required: true,
        placeholder: 'ABCDE1234F',
      },
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
      },
      {
        name: 'clientAddress',
        label: 'Client Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'clientGSTIN',
        label: 'Client GSTIN (if applicable)',
        type: 'text',
        required: false,
      },
      {
        name: 'serviceDescription',
        label: 'Service Description',
        type: 'textarea',
        required: true,
      },
      {
        name: 'paymentAmount',
        label: 'Total Payment Amount (INR)',
        type: 'number',
        required: true,
      },
      {
        name: 'gstApplicable',
        label: 'Is GST Applicable?',
        type: 'select',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: true,
      },
      {
        name: 'completionDate',
        label: 'Expected Completion Date',
        type: 'date',
        required: true,
      },
    ],
    templateContent: `
SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of {{startDate}}, by and between:

SERVICE PROVIDER:
{{freelancerName}}
{{freelancerAddress}}
PAN: {{freelancerPAN}}
GSTIN: {{freelancerGSTIN}}

CLIENT:
{{clientName}}
{{clientAddress}}
GSTIN: {{clientGSTIN}}

1. SERVICES
The Service Provider agrees to provide the following services:
{{serviceDescription}}

2. COMPENSATION
Client agrees to pay Service Provider ₹{{paymentAmount}} INR (Rupees) for the Services.
GST Applicable: {{gstApplicable}}

3. PAYMENT TERMS
Payment shall be made within 15 days of invoice submission. Late payments will attract interest at 18% per annum.

4. TERM
This Agreement commences on {{startDate}} and continues until {{completionDate}}.

5. INTELLECTUAL PROPERTY RIGHTS
Upon full payment, Client shall own all deliverables. Service Provider retains portfolio rights.

6. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary information.

7. INDEPENDENT CONTRACTOR
Service Provider is an independent contractor. Service Provider is responsible for all applicable taxes including Income Tax and GST.

8. TERMINATION
Either party may terminate with 14 days written notice. Client shall pay for work completed.

9. INDEMNIFICATION
Each party shall indemnify the other against claims arising from their negligence or breach.

10. DISPUTE RESOLUTION
Any disputes shall first be resolved through mutual discussion. If unresolved, disputes shall be subject to arbitration in accordance with the Arbitration and Conciliation Act, 1996.

11. GOVERNING LAW
This Agreement shall be governed by the laws of India and courts of {{freelancerAddress}} shall have exclusive jurisdiction.

12. ENTIRE AGREEMENT
This Agreement constitutes the entire understanding between the parties.

SERVICE PROVIDER SIGNATURE: _______________________
Date: _______________________

CLIENT SIGNATURE: _______________________
Date: _______________________

⚠️ DISCLAIMER: This is a template for informational purposes only. NOT legal advice.
Consult a qualified lawyer before use.
    `.trim(),
  },

  // US - Invoice Template
  {
    country: 'US',
    documentType: 'invoice',
    industry: 'tech',
    name: 'Invoice - Tech - US',
    description: 'Professional invoice for freelance services',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'invoiceNumber',
        label: 'Invoice Number',
        type: 'text',
        required: true,
        placeholder: 'INV-001',
      },
      {
        name: 'invoiceDate',
        label: 'Invoice Date',
        type: 'date',
        required: true,
      },
      {
        name: 'dueDate',
        label: 'Due Date',
        type: 'date',
        required: true,
      },
      {
        name: 'freelancerName',
        label: 'Your Name/Business',
        type: 'text',
        required: true,
      },
      {
        name: 'freelancerEmail',
        label: 'Your Email',
        type: 'email',
        required: true,
      },
      {
        name: 'freelancerAddress',
        label: 'Your Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
      },
      {
        name: 'clientAddress',
        label: 'Client Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'serviceDescription',
        label: 'Service Description',
        type: 'textarea',
        required: true,
        placeholder: 'Web development services - December 2024',
      },
      {
        name: 'amount',
        label: 'Amount (USD)',
        type: 'number',
        required: true,
      },
      {
        name: 'taxRate',
        label: 'Tax Rate (%)',
        type: 'number',
        required: false,
        placeholder: '0',
      },
      {
        name: 'paymentInstructions',
        label: 'Payment Instructions',
        type: 'textarea',
        required: true,
        placeholder: 'Wire transfer to: Bank of America, Account: 123456789, Routing: 987654321',
      },
    ],
    templateContent: `
INVOICE

Invoice #: {{invoiceNumber}}
Invoice Date: {{invoiceDate}}
Due Date: {{dueDate}}

FROM:
{{freelancerName}}
{{freelancerAddress}}
Email: {{freelancerEmail}}

BILL TO:
{{clientName}}
{{clientAddress}}

DESCRIPTION OF SERVICES:
{{serviceDescription}}

AMOUNT BREAKDOWN:
Subtotal: ${{amount}} USD
Tax ({{taxRate}}%): ${{taxAmount}} USD
TOTAL DUE: ${{totalAmount}} USD

PAYMENT INSTRUCTIONS:
{{paymentInstructions}}

PAYMENT TERMS:
Payment is due by {{dueDate}}. Late payments may be subject to fees.

Thank you for your business!

⚠️ This invoice is for services rendered. Please remit payment by the due date.
    `.trim(),
  },

  // US - Tech - Project Proposal
  {
    country: 'US',
    documentType: 'proposal',
    industry: 'tech',
    name: 'Project Proposal - Tech - US',
    description: 'Professional project proposal for technology services',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'proposalNumber',
        label: 'Proposal Number',
        type: 'text',
        required: true,
        placeholder: 'PROP-2024-001',
      },
      {
        name: 'date',
        label: 'Proposal Date',
        type: 'date',
        required: true,
      },
      {
        name: 'validUntil',
        label: 'Valid Until',
        type: 'date',
        required: true,
      },
      {
        name: 'companyName',
        label: 'Your Company Name',
        type: 'text',
        required: true,
      },
      {
        name: 'companyAddress',
        label: 'Company Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'clientName',
        label: 'Client Company Name',
        type: 'text',
        required: true,
      },
      {
        name: 'clientAddress',
        label: 'Client Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'projectTitle',
        label: 'Project Title',
        type: 'text',
        required: true,
        placeholder: 'E-commerce Platform Development',
      },
      {
        name: 'projectDescription',
        label: 'Project Description',
        type: 'textarea',
        required: true,
      },
      {
        name: 'objectives',
        label: 'Project Objectives',
        type: 'textarea',
        required: true,
      },
      {
        name: 'deliverables',
        label: 'Deliverables',
        type: 'textarea',
        required: true,
        placeholder: '1. Fully functional e-commerce website\n2. Admin dashboard\n3. Payment integration\n4. Documentation',
      },
      {
        name: 'timeline',
        label: 'Project Timeline',
        type: 'text',
        required: true,
        placeholder: '12 weeks',
      },
      {
        name: 'totalBudget',
        label: 'Total Budget (USD)',
        type: 'number',
        required: true,
      },
      {
        name: 'paymentSchedule',
        label: 'Payment Schedule',
        type: 'textarea',
        required: true,
        placeholder: '30% upon signing, 40% at milestone 2, 30% upon completion',
      },
    ],
    templateContent: `
PROJECT PROPOSAL

Proposal Number: {{proposalNumber}}
Date: {{date}}
Valid Until: {{validUntil}}

FROM:
{{companyName}}
{{companyAddress}}

TO:
{{clientName}}
{{clientAddress}}

PROJECT TITLE:
{{projectTitle}}

EXECUTIVE SUMMARY:
{{projectDescription}}

PROJECT OBJECTIVES:
{{objectives}}

DELIVERABLES:
{{deliverables}}

PROJECT TIMELINE:
{{timeline}}

BUDGET:
Total Project Budget: ${{totalBudget}} USD

PAYMENT SCHEDULE:
{{paymentSchedule}}

SCOPE OF WORK:
This proposal includes all services, deliverables, and timelines as outlined above. Any additional work outside this scope will be subject to a separate agreement and additional charges.

TERMS AND CONDITIONS:
1. This proposal is valid until {{validUntil}}
2. Payment terms are as specified in the payment schedule
3. Intellectual property rights will be transferred upon full payment
4. Both parties agree to maintain confidentiality of proprietary information
5. Changes to scope may result in timeline and budget adjustments

ACCEPTANCE:
By signing below, the client accepts this proposal and agrees to the terms and conditions outlined herein.

CLIENT SIGNATURE: _______________________
Date: _______________________

PROVIDER SIGNATURE: _______________________
Date: _______________________

⚠️ DISCLAIMER: This is a template proposal. Customize as needed for your specific project.
    `.trim(),
  },

  // US - Tech - Quotation
  {
    country: 'US',
    documentType: 'quotation',
    industry: 'tech',
    name: 'Quotation - Tech - US',
    description: 'Professional quotation for technology services',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'quoteNumber',
        label: 'Quote Number',
        type: 'text',
        required: true,
        placeholder: 'QUO-2024-001',
      },
      {
        name: 'quoteDate',
        label: 'Quote Date',
        type: 'date',
        required: true,
      },
      {
        name: 'validUntil',
        label: 'Valid Until',
        type: 'date',
        required: true,
      },
      {
        name: 'providerName',
        label: 'Your Name/Company',
        type: 'text',
        required: true,
      },
      {
        name: 'providerAddress',
        label: 'Your Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'providerEmail',
        label: 'Your Email',
        type: 'email',
        required: true,
      },
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
      },
      {
        name: 'clientAddress',
        label: 'Client Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'serviceDescription',
        label: 'Service Description',
        type: 'textarea',
        required: true,
      },
      {
        name: 'quantity',
        label: 'Quantity',
        type: 'text',
        required: true,
        placeholder: '1 project',
      },
      {
        name: 'unitPrice',
        label: 'Unit Price (USD)',
        type: 'number',
        required: true,
      },
      {
        name: 'subtotal',
        label: 'Subtotal (USD)',
        type: 'number',
        required: true,
      },
      {
        name: 'taxRate',
        label: 'Tax Rate (%)',
        type: 'number',
        required: false,
        placeholder: '0',
      },
      {
        name: 'total',
        label: 'Total Amount (USD)',
        type: 'number',
        required: true,
      },
      {
        name: 'notes',
        label: 'Additional Notes',
        type: 'textarea',
        required: false,
        placeholder: 'This quote includes all development, testing, and deployment services.',
      },
    ],
    templateContent: `
QUOTATION

Quote Number: {{quoteNumber}}
Date: {{quoteDate}}
Valid Until: {{validUntil}}

FROM:
{{providerName}}
{{providerAddress}}
Email: {{providerEmail}}

TO:
{{clientName}}
{{clientAddress}}

SERVICE QUOTATION:

Description: {{serviceDescription}}
Quantity: {{quantity}}
Unit Price: ${{unitPrice}} USD
Subtotal: ${{subtotal}} USD
{{#if taxRate}}Tax ({{taxRate}}%): ${{taxAmount}} USD{{/if}}
─────────────────────────────
TOTAL: ${{total}} USD

NOTES:
{{notes}}

TERMS AND CONDITIONS:
1. This quotation is valid until {{validUntil}}
2. Payment terms: Net 30 days
3. All prices are in USD
4. Services will commence upon acceptance of this quotation
5. Any changes to scope may result in price adjustments

ACCEPTANCE:
Please sign and return this quotation to confirm your acceptance.

CLIENT SIGNATURE: _______________________
Date: _______________________

Thank you for considering our services!

⚠️ This quotation is valid until the expiration date. Prices are subject to change after expiration.
    `.trim(),
  },

  // India - Tech - Quotation
  {
    country: 'India',
    documentType: 'quotation',
    industry: 'tech',
    name: 'Quotation - Tech - India',
    description: 'GST-compliant quotation for technology services in India',
    version: 1,
    isActive: true,
    fields: [
      {
        name: 'quoteNumber',
        label: 'Quote Number',
        type: 'text',
        required: true,
      },
      {
        name: 'quoteDate',
        label: 'Quote Date',
        type: 'date',
        required: true,
      },
      {
        name: 'validUntil',
        label: 'Valid Until',
        type: 'date',
        required: true,
      },
      {
        name: 'providerName',
        label: 'Your Name/Company',
        type: 'text',
        required: true,
      },
      {
        name: 'providerAddress',
        label: 'Your Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'providerGSTIN',
        label: 'Your GSTIN',
        type: 'text',
        required: false,
      },
      {
        name: 'providerPAN',
        label: 'Your PAN',
        type: 'text',
        required: true,
      },
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
      },
      {
        name: 'clientAddress',
        label: 'Client Address',
        type: 'textarea',
        required: true,
      },
      {
        name: 'serviceDescription',
        label: 'Service Description',
        type: 'textarea',
        required: true,
      },
      {
        name: 'subtotal',
        label: 'Subtotal (INR)',
        type: 'number',
        required: true,
      },
      {
        name: 'gstRate',
        label: 'GST Rate (%)',
        type: 'select',
        required: true,
        options: ['0', '5', '12', '18'],
      },
      {
        name: 'total',
        label: 'Total Amount (INR)',
        type: 'number',
        required: true,
      },
    ],
    templateContent: `
QUOTATION

Quote Number: {{quoteNumber}}
Date: {{quoteDate}}
Valid Until: {{validUntil}}

FROM:
{{providerName}}
{{providerAddress}}
PAN: {{providerPAN}}
GSTIN: {{providerGSTIN}}

TO:
{{clientName}}
{{clientAddress}}

SERVICE QUOTATION:

Description: {{serviceDescription}}
Subtotal: ₹{{subtotal}} INR
GST ({{gstRate}}%): ₹{{gstAmount}} INR
─────────────────────────────
TOTAL: ₹{{total}} INR

TERMS AND CONDITIONS:
1. This quotation is valid until {{validUntil}}
2. Payment terms: 50% advance, 50% on completion
3. All prices are in INR and exclusive of GST
4. GST will be charged as applicable
5. Services will commence upon receipt of advance payment

ACCEPTANCE:
Please sign and return this quotation to confirm your acceptance.

CLIENT SIGNATURE: _______________________
Date: _______________________

⚠️ This quotation is valid until the expiration date. Prices are subject to change after expiration.
    `.trim(),
  },
];
