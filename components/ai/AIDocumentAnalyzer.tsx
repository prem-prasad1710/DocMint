'use client';

import { useState } from 'react';

interface AnalysisResult {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  issues: {
    severity: 'low' | 'medium' | 'high';
    category: string;
    description: string;
    suggestion: string;
    location: string;
  }[];
  suggestions: string[];
  complianceScore: number;
  readabilityScore: number;
}

interface AIDocumentAnalyzerProps {
  documentContent: string;
  documentType: string;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

/**
 * AI Document Analyzer Component
 * 
 * IMPLEMENTATION GUIDE:
 * 
 * This component provides AI-powered document analysis including:
 * - Risk detection
 * - Compliance checking
 * - Readability analysis
 * - Smart suggestions
 * 
 * To implement the AI backend:
 * 
 * 1. Choose an AI Provider:
 *    - OpenAI GPT-4 (Recommended)
 *    - Anthropic Claude
 *    - Google PaLM
 * 
 * 2. Create API Route: /api/ai/analyze
 * 
 * 3. Example Implementation (OpenAI):
 * 
 * ```typescript
 * // app/api/ai/analyze/route.ts
 * import OpenAI from 'openai';
 * 
 * const openai = new OpenAI({
 *   apiKey: process.env.OPENAI_API_KEY,
 * });
 * 
 * export async function POST(request: Request) {
 *   const { content, documentType } = await request.json();
 *   
 *   const prompt = `Analyze this ${documentType} for:
 *   1. Legal risks and issues
 *   2. Missing critical clauses
 *   3. Compliance problems
 *   4. Readability issues
 *   
 *   Document: ${content}
 *   
 *   Return JSON: { riskLevel, issues[], suggestions[], scores }`;
 *   
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [{ role: "user", content: prompt }],
 *     response_format: { type: "json_object" }
 *   });
 *   
 *   return Response.json(JSON.parse(response.choices[0].message.content));
 * }
 * ```
 * 
 * 4. Environment Variables:
 *    Add to .env.local:
 *    OPENAI_API_KEY=your_api_key_here
 * 
 * 5. Cost Estimate:
 *    - GPT-4: ~$0.03-0.06 per document
 *    - Claude: ~$0.015-0.03 per document
 *    - Consider caching results
 */

export function AIDocumentAnalyzer({ documentContent, documentType, onAnalysisComplete }: AIDocumentAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeDocument = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Call the AI API endpoint (to be implemented)
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: documentContent,
          documentType,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysisResult = await response.json();
      setResult(analysisResult);
      onAnalysisComplete?.(analysisResult);
    } catch (err) {
      setError('Failed to analyze document. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Analyze Button */}
      {!result && (
        <div className="text-center">
          <button
            onClick={analyzeDocument}
            disabled={isAnalyzing}
            className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Document...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🤖</span>
                Analyze with AI
              </span>
            )}
          </button>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            AI will check for risks, compliance issues, and provide suggestions
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Overall Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${getRiskColor(result.riskLevel)}`}>
              <p className="text-sm font-medium opacity-80">Risk Level</p>
              <p className="text-2xl font-bold capitalize mt-1">{result.riskLevel}</p>
              <p className="text-sm opacity-70 mt-1">Score: {result.riskScore}/100</p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Compliance</p>
              <p className={`text-2xl font-bold mt-1 ${getScoreColor(result.complianceScore)}`}>
                {result.complianceScore}%
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 opacity-70 mt-1">Regulatory compliance</p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Readability</p>
              <p className={`text-2xl font-bold mt-1 ${getScoreColor(result.readabilityScore)}`}>
                {result.readabilityScore}%
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 opacity-70 mt-1">Ease of understanding</p>
            </div>
          </div>

          {/* Issues Found */}
          {result.issues.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span>⚠️</span>
                Issues Found ({result.issues.length})
              </h3>
              <div className="space-y-4">
                {result.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      issue.severity === 'high'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : issue.severity === 'medium'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{issue.location}</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{issue.category}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{issue.description}</p>
                    <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">💡 Suggestion:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{issue.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span>✨</span>
                AI Recommendations
              </h3>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reanalyze Button */}
          <div className="text-center">
            <button
              onClick={() => setResult(null)}
              className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              Run Analysis Again
            </button>
          </div>
        </div>
      )}

      {/* Implementation Notice */}
      {!result && !isAnalyzing && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Developer Note:</strong> AI analysis requires OpenAI API integration. 
            See component source code for implementation guide.
          </p>
        </div>
      )}
    </div>
  );
}
