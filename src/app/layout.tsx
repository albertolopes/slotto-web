import '../styles/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slotto - Agendamentos',
  description: 'Sistema de Agendamentos para pequenas empresas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="min-h-screen bg-neutral-50">
          {children}
        </main>
      </body>
    </html>
  );
}
