'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface DocumentShareButtonProps {
  documentId: string;
  documentTitle: string;
}

export function DocumentShareButton({ documentId, documentTitle }: DocumentShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      // Generate shareable link
      const link = `${window.location.origin}/document/${documentId}`;
      setShareLink(link);
      setIsOpen(true);
    } catch (error) {
      console.error('Failed to generate share link:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={handleShare} variant="outline" size="sm">
        🔗 Share
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Share Document</CardTitle>
          <CardDescription>Share "{documentTitle}" with others</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <Button onClick={handleCopyLink} variant="default" size="sm">
              {copied ? '✓ Copied' : 'Copy'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(false)} variant="outline" fullWidth>
              Close
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Anyone with this link can view the document. Make sure to share it only with trusted parties.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
