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
    <div ref={ref} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
      <div className="w-16 h-16 bg-accent-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-3xl font-bold text-accent-orange mb-2">{prefix}{count.toLocaleString()}</h3>
      <h4 className="text-lg font-semibold text-primary mb-2">{label}</h4>
      <p className="text-primary/70 text-sm">{description}</p>
    </div>
  );
}

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedStat value={200} label="Mascotas Esterilizadas" description="Prevención de sobrepoblación" icon="✂️" />
            <AnimatedStat value={500} label="Animales Desparasitados" description="Cuidado preventivo" icon="💊" />
            <AnimatedStat value={1500} label="Niños en Charlas" description="Tenencia responsable en escuelas" icon="👨‍👩‍👧‍👦" />
            <AnimatedStat value={300} label="Policías Capacitados" description="Normativa de bienestar animal" icon="👮‍♂️" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedStat value={50} label="Emprendimientos Apoyados" description="Sector de mascotas" icon="💼" />
            <AnimatedStat value={30} label="Campañas Realizadas" description="Tenencia responsable" icon="🏢" />
            <AnimatedStat value={3} label="Convenios Universitarios" description="Educación tecnológica" icon="🎓" />
            <AnimatedStat value={5} label="Estudiantes UAM" description="Paz y Competitividad" icon="📚" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedStat value={290} label="Kg de Alimento Donado" description="A albergues y fundaciones" icon="🍖" />
            <AnimatedStat value={50} label="Mascotas en Adopción" description="Entregadas a familias" icon="🏠" />
            <AnimatedStat value={10} label="Adopciones Acompañadas" description="Procesos responsables" icon="❤️" />
            <AnimatedStat value={5} label="Casos Financiados" description="Atención especializada" icon="🏥" />
          </div>
          
          <div className="bg-accent-orange/10 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-primary">
              <span className="text-accent-orange">Miembros de la Junta Defensora Animal de Manizales</span> desde julio de 2025
            </p>
          </div>
        </div>
      </section>

      {/* Historias Felices Section - Diseño con imágenes grandes */}
      <section className="py-20 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Historias Felices
            </h2>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Cada adopción exitosa es una historia de amor, esperanza y segundas oportunidades que nos inspira a seguir adelante
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Historia 1 - Samy y Perla Giraldo */}
            <div className="relative rounded-3xl overflow-hidden group h-[400px] md:h-[500px]">
              <img 
                src="/Perla y Samy.jpeg" 
                alt="Perla y Samy" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-accent-orange">Samy y Perla Giraldo</h3>
                <p className="text-secondary/90 leading-relaxed text-sm md:text-base mb-4">
                  &ldquo;Samy llegó de Cartagena, luego de que su dueño le pegó un machetazo, y yo la conocí en la Fundación Huella Amiga. 
                  Ella estaba en proceso de adopción, pero supongo que por la falta de su manito, no la adoptaron. 
                  Entonces yo decidí adoptarla.&rdquo;
                </p>
                <div className="inline-block bg-accent-orange/30 backdrop-blur-sm rounded-lg px-4 py-2 border-l-4 border-accent-orange">
                  <p className="text-sm text-secondary font-medium">- Perla Giraldo</p>
                </div>
              </div>
            </div>
            
            {/* Historia 2 - Monstro y Camilo Bravo */}
            <div className="relative rounded-3xl overflow-hidden group h-[500px] md:h-[650px]">
              <img 
                src="/Camilo y Monstro.jpg" 
                alt="Camilo y Monstro" 
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute top-0 right-0 p-8 md:p-12 max-w-xl text-right">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-accent-blue">Monstro y Camilo Bravo</h3>
                <p className="text-secondary/90 leading-relaxed text-sm md:text-base mb-4">
                  &ldquo;Desde las ausencias de mis viejos he sufrido de depresión. Pero desde que Monstro llegó a mi vida, 
                  a mitad de la pandemia, se volvió un perro sanador. Yo lo adopté de una Fundación en Bogotá, 
                  cuando tenía un mes. Encontraron a la mamá muerta con 3 hermanitos.&rdquo;
                </p>
                <div className="inline-block bg-accent-blue/30 backdrop-blur-sm rounded-lg px-4 py-2 border-r-4 border-accent-blue">
                  <p className="text-sm text-secondary font-medium">- Camilo Bravo</p>
                </div>
              </div>
            </div>
            
            {/* Historia 3 - Aby, Lía y Juliana Salazar - Contenedor unificado */}
            <div className="bg-accent-green/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-accent-green/30">
              {/* Imágenes */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Juliana y Lía */}
                <div className="relative overflow-hidden group h-[350px] md:h-[450px]">
                  <img 
                    src="/Juliana y Lía.jpeg" 
                    alt="Juliana y Lía" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-accent-green">Juliana y Lía</h3>
                  </div>
                </div>
                
                {/* Juliana y Aby */}
                <div className="relative overflow-hidden group h-[350px] md:h-[450px]">
                  <img 
                    src="/Juliana y Aby.jpeg" 
                    alt="Juliana y Aby" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-accent-green">Juliana y Aby</h3>
                  </div>
                </div>
              </div>
              
              {/* Texto */}
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4 text-accent-green text-center">Aby, Lía y Juliana Salazar</h3>
                <p className="text-secondary/90 leading-relaxed text-center mb-4 max-w-3xl mx-auto">
                  &ldquo;Yo tuve una experiencia traumática en Bogotá, cuando fui atracada y, consecuencia de eso, sufrí graves fracturas. 
                  La recuperación física, pero especialmente la emocional, tuve la fortuna de tener dos acompañantes de lujo: 
                  Lía y Aby. Ambas rescatadas, ambas con historias tristes, pero con todo el amor para brindarme durante una larga recuperación. 
                  Siempre que vengo de Argentina, aprovecho para saludarlas.&rdquo;
                </p>
                <p className="text-center text-accent-green font-medium">- Juliana Salazar</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action para Historias */}
          <div className="text-center mt-16">
            <div className="bg-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-secondary/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-accent-orange">
                ¿Quieres ser parte de una historia feliz?
              </h3>
              <p className="text-secondary/80 mb-6">
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
                  href="/contacto"
                  className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-secondary hover:text-primary transition-colors duration-200"
                >
                  Ser Voluntario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Con Propósito Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Con Propósito
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Servicios diseñados con amor para el bienestar de tu mascota
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mimos en Casa */}
            <div className="text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-6">
                {/* Image overlapping from top */}
                <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 z-10">
                  <img
                    src="/gatoanimado1.png" 
                    alt="Mimos en casa" 
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                  />
                </div>
                {/* Circle container with content */}
                <div className="w-full h-full bg-accent-orange rounded-full flex flex-col items-center justify-center px-4 sm:px-6">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Mimos en Casa</h3>
                  <p className="text-primary/80 leading-relaxed text-center text-sm sm:text-base">
                    Servicio de niñera en el hogar de tu mascota. Reducimos el estrés y brindamos 
                    cuidado integral: físico, emocional y recreativo con amor y responsabilidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Cursos y Talleres */}
            <div className="text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-6">
                {/* Image overlapping from top */}
                <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 z-10">
                  <img
                    src="/perroanimado2.png" 
                    alt="Cursos y Talleres" 
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                  />
                </div>
                {/* Circle container with content */}
                <div className="w-full h-full bg-accent-blue rounded-full flex flex-col items-center justify-center px-4 sm:px-6">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Cursos y Talleres</h3>
                  <p className="text-primary/80 leading-relaxed text-center text-sm sm:text-base">
                    Formación para tutores de mascotas. Primeros auxilios, comportamiento, 
                    adiestramiento y más. Aprende a convivir mejor con tu peludo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/con-proposito"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Ver Todos los Servicios
            </Link>
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
              href="/contacto"
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