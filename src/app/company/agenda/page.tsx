'use client';

import { CompanyLayout } from '../../components/company/CompanyLayout';
import { AgendaView } from '../../components/company/AgendaView';

export default function AgendaPage() {
  // Assuming companyId would be available from a session or context
  const companyId = 'uuid-empresa-123'; 

  return (
    <CompanyLayout>
      <AgendaView companyId={companyId} />
    </CompanyLayout>
  );
}
