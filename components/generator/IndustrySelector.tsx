'use client';

export function IndustrySelector({ selected, onSelect }: { selected: string | null; onSelect: (industry: string) => void }) {
  const industries = [
    { value: 'tech', label: 'Technology', icon: '💻' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'consulting', label: 'Consulting', icon: '💼' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {industries.map((industry) => (
        <button
          key={industry.value}
          onClick={() => onSelect(industry.value)}
          className={`group relative p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
            selected === industry.value
              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:shadow-md hover:scale-102'
          }`}
        >
          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{industry.icon}</div>
          <div className="font-bold text-lg text-gray-900">{industry.label}</div>
          {selected === industry.value && (
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
              ✓
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
