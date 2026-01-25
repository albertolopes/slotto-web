'use client';

import { Dashboard } from '../../components/company/Dashboard';
import { CompanyLayout } from '../../components/company/CompanyLayout';

export default function DashboardPage() {
  return (
    <CompanyLayout>
      <Dashboard />
    </CompanyLayout>
  );
}
