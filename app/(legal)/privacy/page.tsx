import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | DocMint',
  description: 'Privacy Policy for DocMint',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This Privacy Policy describes how DocMint collects, uses, and protects your information.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect information you provide directly to us, such as when you create an account, generate documents,
            or contact us for support.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to provide, maintain, and improve our services, process transactions,
            and communicate with you.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
