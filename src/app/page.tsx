'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EventSkeleton } from '@/components/SkeletonLoader';
import api, { checkApiAvailability } from '@/lib/api';

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
      image: "/Banner página web_Invitación 1.png",
      alt: "Festival Pa Dejar Huella - Invitación 1"
    },
    {
      id: 2,
      image: "/Banner página web_Invitación 2.png",
      alt: "Festival Pa Dejar Huella - Invitación 2"
    },
    {
      id: 3,
      image: "/Banner página web_Programación viernes 21.png",
      alt: "Festival Pa Dejar Huella - Programación Viernes 21"
    },
    {
      id: 4,
      image: "/Banner página web_Programación sábado 22.png",
      alt: "Festival Pa Dejar Huella - Programación Sábado 22"
    }
  ];

  const loadEvents = async () => {
    const available = await checkApiAvailability();
    setApiAvailable(available);
    
    if (!available) {
      setLoadingEvents(false);
      return;
    }

    try {
      const response = await api.get('/events?active_only=true&limit=100');
      
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
    } catch (error) {
      console.error('Error loading events:', error);
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
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000';
      return `${backendUrl}${imageUrl}`;
    }
    
    // Si es una URL completa (http:// o https://), usarla directamente
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si es una ruta relativa que no empieza con /static/, asumir que es del backend
    return `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
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

  // Auto-advance carousel - responsive behavior
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate max slides based on screen size
  const maxSlides = loadingEvents ? 0 : (isMobile ? finalEvents.length : finalEvents.length - 1); // 1 on mobile, 2 on desktop
  
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
                  href="/la-manada/nuestra-historia"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EventSkeleton />
                <EventSkeleton />
              </div>
            ) : (
              <>
                {/* Main Carousel */}
                <div className="overflow-hidden rounded-2xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)` 
                    }}
                  >
                    {finalEvents.map((event) => (
                      <div key={event.id} className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0 p-1`}>
                        <div className="bg-secondary rounded-2xl p-1 shadow-lg hover:shadow-xl h-full border-2 border-accent-orange hover:border-accent-blue transition-all duration-300">
                          <div className="relative w-full h-96 rounded-xl overflow-hidden flex items-center justify-center">
                            {event.image && event.image.trim() !== '' ? (
                              <img
                                src={event.image}
                                alt={event.alt}
                                className="object-contain rounded-lg w-full h-full"
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondary/90 hover:bg-secondary text-primary p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Evento anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary/90 hover:bg-secondary text-primary p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
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
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-accent-orange scale-125' 
                      : 'bg-secondary/50 hover:bg-secondary/70'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
        </div>
      </section>

      {/* Historias Felices Section - Reorganizada */}
      <section className="py-20 bg-secondary text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Historias Felices
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Cada adopción exitosa es una historia de amor, esperanza y segundas oportunidades que nos inspira a seguir adelante
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Historia 1 - Max */}
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105 group">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange/80 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg mb-4">
                  <span className="text-3xl text-white">🐕</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-accent-orange">Max</h3>
              </div>
              <p className="text-primary/90 leading-relaxed mb-6">
                Max llegó a nosotros después de ser abandonado en la calle. Estaba desnutrido y asustado. 
                Hoy es el compañero más fiel de la familia Rodríguez y el mejor amigo de sus dos hijos.
              </p>
              <div className="bg-accent-orange/20 rounded-lg p-4 border-l-4 border-accent-orange">
                <p className="text-sm text-accent-orange font-semibold italic">
                  &ldquo;Su transformación nos llena de orgullo y alegría cada día&rdquo;
                </p>
                <p className="text-xs text-primary/70 mt-1">- Familia Rodríguez</p>
              </div>
            </div>
            
            {/* Historia 2 - Luna */}
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105 group">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-blue to-accent-blue/80 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg mb-4">
                  <span className="text-3xl text-white">🐱</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-accent-blue">Luna</h3>
              </div>
              <p className="text-primary/90 leading-relaxed mb-6">
                Luna era muy tímida cuando la rescatamos de un refugio. Le costaba confiar en las personas. 
                Con paciencia y amor, se convirtió en la reina de la casa y la consentida de toda la familia.
              </p>
              <div className="bg-accent-blue/20 rounded-lg p-4 border-l-4 border-accent-blue">
                <p className="text-sm text-accent-blue font-semibold italic">
                  &ldquo;No podemos imaginar la vida sin ella&rdquo;
                </p>
                <p className="text-xs text-primary/70 mt-1">- María González</p>
              </div>
            </div>
            
            {/* Historia 3 - Rocky */}
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105 group">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-green to-accent-green/80 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg mb-4">
                  <span className="text-3xl text-white">🐕</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-accent-green">Rocky</h3>
              </div>
              <p className="text-primary/90 leading-relaxed mb-6">
                Rocky tenía miedo de los humanos debido a maltratos anteriores. Era agresivo y desconfiado. 
                Hoy es el mejor amigo de los niños del barrio y un ejemplo de cómo el amor puede transformar cualquier vida.
              </p>
              <div className="bg-accent-green/20 rounded-lg p-4 border-l-4 border-accent-green">
                <p className="text-sm text-accent-green font-semibold italic">
                  &ldquo;El amor todo lo puede&rdquo;
                </p>
                <p className="text-xs text-primary/70 mt-1">- Comunidad del Barrio San José</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action para Historias */}
          <div className="text-center mt-16">
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-accent-orange">
                ¿Quieres ser parte de una historia feliz?
              </h3>
              <p className="text-primary/80 mb-6">
                Cada día, más animales esperan una segunda oportunidad. Únete a nuestra misión y 
                transforma una vida para siempre.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/adopta"
                  className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
                >
                  Ver Animales Disponibles
                </Link>
                <Link 
                  href="/contacto/voluntario"
                  className="border-2 border-accent-orange text-accent-orange px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange hover:text-white transition-colors duration-200"
                >
                  Ser Voluntario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-30">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nuestros Servicios
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paseos Felices */}
            <div className="text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-90 md:h-90 mx-auto mb-6">
                {/* Image overlapping from top */}
                <div className="absolute -top-12 sm:-top-16 md:-top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <img 
                    src="/perroanimado1.png" 
                    alt="Paseos felices" 
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30"
                  />
                </div>
                {/* Circle container with content */}
                <div className="w-full h-full bg-accent-green rounded-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">Paseos Felices</h3>
                  <p className="text-primary/80 leading-relaxed text-center text-sm sm:text-base">
                    Paseo consciente cumpliendo con la Ley Kiara. Técnicos auxiliares veterinarios a cargo. 
                    Grupos pequeños, sin mezclar tamaños, priorizando su bienestar y seguridad.
                  </p>
                </div>
              </div>
            </div>

            {/* Mimos en Casa */}
            <div className="text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-90 md:h-90 mx-auto mb-6">
                {/* Image overlapping from top */}
                <div className="absolute -top-12 sm:-top-16 md:-top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <img
                    src="/gatoanimado1.png" 
                    alt="Mimos en casa" 
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30"
                  />
                </div>
                {/* Circle container with content */}
                <div className="w-full h-full bg-accent-orange rounded-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">Mimos en Casa</h3>
                  <p className="text-primary/80 leading-relaxed text-center text-sm sm:text-base">
                    Servicio de niñera en el hogar de tu mascota. Reducimos el estrés y brindamos 
                    cuidado integral: físico, emocional y recreativo con amor y responsabilidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Charlas Educativas */}
            <div className="text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-90 md:h-90 mx-auto mb-6">
                {/* Image overlapping from top */}
                <div className="absolute -top-12 sm:-top-16 md:-top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <img
                    src="/perroanimado2.png" 
                    alt="Charlas educativas" 
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30"
                  />
                </div>
                {/* Circle container with content */}
                <div className="w-full h-full bg-accent-blue rounded-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">Charlas Educativas</h3>
                  <p className="text-primary/80 leading-relaxed text-center text-sm sm:text-base">
                    Charlas y talleres especializados para promover la tenencia responsable. 
                    Educamos sobre bienestar animal, cuidados básicos y adopción responsable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent-orange text-sm font-medium uppercase tracking-wide mb-4">
              Nuestro Proceso
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Cómo funciona la adopción responsable
            </h2>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Un proceso diseñado para garantizar el bienestar animal y la compatibilidad perfecta
            </p>
          </div>
          
          {/* Process Flow */}
          <div className="relative">
            {/* Connection Line - Hidden on mobile */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-accent-orange/30 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  {/* Connection arrow to next step */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-accent-orange border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-accent-orange">Registro</h3>
                <p className="text-secondary/80 leading-relaxed text-sm">
                  Registro del adoptante y validación en bases de datos internas
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  {/* Connection arrow to next step */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-accent-orange border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-accent-orange">Formación</h3>
                <p className="text-secondary/80 leading-relaxed text-sm">
                  Curso formativo sobre adopción responsable y normativa colombiana
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  {/* Connection arrow to next step */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-accent-orange border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-accent-orange">Evaluación</h3>
                <p className="text-secondary/80 leading-relaxed text-sm">
                  Evaluación mediante preguntas y certificación digital
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-accent-orange">Seguimiento</h3>
                <p className="text-secondary/80 leading-relaxed text-sm">
                  Acompañamiento posterior con revisiones periódicas y seguimiento anual
                </p>
              </div>
            </div>
          </div>
          
          {/* Process Summary */}
          <div className="mt-16 text-center">
            <div className="bg-accent-orange/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-accent-orange mb-4">
                Proceso Completo de Adopción
              </h3>
              <p className="text-secondary/80 leading-relaxed">
                Desde el registro inicial hasta el seguimiento continuo, cada paso está diseñado para garantizar 
                que tanto el adoptante como la mascota tengan la mejor experiencia posible. Nuestro compromiso 
                es con el bienestar animal y la adopción responsable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-accent-orange text-sm font-medium uppercase tracking-wide">
                  ¿Por qué elegirnos?
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  Transformamos la cultura de adopción en Colombia
                </h2>
                <p className="text-lg text-primary/80 leading-relaxed">
                  A diferencia de un albergue tradicional, nuestra misión se enfoca en promover 
                  la adopción responsable y generar conciencia sobre el bienestar animal. 
                  Garantizamos que cada proceso se realice de forma ética y sostenible.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Proceso Riguroso</h3>
                    <p className="text-primary/80">Evaluación completa y certificación digital</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Seguimiento Continuo</h3>
                    <p className="text-primary/80">Acompañamiento posterior con revisiones periódicas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Albergues Aliados</h3>
                    <p className="text-primary/80">Trabajamos con rescatistas y albergues confiables</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <img
                    src="/image 13.png"
                    alt="Fundación Pa&apos; Perros"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-orange rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-blue rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para darle un hogar a tu mejor amigo?
          </h2>
          <p className="text-xl mb-8 text-secondary/80">
            Únete a nuestra misión de promover la adopción responsable en Colombia. 
            Educamos, acompañamos y garantizamos que cada decisión esté guiada por el respeto a la vida animal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/adopta"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
            >
              Ver Animales Disponibles
            </Link>
            <Link 
              href="/contacto/escribenos"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-secondary hover:text-primary transition-colors duration-200"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}