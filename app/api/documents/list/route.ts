/**
 * Documents List API Route
 * GET /api/documents/list - Get user's saved documents
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { getUserDocuments } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const documents = await getUserDocuments(user.id, true);
    
    return NextResponse.json({
      documents: documents.map(doc => ({
        _id: doc._id.toString(),
        documentTitle: doc.documentTitle,
        documentType: doc.documentType,
        country: doc.country,
        industry: doc.industry,
        createdAt: doc.createdAt,
        isWatermarked: doc.isWatermarked,
      })),
    });
  } catch (error) {
    console.error('Documents list error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
