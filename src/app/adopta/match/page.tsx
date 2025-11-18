'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface AnimalMatch {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  color: string;
  sexo: string;
  talla: string;
  edad: number;
  estado_reproductivo: string;
  esquema_vacunacion: string;
  foto_url?: string;
  affinity_score: number;
}

export default function MatchPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<AnimalMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [error, setError] = useState('');
  const [selectedAnimals, setSelectedAnimals] = useState<number[]>([]);
  const [creating, setCreating] = useState(false);

  const loadMatches = useCallback(async () => {
    try {
      const response = await api.get('/adoption-process/match');
      setMatches(response.data);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al cargar matches'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let animationTimer: NodeJS.Timeout;

    const checkExistingAdoptions = async () => {
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

      try {
        const adoptionsResponse = await api.get('/adoption-process/my-adoptions');
        const pendingAdoptions = adoptionsResponse.data.filter(
          (a: { estado: string; animal?: { estado?: string } }) => (a.estado === 'match_realizado' || a.estado === 'en_proceso' || a.estado === 'pendiente') &&
                      a.animal && a.animal.estado === 'disponible'
        );
        
        if (pendingAdoptions.length > 0) {
          // Si ya tiene adopciones pendientes, redirigir a agendamiento
          router.push('/adopta/cita');
          return;
        }
      } catch {
        // Si hay error, continuar con el flujo normal
      }

      // Mostrar animación por mínimo 5 segundos
      animationTimer = setTimeout(() => {
        setShowAnimation(false);
        loadMatches();
      }, 5000);
    };

    checkExistingAdoptions();

    return () => {
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
    };
  }, [router, loadMatches]);

  const handleToggleAnimal = (animalId: number) => {
    setSelectedAnimals(prev => {
      if (prev.includes(animalId)) {
        return prev.filter(id => id !== animalId);
      } else {
        return [...prev, animalId];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedAnimals.length === 0) {
      alert('Debe seleccionar al menos un animal');
      return;
    }

    setCreating(true);

    try {
      // Crear adopciones para todos los animales seleccionados
      for (const animalId of selectedAnimals) {
        await api.post('/adoption-process/create', {
          animal_id: animalId,
        });
      }
      
      // El backend actualiza automáticamente proceso_paso a 5
      // Esperar un momento para asegurar que las adopciones se hayan guardado
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push('/adopta/cita');
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al crear adopciones');
      setCreating(false);
    }
  };

  const getAffinityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getAffinityLabel = (score: number) => {
    if (score >= 80) return 'Excelente Afinidad';
    if (score >= 60) return 'Buena Afinidad';
    if (score >= 40) return 'Afinidad Moderada';
    return 'Baja Afinidad';
  };

  // Función para construir la URL correcta de la imagen
  const getAnimalImageUrl = (imageUrl: string): string => {
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

  if (showAnimation || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Animación principal con múltiples elementos */}
          <div className="mb-8 relative">
            {/* Círculo principal animado */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
                </svg>
              </div>
            </div>
            
            {/* Partículas animadas alrededor */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
              <div className="absolute top-1/4 right-0 w-2 h-2 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
              <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-primary/50 rounded-full animate-ping" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: '0.9s', animationDuration: '1.5s' }}></div>
              <div className="absolute top-1/4 left-0 w-2 h-2 bg-primary/50 rounded-full animate-ping" style={{ animationDelay: '1.2s', animationDuration: '1.5s' }}></div>
              <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: '1.5s', animationDuration: '1.5s' }}></div>
            </div>
          </div>

          {/* Texto animado */}
          <h2 className="text-3xl font-bold text-primary mb-4 animate-pulse">
            Buscando la mejor opción para ti
          </h2>
          
          {/* Mensajes rotativos */}
          <div className="h-16 mb-4">
            <p className="text-lg text-gray-600 animate-fade-in">
              Estamos analizando tu perfil...
            </p>
          </div>

          {/* Barra de progreso animada */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ 
                width: '0%', 
                animation: 'progress 5s linear forwards'
              }}
            ></div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
            @keyframes fade-in {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            .animate-fade-in {
              animation: fade-in 2s ease-in-out infinite;
            }
          `}} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => router.push('/adopta')}
            className="text-primary hover:underline cursor-pointer"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-primary">
          Animales Recomendados para Ti
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Basado en la información de tu hogar, estos son los animales con mayor afinidad
        </p>

        {matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No se encontraron animales disponibles en este momento.
            </p>
            <button
              onClick={() => router.push('/adopta')}
              className="text-primary hover:underline cursor-pointer"
            >
              Volver
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((animal) => (
                <div
                  key={animal.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                    selectedAnimals.includes(animal.id) ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {/* Affinity Score Badge */}
                  <div className="relative">
                    {animal.foto_url ? (
                      <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img 
                          src={getAnimalImageUrl(animal.foto_url)} 
                          alt={animal.nombre} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<span class="text-gray-400">Sin foto</span>';
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Sin foto</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${getAffinityColor(animal.affinity_score)}`}>
                        {animal.affinity_score}%
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getAffinityColor(animal.affinity_score)}`}>
                        {getAffinityLabel(animal.affinity_score)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-2">{animal.nombre}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><span className="font-semibold">Especie:</span> {animal.especie}</p>
                      <p><span className="font-semibold">Raza:</span> {animal.raza}</p>
                      <p><span className="font-semibold">Edad:</span> {animal.edad} meses</p>
                      <p><span className="font-semibold">Talla:</span> {animal.talla}</p>
                      <p><span className="font-semibold">Sexo:</span> {animal.sexo}</p>
                      <p><span className="font-semibold">Estado:</span> {animal.estado_reproductivo}</p>
                      <p><span className="font-semibold">Vacunación:</span> {animal.esquema_vacunacion}</p>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Afinidad</span>
                          <span>{animal.affinity_score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              animal.affinity_score >= 80 ? 'bg-green-500' :
                              animal.affinity_score >= 60 ? 'bg-yellow-500' :
                              animal.affinity_score >= 40 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${animal.affinity_score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAnimal(animal.id)}
                      className={`w-full mt-4 py-2 px-4 rounded font-semibold cursor-pointer ${
                        selectedAnimals.includes(animal.id)
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {selectedAnimals.includes(animal.id) ? '✓ Seleccionado' : 'Seleccionar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {matches.length > 0 && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleContinue}
                  disabled={creating || selectedAnimals.length === 0}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 text-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Procesando...' : `Continuar con ${selectedAnimals.length} ${selectedAnimals.length === 1 ? 'animal seleccionado' : 'animales seleccionados'}`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

