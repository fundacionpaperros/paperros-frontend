'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { EventSkeleton } from '@/components/SkeletonLoader';
import api from '@/lib/api';

// Hook para animar contadores cuando son visibles
function useCounterAnimation(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * targetValue));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration, hasAnimated]);

  return { count, ref };
}

// Componente para cada stat con contador
function AnimatedStat({ value, label, description, icon }: { value: number; label: string; description: string; icon: string }) {
  const { count, ref } = useCounterAnimation(value);
  const prefix = value >= 10 ? '+' : '';
  
  return (
    <div ref={ref} className="h-full bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
      <div className="w-16 h-16 bg-accent-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-3xl font-bold text-accent-orange mb-2">{prefix}{count.toLocaleString('es-CO')}</h3>
      <h4 className="text-lg font-semibold text-primary mb-2">{label}</h4>
      <p className="text-primary/70 text-sm">{description}</p>
    </div>
  );
}

const impactStats = [
  { value: 600, label: 'Mascotas Esterilizadas', description: 'Prevención de sobrepoblación', icon: '✂️' },
  { value: 600, label: 'Animales Desparasitados', description: 'Cuidado preventivo', icon: '💊' },
  { value: 2000, label: 'Niños en Charlas', description: 'Tenencia responsable en escuelas', icon: '👨‍👩‍👧‍👦' },
  { value: 550, label: 'Policías Capacitados', description: 'Normativa de bienestar animal', icon: '👮‍♂️' },
  { value: 60, label: 'Emprendimientos Apoyados', description: 'Sector de mascotas', icon: '💼' },
  { value: 40, label: 'Campañas Realizadas', description: 'Tenencia responsable', icon: '🏢' },
  { value: 5, label: 'Convenios Académicos', description: 'Alianzas con instituciones educativas', icon: '🎓' },
  { value: 8, label: 'Estudiantes UAM', description: 'Paz y Competitividad', icon: '📚' },
  { value: 3000, label: 'Kg de Alimento Donado', description: 'A albergues y fundaciones', icon: '🍖' },
  { value: 80, label: 'Mascotas en Adopción', description: 'Entregadas a familias', icon: '🏠' },
  { value: 15, label: 'Adopciones Acompañadas', description: 'Procesos responsables', icon: '❤️' },
  { value: 8, label: 'Casos Financiados', description: 'Atención especializada', icon: '🏥' },
  { value: 2, label: 'Proyectos Realizados', description: 'Con impacto en la comunidad', icon: '📋' },
];

