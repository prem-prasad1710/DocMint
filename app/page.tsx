import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CountriesSection } from '@/components/landing/CountriesSection';
import { PricingSection } from '@/components/landing/PricingSection';

export const metadata = {
  title: 'DocMint | AI-Powered Legal Document Generation Platform',
  description: 'Generate professional legal documents, contracts, invoices, and compliance checklists with AI-powered assistance. Trusted by thousands of businesses worldwide.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <FeaturesSection />
        <div id="countries">
          <CountriesSection />
        </div>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
