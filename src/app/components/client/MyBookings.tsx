import { BackButton } from '../ui/BackButton';
import { useEffect, useState } from 'react';
import { appointments as appointmentsApi, reviews as reviewsApi } from '../../services/api';

interface MyBookingsProps {
  onBack: () => void;
}

function ReviewModal({ companyId, appointmentId, onClose, onSubmit }: { companyId: string, appointmentId: string, onClose: () => void, onSubmit: (review: any) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !companyId) return;
    setSubmitting(true);
    try {
      const newReview = await reviewsApi.createReview(companyId, {
        appointmentId,
        rating,
        comment,
        customerName: 'Usuário' // Placeholder
      });
      onSubmit(newReview);
      onClose();
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center mb-4">Deixe sua avaliação</h2>
        <div className="flex justify-center items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className="text-4xl transition-transform duration-200 hover:scale-110">
              <span className={star <= rating ? 'text-yellow-400' : 'text-neutral-300'}>★</span>
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte sua experiência (opcional)"
          className="w-full h-24 p-3 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
        />
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || submitting || !companyId}
          className="w-full h-12 mt-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          {submitting ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </div>
    </div>
  );
}

export function MyBookings({ onBack }: MyBookingsProps) {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewingAppointment, setReviewingAppointment] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    appointmentsApi.listAppointments()
      .then((data) => {
        setAppointments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load appointments', err);
        setError('Erro ao carregar agendamentos');
        setLoading(false);
      });
  }, []);

  const handleNewReview = () => {
    // Optionally refetch appointments to update their status
    setReviewingAppointment(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b p-4 border-neutral-200 bg-white">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Meus Agendamentos</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {loading && <div className="text-center text-neutral-600">Carregando...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}

          {appointments.map((apt) => (
            <div key={apt.id} className="border p-4 border-neutral-200 rounded bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-lg">{apt.serviceName || 'Serviço'}</div>
                <div className="text-sm font-bold bg-neutral-100 px-2 py-1 rounded">{apt.status || 'PENDING'}</div>
              </div>

              <div className="space-y-1 text-sm text-neutral-700">
                <div className="flex gap-2">
                  <span className="text-neutral-500">Data:</span>
                  <span className="font-medium">{new Date(apt.startTime).toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-500">Empresa:</span>
                  <span className="font-medium">{apt.companyName || 'Empresa'}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-100 flex gap-2">
                {apt.status === 'COMPLETED' && (
                  <button 
                    onClick={() => setReviewingAppointment(apt)}
                    className="flex-1 h-10 border px-3 py-2 border-blue-200 text-blue-700 font-bold text-sm bg-blue-50 hover:bg-blue-100"
                  >
                    Avaliar
                  </button>
                )}
                <button className="flex-1 h-10 border px-3 py-2 border-neutral-200 font-bold text-sm bg-neutral-50 hover:bg-neutral-100">
                  Detalhes
                </button>
              </div>
            </div>
          ))}

          {!loading && appointments.length === 0 && <div className="text-center text-neutral-600">Nenhum agendamento encontrado.</div>}
        </div>
      </div>

      {reviewingAppointment && (
        <ReviewModal
          companyId={reviewingAppointment.companyId}
          appointmentId={reviewingAppointment.id}
          onClose={() => setReviewingAppointment(null)}
          onSubmit={handleNewReview}
        />
      )}
    </div>
  );
}
