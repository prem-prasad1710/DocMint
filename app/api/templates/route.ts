/**
 * Templates API Route
 * GET /api/templates - Get template by country, type, and industry
 */

import { NextRequest, NextResponse } from 'next/server';
import { getActiveTemplate } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const documentType = searchParams.get('documentType');
    const industry = searchParams.get('industry');

    if (!country || !documentType || !industry) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const template = await getActiveTemplate(country, documentType, industry);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      fields: template.fields,
      name: template.name,
      description: template.description,
    });
  } catch (error) {
    console.error('Templates API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
