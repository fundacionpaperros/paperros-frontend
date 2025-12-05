'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface AvailableSlot {
  available_slots: string[];
  start_date: string;
  end_date: string;
}

interface Adoption {
  id: number;
  animal_id: number;
  animal?: {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    foto_url?: string;
    estado: string;
  };
  animal_nombre?: string;
}

export default function CitaPage() {
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string>(''); // Slot ISO completo seleccionado
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      // Cargar adopciones pendientes (estados que permiten agendar cita)
      const adoptionsResponse = await api.get('/adoption-process/my-adoptions');
      
      // Filtrar adopciones con estado match_realizado y que el animal esté disponible
      const pendingAdoptions = adoptionsResponse.data.filter((a: { estado: string | { value?: string }; animal?: { estado?: string | { value?: string } }; animal_id?: number }) => {
        // Verificar estado - puede venir como string o como objeto con .value
        const estadoRaw = a.estado;
        const estado: string = typeof estadoRaw === 'string' ? estadoRaw : (estadoRaw?.value || String(estadoRaw) || '');
        const estadosValidos = ['match_realizado', 'en_proceso', 'pendiente', 'pendiente_match'];
        
        // Verificar que el estado sea válido
        const estadoValido = estadosValidos.includes(estado);
        
        // Verificar que el animal esté disponible
        const animalEstado = a.animal?.estado;
        const animalEstadoStr: string = typeof animalEstado === 'string' ? animalEstado : (typeof animalEstado === 'object' && animalEstado?.value ? animalEstado.value : String(animalEstado || ''));
        const animalDisponible = a.animal && animalEstadoStr === 'disponible';
        
        return estadoValido && animalDisponible;
      });
      
      if (pendingAdoptions.length === 0) {
        // Si no hay adopciones pendientes, redirigir a match
        setError('No hay adopciones pendientes. Por favor, selecciona animales nuevamente.');
        setTimeout(() => {
          router.push('/adopta/match');
        }, 2000);
        setLoading(false);
        return;
      }
      
      setAdoptions(pendingAdoptions);

      // Cargar horarios disponibles
      const slotsResponse = await api.get<AvailableSlot>('/adoption-process/appointments/availability');
      setAvailableSlots(slotsResponse.data.available_slots);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al cargar datos'));
    } finally {
      setLoading(false);
    }
  }, [router]);

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
        setLoading(false);
        return;
      }

      loadData();
    };

    validateAndLoad();
  }, [router, loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setError('Debe seleccionar fecha y hora');
      return;
    }

    if (adoptions.length === 0) {
      setError('No hay adopciones pendientes para agendar');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Usar directamente el slot ISO del backend
      // Crear una sola cita para todas las adopciones del proceso
      const adoptionIds = adoptions.map(a => a.id);
      const animalNames = adoptions.map(a => a.animal?.nombre || `Animal #${a.animal_id}`).join(', ');
      
      // Crear la cita con todas las adopciones
      await api.post('/adoption-process/appointments', {
        adopcion_ids: adoptionIds,
        fecha_hora: selectedSlot, // Usar el slot ISO directamente
        lugar: 'Fundación Pa&apos; Perros - Sede Principal',
        observaciones: `Cita para conocer ${adoptions.length === 1 ? 'la mascota' : 'las mascotas'}: ${animalNames}`,
      });

      // Redirigir a la página de confirmación
      router.push('/adopta/confirmacion');
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al agendar cita'));
    } finally {
      setSaving(false);
    }
  };

  // Agrupar slots por fecha
  // Mantener el slot ISO completo para cada hora
  // Los slots vienen en GMT+5 (Colombia), sin conversiones
  const slotsByDate: Record<string, Array<{ time: string; slot: string }>> = {};
  availableSlots.forEach(slot => {
    // Parsear el slot ISO que viene en GMT+5
    const date = new Date(slot);
    
    // Extraer fecha y hora directamente (ya está en GMT+5)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    if (!slotsByDate[dateStr]) {
      slotsByDate[dateStr] = [];
    }
    slotsByDate[dateStr].push({ time: timeStr, slot: slot });
  });

  // Ordenar fechas
  const sortedDates = Object.keys(slotsByDate).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  // Función para construir la URL correcta de la imagen
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

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Agenda tu Cita
          </h1>
          <p className="text-lg text-gray-600">
            Selecciona una fecha y hora para conocer a {adoptions.length === 1 ? 'tu nueva mascota' : 'tus nuevas mascotas'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {adoptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">
              No hay adopciones pendientes para agendar.
            </p>
            <button
              onClick={() => router.push('/adopta/match')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 cursor-pointer"
            >
              Volver a Match
            </button>
          </div>
        ) : (
          <>
            {/* Tarjetas de animales seleccionados */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-primary mb-4 text-center">
                Mascotas Seleccionadas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {adoptions.map((adoption) => {
                  const animal = adoption.animal;
                  const animalName = animal?.nombre || adoption.animal_nombre || 'Sin nombre';
                  const animalFoto = animal?.foto_url;
                  
                  return (
                    <div key={adoption.id} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20 hover:shadow-md transition-shadow">
                      {animalFoto ? (
                        <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-200">
                          <img
                            src={getAnimalImageUrl(animalFoto)}
                            alt={animalName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-400 text-sm">Sin foto</span></div>';
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-32 mb-3 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Sin foto</span>
                        </div>
                      )}
                      <h3 className="font-semibold text-primary text-center">{animalName}</h3>
                      {animal?.raza && (
                        <p className="text-sm text-gray-600 text-center">{animal.raza}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Formulario de agendamiento */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold">Horario disponible:</span> Lunes a Viernes, 9:00 AM - 5:00 PM
                </p>
              </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha *
                </label>
                <select
                  id="fecha"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(''); // Reset time when date changes
                    setSelectedSlot(''); // Reset slot when date changes
                  }}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Seleccione una fecha</option>
                  {sortedDates.map(date => {
                    // Parsear la fecha directamente (ya está en GMT+5)
                    const [year, month, day] = date.split('-').map(Number);
                    const dateObj = new Date(year, month - 1, day);
                    
                    return (
                      <option key={date} value={date}>
                        {dateObj.toLocaleDateString('es-CO', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedDate && slotsByDate[selectedDate] && (
                <div>
                  <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-2">
                    Hora *
                  </label>
                  <select
                    id="hora"
                    value={selectedTime}
                    onChange={(e) => {
                      const selectedTimeSlot = slotsByDate[selectedDate].find(t => t.time === e.target.value);
                      setSelectedTime(e.target.value);
                      setSelectedSlot(selectedTimeSlot?.slot || '');
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Seleccione una hora</option>
                    {slotsByDate[selectedDate].map(({ time, slot }) => (
                      <option key={slot} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {availableSlots.length === 0 && (
                <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                  No hay horarios disponibles en los próximos 30 días. Por favor, intente más tarde.
                </div>
              )}

              <button
                type="submit"
                disabled={saving || !selectedSlot || availableSlots.length === 0}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? 'Agendando...' : 'Confirmar Cita'}
              </button>
            </form>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

