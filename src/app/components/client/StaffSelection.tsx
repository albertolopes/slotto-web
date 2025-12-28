interface StaffSelectionProps {
  onNext: (staff: string) => void;
  onBack: () => void;
  onSkip: () => void;
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
          <button onClick={onBack} className="w-8 h-8 border-2 border-neutral-800 flex items-center justify-center">
            ←
          </button>
          <h1 className="font-bold flex-1 text-center">Selecione o Profissional</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <button
          onClick={onSkip}
          className="w-full border-2 border-dashed border-neutral-400 p-4 mb-3 text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <div className="text-center">
            <div className="font-bold">Sem Preferência</div>
            <div className="text-sm">Qualquer profissional disponível</div>
          </div>
        </button>

        <div className="space-y-3">
          {staff.map((person, index) => (
            <button
              key={index}
              onClick={() => onNext(person.name)}
              className="w-full border-2 border-neutral-800 p-4 text-left hover:bg-neutral-200 transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 border-2 border-neutral-800 bg-neutral-300 flex-shrink-0"></div>
                <div>
                  <div className="font-bold">{person.name}</div>
                  <div className="text-neutral-600">{person.specialty}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
