import { BackButton } from '../ui/BackButton';

interface StaffSelectionProps {
  onNext: (staff: string) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function StaffSelection({ onNext, onBack, onSkip }: StaffSelectionProps) {
  const staff = [
    { name: 'João Silva', specialty: 'Especialista em cortes' },
    { name: 'Maria Santos', specialty: 'Coloração e tratamentos' },
    { name: 'Pedro Costa', specialty: 'Barbeiro profissional' },
    { name: 'Ana Oliveira', specialty: 'Estilista' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Escolha o Profissional</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {staff.map((person, index) => (
            <button
              key={index}
              onClick={() => onNext(person.name)}
              className="w-full border-2 border-neutral-800 p-3 text-left"
            >
              {person.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-t-2 border-neutral-800 p-4">
        <div className="flex gap-2">
          <button
            onClick={onSkip}
            className="flex-1 h-12 border-2 border-neutral-800 bg-white font-bold"
          >
            Pular
          </button>
          <button className="flex-1 h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
