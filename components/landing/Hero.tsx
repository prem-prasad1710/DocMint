import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold mb-6 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-lg">⚖️</span>
            <span>Legal Documents Made Simple</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            <span className="text-gray-900 block">AI-Powered</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block my-2">
              Legal Documents
            </span>
            <span className="text-gray-800 block">in Seconds</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Generate professional contracts, invoices, NDAs, and compliance documents with{' '}
            <span className="font-bold text-blue-600">AI-powered intelligence</span>.
            <br />
            <span className="text-base text-gray-500 mt-3 block">Trusted by thousands of businesses worldwide. No legal jargon. No expensive lawyers.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/signup">
              <Button size="lg" className="group shadow-xl hover:shadow-2xl text-base sm:text-lg px-8 py-4 h-14">
                Start Free →
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl text-base sm:text-lg px-8 py-4 h-14 border-2">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-gray-800">No Credit Card</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-gray-800">Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-gray-800">Cancel Anytime</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">15+</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Document Types</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Active Users</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">50K+</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Documents Generated</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">30s</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">Avg. Generation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
