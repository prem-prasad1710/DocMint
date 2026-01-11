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
    return <div className="text-center py-8">Loading form...</div>;
  }

  if (!template) {
    return <div className="text-center py-8 text-red-600">Template not found</div>;
  }

  return (
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
      <Button fullWidth size="lg" onClick={() => onComplete(fieldValues)}>
        Generate Document
      </Button>
    </div>
  );
}
