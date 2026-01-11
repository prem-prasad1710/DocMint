'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function DynamicDocumentForm({
  country,
  documentType,
  industry,
  onComplete,
}: {
  country: string;
  documentType: string;
  industry: string;
  onComplete: (values: Record<string, any>) => void;
}) {
  const [template, setTemplate] = useState<any>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/api/templates?country=${country}&type=${documentType}&industry=${industry}`);
        if (response.ok) {
          const data = await response.json();
          setTemplate(data.template);
          const initialValues: Record<string, any> = {};
          data.template?.fields?.forEach((field: any) => {
            initialValues[field.name] = field.defaultValue || '';
          });
          setFieldValues(initialValues);
        }
      } catch (error) {
        console.error('Failed to fetch template');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplate();
  }, [country, documentType, industry]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-4"></div>
        <p className="text-gray-600">Loading form fields...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
        <p className="text-xl font-semibold text-gray-900 mb-2">Template not found</p>
        <p className="text-gray-600">The requested template could not be loaded</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">✍️</span>
          <h3 className="text-lg font-bold text-gray-900">Fill in the details</h3>
        </div>
        <p className="text-sm text-gray-600">Complete all required fields to generate your document</p>
      </div>

      <div className="space-y-4">
        {template.fields?.map((field: any) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type || 'text'}
            required={field.required}
            fullWidth
            value={fieldValues[field.name] || ''}
            onChange={(e) => setFieldValues({ ...fieldValues, [field.name]: e.target.value })}
          />
        ))}
      </div>
      
      <Button fullWidth size="lg" onClick={() => onComplete(fieldValues)}>
        ✨ Generate Document
      </Button>
    </div>
  );
}
