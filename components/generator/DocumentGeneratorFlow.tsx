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
      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700">Step {step} of {totalSteps}</span>
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {Math.round((step / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out shadow-lg" 
            style={{ width: `${(step / totalSteps) * 100}%` }} 
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4 px-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s < step 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                  : s === step 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {s < step ? '✓' : s}
              </div>
              <div className={`text-xs mt-2 font-medium ${s === step ? 'text-blue-600' : 'text-gray-500'}`}>
                {s === 1 && 'Country'}
                {s === 2 && 'Type'}
                {s === 3 && 'Industry'}
                {s === 4 && 'Details'}
                {s === 5 && 'Review'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
              {step === 1 && '🌍'}
              {step === 2 && '📄'}
              {step === 3 && '💼'}
              {step === 4 && '✍️'}
              {step === 5 && '✅'}
            </div>
            <div>
              <CardTitle className="text-2xl">
                {step === 1 && 'Select Country'}
                {step === 2 && 'Select Document Type'}
                {step === 3 && 'Select Industry'}
                {step === 4 && 'Fill Document Details'}
                {step === 5 && 'Review & Download'}
              </CardTitle>
              <CardDescription className="text-base">
                {step === 1 && 'Choose the country for your legal document'}
                {step === 2 && 'What type of document do you need?'}
                {step === 3 && 'Select your industry'}
                {step === 4 && 'Provide the required information'}
                {step === 5 && 'Preview your document and download as PDF'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
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
