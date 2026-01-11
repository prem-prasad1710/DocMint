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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">📋 Compliance Checklist</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3"
            >
              <option value="US">🇺🇸 United States</option>
              <option value="India">🇮🇳 India</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3"
            >
              <option value="tech">💻 Technology</option>
              <option value="creative">🎨 Creative</option>
              <option value="consulting">💼 Consulting</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading checklist...</div>
        ) : checklist ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{checklist.name}</CardTitle>
                <CardDescription>{checklist.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklist.items?.map((item: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
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
