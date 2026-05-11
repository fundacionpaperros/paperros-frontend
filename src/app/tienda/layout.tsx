import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda — Productos para apoyar animales',
  description: 'Compra productos de la Fundación Pa\' Perros y contribuye al bienestar animal en Colombia. Cada compra apoya nuestro trabajo de rescate y adopción.',
  alternates: { canonical: 'https://www.fundacionpaperros.com/tienda' },
  openGraph: {
    title: "Tienda — Fundación Pa' Perros",
    description: 'Compra y apoya el rescate y adopción de animales en Colombia.',
    url: 'https://www.fundacionpaperros.com/tienda',
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
