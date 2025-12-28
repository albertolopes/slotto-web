interface CompanyDetailProps {
  companyId: string;
  onBookService: () => void;
  onBack: () => void;
}

export function CompanyDetail({ companyId, onBookService, onBack }: CompanyDetailProps) {
  // Mock company data
  const company = {
    id: companyId,
    name: 'Salão Beleza Total',
    category: 'Salão de Beleza',
    rating: '4.8',
    reviewCount: 127,
    distance: '0.5 km',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 98765-4321',
    hours: 'Seg-Sex: 9h-19h | Sáb: 9h-17h',
    description: 'Salão especializado em cortes modernos, coloração e tratamentos capilares.',
  };

  const services = [
    { name: 'Corte Feminino', price: 'R$ 60', duration: '45 min' },
    { name: 'Corte Masculino', price: 'R$ 40', duration: '30 min' },
    { name: 'Coloração', price: 'R$ 150', duration: '90 min' },
    { name: 'Escova', price: 'R$ 50', duration: '40 min' },
    { name: 'Hidratação', price: 'R$ 80', duration: '60 min' },
  ];

  const photos = [1, 2, 3, 4];

  return (
    <div className="flex flex-col h-full">
      {/* Header with Image */}
      <div className="relative">
        <div className="w-full h-48 md:h-64 lg:h-80 border-b-2 border-neutral-800 bg-neutral-300 flex items-center justify-center">
          <span className="text-neutral-600">FOTO PRINCIPAL</span>
        </div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 border-2 border-neutral-800 bg-white flex items-center justify-center"
        >
          ←
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Company Info */}
        <div className="border-b-2 border-neutral-800 p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div className="md:max-w-[70%]"><h1 className="font-bold">{company.name}</h1>
            <div className="text-neutral-600 text-sm">{company.category}</div></div>
            <div className="flex items-center gap-1 text-sm mt-2 md:mt-0">
              <span>⭐</span>
              <span className="font-bold">{company.rating}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span>{company.address} ({company.distance})</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕐</span>
              <span>{company.hours}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-b-2 border-neutral-800 p-4">
          <h2 className="font-bold mb-2">Sobre</h2>
          <p className="text-sm text-neutral-600">{company.description}</p>
        </div>

        {/* Photo Gallery */}
        <div className="border-b-2 border-neutral-800 p-4">
          <h2 className="font-bold mb-3">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="aspect-square border-2 border-neutral-800 bg-neutral-300"></div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="border-b-2 border-neutral-800 p-4">
          <h2 className="font-bold mb-3">Serviços</h2>
          <div className="space-y-2 md:grid md:grid-cols-2 md:gap-4">
            {services.map((service, index) => (
              <div key={index} className="border-2 border-neutral-800 p-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm">{service.name}</div>
                  <div className="text-xs text-neutral-600">{service.duration}</div>
                </div>
                <div className="font-bold">{service.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Summary */}
        <div className="border-b-2 border-neutral-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">Avaliações</h2>
            <div className="text-sm text-neutral-600">{company.reviewCount} avaliações</div>
          </div>

          {/* Rating Bars */}
          <div className="space-y-2 mb-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs w-8">{stars}★</span>
                <div className="flex-1 h-2 border-2 border-neutral-800 bg-white">
                  <div
                    className="h-full bg-neutral-800"
                    style={{ width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%` }}
                  ></div>
                </div>
                <span className="text-xs w-8 text-neutral-600">{stars === 5 ? 80 : stars === 4 ? 15 : 5}%</span>
              </div>
            ))}
          </div>

          {/* Sample Review */}
          <div className="border-2 border-neutral-800 p-3 bg-neutral-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">Maria Silva</span>
              <span className="text-xs text-neutral-600">há 2 dias</span>
            </div>
            <div className="text-xs mb-1">⭐⭐⭐⭐⭐</div>
            <p className="text-xs text-neutral-600">
              Excelente atendimento! Adorei o corte e a profissional foi muito atenciosa.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-neutral-800 p-4 bg-white md:relative md:bottom-auto md:pt-4 md:pb-4 sticky bottom-0">
        <button
          onClick={onBookService}
          className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
        >
          Agendar Serviço
        </button>
      </div>
    </div>
  );
}