interface ApiEvent {
  id: number;
  nombre: string;
  imagen_url: string;
  fecha: string;
  lugar?: string;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiEvents, setApiEvents] = useState<ApiEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);
  
  // Eventos hardcodeados como fallback
  const fallbackEvents = [
    {
      id: 1,
      image: "/Banner gatos.png",
      alt: "Curso Entendiendo a mi gato"
    },
    {
      id: 2,
      image: "/Banner primeros auxilios.png",
      alt: "Curso de primeros auxilios para perros y gatos"
    }
  ];

  const loadEvents = async () => {
    try {
      const response = await api.get('/events/?active_only=true&limit=100');
      
      // Filter out past events
      const now = new Date();
      const upcomingEvents = response.data.filter((event: ApiEvent) => {
        const eventDate = new Date(event.fecha);
        return eventDate >= now;
      });

      // Sort by date
      upcomingEvents.sort((a: ApiEvent, b: ApiEvent) => {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      });

      setApiEvents(upcomingEvents);
      setApiAvailable(true);
    } catch (error) {
      console.error('Error loading events:', error);
      setApiAvailable(false);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Función para construir la URL correcta de la imagen
  const getEventImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '';
    
    // Si la URL empieza con /static/, construir la URL completa del backend
    if (imageUrl.startsWith('/static/')) {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com';
      return `${backendUrl}${imageUrl}`;
    }
    
    // Si es una URL completa (http:// o https://), usarla directamente
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si es una ruta relativa que no empieza con /static/, asumir que es del backend
    return `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com'}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  // Use API events if available and have events, otherwise use fallback
  const events = (apiAvailable && apiEvents.length > 0)
    ? apiEvents
        .filter(event => event.imagen_url && event.imagen_url.trim() !== '')
        .map(event => ({
          id: event.id,
          image: getEventImageUrl(event.imagen_url),
          alt: event.nombre
        }))
    : fallbackEvents;
  
  // If no valid events from API, use fallback
  const finalEvents = (apiAvailable && apiEvents.length > 0 && events.length === 0) 
    ? fallbackEvents 
    : events;

  // Calculate max slides - always show 1 image at a time
  const maxSlides = loadingEvents ? 0 : finalEvents.length;
  
  useEffect(() => {
    if (maxSlides === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [maxSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };


  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                  <p className="text-accent-orange text-sm font-medium uppercase tracking-wide">
                    Bienvenidos a Fundación Pa&apos; Perros
                  </p>
                <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                  Transformando vidas, una pata a la vez
                </h1>
                  <p className="text-lg text-primary/80 leading-relaxed max-w-lg">
                    En Fundación Pa&apos; Perros creemos que cada vida merece una segunda oportunidad. 
                    Nacimos para cuidar, proteger y transformar la historia de los animales que han sufrido 
                    el abandono o la indiferencia.
                  </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/adopta"
                  className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 text-center cursor-pointer"
                >
                  Adoptar Ahora
                </Link>
                <Link 
                  href="/la-manada"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-secondary transition-colors duration-200 text-center cursor-pointer"
                >
                  Conoce Nuestra Historia
                </Link>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-accent-blue rounded-full flex items-center justify-center">
                  <img
                    src="/Perro inicio.png"
                    alt="Cuidado de mascotas"
                    className="object-cover rounded-full w-full h-full"
                  />
                </div>
                {/* Small overlapping image */}
                <div className="absolute -bottom-1 w-32 h-32 rounded-full flex items-center justify-centershadow-lg">
                  <img
                    src="/perro1.png"
                    alt="Perro feliz"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Novedades y Eventos - Carrusel */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Novedades y Eventos
            </h2>
            <p className="text-secondary/80 text-lg">
              Mantente al día con nuestras actividades y campañas
            </p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative">
            {loadingEvents ? (
              <div className="flex justify-center">
                <div className="max-w-4xl w-full">
                  <EventSkeleton />
                </div>
              </div>
            ) : (
              <>
                {/* Main Carousel - Single large centered image */}
                <div className="overflow-hidden rounded-2xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSlide * 100}%)` 
                    }}
                  >
                    {finalEvents.map((event) => (
                      <div key={event.id} className="w-full flex-shrink-0 px-4">
                        <div className="bg-secondary rounded-2xl p-2 shadow-xl hover:shadow-2xl border-2 border-accent-orange hover:border-accent-blue transition-all duration-300 max-w-5xl mx-auto">
                          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[650px] rounded-xl overflow-hidden flex items-center justify-center bg-white">
                            {event.image && event.image.trim() !== '' ? (
                              <img
                                src={event.image}
                                alt={event.alt}
                                className="object-contain w-full h-full"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* Navigation Arrows - Show when multiple slides */}
            {!loadingEvents && maxSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#F5E6D3] hover:bg-accent-orange text-primary hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 cursor-pointer"
                  aria-label="Evento anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#F5E6D3] hover:bg-accent-orange text-primary hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 cursor-pointer"
                  aria-label="Siguiente evento"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Dots Indicator - Show when multiple slides */}
          {!loadingEvents && maxSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: maxSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                    index === currentSlide 
                      ? 'bg-accent-orange scale-125' 
                      : 'bg-[#F5E6D3] hover:bg-accent-orange/50'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
        </div>
      </section>

      {/* Impacto en Números Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nuestro Impacto en Números
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Cada cifra representa vidas transformadas y comunidades más conscientes
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                <AnimatedStat {...stat} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
              <p className="text-lg font-semibold text-primary">
                <span className="text-accent-orange">Miembros de la Junta Defensora Animal (JUDEA) de Manizales</span> desde julio de 2025
              </p>
            </div>
            <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
              <p className="text-lg font-semibold text-primary">
                <span className="text-accent-orange">Directivos de Alegato Caldas</span> desde febrero de 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
