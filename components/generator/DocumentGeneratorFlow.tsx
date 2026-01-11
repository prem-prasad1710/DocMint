'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CountrySelector } from './CountrySelector';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { IndustrySelector } from './IndustrySelector';
import { DynamicDocumentForm } from './DynamicDocumentForm';
import { DocumentPreview } from './DocumentPreview';

export function DocumentGeneratorFlow({ user }: { user: any }) {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [generatedDocument, setGeneratedDocument] = useState<any>(null);

  const totalSteps = 5;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Select Country'}
            {step === 2 && 'Select Document Type'}
            {step === 3 && 'Select Industry'}
            {step === 4 && 'Fill Document Details'}
            {step === 5 && 'Review & Download'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Choose the country for your legal document'}
            {step === 2 && 'What type of document do you need?'}
            {step === 3 && 'Select your industry'}
            {step === 4 && 'Provide the required information'}
            {step === 5 && 'Preview your document and download as PDF'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <CountrySelector
              selected={country}
              onSelect={(c) => {
                setCountry(c);
                handleNext();
              }}
            />
          )}

          {step === 2 && country && (
            <DocumentTypeSelector
              selected={documentType}
              onSelect={(t) => {
                setDocumentType(t);
                handleNext();
              }}
            />
          )}

          {step === 3 && country && documentType && (
            <IndustrySelector
              selected={industry}
              onSelect={(i) => {
                setIndustry(i);
                handleNext();
              }}
            />
          )}

          {step === 4 && country && documentType && industry && (
            <DynamicDocumentForm
              country={country}
              documentType={documentType}
              industry={industry}
              onComplete={(values) => {
                setFieldValues(values);
                handleNext();
              }}
            />
          )}

          {step === 5 && (
            <DocumentPreview
              country={country!}
              documentType={documentType!}
              industry={industry!}
              fieldValues={fieldValues}
              user={user}
            />
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className="ml-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
