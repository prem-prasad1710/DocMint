'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface Document {
  _id: string;
  documentType: string;
  createdAt: Date;
  isSaved: boolean;
}

interface AdvancedAnalyticsDashboardProps {
  documents: Document[];
}

export function AdvancedAnalyticsDashboard({ documents }: AdvancedAnalyticsDashboardProps) {
  // Calculate analytics
  const analytics = useMemo(() => {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Document type breakdown
    const typeBreakdown = documents.reduce((acc, doc) => {
      acc[doc.documentType] = (acc[doc.documentType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity
    const last30DaysDocs = documents.filter(d => new Date(d.createdAt) >= last30Days);
    const last7DaysDocs = documents.filter(d => new Date(d.createdAt) >= last7Days);

    // Growth rate
    const previousPeriod = documents.filter(d => {
      const date = new Date(d.createdAt);
      return date >= new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000) && date < last30Days;
    });
    const growthRate = previousPeriod.length > 0 
      ? ((last30DaysDocs.length - previousPeriod.length) / previousPeriod.length) * 100 
      : 100;

    // Daily activity (last 7 days)
    const dailyActivity = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const count = documents.filter(d => {
        const docDate = new Date(d.createdAt);
        return docDate >= date && docDate < nextDay;
      }).length;

      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count,
      };
    });

    // Most popular document type
    const mostPopular = Object.entries(typeBreakdown).sort((a, b) => b[1] - a[1])[0];

    // Average documents per week
    const weeksSinceFirst = documents.length > 0 
      ? Math.max(1, Math.floor((now.getTime() - new Date(documents[0].createdAt).getTime()) / (7 * 24 * 60 * 60 * 1000)))
      : 1;
    const avgPerWeek = (documents.length / weeksSinceFirst).toFixed(1);

    return {
      typeBreakdown,
      last30DaysDocs: last30DaysDocs.length,
      last7DaysDocs: last7DaysDocs.length,
      growthRate: growthRate.toFixed(1),
      dailyActivity,
      mostPopular,
      avgPerWeek,
    };
  }, [documents]);

  const getDocumentIcon = (type: string) => {
    const icons: Record<string, string> = {
      contract: '📄',
      nda: '🔒',
      invoice: '💰',
      proposal: '📋',
      quotation: '💵',
    };
    return icons[type] || '📄';
  };

  const maxDailyCount = Math.max(...analytics.dailyActivity.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Trends Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Last 30 Days</CardDescription>
            <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {analytics.last30DaysDocs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${parseFloat(analytics.growthRate) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {parseFloat(analytics.growthRate) >= 0 ? '↗' : '↘'} {Math.abs(parseFloat(analytics.growthRate))}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Last 7 Days</CardDescription>
            <CardTitle className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {analytics.last7DaysDocs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {analytics.avgPerWeek} avg/week
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Most Popular</CardDescription>
            <CardTitle className="text-2xl font-bold text-orange-600 dark:text-orange-400 capitalize flex items-center gap-2">
              <span className="text-3xl">{analytics.mostPopular ? getDocumentIcon(analytics.mostPopular[0]) : '📄'}</span>
              {analytics.mostPopular?.[0] || 'None'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {analytics.mostPopular?.[1] || 0} documents
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span>
            Activity Trend
          </CardTitle>
          <CardDescription>Documents generated over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.dailyActivity.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-12">{day.day}</span>
                  <span className="text-gray-500 dark:text-gray-400 w-12 text-right">{day.count}</span>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(day.count / maxDailyCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Type Breakdown */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📑</span>
            Document Type Distribution
          </CardTitle>
          <CardDescription>Breakdown of documents by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analytics.typeBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => {
                const percentage = ((count / documents.length) * 100).toFixed(1);
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 capitalize">
                        <span className="text-xl">{getDocumentIcon(type)}</span>
                        {type}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="glass-card border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💡</span>
            Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {parseFloat(analytics.growthRate) > 20 && (
            <div className="flex items-start gap-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">Great momentum!</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your document generation is up {analytics.growthRate}% this month
                </p>
              </div>
            </div>
          )}
          
          {analytics.last7DaysDocs === 0 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-yellow-900 dark:text-yellow-100">No recent activity</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Generate some documents to start tracking your progress
                </p>
              </div>
            </div>
          )}

          {documents.length >= 50 && (
            <div className="flex items-start gap-3 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100">Milestone reached!</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You've generated {documents.length} documents. Consider organizing them with tags and folders.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
