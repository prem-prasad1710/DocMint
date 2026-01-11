'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function BillingPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const isPro = session?.user?.subscriptionTier === 'pro';

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', { method: 'POST' });
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to create checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', { method: 'POST' });
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to access portal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">💳 Billing & Subscription</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Your Plan:</p>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-lg font-bold ${
                    isPro ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isPro ? '⭐ Pro Plan' : '🆓 Free Plan'}
                  </span>
                </div>
              </div>

              {isPro ? (
                <div>
                  <p className="text-sm text-gray-600 mb-3">You have access to all Pro features</p>
                  <Button onClick={handleManageSubscription} loading={isLoading} variant="outline" fullWidth>
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Upgrade to Pro for unlimited documents</p>
                  <Button onClick={handleUpgrade} loading={isLoading} fullWidth size="lg">
                    Upgrade to Pro - $9/month
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Documents Generated</span>
                <span className="font-medium">{session?.user?.usage?.documentsGenerated || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Documents Saved</span>
                <span className="font-medium">
                  {session?.user?.usage?.documentsSaved || 0} {!isPro && '/ 5'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
