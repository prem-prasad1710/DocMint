'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface CostSavingsCalculatorProps {
  documentsGenerated: number;
  documentsSaved: number;
}

export function CostSavingsCalculator({ documentsGenerated, documentsSaved }: CostSavingsCalculatorProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Average lawyer costs per document type
  const costs = {
    contract: 1500,
    nda: 500,
    invoice: 150,
    proposal: 800,
    quotation: 400,
    average: 600, // Average across all types
  };

  // Calculate total savings
  const avgLawyerCost = costs.average;
  const totalSaved = documentsGenerated * avgLawyerCost;
  const hoursSaved = Math.floor(documentsGenerated * 3); // Average 3 hours per document
  const timeSavedDays = Math.floor(hoursSaved / 8);
  
  // Our platform cost (assuming $49/month pro, or free tier)
  const monthlySubscription = 49;
  const estimatedMonths = Math.max(1, Math.ceil(documentsGenerated / 10)); // Assuming ~10 docs/month
  const platformCost = estimatedMonths * monthlySubscription;
  const netSavings = totalSaved - platformCost;
  const roi = ((netSavings / platformCost) * 100).toFixed(0);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [documentsGenerated]);

  return (
    <Card className="glass-card border-0 shadow-xl overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-animated opacity-10" />
      
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">💰 Cost Savings</CardTitle>
            <CardDescription>See how much you've saved using DocMint</CardDescription>
          </div>
          <div className="text-4xl animate-float">📊</div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 relative z-10">
        {/* Main Savings Display */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 mb-6 text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Estimated Savings</p>
          <div className={`text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent ${isAnimating ? 'animate-scale-in' : ''}`}>
            ${totalSaved.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            vs. hiring lawyers for {documentsGenerated} document{documentsGenerated !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Documents */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📄</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Documents</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {documentsGenerated}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {documentsSaved} saved permanently
            </p>
          </div>

          {/* Time Saved */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Saved</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {hoursSaved} hrs
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ≈ {timeSavedDays} working days
            </p>
          </div>

          {/* ROI */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📈</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">ROI</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {roi}%
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Return on investment
            </p>
          </div>

          {/* Net Savings */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💵</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Savings</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${netSavings.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              After platform costs
            </p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <span>📊</span>
            Cost Comparison
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Lawyer Costs (Est.)</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">${totalSaved.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">DocMint Subscription</span>
              <span className="font-semibold text-green-600 dark:text-green-400">-${platformCost.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Your Savings</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">${netSavings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Average Costs */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <span>💡</span>
            Typical Lawyer Costs
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Contract:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">${costs.contract}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">NDA:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">${costs.nda}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Invoice:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">${costs.invoice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Proposal:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">${costs.proposal}</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {documentsGenerated < 5 && (
          <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
            <p className="font-semibold mb-1">Generate more documents to maximize your savings! 🚀</p>
            <p className="text-sm opacity-90">
              Every document saves you ${avgLawyerCost} on average
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
