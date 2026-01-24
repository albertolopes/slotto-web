import { useState, useEffect } from 'react';
import { ClientLogin } from './client/ClientLogin';
import { ServiceCategorySearch } from './client/ServiceCategorySearch';
import { CompanyList } from './client/CompanyList';
import { CompanyDetail } from './client/CompanyDetail';
import { ServiceSelection } from './client/ServiceSelection';
import { StaffSelection } from './client/StaffSelection';
import { DateSelection } from './client/DateSelection';
import { TimeSelection } from './client/TimeSelection';
import { ClientDataForm } from './client/ClientDataForm';
import { BookingConfirmation } from './client/BookingConfirmation';
import { BookingSuccess } from './client/BookingSuccess';
import { MyBookings } from './client/MyBookings';
import { ClientLayout } from './client/ClientLayout';

export type ClientScreen =
  | 'login'
  | 'category-search'
  | 'company-list'
  | 'company-detail'
  | 'service'
  | 'staff'
  | 'date'
  | 'time'
  | 'form'
  | 'confirmation'
  | 'success'
  | 'my-bookings';

export interface BookingData {
  categoryId?: string;
  categoryName?: string;
  companyId?: string;
  serviceId?: string;
  serviceName?: string;
  staffId?: string;
  staffName?: string;
  date?: Date;
  time?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
}

interface ClientFlowProps {
  onScreenChange?: (screen: ClientScreen) => void;
}

export function ClientFlow({ onScreenChange }: ClientFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<ClientScreen>('login');
  const [bookingData, setBookingData] = useState<BookingData>({});

  useEffect(() => {
    if (onScreenChange) {
      onScreenChange(currentScreen);
    }
  }, [currentScreen, onScreenChange]);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const navigateTo = (screen: ClientScreen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <ClientLogin onLogin={() => navigateTo('category-search')} onGuestAccess={() => navigateTo('category-search')} />;
      case 'category-search':
        return <ServiceCategorySearch onSelectCategory={(category) => { updateBookingData({ categoryId: category.id, categoryName: category.name }); navigateTo('company-list'); }} />;
      case 'company-list':
        return <CompanyList categoryId={bookingData.categoryId || ''} categoryName={bookingData.categoryName || ''} onSelectCompany={(companyId) => { updateBookingData({ companyId }); navigateTo('company-detail'); }} onBack={() => navigateTo('category-search')} />;
      case 'company-detail':
        return <CompanyDetail companyId={bookingData.companyId || ''} onBookService={() => navigateTo('service')} onBack={() => navigateTo('company-list')} />;
      case 'service':
        return <ServiceSelection companyId={bookingData.companyId} onNext={(service) => { updateBookingData({ serviceId: service.id, serviceName: service.name }); navigateTo('staff'); }} onBack={() => navigateTo('company-detail')} />;
      case 'staff':
        return <StaffSelection companyId={bookingData.companyId} onNext={(staff) => { updateBookingData({ staffId: staff.id, staffName: staff.name }); navigateTo('date'); }} onBack={() => navigateTo('service')} onSkip={() => navigateTo('date')} />;
      case 'date':
        return <DateSelection bookingData={bookingData} onNext={(date) => { updateBookingData({ date }); navigateTo('time'); }} onBack={() => navigateTo('staff')} />;
      case 'time':
        return <TimeSelection bookingData={bookingData} onNext={(time) => { updateBookingData({ time }); navigateTo('form'); }} onBack={() => navigateTo('date')} />;
      case 'form':
        return <ClientDataForm onNext={(clientData) => { updateBookingData(clientData); navigateTo('confirmation'); }} onBack={() => navigateTo('time')} />;
      case 'confirmation':
        return <BookingConfirmation bookingData={bookingData} onConfirm={() => navigateTo('success')} onBack={() => navigateTo('form')} />;
      case 'success':
        return <BookingSuccess onViewBookings={() => navigateTo('my-bookings')} onNewBooking={() => { setBookingData({}); navigateTo('service'); }} />;
      case 'my-bookings':
        return <MyBookings onBack={() => navigateTo('category-search')} />;
      default:
        return <ClientLogin onLogin={() => navigateTo('category-search')} onGuestAccess={() => navigateTo('category-search')} />;
    }
  };
  
  const showLayout = ['category-search', 'company-list', 'my-bookings'].includes(currentScreen);

  return (
    <div className="h-full w-full bg-neutral-100 flex flex-col soft-borders">
      {showLayout ? (
        <ClientLayout onNavigate={navigateTo} activeScreen={currentScreen}>
          {renderScreen()}
        </ClientLayout>
      ) : (
        renderScreen()
      )}
    </div>
  );
}
