import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import * as categoriesApi from '../../services/api/categories';

interface ServiceCategorySearchProps {
  onSelectCategory: (category: { id: string; name: string }) => void;
}

export function ServiceCategorySearch({ onSelectCategory }: ServiceCategorySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    categoriesApi.listCategories()
      .then((data) => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load categories', err);
        setLoading(false);
      });
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">O que você procura?</h1>
            <p className="text-sm text-neutral-500 mt-1">Encontre o serviço ideal para você</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
            👤
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
            placeholder="Buscar serviço, barbearia..."
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!searchTerm && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-neutral-900">Categorias</h2>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-neutral-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory({ id: category.id, name: category.name })}
                className="group relative bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all duration-200 flex flex-col items-center justify-center text-center h-36 active:scale-95"
              >
                <div className="w-12 h-12 mb-3 rounded-full bg-neutral-50 flex items-center justify-center text-2xl group-hover:bg-neutral-100 group-hover:scale-110 transition-all duration-300">
                  {category.icon}
                </div>
                <div className="font-bold text-neutral-900 mb-1 group-hover:text-black">{category.name}</div>
                <div className="text-xs font-medium text-neutral-400 group-hover:text-neutral-500">
                  {category.companyCount !== undefined ? `${category.companyCount} locais` : 'Vários locais'}
                </div>
              </button>
            ))}
            
            {filteredCategories.length === 0 && !loading && (
              <div className="col-span-2 py-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-neutral-900 font-medium">Nenhum resultado encontrado</p>
                <p className="text-sm text-neutral-500 mt-1">Tente buscar por outro termo</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
