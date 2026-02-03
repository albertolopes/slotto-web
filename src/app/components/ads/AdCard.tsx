import Link from 'next/link';

interface AdCardProps {
  ad: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    sponsor: string;
    cta: {
      type: 'INTERNAL' | 'EXTERNAL';
      value: string;
    };
  };
  fullWidth?: boolean;
}

export function AdCard({ ad, fullWidth = false }: AdCardProps) {
  const cardClasses = `group relative overflow-hidden rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all text-white flex flex-col justify-end p-4 ${fullWidth ? 'col-span-full h-40' : 'h-36'}`;

  const isInternal = ad.cta.type === 'INTERNAL';
  const href = isInternal ? `/${ad.cta.value}` : ad.cta.value;

  if (isInternal) {
    return (
      <Link href={href} legacyBehavior>
        <a className={cardClasses}>
          <img src={ad.imageUrl} alt={ad.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold">{ad.sponsor}</span>
              <span className="font-semibold opacity-80">Patrocinado</span>
            </div>
            <h3 className="font-bold text-base leading-tight">{ad.title}</h3>
          </div>
        </a>
      </Link>
    );
  }

  // External link
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
      <img src={ad.imageUrl} alt={ad.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="font-bold">{ad.sponsor}</span>
          <span className="font-semibold opacity-80">Patrocinado</span>
        </div>
        <h3 className="font-bold text-base leading-tight">{ad.title}</h3>
      </div>
    </a>
  );
}
