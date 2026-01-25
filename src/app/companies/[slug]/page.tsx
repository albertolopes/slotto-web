'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CompanyDetail } from '../../components/client/CompanyDetail';
import { companies as companiesApi } from '../../services/api';

export default function CompanyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      companiesApi.getCompanyBySlug(slug)
        .then(data => {
          setCompany(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load company by slug", err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!company) {
    return <div>Empresa não encontrada.</div>;
  }

  return (
    <CompanyDetail 
      companyId={company.id} // Pass the ID to the component
      onBookService={() => {
        router.push(`/companies/${slug}/book`);
      }}
      onBack={() => router.back()}
    />
  );
}
