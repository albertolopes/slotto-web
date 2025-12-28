import { useState } from 'react';

interface ManualBookingProps {
  onBack: () => void;
}

export function ManualBooking({ onBack }: ManualBookingProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [service, setService] = useState('');
  const [staff, setStaff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking creation
    onBack();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 border-2 border-neutral-800 flex items-center justify-center">
            ←
          </button>
          <h1 className="font-bold flex-1">Criar Agendamento Manual</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Client Info */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Dados do Cliente</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-bold">Nome Completo</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                  placeholder="Digite o nome"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">Telefone</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Serviço e Profissional</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-bold">Serviço</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                >
                  <option value="">Selecione...</option>
                  <option value="corte">Corte de Cabelo</option>
                  <option value="barba">Barba</option>
                  <option value="corte-barba">Corte + Barba</option>
                  <option value="coloracao">Coloração</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-bold">Profissional</label>
                <select
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                >
                  <option value="">Selecione...</option>
                  <option value="joao">João Silva</option>
                  <option value="maria">Maria Santos</option>
                  <option value="pedro">Pedro Costa</option>
                  <option value="ana">Ana Oliveira</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Data e Horário</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-bold">Data</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">Horário</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                >
                  <option value="">Selecione...</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                  <option value="16:00">16:00</option>
                  <option value="16:30">16:30</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Observações</div>
            <textarea
              className="w-full border-2 border-neutral-800 p-3 bg-white min-h-[100px]"
              placeholder="Adicione observações sobre o agendamento..."
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onBack}
              className="h-12 border-2 border-neutral-800 bg-white font-bold"
            >
              Cancelar
            </button>
            <button type="submit" className="h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">
              Criar Agendamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
