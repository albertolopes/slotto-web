import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { staff as staffApi } from '../../services/api';

interface StaffSelectionProps {
  companyId?: string;
  onNext: (staff: { id: string; name: string }) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function StaffSelection({ companyId, onNext, onBack, onSkip }: StaffSelectionProps) {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (companyId) {
      setLoading(true);
      staffApi.listStaff(companyId)
        .then((data) => {
          setStaffList(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load staff', err);
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
            <h1 className="font-bold text-lg text-center">Escolha o Profissional</h1>
            <p className="text-sm text-neutral-500 text-center">(Opcional)</p>
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
            {staffList.map((person) => (
              <button
                key={person.id}
                onClick={() => onNext({ id: person.id, name: person.name })}
                className="w-full bg-white border border-neutral-200 rounded-lg p-4 flex items-center text-left hover:bg-neutral-100/50 hover:border-neutral-300 transition-colors active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="font-bold text-neutral-900">{person.name}</div>
                  <div className="text-sm text-neutral-500">{person.role}</div>
                </div>
              </button>
            ))}
            {staffList.length === 0 && !loading && (
              <div className="text-center py-12 text-neutral-500">
                <p>Nenhum profissional disponível.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Skip Button */}
      {onSkip && (
        <div className="p-4 bg-neutral-50 border-t border-neutral-200">
          <button
            onClick={onSkip}
            className="w-full h-12 border-2 border-neutral-300 text-neutral-700 font-bold rounded-xl hover:bg-neutral-100 transition-colors"
          >
            Pular
          </button>
        </div>
      )}
    </div>
  );
}
