'use client';

export function DocumentTypeSelector({ selected, onSelect }: { selected: string | null; onSelect: (type: string) => void }) {
  const types = [
    { value: 'contract', label: 'Service Contract', icon: '📄' },
    { value: 'nda', label: 'NDA', icon: '🔒' },
    { value: 'invoice', label: 'Invoice', icon: '💰' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => onSelect(type.value)}
          className={`p-6 rounded-xl border-2 text-center transition-all ${
            selected === type.value
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="text-4xl mb-2">{type.icon}</div>
          <div className="font-semibold text-gray-900">{type.label}</div>
        </button>
      ))}
    </div>
  );
}
