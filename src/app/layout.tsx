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
      <body className="bg-neutral-100">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
