import { useState } from 'react';

interface ServiceCategorySearchProps {
  onSelectCategory: (category: string) => void;
}

export function ServiceCategorySearch({ onSelectCategory }: ServiceCategorySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'Salão de Beleza', icon: '✂', count: 45 },
    { name: 'Barbearia', icon: '💈', count: 32 },
    { name: 'Estética', icon: '💆', count: 28 },
    { name: 'Manicure', icon: '💅', count: 38 },
    { name: 'Massagem', icon: '🧘', count: 21 },
    { name: 'Tatuagem', icon: '🎨', count: 15 },
    { name: 'Clínica Médica', icon: '🏥', count: 12 },
    { name: 'Odontologia', icon: '🦷', count: 18 },
    { name: 'Nutrição', icon: '🥗', count: 9 },
    { name: 'Fisioterapia', icon: '🤸', count: 14 },
    { name: 'Psicologia', icon: '🧠', count: 22 },
    { name: 'Academia', icon: '💪', count: 8 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="text-center mb-4">
          <h1 className="font-bold">O que você procura?</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-neutral-800 p-3 bg-white pr-10"
            placeholder="Buscar serviço..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-neutral-800 flex items-center justify-center">
            🔍
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <h2 className="font-bold mb-3">Categorias Populares</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory(category.name)}
              className="border-2 border-neutral-800 p-4 text-left hover:bg-neutral-200 transition-colors"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-bold text-sm mb-1">{category.name}</div>
              <div className="text-xs text-neutral-600">{category.count} locais</div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t-2 border-neutral-800 p-4">
        <div className="grid grid-cols-2 gap-2">
          <button className="h-12 border-2 border-neutral-800 bg-white flex items-center justify-center">
            <span>🏠 Início</span>
          </button>
          <button className="h-12 border-2 border-neutral-800 bg-white flex items-center justify-center">
            <span>📅 Meus Agendamentos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
