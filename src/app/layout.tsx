import '../styles/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Low Fidelity Wireframes',
  description: 'Sistema de Agendamentos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
