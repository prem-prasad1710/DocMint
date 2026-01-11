import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HowItWorks() {
  const steps = [
    { 
      number: '01', 
      icon: '🎯', 
      title: 'Choose Your Document', 
      description: 'Select country, document type, and industry',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      number: '02', 
      icon: '✍️', 
      title: 'Fill Simple Form', 
      description: 'Answer a few questions about your project',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      number: '03', 
      icon: '⬇️', 
      title: 'Download & Use', 
      description: 'Get your professional PDF instantly',
      color: 'from-green-500 to-teal-500'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate professional legal documents in minutes, not hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/3 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-10"></div>
              )}
              
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                {step.number}
              </div>
              <div className="text-6xl mb-6">{step.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/signup">
            <Button size="lg" className="shadow-lg hover:shadow-xl">
              Start Now - It's Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">No credit card required • Free forever plan available</p>
        </div>
      </div>
    </section>
  );
}
