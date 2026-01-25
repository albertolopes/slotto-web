'use client';

import { useParams, useRouter } from 'next/navigation';
import { BookingDetail } from '../../components/client/BookingDetail';
import { ClientLayout } from '../../components/client/ClientLayout';

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  return (
    <ClientLayout>
      <BookingDetail 
        appointmentId={id}
        onBack={() => router.back()}
      />
    </ClientLayout>
  );
}
