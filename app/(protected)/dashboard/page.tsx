import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import { getUserById, getUserDocuments } from '@/lib/db/queries';
import { DisclaimerModal } from '@/components/auth/DisclaimerModal';
import { SavedDocumentsList } from '@/components/dashboard/SavedDocumentsList';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { CostSavingsCalculator } from '@/components/analytics/CostSavingsCalculator';
import { AdvancedAnalyticsDashboard } from '@/components/analytics/AdvancedAnalyticsDashboard';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | DocMint',
  description: 'Your legal documents dashboard',
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // Fetch user from database to get latest disclaimer status
  const dbUser = await getUserById(session.user.id);
  
  if (!dbUser) {
    redirect('/login');
  }

  // Use database user data for disclaimer check, but session data for display
  const user = {
    ...session.user,
    disclaimerAccepted: dbUser.disclaimerAccepted, // Use fresh data from DB
  };

  // Fetch user documents for analytics
  const allDocuments = await getUserDocuments(user.id, false);
  const savedDocuments = allDocuments.filter(doc => doc.isSaved);
  const documentsThisMonth = allDocuments.filter(doc => {
    const docDate = new Date(doc.createdAt);
    const now = new Date();
    return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
  });

  return (
    <>
      <DisclaimerModal isOpen={!user.disclaimerAccepted} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="glass-navbar bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <span className="text-2xl">⚖️</span>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    DocMint
                  </h1>
                </Link>
                {user.subscriptionTier === 'pro' && (
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-md">
                    PRO
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <kbd className="hidden md:inline-block px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                  ⌘K
                </kbd>
                <DarkModeToggle />
                <form action="/api/auth/signout" method="POST">
                  <Button type="submit" variant="ghost" size="sm">
                    Sign Out
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {user.name?.split(' ')[0]}! 👋
                </h2>
                <p className="text-blue-100 text-lg">
                  Ready to generate some legal documents?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-5xl animate-pulse">📄</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl mb-3 shadow-md">
                  📄
                </div>
                <CardTitle className="text-lg">Generate Document</CardTitle>
                <CardDescription>Create contracts, NDAs, and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/generate">
                  <Button fullWidth className="shadow-md">
                    Start Generating
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-2xl mb-3 shadow-md">
                  📋
                </div>
                <CardTitle className="text-lg">Compliance Checklist</CardTitle>
                <CardDescription>View tax and legal requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/checklist">
                  <Button fullWidth variant="outline">
                    View Checklist
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl mb-3 shadow-md">
                  {user.subscriptionTier === 'pro' ? '⭐' : '🚀'}
                </div>
                <CardTitle className="text-lg">
                  {user.subscriptionTier === 'pro' ? 'Pro Account' : 'Upgrade to Pro'}
                </CardTitle>
                <CardDescription>
                  {user.subscriptionTier === 'pro' 
                    ? 'Manage your subscription' 
                    : 'Unlock unlimited documents'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.subscriptionTier === 'pro' ? (
                  <Link href="/billing">
                    <Button fullWidth variant="outline">
                      Manage Billing
                    </Button>
                  </Link>
                ) : (
                  <Link href="/billing">
                    <Button fullWidth variant="success" className="shadow-md">
                      Upgrade Now
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cost Savings Calculator */}
          <div className="mb-8">
            <CostSavingsCalculator 
              documentsGenerated={allDocuments.length}
              documentsSaved={savedDocuments.length}
            />
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <AnalyticsCard
              title="Total Documents"
              value={allDocuments.length}
              description="All time generated"
              icon="📄"
              trend={{ value: 12, isPositive: true }}
            />
            <AnalyticsCard
              title="Saved Documents"
              value={savedDocuments.length}
              description={`${user.subscriptionTier === 'pro' ? 'Unlimited' : `${savedDocuments.length}/5`} saved`}
              icon="💾"
            />
            <AnalyticsCard
              title="This Month"
              value={documentsThisMonth.length}
              description="Generated this month"
              icon="📅"
              trend={{ value: 8, isPositive: true }}
            />
            <AnalyticsCard
              title="Usage Limit"
              value={user.subscriptionTier === 'pro' ? 'Unlimited' : `${dbUser.usage.documentsGenerated}/100`}
              description={user.subscriptionTier === 'pro' ? 'Pro account' : 'Monthly limit'}
              icon={user.subscriptionTier === 'pro' ? '⭐' : '📊'}
            />
          </div>

          {/* Advanced Analytics Dashboard */}
          <div className="mb-8">
            <AdvancedAnalyticsDashboard documents={allDocuments} />
          </div>

          {/* Saved Documents Section */}
          <Card className="shadow-xl border-0">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <CardTitle>Saved Documents</CardTitle>
                  <CardDescription>Access and manage your generated legal documents</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <SavedDocumentsList userId={user.id} />
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
