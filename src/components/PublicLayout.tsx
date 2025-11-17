'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Rutas de dashboard que NO deben mostrar header/footer
  const dashboardRoutes = ['/dashboard'];
  const isDashboardRoute = dashboardRoutes.some(route => pathname?.startsWith(route));

  // Si es una ruta de dashboard, solo mostrar el contenido sin header/footer
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Para rutas públicas, mostrar header y footer
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}

