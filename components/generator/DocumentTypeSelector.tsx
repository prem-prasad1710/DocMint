'use client';

export function DocumentTypeSelector({ selected, onSelect }: { selected: string | null; onSelect: (type: string) => void }) {
  const types = [
    { value: 'contract', label: 'Service Contract', icon: '📄', description: 'Standard service agreements' },
    { value: 'nda', label: 'NDA', icon: '🔒', description: 'Non-disclosure agreement' },
    { value: 'invoice', label: 'Invoice', icon: '💰', description: 'Professional invoices' },
    { value: 'proposal', label: 'Project Proposal', icon: '📊', description: 'Business proposals' },
    { value: 'quotation', label: 'Quotation', icon: '💵', description: 'Price quotations' },
    { value: 'agreement', label: 'Partnership Agreement', icon: '🤝', description: 'Business partnerships' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => onSelect(type.value)}
          className={`group relative p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
            selected === type.value
              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:shadow-md hover:scale-102'
          }`}
        >
          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{type.icon}</div>
          <div className="font-bold text-lg text-gray-900 mb-2">{type.label}</div>
          <div className="text-sm text-gray-600">{type.description}</div>
          {selected === type.value && (
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
              ✓
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
