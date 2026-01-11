'use client';

export function CountrySelector({ selected, onSelect }: { selected: string | null; onSelect: (country: string) => void }) {
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'India', name: 'India', flag: '🇮🇳' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {countries.map((country) => (
        <button
          key={country.code}
          onClick={() => onSelect(country.code)}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            selected === country.code
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="text-4xl mb-2">{country.flag}</div>
          <div className="font-semibold text-gray-900">{country.name}</div>
        </button>
      ))}
    </div>
  );
}
