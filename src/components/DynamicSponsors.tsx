'use client';

import { useState, useEffect } from 'react';
import { SponsorSkeleton } from './SkeletonLoader';
import api from '@/lib/api';

interface Sponsor {
  id: number;
  nombre: string;
  logo_url: string;
  enlace?: string;
  descripcion?: string;
  orden: number;
}

export function DynamicSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      const response = await api.get('/sponsors/?active_only=true&limit=100');
      const sorted = response.data.sort((a: Sponsor, b: Sponsor) => a.orden - b.orden);
      setSponsors(sorted);
      setApiAvailable(true);
    } catch (error) {
      console.error('Error loading sponsors:', error);
      setApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
            <SponsorSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (!apiAvailable || sponsors.length === 0) {
    // Show skeleton loader if no API or no sponsors
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
            <SponsorSkeleton />
          </div>
        ))}
      </div>
    );
  }

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sponsors.map((sponsor) => {
        const imageUrl = sponsor.logo_url ? getImageUrl(sponsor.logo_url) : '';
        
        return (
          <div key={sponsor.id} className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={sponsor.nombre} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Si falla la carga, mostrar el emoji por defecto
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('span')) {
                      const fallback = document.createElement('span');
                      fallback.className = 'text-3xl';
                      fallback.textContent = '🏢';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <span className="text-3xl">🏢</span>
              )}
            </div>
            <h4 className="text-xl font-bold text-primary mb-4 text-center">{sponsor.nombre}</h4>
            {sponsor.descripcion && (
              <p className="text-primary/80 text-center mb-4">{sponsor.descripcion}</p>
            )}
            {sponsor.enlace && (
              <a 
                href={sponsor.enlace} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-accent-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
              >
                Visitar Sitio Web
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

