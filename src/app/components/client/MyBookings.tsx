import { BackButton } from '../ui/BackButton';
import { useEffect, useState } from 'react';
import { appointments as appointmentsApi, reviews as reviewsApi } from '../../services/api';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

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

export function MyBookings() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewingAppointment, setReviewingAppointment] = useState<any | null>(null);
  const router = useRouter();

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
    setReviewingAppointment(null);
    setLoading(true);
    appointmentsApi.listAppointments().then(data => {
      setAppointments(data || []);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4 border-neutral-200 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <BackButton onClick={() => router.back()} />
          <h1 className="font-bold flex-1 text-center text-lg">Meus Agendamentos</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {loading && <div className="text-center text-neutral-500 py-8">Carregando...</div>}
          {error && <div className="text-center text-red-500 py-8">{error}</div>}

          {!loading && appointments.map((apt) => {
            const appointmentDate = new Date(apt.startTime);
            const isCompleted = apt.status === 'COMPLETED';
            
            return (
              <div key={apt.id} className="bg-white border border-neutral-200 rounded-xl shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg text-neutral-900">{apt.service?.name || 'Serviço'}</div>
                    <div className="text-sm text-neutral-600 font-medium">{apt.company?.name || 'Empresa'}</div>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                    isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {apt.status || 'PENDENTE'}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span className="font-medium">Data</span>
                    <span className="font-bold text-neutral-800">{format(appointmentDate, "dd/MM/yyyy")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span className="font-medium">Hora</span>
                    <span className="font-bold text-neutral-800">{format(appointmentDate, "HH:mm")}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {isCompleted && (
                    <button 
                      onClick={() => setReviewingAppointment(apt)}
                      className="flex-1 h-10 border border-blue-200 text-blue-700 font-bold text-sm bg-blue-50 hover:bg-blue-100 rounded-lg"
                    >
                      Avaliar
                    </button>
                  )}
                  <Link href={`/my-bookings/${apt.id}`} legacyBehavior>
                    <a className="flex-1 h-10 flex items-center justify-center border border-neutral-200 font-bold text-sm bg-neutral-50 hover:bg-neutral-100 rounded-lg">
                      Detalhes
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}

          {!loading && appointments.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <p>Nenhum agendamento encontrado.</p>
            </div>
          )}
        </div>
      </div>

      {reviewingAppointment && (
        <ReviewModal
          companyId={reviewingAppointment.company.id}
          appointmentId={reviewingAppointment.id}
          onClose={() => setReviewingAppointment(null)}
          onSubmit={handleNewReview}
        />
      )}
    </div>
  );
}
