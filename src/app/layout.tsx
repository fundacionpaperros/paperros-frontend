import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/PublicLayout";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = 'https://www.fundacionpaperros.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fundación Pa' Perros — Adopción responsable en Colombia",
    template: "%s | Fundación Pa' Perros",
  },
  description: "Organización sin ánimo de lucro que promueve la adopción responsable y el bienestar animal en Colombia. Transformamos la cultura de adopción con educación y acompañamiento.",
  keywords: "fundación pa perros, adopción responsable, adoptar perro Colombia, adoptar gato Colombia, bienestar animal, albergue animales Manizales, rescate animal Colombia",
  authors: [{ name: "Fundación Pa' Perros" }],
  creator: "Fundación Pa' Perros",
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: BASE_URL,
    siteName: "Fundación Pa' Perros",
    title: "Fundación Pa' Perros — Adopción responsable en Colombia",
    description: "Organización sin ánimo de lucro que promueve la adopción responsable y el bienestar animal en Colombia.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "Fundación Pa' Perros" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fundación Pa' Perros — Adopción responsable en Colombia",
    description: "Adopta, dona y transforma vidas animales en Colombia.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: BASE_URL },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: "Fundación Pa' Perros",
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  description: "Organización sin ánimo de lucro que promueve la adopción responsable y el bienestar animal en Colombia.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Manizales',
    addressRegion: 'Caldas',
    addressCountry: 'CO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'serviciosfundacionpaperros@gmail.com',
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            success: { duration: 3000 },
            error: { duration: 5000 },
          }}
        />
        <PublicLayout>
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}