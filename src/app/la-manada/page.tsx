'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/lib/api';

interface ApiSponsor {
  id: number;
  nombre: string;
  logo_url: string;
  enlace?: string;
  descripcion?: string;
  orden: number;
  activo: boolean;
}

interface Aliado {
  nombre: string;
  subtitulo?: string;
  enlace?: string;
  tipoEnlace?: 'web' | 'instagram';
  imagen: string;
  descripcion?: string;
}

export default function LaManada() {
  const [apiSponsors, setApiSponsors] = useState<ApiSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  const fallbackAliados: Aliado[] = [
    {
      nombre: 'Universidad Autónoma de Manizales',
      subtitulo: 'Paz y Competitividad',
      enlace: 'https://www.autonoma.edu.co/proyeccion/paz-y-competitividad',
      tipoEnlace: 'web',
      imagen: '/UAM.jpg',
    },
    {
      nombre: 'Universidad de Caldas',
      subtitulo: 'Vicerrectoría de Proyección',
      enlace: 'https://viceproyeccion.ucaldas.edu.co/',
      tipoEnlace: 'web',
      imagen: '/logoCaldas.png',
    },
    {
      nombre: 'EtoLógica',
      enlace: 'https://instagram.com/eto_logica',
      tipoEnlace: 'instagram',
      imagen: '/etologica.jpg',
    },
  ];

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      const response = await api.get('/sponsors/?active_only=true&limit=100');
      const sorted = response.data.sort((a: ApiSponsor, b: ApiSponsor) => a.orden - b.orden);
      setApiSponsors(sorted);
      setApiAvailable(true);
    } catch (error) {
      console.error('Error loading sponsors:', error);
      setApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (logoUrl: string): string => {
    if (!logoUrl) return '';
    if (logoUrl.startsWith('/static/')) {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com';
      return `${backendUrl}${logoUrl}`;
    }
    if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
      return logoUrl;
    }
    return `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com'}${logoUrl.startsWith('/') ? logoUrl : '/' + logoUrl}`;
  };

  const isInstagramLink = (enlace?: string): boolean => {
    return enlace?.includes('instagram.com') || false;
  };

  const apiAliadosFormatted: Aliado[] = apiSponsors.map(sponsor => ({
    nombre: sponsor.nombre,
    enlace: sponsor.enlace,
    tipoEnlace: isInstagramLink(sponsor.enlace) ? 'instagram' : 'web',
    imagen: getImageUrl(sponsor.logo_url),
    descripcion: sponsor.descripcion,
  }));

  const aliados = (apiAvailable && apiSponsors.length > 0) ? apiAliadosFormatted : fallbackAliados;

  return (
    <div className="bg-secondary">
      {/* Hero con imagen de fondo */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/Nacimos para transformar vidas.jpg"
          alt="La Manada - Fundación Pa' Perros"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary"></div>
        <div className="absolute inset-0 flex items-start justify-center pt-12 md:pt-16">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">
              La Manada
            </h1>
            <p className="text-xl md:text-2xl text-primary max-w-2xl mx-auto">
              Corazones unidos por el bienestar animal
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia Section */}
      <section id="nuestra-historia" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-accent-orange/20 text-accent-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🐾 Desde 2015
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Nacimos para transformar vidas
              </h2>
              <div className="space-y-4 text-primary leading-relaxed">
                <p>
                  En <span className="font-semibold text-accent-orange">Pa&apos; Perros</span> creemos que cada vida merece una segunda oportunidad. 
                  Nacimos para cuidar, proteger y transformar la historia de los animales que han sufrido el abandono o la indiferencia.
                </p>
                <p>
                  Nuestra labor impulsa el fortalecimiento de otras fundaciones y grupos que, como nosotros, 
                  rescatan, rehabilitan y promueven la adopción responsable.
                </p>
                <p>
                  Contamos con un equipo interdisciplinario lleno de corazón, alianzas que multiplican el impacto 
                  y una red de manos solidarias que hacen posible nuestro propósito: <span className="font-semibold text-primary">crear un mundo más justo, 
                  compasivo y feliz para todos los animales.</span>
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-orange/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-blue/30 rounded-full blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-accent-orange/20">
                  <Image
                    src="/image 13.png"
                    alt="Fundación Pa' Perros"
                    width={600}
                    height={500}
                    className="object-cover w-full h-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Humano Section */}
      <section id="equipo" className="py-20 bg-primary scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-accent-orange/20 text-accent-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
              👥 Nuestro Equipo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              El corazón de la fundación
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Personas comprometidas que dedican su vida al bienestar animal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mauricio */}
            <div className="group">
              <div className="bg-secondary rounded-3xl p-8 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-orange to-accent-orange/60 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">👨‍💼</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Mauricio Aristizábal Vargas</h3>
                    <p className="text-accent-orange font-semibold">Director</p>
                  </div>
                </div>
                <p className="text-primary leading-relaxed">
                  Nuestra cabeza. Lleva más de <span className="font-semibold text-accent-orange">9 años</span> trabajando por el bienestar animal 
                  y la tenencia responsable de mascotas.
                </p>
              </div>
            </div>

            {/* Diana */}
            <div className="group">
              <div className="bg-secondary rounded-3xl p-8 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-blue/60 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">👩‍💼</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Diana Lucía Guzmán</h3>
                    <p className="text-accent-blue font-semibold">Líder de Proyectos</p>
                  </div>
                </div>
                <p className="text-primary leading-relaxed">
                  Más de <span className="font-semibold text-accent-blue">20 años</span> de experiencia en formulación y ejecución de proyectos 
                  con alto impacto social.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aliados Section */}
      <section id="aliados" className="py-20 bg-secondary scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-accent-green/20 text-accent-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🤝 Alianzas
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Juntos hacemos más
            </h2>
            <p className="text-lg text-primary max-w-2xl mx-auto">
              Organizaciones que comparten nuestra visión y multiplican nuestro impacto
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#01778D]/10 rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-32 mb-4 bg-[#01778D]/20 rounded-xl"></div>
                  <div className="h-6 bg-[#01778D]/20 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-[#01778D]/20 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aliados.map((aliado, index) => (
                <div
                  key={index}
                  className="group bg-primary rounded-2xl p-6 border-2 border-primary hover:border-accent-orange transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-full h-32 mb-6 bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
                    {aliado.imagen ? (
                      <img
                        src={aliado.imagen}
                        alt={aliado.nombre}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-[#01778D]/30 text-4xl">🏢</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2 text-center">
                    {aliado.nombre}
                  </h3>
                  {(aliado.subtitulo || aliado.descripcion) && (
                    <p className="text-sm text-secondary mb-4 text-center">
                      {aliado.subtitulo || aliado.descripcion}
                    </p>
                  )}
                  {aliado.enlace && (
                    <a
                      href={aliado.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        aliado.tipoEnlace === 'instagram'
                          ? 'bg-accent-blue text-secondary hover:bg-accent-blue/80'
                          : 'bg-accent-orange text-secondary hover:bg-accent-orange/80'
                      }`}
                    >
                      {aliado.tipoEnlace === 'instagram' ? '📷 Ver Instagram' : '🌐 Visitar Sitio'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA Aliados */}
          <div className="mt-16 bg-gradient-to-r from-accent-orange/20 via-accent-blue/20 to-accent-green/20 rounded-3xl p-10 text-center border border-primary/10">
            <h3 className="text-2xl font-bold text-primary mb-4">¿Quieres ser nuestro aliado?</h3>
            <p className="text-primary mb-6 max-w-2xl mx-auto">
              Si tu organización comparte nuestra visión, contáctanos para explorar oportunidades de colaboración.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-primary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-[#01778D]/90 transition-colors duration-200 shadow-lg"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
