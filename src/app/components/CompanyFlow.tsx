import { useState, useEffect } from 'react';
import { CompanyLogin } from './company/CompanyLogin';
import { DailyAgenda } from './company/DailyAgenda';
import { AppointmentDetail } from './company/AppointmentDetail';
import { ManualBooking } from './company/ManualBooking';
import { CompanySettings } from './company/CompanySettings';
import { SubscriptionManagement } from './company/SubscriptionManagement';

export type CompanyScreen = 'login' | 'agenda' | 'detail' | 'manual' | 'settings' | 'subscription';

interface CompanyFlowProps {
  onScreenChange?: (screen: CompanyScreen) => void;
}

export function CompanyFlow({ onScreenChange }: CompanyFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<CompanyScreen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  // In a real app, this would come from auth context
  const [companyId, setCompanyId] = useState<string>('uuid-empresa-123'); 

  useEffect(() => {
    if (onScreenChange) {
      onScreenChange(currentScreen);
    }
  }, [currentScreen, onScreenChange]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('agenda');
    // Simulate getting company ID after login
    setCompanyId('uuid-empresa-123'); 
  };

  const handleViewDetail = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setCurrentScreen('detail');
  };

  return (
    <div className="min-h-full w-full bg-neutral-100 flex flex-col soft-borders">
      {/* Full-bleed Desktop Frame */}
      <div className="w-full h-full bg-neutral-100 shadow-none overflow-auto flex flex-col">
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
                companyId={companyId}
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
