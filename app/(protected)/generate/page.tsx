import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import { getUserById } from '@/lib/db/queries';
import { DocumentGeneratorFlow } from '@/components/generator/DocumentGeneratorFlow';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: 'Generate Document | DocMint',
  description: 'Generate professional legal documents',
};

export default async function GeneratePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // Fetch user from database to get latest disclaimer status
  const dbUser = await getUserById(session.user.id);
  
  if (!dbUser) {
    redirect('/login');
  }

  // Redirect to dashboard if disclaimer not accepted
  if (!dbUser.disclaimerAccepted) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl shadow-md">
                📄
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Generate Document
              </h1>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentGeneratorFlow user={session.user} />
      </main>
    </div>
  );
}
