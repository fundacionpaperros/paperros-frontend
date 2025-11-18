'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';
import Link from 'next/link';

interface HomeInfo {
  tipo_vivienda: string;
  tiene_patio: boolean;
  metros_cuadrados?: number;
  numero_personas: number;
  tiene_ninos: boolean;
  edad_ninos?: string;
  tiene_otros_animales: boolean;
  otros_animales_descripcion?: string;
}

interface Adoption {
  id: number;
  animal_id: number;
  animal?: {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    talla: string;
    color: string;
    foto_url?: string;
    estado: string;
  };
  estado: string;
}

interface Appointment {
  id: number;
  fecha_hora: string | Date;
  lugar: string;
  estado: string;
  adopcion_id: number;
  observaciones?: string;
  created_at?: string;
  updated_at?: string;
}

export default function ConfirmacionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [homeInfo, setHomeInfo] = useState<HomeInfo | null>(null);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const validateAndLoad = async () => {
      // Validar que la sesión sea realmente válida
      const authenticated = await authService.validateSession();
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      // Validar que el usuario tenga bandera verde
      try {
        const progress = await api.get<{ bandera: string }>('/adoption-process/progress');
        const { bandera } = progress.data;
        
        if (bandera !== 'verde') {
          // Redirigir inmediatamente a /adopta con el parámetro de bandera
          router.push(`/adopta?bandera=${bandera}`);
          return;
        }
      } catch (err: unknown) {
        const apiError = err as ApiErrorResponse;
        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
          router.push('/auth/login');
          return;
        }
        setError('Error al validar acceso');
        return;
      }

      loadData();
    };

    validateAndLoad();
  }, [router]);

  const loadData = async () => {
    try {
      // Cargar información del hogar
      try {
        const homeInfoResponse = await api.get('/adoption-process/home-info');
        setHomeInfo(homeInfoResponse.data);
      } catch (err) {
        console.error('Error loading home info:', err);
      }

      // Cargar adopciones con información de animales
      const adoptionsResponse = await api.get('/adoption-process/my-adoptions');
      const pendingAdoptions = adoptionsResponse.data.filter((a: { estado: string | { value?: string } }) => {
        const estadoRaw = a.estado;
        const estado: string = typeof estadoRaw === 'string' ? estadoRaw : (estadoRaw?.value || String(estadoRaw) || '');
        return ['match_realizado', 'cita_agendada', 'en_proceso'].includes(estado);
      });
      setAdoptions(pendingAdoptions);

      // Cargar citas agendadas
      const appointmentsList: Appointment[] = [];
      for (const adoption of pendingAdoptions) {
        try {
          const appointmentsResponse = await api.get(`/adoption-process/adoptions/${adoption.id}/appointments`);
          if (appointmentsResponse.data && appointmentsResponse.data.length > 0) {
            appointmentsList.push(...appointmentsResponse.data);
          }
        } catch {
          // Si no hay citas para esta adopción, continuar
        }
      }
      setAppointments(appointmentsList);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al cargar información'));
    } finally {
      setLoading(false);
    }
  };

  const getAnimalImageUrl = (imageUrl?: string): string => {
    if (!imageUrl) return '';
    
    if (imageUrl.startsWith('/static/')) {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000';
      return `${backendUrl}${imageUrl}`;
    }
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    return `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  const formatDate = (dateString: string | Date) => {
    // Las fechas vienen en GMT+5, mostrarlas directamente sin conversiones
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando información...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Link href="/adopta" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de confirmación */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            ¡Proceso Completado Exitosamente!
          </h1>
          <p className="text-xl text-gray-600">
            Te esperamos para que conozcas a {adoptions.length === 1 ? 'tu nueva mascota' : 'tus nuevas mascotas'}
          </p>
        </div>

        {/* Resumen de Información del Hogar */}
        {homeInfo && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Información de tu Hogar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tipo de Vivienda</p>
                <p className="font-semibold capitalize">{homeInfo.tipo_vivienda}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">¿Tiene Patio?</p>
                <p className="font-semibold">{homeInfo.tiene_patio ? 'Sí' : 'No'}</p>
              </div>
              {homeInfo.metros_cuadrados && (
                <div>
                  <p className="text-sm text-gray-500">Metros Cuadrados</p>
                  <p className="font-semibold">{homeInfo.metros_cuadrados} m²</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Número de Personas</p>
                <p className="font-semibold">{homeInfo.numero_personas}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">¿Hay Niños?</p>
                <p className="font-semibold">{homeInfo.tiene_ninos ? 'Sí' : 'No'}</p>
              </div>
              {homeInfo.tiene_ninos && homeInfo.edad_ninos && (
                <div>
                  <p className="text-sm text-gray-500">Edades de los Niños</p>
                  <p className="font-semibold">{homeInfo.edad_ninos}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">¿Tiene Otros Animales?</p>
                <p className="font-semibold">{homeInfo.tiene_otros_animales ? 'Sí' : 'No'}</p>
              </div>
              {homeInfo.tiene_otros_animales && homeInfo.otros_animales_descripcion && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Descripción de Otros Animales</p>
                  <p className="font-semibold">{homeInfo.otros_animales_descripcion}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mascotas Seleccionadas */}
        {adoptions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {adoptions.length === 1 ? 'Mascota Seleccionada' : 'Mascotas Seleccionadas'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptions.map((adoption) => {
                const animal = adoption.animal;
                if (!animal) return null;
                
                return (
                  <div key={adoption.id} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
                    {animal.foto_url ? (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={getAnimalImageUrl(animal.foto_url)}
                          alt={animal.nombre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-400">Sin foto</span></div>';
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 mb-4 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Sin foto</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-primary mb-2">{animal.nombre}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-semibold">Especie:</span> {animal.especie}</p>
                      <p><span className="font-semibold">Raza:</span> {animal.raza}</p>
                      <p><span className="font-semibold">Edad:</span> {animal.edad} meses</p>
                      <p><span className="font-semibold">Talla:</span> {animal.talla}</p>
                      <p><span className="font-semibold">Color:</span> {animal.color}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Información de la Cita */}
        {appointments.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Información de la Cita</h2>
            
            {/* Mostrar una sola cita si todas son para la misma fecha/hora */}
            {appointments.length > 0 && (
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Cita para conocer {adoptions.length === 1 ? 'tu mascota' : 'tus mascotas'}
                  </h3>
                  {adoptions.length > 1 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Mascotas incluidas en esta cita:</p>
                      <div className="flex flex-wrap gap-2">
                        {adoptions.map((adoption) => {
                          const animal = adoption.animal;
                          return animal ? (
                            <span key={adoption.id} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                              {animal.nombre}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-700">Fecha y Hora:</span>
                      <span className="ml-2 text-gray-600">{formatDate(appointments[0].fecha_hora)}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-700">Lugar:</span>
                      <span className="ml-2 text-gray-600">{appointments[0].lugar}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-700">Estado:</span>
                      <span className="ml-2 text-gray-600 capitalize">{appointments[0].estado}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mensaje Final */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center border border-primary/20">
          <h3 className="text-2xl font-bold text-primary mb-4">
            ¡Gracias por completar el proceso de adopción!
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Estamos muy emocionados de que hayas elegido darle un hogar a {adoptions.length === 1 ? 'esta mascota' : 'estas mascotas'}.
            Te esperamos en la fecha y hora acordada para que puedas conocer {adoptions.length === 1 ? 'a tu nueva compañía' : 'a tus nuevas compañías'}.
          </p>
          <p className="text-gray-600 mb-6">
            Si tienes alguna pregunta o necesitas modificar tu cita, por favor contáctanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/adopta/mis-adopciones"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer transition-all"
            >
              Ver Mis Adopciones
            </Link>
            <Link
              href="/"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-semibold cursor-pointer transition-all"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

