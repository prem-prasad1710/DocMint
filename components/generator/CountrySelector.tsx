'use client';

export function CountrySelector({ selected, onSelect }: { selected: string | null; onSelect: (country: string) => void }) {
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'India', name: 'India', flag: '🇮🇳' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {countries.map((country) => (
        <button
          key={country.code}
          onClick={() => onSelect(country.code)}
          className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
            selected === country.code
              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:shadow-md hover:scale-102'
          }`}
        >
          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{country.flag}</div>
          <div className="font-bold text-xl text-gray-900">{country.name}</div>
          {selected === country.code && (
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
              ✓
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
