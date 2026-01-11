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
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <span className="text-4xl">🚀</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to generate</h3>
        <p className="text-gray-600 mb-6">Click below to create your legal document</p>
        <Button size="lg" onClick={handleGenerate} loading={isGenerating}>
          {isGenerating ? '⏳ Generating...' : '✨ Generate Document'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl">
            ✓
          </div>
          <h3 className="text-lg font-bold text-gray-900">Document Generated Successfully!</h3>
        </div>
        <p className="text-sm text-gray-600">Your legal document has been created and saved</p>
      </div>

      <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <span className="text-3xl">📄</span>
          <h3 className="font-bold text-xl text-gray-900">Generated Document</h3>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-mono">{generatedDoc.content}</pre>
        </div>
      </div>
      
      <Button fullWidth size="lg" onClick={handleDownloadPDF}>
        📥 Download PDF
      </Button>
    </div>
  );
}
