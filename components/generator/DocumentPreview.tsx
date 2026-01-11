'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function DocumentPreview({
  country,
  documentType,
  industry,
  fieldValues,
  user,
}: {
  country: string;
  documentType: string;
  industry: string;
  fieldValues: Record<string, any>;
  user: any;
}) {
  const [generatedDoc, setGeneratedDoc] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country,
          documentType,
          industry,
          fieldValues,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedDoc(data.document);
      }
    } catch (error) {
      console.error('Failed to generate document');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!generatedDoc) return;
    try {
      const response = await fetch(`/api/documents/pdf?documentId=${generatedDoc._id}`);
      if (!response.ok) throw new Error('Failed to generate PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${generatedDoc._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download PDF');
    }
  };

  if (!generatedDoc) {
    return (
      <div className="text-center py-8">
        <Button size="lg" onClick={handleGenerate} loading={isGenerating}>
          Generate Document
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Generated Document</h3>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{generatedDoc.content}</pre>
      </div>
      <Button fullWidth size="lg" onClick={handleDownloadPDF}>
        Download PDF
      </Button>
    </div>
  );
}
