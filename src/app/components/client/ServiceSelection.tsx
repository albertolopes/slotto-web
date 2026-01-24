import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { companyServices as servicesApi } from '../../services/api';

interface ServiceSelectionProps {
  companyId?: string;
  onNext: (service: { id: string; name: string }) => void;
  onBack?: () => void;
}

export function ServiceSelection({ companyId, onNext, onBack }: ServiceSelectionProps) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (companyId) {
      setLoading(true);
      servicesApi.listCompanyServices(companyId)
        .then((data) => {
          setServices(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load services', err);
          setLoading(false);
        });
    }
  }, [companyId]);

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          {onBack && <BackButton onClick={onBack} />}
          <div className="flex-1">
            <h1 className="font-bold text-lg text-center">Selecione o Serviço</h1>
            <p className="text-sm text-neutral-500 text-center">Escolha um dos serviços abaixo</p>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-white rounded-lg border border-neutral-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => onNext({ id: service.id, name: service.name })}
                className="w-full bg-white border border-neutral-200 rounded-lg p-4 flex justify-between items-center text-left hover:bg-neutral-100/50 hover:border-neutral-300 transition-colors active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="font-bold text-neutral-900">{service.name}</div>
                  <div className="text-sm text-neutral-500">{service.durationMinutes} min</div>
                </div>
                <div className="font-bold text-lg text-neutral-900">R$ {service.price.toFixed(2)}</div>
              </button>
            ))}
            {services.length === 0 && !loading && (
              <div className="text-center py-12 text-neutral-500">
                <p>Nenhum serviço disponível nesta empresa.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
