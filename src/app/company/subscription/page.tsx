'use client';

import { CompanyLayout } from '../../components/company/CompanyLayout';
import { SubscriptionManagement } from '../../components/company/SubscriptionManagement';

export default function SubscriptionPage() {
  // Assuming companyId would be available from a session or context
  const companyId = 'uuid-empresa-123'; 

  return (
    <CompanyLayout>
      <SubscriptionManagement companyId={companyId} />
    </CompanyLayout>
  );
}
