export function CountriesSection() {
  const countries = [
    {
      flag: '🇺🇸',
      name: 'United States',
      documents: ['Service Contracts', 'NDAs', 'Invoices'],
      compliance: ['Quarterly Tax Filing', '1099 Forms', 'Schedule C'],
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      flag: '🇮🇳',
      name: 'India',
      documents: ['Service Contracts (GST)', 'NDAs', 'Tax Invoices'],
      compliance: ['GST Filing', 'ITR Filing', 'Advance Tax'],
      gradient: 'from-orange-500 to-green-600'
    },
  ];

  return (
    <section id="countries" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
              Global Coverage
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Country-Specific Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Currently supporting US and India, with more countries coming soon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {countries.map((country, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${country.gradient} flex items-center justify-center text-4xl shadow-lg`}>
                  {country.flag}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{country.name}</h3>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Available Documents
                  </h4>
                </div>
                <ul className="space-y-3">
                  {country.documents.map((doc, docIndex) => (
                    <li key={docIndex} className="flex items-center gap-3 text-gray-700">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Compliance Checklists
                  </h4>
                </div>
                <ul className="space-y-3">
                  {country.compliance.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-gray-700">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            🌍 More countries coming soon: UK, Canada, Australia, and more!
          </p>
        </div>
      </div>
    </section>
  );
}
