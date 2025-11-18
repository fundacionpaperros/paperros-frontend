'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface Adoption {
  id: number;
  animal_id: number;
  estado: string;
  animal_nombre?: string;
  animal?: {
    id: number;
    nombre: string;
    especie?: string;
    raza?: string;
  };
}

interface Appointment {
  id: number;
  adopcion_id?: number; // Mantener para compatibilidad
  adoption_ids?: number[]; // Lista de IDs de adopciones asociadas
  fecha_hora: string;
  lugar: string;
  estado: string;
  observaciones?: string;
  animals?: Array<{
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    foto_url?: string;
  }>;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [appointments, setAppointments] = useState<Record<number, Appointment[]>>({});
  const [loading, setLoading] = useState(true);

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
      }

      loadData();
    };

    validateAndLoad();
  }, [router]);

  const loadData = async () => {
    try {
      const adoptionsRes = await api.get('/adoption-process/my-adoptions');
      setAdoptions(adoptionsRes.data);

      // Obtener todas las citas del usuario agrupadas
      // Primero obtener todas las adopciones con sus citas
      const appointmentsMap: Record<number, Appointment[]> = {};
      const allAppointments: Appointment[] = [];
      const seenAppointmentIds = new Set<number>();
      
      for (const adoption of adoptionsRes.data) {
        try {
          const appsRes = await api.get(`/adoption-process/adoptions/${adoption.id}/appointments`);
          appointmentsMap[adoption.id] = appsRes.data;
          
          // Agregar citas únicas a la lista general
          for (const app of appsRes.data) {
            if (!seenAppointmentIds.has(app.id)) {
              seenAppointmentIds.add(app.id);
              allAppointments.push(app);
            }
          }
        } catch {
          appointmentsMap[adoption.id] = [];
        }
      }
      
      setAppointments(appointmentsMap);
      
      // Si hay citas, podemos usarlas directamente
      if (allAppointments.length > 0) {
        // Las citas ya están cargadas en appointmentsMap
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background py-12 text-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Mis Citas
        </h1>

        {adoptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">No tienes adopciones en proceso.</p>
            <Link href="/adopta" className="text-primary hover:underline">
              Ver animales disponibles
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mostrar citas únicas con todos sus animales */}
            {(() => {
              // Recopilar todas las citas únicas
              const uniqueAppointmentsMap = new Map<number, Appointment>();
              
              // Recorrer todas las adopciones y sus citas
              for (const adoption of adoptions) {
                const adoptionAppointments = appointments[adoption.id] || [];
                for (const appointment of adoptionAppointments) {
                  if (!uniqueAppointmentsMap.has(appointment.id)) {
                    uniqueAppointmentsMap.set(appointment.id, appointment);
                  }
                }
              }
              
              const uniqueAppointments = Array.from(uniqueAppointmentsMap.values());
              
              if (uniqueAppointments.length === 0) {
                return (
                  <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <p className="text-gray-500">No hay citas programadas aún.</p>
                  </div>
                );
              }

              return uniqueAppointments.map((appointment, index) => {
                // Obtener todos los animales asociados a esta cita
                const appointmentAdoptionIds = appointment.adoption_ids || [];
                const appointmentAnimals: string[] = [];
                
                for (const adoptionId of appointmentAdoptionIds) {
                  const adoption = adoptions.find(a => a.id === adoptionId);
                  if (adoption) {
                    const animalName = adoption.animal?.nombre || adoption.animal_nombre || `Animal #${adoption.animal_id}`;
                    if (!appointmentAnimals.includes(animalName)) {
                      appointmentAnimals.push(animalName);
                    }
                  }
                }
                
                // Si no hay animales en adoption_ids, usar los que vienen en la respuesta
                const animals = appointment.animals || [];
                const animalNames = animals.length > 0 
                  ? animals.map(a => a.nombre)
                  : appointmentAnimals;

                return (
                  <div key={appointment.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold mb-2">
                        Cita {uniqueAppointments.length > 1 ? `#${index + 1}` : ''}
                      </h2>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Mascotas incluidas:</p>
                        <div className="flex flex-wrap gap-2">
                          {animalNames.length > 0 ? (
                            animalNames.map((animalName, idx) => (
                              <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {animalName}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Sin animales asociados</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-primary pl-4 space-y-2">
                      <p className="font-semibold text-lg">
                        {(() => {
                          // Las fechas vienen en GMT+5, mostrarlas directamente sin conversiones
                          const date = new Date(appointment.fecha_hora);
                          return date.toLocaleString('es-CO', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          });
                        })()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Lugar:</span> {appointment.lugar}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Estado:</span>{' '}
                        <span className="capitalize">{appointment.estado}</span>
                      </p>
                      {appointment.observaciones && (
                        <p className="text-sm text-gray-500 mt-2">
                          {appointment.observaciones}
                        </p>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

