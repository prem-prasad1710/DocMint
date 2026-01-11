export function FeaturesSection() {
  const features = [
    { 
      icon: '🤖', 
      title: 'AI-Powered Generation', 
      description: 'Intelligent document generation with smart suggestions and auto-completion',
      gradient: 'from-purple-400 to-pink-500'
    },
    { 
      icon: '⚡', 
      title: 'Lightning Fast', 
      description: 'Generate professional documents in 30 seconds with AI assistance',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      icon: '🌍', 
      title: 'Multi-Country Support', 
      description: 'Templates for US, India, and more with local compliance requirements',
      gradient: 'from-green-400 to-blue-500'
    },
    { 
      icon: '💼', 
      title: 'Industry-Specific', 
      description: 'Specialized templates for tech, healthcare, finance, education, and more',
      gradient: 'from-blue-400 to-indigo-500'
    },
    { 
      icon: '📊', 
      title: 'Advanced Analytics', 
      description: 'Track document usage, generate insights, and optimize your workflow',
      gradient: 'from-indigo-400 to-purple-500'
    },
    { 
      icon: '🔗', 
      title: 'Easy Sharing', 
      description: 'Share documents securely with clients and collaborators',
      gradient: 'from-teal-400 to-cyan-500'
    },
    { 
      icon: '📝', 
      title: 'Version History', 
      description: 'Track changes and maintain document versions with full history',
      gradient: 'from-pink-400 to-rose-500'
    },
    { 
      icon: '🎨', 
      title: 'Custom Branding', 
      description: 'Add your logo and customize document appearance (Pro)',
      gradient: 'from-orange-400 to-red-500'
    },
    { 
      icon: '🔐', 
      title: 'Enterprise Security', 
      description: 'Bank-level encryption and compliance with GDPR, SOC 2',
      gradient: 'from-red-400 to-pink-500'
    },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
              Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered document generation platform trusted by thousands of businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
