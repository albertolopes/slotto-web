import { useState } from 'react';
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
  category?: string;
  companyId?: string;
  service?: string;
  staff?: string;
  date?: string;
  time?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
}

export function ClientFlow() {
  const [currentScreen, setCurrentScreen] = useState<ClientScreen>('login');
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData({ ...bookingData, ...data });
  };

  const handleLogin = () => {
    setCurrentScreen('category-search');
  };

  const handleGuestAccess = () => {
    setCurrentScreen('category-search');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-bleed Frame */}
      <div className="w-full min-h-screen bg-white shadow-none overflow-auto flex flex-col">
        {currentScreen === 'login' && (
          <ClientLogin onLogin={handleLogin} onGuestAccess={handleGuestAccess} />
        )}
        {currentScreen === 'category-search' && (
          <ServiceCategorySearch
            onSelectCategory={(category) => {
              updateBookingData({ category });
              setCurrentScreen('company-list');
            }}
          />
        )}
        {currentScreen === 'company-list' && (
          <CompanyList
            category={bookingData.category || ''}
            onSelectCompany={(companyId) => {
              updateBookingData({ companyId });
              setCurrentScreen('company-detail');
            }}
            onBack={() => setCurrentScreen('category-search')}
          />
        )}
        {currentScreen === 'company-detail' && (
          <CompanyDetail
            companyId={bookingData.companyId || ''}
            onBookService={() => setCurrentScreen('service')}
            onBack={() => setCurrentScreen('company-list')}
          />
        )}
        {currentScreen === 'service' && (
          <ServiceSelection
            onNext={(service) => {
              updateBookingData({ service });
              setCurrentScreen('staff');
            }}
            onBack={() => setCurrentScreen('company-detail')}
          />
        )}
        {currentScreen === 'staff' && (
          <StaffSelection
            onNext={(staff) => {
              updateBookingData({ staff });
              setCurrentScreen('date');
            }}
            onBack={() => setCurrentScreen('service')}
            onSkip={() => setCurrentScreen('date')}
          />
        )}
        {currentScreen === 'date' && (
          <DateSelection
            onNext={(date) => {
              updateBookingData({ date });
              setCurrentScreen('time');
            }}
            onBack={() => setCurrentScreen('staff')}
          />
        )}
        {currentScreen === 'time' && (
          <TimeSelection
            onNext={(time) => {
              updateBookingData({ time });
              setCurrentScreen('form');
            }}
            onBack={() => setCurrentScreen('date')}
          />
        )}
        {currentScreen === 'form' && (
          <ClientDataForm
            onNext={(clientData) => {
              updateBookingData(clientData);
              setCurrentScreen('confirmation');
            }}
            onBack={() => setCurrentScreen('time')}
          />
        )}
        {currentScreen === 'confirmation' && (
          <BookingConfirmation
            bookingData={bookingData}
            onConfirm={() => setCurrentScreen('success')}
            onBack={() => setCurrentScreen('form')}
          />
        )}
        {currentScreen === 'success' && (
          <BookingSuccess
            onViewBookings={() => setCurrentScreen('my-bookings')}
            onNewBooking={() => {
              setBookingData({});
              setCurrentScreen('service');
            }}
          />
        )}
        {currentScreen === 'my-bookings' && (
          <MyBookings onBack={() => setCurrentScreen('service')} />
        )}
      </div>
    </div>
  );
}