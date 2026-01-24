import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { companies as companiesApi, companyServices as servicesApi, reviews as reviewsApi } from '../../services/api';

interface CompanyDetailProps {
  companyId: string;
  onBookService: () => void;
  onBack: () => void;
}

export function CompanyDetail({ companyId, onBookService, onBack }: CompanyDetailProps) {
  const [company, setCompany] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewSummary, setReviewSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      companiesApi.getCompany(companyId),
      servicesApi.listCompanyServices(companyId),
      reviewsApi.listCompanyReviews(companyId),
      reviewsApi.getCompanyReviewSummary(companyId)
    ])
      .then(([companyData, servicesData, reviewsData, summaryData]) => {
        setCompany(companyData);
        setServices(servicesData || []);
        setReviews(reviewsData || []);
        setReviewSummary(summaryData);
      })
      .catch((err) => {
        console.error('Failed to load company details', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  const handleNewReview = (newReview: any) => {
    setReviews([newReview, ...reviews]);
    setReviewSummary((prev: any) => ({
      ...prev,
      totalReviews: (prev?.totalReviews || 0) + 1,
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="w-full h-40 bg-neutral-200 animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 w-3/4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse"></div>
        </div>
        <div className="p-4 space-y-3 mt-4">
          <div className="h-20 w-full bg-neutral-100 rounded-lg animate-pulse"></div>
          <div className="h-20 w-full bg-neutral-100 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4 bg-neutral-50">
        <div className="absolute top-4 left-4">
          <BackButton onClick={onBack} />
        </div>
        <p className="mt-4 text-neutral-600">Empresa não encontrada.</p>
      </div>
    );
  }

  const coverImageUrl = company.facadeUrl;
  const galleryPhotos = company.photos || [];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="absolute top-4 left-4 z-20">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex-1 overflow-auto pb-24">
        <div className="w-full h-40 bg-neutral-100">
          {coverImageUrl && (
            <img src={coverImageUrl} alt={company.name} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold text-neutral-900">{company.name}</h1>
          <p className="text-base text-neutral-500 mt-1">{company.categoryName || 'Serviços Diversos'}</p>
          <div className="flex items-center gap-4 text-sm mt-3">
            <div className="flex items-center gap-1 font-bold">
              <span className="text-yellow-500">★</span>
              <span>{reviewSummary?.averageRating?.toFixed(1) || '-'}</span>
            </div>
            <div className="text-neutral-500">{reviewSummary?.totalReviews || 0} avaliações</div>
            <div className="text-neutral-500">• {company.address?.city || 'Cidade'}</div>
          </div>
        </div>

        <div className="px-4 space-y-8">
          {galleryPhotos.length > 0 && (
            <section>
              <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4">
                {galleryPhotos.map((photo: { url: string }, index: number) => {
                  const imageUrl = (photo && typeof photo.url === 'string') ? photo.url : null;
                  if (!imageUrl) return null;
                  
                  return (
                    <button 
                      key={index} 
                      onClick={() => setSelectedImage(imageUrl)}
                      className="flex-shrink-0 w-64 h-40 rounded-lg bg-neutral-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-neutral-800 ring-offset-2"
                    >
                      <img src={imageUrl} alt={`Galeria ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <h2 className="font-bold text-xl mb-3">Serviços</h2>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="bg-neutral-50/70 border border-neutral-100 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-neutral-900">{service.name}</div>
                    <div className="text-sm text-neutral-500">{service.durationMinutes} min</div>
                  </div>
                  <div className="font-bold text-base text-neutral-900">R$ {service.price.toFixed(2)}</div>
                </div>
              ))}
              {services.length === 0 && <div className="text-sm text-center py-8 text-neutral-500">Nenhum serviço cadastrado.</div>}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-xl">Avaliações</h2>
              <button onClick={() => setShowReviewModal(true)} className="text-sm font-bold text-blue-600">Avaliar</button>
            </div>
            <div className="space-y-4">
              {reviewSummary && (
                <div className="bg-neutral-50/70 border border-neutral-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Resumo</h3>
                    <div className="text-sm font-bold flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {reviewSummary.averageRating.toFixed(1)}
                      <span className="text-neutral-400 font-normal">({reviewSummary.totalReviews})</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = reviewSummary.ratingDistribution?.[stars] || 0;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-500 w-6">{stars}★</span>
                          <div className="flex-1 h-1.5 bg-neutral-200 rounded-full">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="bg-neutral-50/70 border border-neutral-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{review.customerName}</span>
                    <span className="text-xs text-neutral-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">{review.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && <div className="text-sm text-center py-8 text-neutral-500">Nenhuma avaliação ainda.</div>}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t border-neutral-200">
        <button
          onClick={onBookService}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors active:scale-95"
        >
          Agendar Serviço
        </button>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-in fade-in-25"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[80vh] p-4">
            <img src={selectedImage} alt="Visualização ampliada" className="w-full h-full object-contain rounded-lg" />
            <button 
              className="absolute top-6 right-6 text-white bg-black/50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showReviewModal && (
        <ReviewModal 
          companyId={companyId}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleNewReview}
        />
      )}
    </div>
  );
}

function ReviewModal({ companyId, onClose, onSubmit }: { companyId: string, onClose: () => void, onSubmit: (review: any) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      const newReview = await reviewsApi.createReview(companyId, {
        appointmentId: 'uuid-agendamento-placeholder',
        rating,
        comment,
        customerName: 'Usuário'
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
          disabled={rating === 0 || submitting}
          className="w-full h-12 mt-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          {submitting ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </div>
    </div>
  );
}
