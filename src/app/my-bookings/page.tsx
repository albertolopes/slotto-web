'use client';

import { MyBookings } from '../components/client/MyBookings';
import { ClientLayout } from '../components/client/ClientLayout';

export default function MyBookingsPage() {
  return (
    <ClientLayout>
      <MyBookings />
    </ClientLayout>
  );
}
