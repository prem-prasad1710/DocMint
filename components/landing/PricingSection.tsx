'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out the service',
      features: ['Generate unlimited documents', 'Save up to 5 documents', 'Basic compliance checklist', 'Watermarked PDFs'],
      cta: 'Start Free',
      ctaLink: '/signup',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For serious freelancers',
      features: ['Everything in Free', 'Save unlimited documents', 'No PDF watermarks', 'Priority support'],
      cta: 'Start Pro Trial',
      ctaLink: '/signup',
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold">
              Pricing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative ${plan.popular ? 'lg:scale-105 z-10' : ''}`}
            >
              <Card className={`h-full ${plan.popular ? 'border-2 border-blue-500 shadow-2xl' : 'shadow-lg'} hover:shadow-2xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pt-10 pb-8">
                  <CardTitle className="text-3xl font-bold mb-3">{plan.name}</CardTitle>
                  <CardDescription className="text-base mb-6">{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className={`text-6xl font-bold ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-lg">/ {plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.popular ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-green-100'}`}>
                          <svg className={`w-4 h-4 ${plan.popular ? 'text-white' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.ctaLink}>
                    <Button 
                      fullWidth 
                      size="lg" 
                      variant={plan.popular ? 'default' : 'outline'}
                      className={`${plan.popular ? 'shadow-lg hover:shadow-xl' : ''}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            All plans include secure data encryption, regular updates, and access to our growing library of legal templates.
          </p>
        </div>
      </div>
    </section>
  );
}
