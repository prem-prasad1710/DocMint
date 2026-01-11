'use client';

export function IndustrySelector({ selected, onSelect }: { selected: string | null; onSelect: (industry: string) => void }) {
  const industries = [
    { value: 'tech', label: 'Technology', icon: '💻' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'consulting', label: 'Consulting', icon: '💼' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {industries.map((industry) => (
        <button
          key={industry.value}
          onClick={() => onSelect(industry.value)}
          className={`p-6 rounded-xl border-2 text-center transition-all ${
            selected === industry.value
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="text-4xl mb-2">{industry.icon}</div>
          <div className="font-semibold text-gray-900">{industry.label}</div>
        </button>
      ))}
    </div>
  );
}
