'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { DocumentShareButton } from './DocumentShareButton';
import Link from 'next/link';

export function SavedDocumentsList({ userId }: { userId: string }) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents/list');
        if (response.ok) {
          const data = await response.json();
          setDocuments(data.documents || []);
        }
      } catch (error) {
        console.error('Failed to fetch documents');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-4"></div>
        <p className="text-lg">Loading your documents...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <span className="text-4xl">📄</span>
        </div>
        <p className="text-xl font-semibold text-gray-900 mb-2">No documents yet</p>
        <p className="text-gray-600 mb-6">Generate your first legal document to get started</p>
        <Link href="/generate">
          <Button>✨ Generate Document</Button>
        </Link>
      </div>
    );
  }

  const handleDownload = async (documentId: string) => {
    try {
      const response = await fetch(`/api/documents/pdf?documentId=${documentId}`);
      if (!response.ok) throw new Error('Failed to generate PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${documentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download PDF');
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc._id}
          className="group relative flex items-center justify-between p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📄</span>
              <h4 className="font-semibold text-gray-900 text-lg">{doc.documentTitle}</h4>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium">
                {doc.documentType.toUpperCase()}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                🌍 {doc.country}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                📅 {new Date(doc.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <DocumentShareButton documentId={doc._id} documentTitle={doc.documentTitle} />
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(doc._id)}
              className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              📥 Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
