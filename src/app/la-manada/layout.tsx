import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Manada — Nuestro equipo',
  description: 'Conoce al equipo de voluntarios y colaboradores de la Fundación Pa\' Perros que trabajan por el bienestar animal en Colombia.',
  alternates: { canonical: 'https://www.fundacionpaperros.com/la-manada' },
  openGraph: {
    title: "La Manada — Fundación Pa' Perros",
    description: 'El equipo humano detrás del rescate y adopción animal en Colombia.',
    url: 'https://www.fundacionpaperros.com/la-manada',
  },
};

export default function LaManadaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
