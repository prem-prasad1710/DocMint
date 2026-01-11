'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ChecklistPage() {
  const [country, setCountry] = useState('US');
  const [industry, setIndustry] = useState('tech');
  const [checklist, setChecklist] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChecklist = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/checklist/${country}?industry=${industry}`);
        if (response.ok) {
          const data = await response.json();
          setChecklist(data);
        }
      } catch (error) {
        console.error('Failed to fetch checklist');
      } finally {
        setIsLoading(false);
      }
    };
    fetchChecklist();
  }, [country, industry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-md">
                📋
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Compliance Checklist
              </h1>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium"
            >
              <option value="US">🇺🇸 United States</option>
              <option value="India">🇮🇳 India</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium"
            >
              <option value="tech">💻 Technology</option>
              <option value="creative">🎨 Creative</option>
              <option value="consulting">💼 Consulting</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading checklist...</p>
          </div>
        ) : checklist ? (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                <CardTitle className="text-2xl">{checklist.name}</CardTitle>
                <CardDescription className="text-base">{checklist.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <CardTitle>Compliance Checklist</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {checklist.items?.map((item: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all group">
                      <input 
                        type="checkbox" 
                        className="mt-1 h-5 w-5 rounded-md border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" 
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                        <span className="inline-block px-3 py-1 text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax & Filing Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklist.taxDeadlines?.map((deadline: any, index: number) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">{deadline.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{deadline.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span><strong>Due:</strong> {deadline.dueDate}</span>
                        <span><strong>Frequency:</strong> {deadline.frequency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No checklist available</div>
        )}
      </main>
    </div>
  );
}
