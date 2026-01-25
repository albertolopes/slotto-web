'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { companies as companiesApi } from '../../../services/api';
import { ServiceSelection } from '../../../components/client/ServiceSelection';
import { StaffSelection } from '../../../components/client/StaffSelection';
import { DateSelection } from '../../../components/client/DateSelection';
import { TimeSelection } from '../../../components/client/TimeSelection';
import { ClientDataForm } from '../../../components/client/ClientDataForm';
import { BookingConfirmation } from '../../../components/client/BookingConfirmation';
import { BookingSuccess } from '../../../components/client/BookingSuccess';

type BookingStep = 'service' | 'staff' | 'date' | 'time' | 'form' | 'confirmation' | 'success';

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [step, setStep] = useState<BookingStep>('service');
  const [company, setCompany] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>({});

  useEffect(() => {
    if (slug) {
      companiesApi.getCompanyBySlug(slug).then(data => {
        setCompany(data);
        setBookingData(prev => ({ ...prev, companyId: data.id }));
      });
    }
  }, [slug]);

  const updateBookingData = (data: any) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = (next: BookingStep) => {
    setStep(next);
  };

  const handleBack = () => {
    // This logic needs to be improved to go back to the correct previous step
    router.back();
  };

  if (!company) {
    return <div>Carregando...</div>;
  }

  const renderStep = () => {
    switch (step) {
      case 'service':
        return <ServiceSelection companyId={company.id} onNext={(service) => { updateBookingData({ serviceId: service.id, serviceName: service.name }); nextStep('staff'); }} onBack={handleBack} />;
      case 'staff':
        return <StaffSelection companyId={company.id} onNext={(staff) => { updateBookingData({ staffId: staff.id, staffName: staff.name }); nextStep('date'); }} onBack={() => nextStep('service')} onSkip={() => nextStep('date')} />;
      case 'date':
        return <DateSelection bookingData={bookingData} onNext={(date) => { updateBookingData({ date }); nextStep('time'); }} onBack={() => nextStep('staff')} />;
      case 'time':
        return <TimeSelection bookingData={bookingData} onNext={(time) => { updateBookingData({ time }); nextStep('form'); }} onBack={() => nextStep('date')} />;
      case 'form':
        return <ClientDataForm onNext={(clientData) => { updateBookingData(clientData); nextStep('confirmation'); }} onBack={() => nextStep('time')} />;
      case 'confirmation':
        return <BookingConfirmation bookingData={bookingData} onConfirm={() => nextStep('success')} onBack={() => nextStep('form')} />;
      case 'success':
        return <BookingSuccess onViewBookings={() => router.push('/my-bookings')} onNewBooking={() => router.push('/search')} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-white">
      {renderStep()}
    </div>
  );
}
