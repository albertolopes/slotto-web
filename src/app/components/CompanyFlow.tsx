import { useState } from 'react';
import { CompanyLogin } from './company/CompanyLogin';
import { DailyAgenda } from './company/DailyAgenda';
import { AppointmentDetail } from './company/AppointmentDetail';
import { ManualBooking } from './company/ManualBooking';
import { CompanySettings } from './company/CompanySettings';
import { SubscriptionManagement } from './company/SubscriptionManagement';

export type CompanyScreen = 'login' | 'agenda' | 'detail' | 'manual' | 'settings' | 'subscription';

export function CompanyFlow() {
  const [currentScreen, setCurrentScreen] = useState<CompanyScreen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('agenda');
  };

  const handleViewDetail = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setCurrentScreen('detail');
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Full-bleed Desktop Frame */}
      <div className="w-full bg-white border-4 border-neutral-800 shadow-xl min-h-screen overflow-auto">
        {!isLoggedIn ? (
          <CompanyLogin onLogin={handleLogin} />
        ) : (
          <>
            {currentScreen === 'agenda' && (
              <DailyAgenda
                onViewDetail={handleViewDetail}
                onCreateBooking={() => setCurrentScreen('manual')}
                onSettings={() => setCurrentScreen('settings')}
              />
            )}
            {currentScreen === 'detail' && (
              <AppointmentDetail
                appointmentId={selectedAppointment}
                onBack={() => setCurrentScreen('agenda')}
              />
            )}
            {currentScreen === 'manual' && (
              <ManualBooking onBack={() => setCurrentScreen('agenda')} />
            )}
            {currentScreen === 'settings' && (
              <CompanySettings 
                onBack={() => setCurrentScreen('agenda')} 
                onManageSubscription={() => setCurrentScreen('subscription')}
              />
            )}
            {currentScreen === 'subscription' && (
              <SubscriptionManagement onBack={() => setCurrentScreen('settings')} />
            )}
          </>
        )}
      </div>
    </div>
  );
}