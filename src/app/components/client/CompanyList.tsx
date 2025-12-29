import { useState } from 'react';
import { BackButton } from '../ui/BackButton';

interface CompanyListProps {
  category: string;
  onSelectCompany: (companyId: string) => void;
  onBack: () => void;
}

export function CompanyList({ category, onSelectCompany, onBack }: CompanyListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevancia');

  const companies = [
    {
      id: '1',
      name: 'Salão Beleza Total',
      category: 'Salão de Beleza',
      rating: '4.8',
      reviewCount: 127,
      distance: '0.5 km',
      nextAvailable: 'Hoje às 14:00',
      priceRange: 'R$ 40-150',
    },
    {
      id: '2',
      name: 'Barbearia Moderna',
      category: 'Barbearia',
      rating: '4.9',
      reviewCount: 89,
      distance: '1.2 km',
      nextAvailable: 'Amanhã às 09:00',
      priceRange: 'R$ 30-80',
    },
    {
      id: '3',
      name: 'Espaço da Beleza',
      category: 'Salão de Beleza',
      rating: '4.7',
      reviewCount: 203,
      distance: '2.1 km',
      nextAvailable: 'Hoje às 16:30',
      priceRange: 'R$ 50-200',
    },
    {
      id: '4',
      name: 'Studio Hair',
      category: 'Salão de Beleza',
      rating: '4.6',
      reviewCount: 54,
      distance: '0.8 km',
      nextAvailable: 'Hoje às 15:00',
      priceRange: 'R$ 45-120',
    },
    {
      id: '5',
      name: 'Requinte Salão',
      category: 'Salão de Beleza',
      rating: '4.9',
      reviewCount: 156,
      distance: '3.5 km',
      nextAvailable: 'Segunda às 10:00',
      priceRange: 'R$ 60-250',
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <BackButton onClick={onBack} />
            <h1 className="font-bold flex-1">{category}</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <input
              type="text"
              className="w-full border-2 border-neutral-800 p-3 bg-white pr-10"
              placeholder="Buscar estabelecimento..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-neutral-800 flex items-center justify-center">
              🔍
            </div>
          </div>

          {/* Filter & Sort */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 h-10 border-2 border-neutral-800 bg-white font-bold flex items-center justify-center gap-2"
            >
              <span>⚙</span>
              <span>Filtros</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 h-10 border-2 border-neutral-800 bg-white font-bold px-2"
            >
              <option value="relevancia">Relevância</option>
              <option value="distancia">Distância</option>
              <option value="avaliacao">Avaliação</option>
              <option value="preco">Preço</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t-2 border-neutral-800 p-4 bg-neutral-50 md:hidden">
            <div className="space-y-3">
              <div>
                <div className="font-bold mb-2 text-sm">Distância</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border-2 border-neutral-800 bg-neutral-800 text-white text-sm">
                    Até 2km
                  </button>
                  <button className="px-3 py-1 border-2 border-neutral-800 bg-white text-sm">Até 5km</button>
                  <button className="px-3 py-1 border-2 border-neutral-800 bg-white text-sm">Até 10km</button>
                </div>
              </div>

              <div>
                <div className="font-bold mb-2 text-sm">Disponibilidade</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutral-800 bg-neutral-800"></div>
                    <span className="text-sm">Disponível hoje</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutral-800"></div>
                    <span className="text-sm">Disponível esta semana</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="font-bold mb-2 text-sm">Avaliação</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border-2 border-neutral-800 bg-white text-sm">4+</button>
                  <button className="px-3 py-1 border-2 border-neutral-800 bg-white text-sm">4.5+</button>
                  <button className="px-3 py-1 border-2 border-neutral-800 bg-white text-sm">4.8+</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="border-b-2 border-neutral-800 p-3 bg-neutral-100">
        <div className="text-sm text-neutral-600">{companies.length} estabelecimentos encontrados</div>
      </div>

      {/* Company List */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y-2 divide-neutral-300">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => onSelectCompany(company.id)}
              className="w-full p-4 text-left hover:bg-neutral-100 transition-colors md:flex md:items-center md:gap-4"
            >
              {/* Company Image Placeholder */}
              <div className="w-full h-32 border-2 border-neutral-800 bg-neutral-300 mb-3 flex items-center justify-center md:w-32 md:h-20 md:mb-0 md:flex-shrink-0">
                <span className="text-neutral-600">FOTO</span>
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{company.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <span>⭐</span>
                    <span className="font-bold">{company.rating}</span>
                    <span className="text-neutral-600">({company.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-neutral-600 mb-3">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{company.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>{company.priceRange}</span>
                  </div>
                </div>

                <div className="border-2 border-neutral-800 p-2 bg-neutral-100 text-sm">
                  <span className="font-bold">Próximo horário: </span>
                  <span>{company.nextAvailable}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
