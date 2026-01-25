'use client';

import { ServiceCategorySearch } from "../components/client/ServiceCategorySearch";
import { useRouter } from 'next/navigation';
import { ClientLayout } from '../components/client/ClientLayout';

export default function SearchPage() {
  const router = useRouter();

  return (
    <ClientLayout>
      <ServiceCategorySearch 
        onSelectCategory={(category) => {
          router.push(`/search/${category.id}`);
        }} 
      />
    </ClientLayout>
  );
}
