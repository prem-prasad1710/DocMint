/**
 * PDF Download API Route
 * GET /api/documents/pdf - Generate and download PDF
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { getDocumentById } from '@/lib/db/queries';
import { generatePDF } from '@/lib/pdf/generator';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');
    
    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID required' },
        { status: 400 }
      );
    }
    
    // Get document
    const document = await getDocumentById(documentId, user.id);
    
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }
    
    // Generate PDF
    const pdfBuffer = await generatePDF({
      content: document.generatedContent,
      title: document.documentTitle,
      isWatermarked: document.isWatermarked,
      metadata: {
        author: user.name || undefined,
        subject: `${document.documentType} - ${document.country}`,
      },
    });
    
    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${document.documentType}-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
