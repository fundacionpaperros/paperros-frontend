import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto — Fundación Pa\' Perros Manizales',
  description: 'Contáctanos para adoptar, donar, voluntariado o alianzas con la Fundación Pa\' Perros en Manizales, Colombia.',
  alternates: { canonical: 'https://www.fundacionpaperros.com/contacto' },
  openGraph: {
    title: "Contacto — Fundación Pa' Perros",
    description: 'Escríbenos para adoptar, donar o unirte a nuestra causa en Manizales.',
    url: 'https://www.fundacionpaperros.com/contacto',
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
