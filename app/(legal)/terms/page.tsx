import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service | DocMint',
  description: 'Terms of Service for DocMint',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Please read these Terms of Service carefully before using DocMint.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using this service, you accept and agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Service Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DocMint provides AI-powered template legal documents and compliance checklists for informational purposes only.
            These templates are NOT a substitute for professional legal advice.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The information provided by DocMint is for general informational purposes only. We are not a law firm
            and do not provide legal advice. Always consult with a qualified attorney for your specific legal needs.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
