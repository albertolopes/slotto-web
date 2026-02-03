import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { companies as companiesApi, ads as adsApi } from '../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { intersperseAds } from '../../lib/utils';
import { AdCard } from '../ads/AdCard';

interface CompanyListProps {
  categoryId: string;
  categoryName: string;
}

export function CompanyList({ categoryId, categoryName }: CompanyListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevancia');
  const [companies, setCompanies] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      companiesApi.listCompanies(`category=${categoryId}`),
      adsApi.getAds('company-list'), // Pass placement
    ]).then(([companiesData, adsData]) => {
      setCompanies(companiesData || []);
      setAds(adsData || []);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load page data", err);
      setError('Erro ao carregar estabelecimentos.');
      setLoading(false);
    });
  }, [categoryId]);

  const itemsToDisplay = companies.length > 0 
    ? intersperseAds(companies, ads, 3)
    : ads.map(ad => ({ type: 'ad', data: ad }));

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <BackButton onClick={() => router.back()} />
            <h1 className="font-bold text-xl flex-1 truncate">{categoryName}</h1>
          </div>
          <div className="relative mb-3">
            <input
              type="text"
              className="w-full border border-neutral-300 rounded-lg p-3 pl-10 bg-neutral-50 focus:bg-white focus:border-neutral-800 transition-colors outline-none"
              placeholder="Buscar estabelecimento..."
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              🔍
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 h-10 border rounded-lg font-medium flex items-center justify-center gap-2 text-sm transition-colors ${
                showFilters 
                  ? 'bg-neutral-800 text-white border-neutral-800' 
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span>⚙</span>
              <span>Filtros</span>
            </button>
            <div className="flex-1 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 appearance-none border border-neutral-300 rounded-lg bg-white font-medium px-4 text-sm text-neutral-700 focus:border-neutral-800 outline-none"
              >
                <option value="relevancia">Relevância</option>
                <option value="distancia">Distância</option>
                <option value="avaliacao">Avaliação</option>
                <option value="preco">Preço</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-neutral-500">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4">
        {loading ? (
          <div className="space-y-3 pt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-3 h-28 animate-pulse border border-neutral-200"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-4">
            {itemsToDisplay.map((item, index) => {
              if (item.type === 'ad') {
                return <AdCard key={`ad-${item.data.id}-${index}`} ad={item.data} fullWidth={true} />;
              }
              const company = item.data;
              const imageUrl = company.logoUrl;
              
              return (
                <Link href={`/companies/${company.slug}`} key={company.id} legacyBehavior>
                  <a className="group bg-white border border-neutral-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all text-left flex gap-3 items-start">
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-neutral-100 overflow-hidden relative">
                      {imageUrl ? (
                        <img src={imageUrl} alt={company.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs font-bold">LOGO</div>
                      )}
                      <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                        <span className="text-yellow-500">★</span>
                        <span>{company.rating ?? '4.8'}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="font-bold text-neutral-900 leading-tight mb-1 truncate">{company.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                          <span className="truncate">{company.address?.street || 'Centro'}</span>
                          <span>•</span>
                          <span>{company.distance ?? '1.2km'}</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between mt-1">
                        <div className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">
                          {company.priceRange ?? '$$'}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
            
            {itemsToDisplay.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
                <div className="text-4xl mb-2">😕</div>
                <p>Nenhum local encontrado.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
