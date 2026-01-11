'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface DisclaimerModalProps {
  isOpen: boolean;
}

export function DisclaimerModal({ isOpen }: DisclaimerModalProps) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  if (!open) return null;

  const handleAccept = async () => {
    try {
      const response = await fetch('/api/auth/accept-disclaimer', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to accept disclaimer');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Close modal immediately
        setOpen(false);
        // Reload to get fresh session data
        window.location.reload();
      } else {
        throw new Error(data.error || 'Failed to accept disclaimer');
      }
    } catch (error) {
      console.error('Failed to accept disclaimer:', error);
      alert('Failed to accept disclaimer. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Legal Disclaimer</CardTitle>
          <CardDescription>Please read and accept to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Important:</strong> This service provides template legal documents for informational purposes only. 
              These templates are NOT a substitute for professional legal advice.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-gray-700">
              <li>Always consult with a qualified attorney for your specific legal needs</li>
              <li>These templates may not be suitable for all situations</li>
              <li>We are not responsible for any legal consequences arising from the use of these templates</li>
              <li>Laws vary by jurisdiction and may change over time</li>
            </ul>
          </div>
          <Button onClick={handleAccept} fullWidth size="lg">
            I Understand and Accept
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
