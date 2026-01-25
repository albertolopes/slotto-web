'use client';

import { useParams, useRouter } from 'next/navigation';
import { CompanyList } from '../../components/client/CompanyList';
import { ClientLayout } from '../../components/client/ClientLayout';

export default function CompanyListPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  const categoryName = "Resultados"; // In a real app, you'd fetch this or pass it via state/query

  return (
    <ClientLayout>
      <CompanyList 
        categoryId={categoryId}
        categoryName={categoryName}
      />
    </ClientLayout>
  );
}
