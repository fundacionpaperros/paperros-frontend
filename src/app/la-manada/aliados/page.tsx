'use client';

import { useState, useEffect } from 'react';
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

export default function Aliados() {
  const [apiSponsors, setApiSponsors] = useState<ApiSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  // Aliados hardcodeados como fallback
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
      nombre: 'Latimos Bocalán',
      enlace: 'https://latimosbocalan.org/',
      tipoEnlace: 'web',
      imagen: '/latimoBocalan.png',
    },
    {
      nombre: 'EtoLógica',
      enlace: 'https://instagram.com/eto_logica',
      tipoEnlace: 'instagram',
      imagen: '/etologica.jpg',
    },
    {
      nombre: 'Secretaría de Medio Ambiente',
      imagen: '/logoMzl.png',
    },
    {
      nombre: 'Secretaría de Agricultura',
      imagen: '/logoMzl.png',
    },
    {
      nombre: 'Veterinaria Golden Vet',
      imagen: '/goldenVet.jpg',
    },
    {
      nombre: 'Veterinaria San Miguel',
      imagen: '/sanMiguel.jpg',
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

  // Función para construir la URL correcta de la imagen
  const getImageUrl = (logoUrl: string): string => {
    if (!logoUrl) return '';
    
    // Si la URL empieza con /static/, construir la URL completa del backend
    if (logoUrl.startsWith('/static/')) {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com';
      return `${backendUrl}${logoUrl}`;
    }
    
    // Si es una URL completa (http:// o https://), usarla directamente
    if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
      return logoUrl;
    }
    
    // Si es una ruta relativa que no empieza con /static/, asumir que es del backend
    return `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com'}${logoUrl.startsWith('/') ? logoUrl : '/' + logoUrl}`;
  };

  // Determinar si un enlace es de Instagram
  const isInstagramLink = (enlace?: string): boolean => {
    return enlace?.includes('instagram.com') || false;
  };

  // Convertir sponsors de API a formato de aliados
  const apiAliadosFormatted: Aliado[] = apiSponsors.map(sponsor => ({
    nombre: sponsor.nombre,
    enlace: sponsor.enlace,
    tipoEnlace: isInstagramLink(sponsor.enlace) ? 'instagram' : 'web',
    imagen: getImageUrl(sponsor.logo_url),
    descripcion: sponsor.descripcion,
  }));

  // Usar patrocinadores de la API si están disponibles, sino usar fallback
  const aliados = (apiAvailable && apiSponsors.length > 0) ? apiAliadosFormatted : fallbackAliados;

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              Aliados y Patrocinadores
            </h1>
            <div className="w-24 h-1 bg-accent-orange mx-auto mb-6"></div>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Organizaciones que comparten nuestra visión y nos ayudan a multiplicar nuestro impacto
            </p>
          </div>
        </div>
      </section>

      {/* Allies Section */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Skeleton loader mientras carga
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse">
                  <div className="w-full h-40 mb-4 bg-gray-200 rounded-lg"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {aliados.map((aliado, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Imagen del aliado */}
                  <div className="w-full h-40 mb-4 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden">
                    {aliado.imagen ? (
                      <img
                        src={aliado.imagen}
                        alt={aliado.nombre}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('span')) {
                            const fallback = document.createElement('span');
                            fallback.className = 'text-gray-400 text-xs text-center px-4';
                            fallback.textContent = 'Imagen del aliado';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs text-center px-4">
                        Imagen del aliado
                      </span>
                    )}
                  </div>

                  {/* Nombre */}
                  <h3 className="text-lg font-bold text-primary mb-2 text-center">
                    {aliado.nombre}
                  </h3>

                  {/* Subtítulo o descripción si existe */}
                  {(aliado.subtitulo || aliado.descripcion) && (
                    <p className="text-sm text-primary/70 mb-4 text-center">
                      {aliado.subtitulo || aliado.descripcion}
                    </p>
                  )}

                  {/* Enlace si existe */}
                  {aliado.enlace && (
                    <div className="mt-4">
                      <a
                        href={aliado.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                          aliado.tipoEnlace === 'instagram'
                            ? 'bg-accent-blue text-white hover:bg-accent-blue/90'
                            : 'bg-accent-orange text-white hover:bg-accent-orange/90'
                        }`}
                      >
                        {aliado.tipoEnlace === 'instagram' ? 'Ver Instagram' : 'Visitar Sitio Web'}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Join as Ally CTA */}
          <div className="bg-primary text-secondary rounded-lg p-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Quieres ser nuestro aliado?
              </h3>
              <p className="text-secondary/90 mb-6 text-lg">
                Si tu organización comparte nuestra visión y quiere contribuir al bienestar animal, 
                contáctanos para explorar oportunidades de colaboración.
              </p>
              <a
                href="/contacto/escribenos"
                className="bg-accent-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
