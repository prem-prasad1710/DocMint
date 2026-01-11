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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">← Dashboard</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">📄 Generate Document</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentGeneratorFlow user={session.user} />
      </main>
    </div>
  );
}
