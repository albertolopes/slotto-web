import { BackButton } from '../ui/BackButton';

interface ServiceSelectionProps {
  onNext: (service: string) => void;
  onBack?: () => void;
}

export function ServiceSelection({ onNext, onBack }: ServiceSelectionProps) {
  const services = [
    { name: 'Corte de Cabelo', duration: '30 min', price: 'R$ 50' },
    { name: 'Barba', duration: '20 min', price: 'R$ 30' },
    { name: 'Corte + Barba', duration: '45 min', price: 'R$ 70' },
    { name: 'Coloração', duration: '60 min', price: 'R$ 100' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          {onBack ? <BackButton onClick={onBack} /> : <div className="w-8" />}
          <h1 className="font-bold flex-1 text-center">Selecione o Serviço</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => onNext(service.name)}
              className="w-full border-2 border-neutral-800 p-4 text-left hover:bg-neutral-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{service.name}</div>
                  <div className="text-neutral-600">{service.duration}</div>
                </div>
                <div className="font-bold">{service.price}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t-2 border-neutral-800 p-4">
        <div className="h-12 border-2 border-neutral-400 bg-neutral-200 flex items-center justify-center">
          <span className="text-neutral-500">Meus Agendamentos</span>
        </div>
      </div>
    </div>
  );
}
