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
    return <div className="text-center py-8 text-gray-500">Loading documents...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg mb-2">No documents yet</p>
        <p className="text-sm mb-4">Generate your first document to get started</p>
        <Link href="/generate">
          <Button>Generate Document</Button>
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
    <div className="space-y-3">
      {documents.map((doc) => (
        <div key={doc._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{doc.documentTitle}</h4>
            <div className="flex gap-3 mt-1 text-sm text-gray-600">
              <span>{doc.documentType.toUpperCase()}</span>
              <span>•</span>
              <span>{doc.country}</span>
              <span>•</span>
              <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <DocumentShareButton documentId={doc._id} documentTitle={doc.documentTitle} />
            <Button size="sm" variant="outline" onClick={() => handleDownload(doc._id)}>
              📥 Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
