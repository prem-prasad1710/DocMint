/**
 * Document Generation API Route
 * POST /api/documents/generate - Generate a document from template
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { getActiveTemplate, createGeneratedDocument, incrementUserUsage } from '@/lib/db/queries';
import { generateDocumentSchema } from '@/lib/validation/schemas';
import { renderTemplate } from '@/lib/utils/helpers';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const body = await request.json();
    
    // Validate input
    const validatedFields = generateDocumentSchema.safeParse(body);
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }
    
    const { country, documentType, industry, fields } = validatedFields.data;
    
    // Get template
    const template = await getActiveTemplate(country, documentType, industry);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Generate document content
    const generatedContent = renderTemplate(template.templateContent, fields);
    
    // Create document title
    const documentTitle = `${template.name} - ${fields.clientName || fields.party2Name || 'Document'}`;
    
    // Check if user should have watermark
    const isWatermarked = user.subscriptionTier !== 'pro';
    
    // Save generated document
    const document = await createGeneratedDocument({
      userId: user.id,
      templateId: template._id.toString(),
      country,
      documentType,
      industry,
      documentTitle,
      generatedContent,
      fieldValues: fields,
      isWatermarked,
    });
    
    // Increment usage counter
    await incrementUserUsage(user.id, 'documentsGenerated');
    
    return NextResponse.json({
      _id: document._id.toString(),
      documentTitle: document.documentTitle,
      generatedContent: document.generatedContent,
      isWatermarked: document.isWatermarked,
      createdAt: document.createdAt,
    });
  } catch (error) {
    console.error('Document generation error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}
