/**
 * Compliance Checklist API Route
 * GET /api/checklist/[country] - Get compliance checklist for a country
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { getChecklist } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ country: string }> }
) {
  try {
    await requireAuth();
    
    const { country } = await params;
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry') || 'tech';
    
    const checklist = await getChecklist(country, industry);
    
    if (!checklist) {
      return NextResponse.json(
        { error: 'Checklist not found for this country and industry' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      country: checklist.country,
      industry: checklist.industry,
      name: checklist.name,
      description: checklist.description,
      items: checklist.items,
      taxDeadlines: checklist.taxDeadlines,
      resources: checklist.resources,
    });
  } catch (error) {
    console.error('Checklist API error:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
