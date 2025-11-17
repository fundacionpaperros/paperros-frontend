'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface AdoptionProgress {
  proceso_paso: number | null;
  bandera: string;
  has_final_adoptions?: boolean;
}

const STEPS = [
  { id: 1, title: 'Registro y Certificación', route: '/adopta/certificacion', description: 'Completa tu registro y certificación' },
  { id: 2, title: 'Caracterización del Hogar', route: '/adopta/informacion-hogar', description: 'Proporciona información sobre tu hogar' },
  { id: 3, title: 'Match de Animales', route: '/adopta/match', description: 'Selecciona los animales con mayor afinidad' },
  { id: 4, title: 'Agendamiento de Cita', route: '/adopta/cita', description: 'Agenda una cita para conocer a tus mascotas seleccionadas' },
];

export default function AdoptaPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progress, setProgress] = useState<AdoptionProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [hasActiveAdoptions, setHasActiveAdoptions] = useState(false);
  const [allAdoptionsTerminal, setAllAdoptionsTerminal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        try {
          const response = await api.get<AdoptionProgress>('/adoption-process/progress');
          setProgress(response.data);
          
          // Verificar estado de adopciones
          try {
            const adoptionsResponse = await api.get('/adoption-process/my-adoptions');
            const allAdoptions = adoptionsResponse.data;
            
            // Estados terminales
            const terminalStates = ['adoptado_final', 'adopcion_no_concretada', 'cancelada'];
            
            // Estados activos (no terminales)
            const activeStates = ['pendiente_match', 'match_realizado', 'cita_agendada', 'cita_completada', 'periodo_prueba_2dias', 'periodo_prueba_2meses'];
            
            const activeAdoptions = allAdoptions.filter((a: { estado: string | { value?: string } }) => {
              const estadoRaw = a.estado;
              const estado: string = typeof estadoRaw === 'string' ? estadoRaw : (estadoRaw?.value || String(estadoRaw) || '');
              return activeStates.includes(estado);
            });
            
            const terminalAdoptions = allAdoptions.filter((a: { estado: string | { value?: string } }) => {
              const estadoRaw = a.estado;
              const estado: string = typeof estadoRaw === 'string' ? estadoRaw : (estadoRaw?.value || String(estadoRaw) || '');
              return terminalStates.includes(estado);
            });
            
            setHasActiveAdoptions(activeAdoptions.length > 0);
            // Todas las adopciones están en estados terminales si hay adopciones y todas son terminales
            setAllAdoptionsTerminal(allAdoptions.length > 0 && allAdoptions.length === terminalAdoptions.length);
          } catch {
            // Si hay error, no mostrar opción de reiniciar
            setHasActiveAdoptions(false);
            setAllAdoptionsTerminal(false);
          }
          
          // Determinar el paso actual basado en proceso_paso
          // proceso_paso 1-2 = Paso 1 (Certificación)
          // proceso_paso 3 = Paso 2 (Información del hogar)
          // proceso_paso 4 = Paso 3 (Match)
          // proceso_paso 5 = Paso 4 (Agendamiento)
          // proceso_paso >= 6 = Cita agendada (mostrar "Ver Mis Adopciones")
          const paso = response.data.proceso_paso;
          if (!paso || paso === 1 || paso === 2) {
            setCurrentStep(1);
          } else if (paso === 3) {
            setCurrentStep(2);
          } else if (paso === 4) {
            setCurrentStep(3);
          } else if (paso === 5) {
            setCurrentStep(4);
          } else if (paso >= 6) {
            // Cita ya agendada, no mostrar paso actual
            setCurrentStep(null);
          }
        } catch (error) {
          console.error('Error loading progress:', error);
          // Si no tiene progreso, está en el paso 1
          setCurrentStep(1);
        }
      } else {
        setCurrentStep(1);
      }
      
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleContinue = () => {
    if (!isAuthenticated) {
      router.push('/auth/registro');
      return;
    }

    // Si proceso_paso >= 6, redirigir a mis adopciones
    if (progress && progress.proceso_paso && progress.proceso_paso >= 6) {
      router.push('/adopta/mis-adopciones');
      return;
    }

    // Redirigir al paso actual según el progreso
    if (!progress || !progress.proceso_paso || progress.proceso_paso === 1 || progress.proceso_paso === 2) {
      router.push('/adopta/certificacion');
    } else if (progress.proceso_paso === 3) {
      router.push('/adopta/informacion-hogar');
    } else if (progress.proceso_paso === 4) {
      router.push('/adopta/match');
    } else if (progress.proceso_paso === 5) {
      router.push('/adopta/cita');
    } else {
      router.push('/adopta/match');
    }
  };

  const handleRestartProcess = async () => {
    try {
      await api.post('/adoption-process/restart');
      router.push('/adopta/informacion-hogar');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al reiniciar el proceso');
    }
  };

  const getStepStatus = (stepId: number) => {
    if (!currentStep) return 'pending';
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Adopta un Amigo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Encuentra a tu compañero perfecto y dale un hogar lleno de amor
          </p>
        </div>

        {/* Indicador de Progreso */}
        {isAuthenticated && currentStep && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              Tu Progreso
            </h2>
            <div className="mb-4">
              <p className="text-lg text-gray-700 text-center">
                Estás en el <span className="font-bold text-primary">Paso {currentStep}</span> de {STEPS.length}
              </p>
              <p className="text-gray-600 text-center mt-2">
                {STEPS[currentStep - 1]?.title}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
            <button
              onClick={handleContinue}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 text-lg font-semibold cursor-pointer"
            >
              Continuar con el Proceso
            </button>
          </div>
        )}

        {/* Mensaje cuando ya agendó la cita */}
        {isAuthenticated && progress && progress.proceso_paso && progress.proceso_paso >= 6 && !currentStep && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              Proceso Completado
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Ya has agendado tu cita. Puedes ver el estado de tus adopciones.
            </p>
            <button
              onClick={handleContinue}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 text-lg font-semibold cursor-pointer"
            >
              Ver Mis Adopciones
            </button>
          </div>
        )}

        {/* Botón para reiniciar proceso si todas las adopciones están terminales */}
        {isAuthenticated && allAdoptionsTerminal && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              ¿Quieres Adoptar Otra Mascota?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Puedes reiniciar el proceso de adopción desde la caracterización del hogar.
            </p>
            <button
              onClick={handleRestartProcess}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 text-lg font-semibold cursor-pointer"
            >
              Volver a Adoptar
            </button>
          </div>
        )}

        {/* Resumen del flujo - Solo mostrar si no hay adopciones activas o todas están terminales */}
        {(!hasActiveAdoptions || allAdoptionsTerminal) && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Proceso de Adopción
            </h2>
            <div className="space-y-6">
              {STEPS.map((step) => {
                const status = getStepStatus(step.id);
                return (
                  <div key={step.id} className="flex items-start">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4 ${
                      status === 'completed' 
                        ? 'bg-green-500 text-white'
                        : status === 'current'
                        ? 'bg-primary text-white ring-4 ring-primary/30'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {status === 'completed' ? '✓' : step.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-xl font-semibold mb-2 ${
                          status === 'current' ? 'text-primary' : 'text-gray-700'
                        }`}>
                          {step.title}
                          {status === 'current' && (
                            <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                              Paso Actual
                            </span>
                          )}
                        </h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                      {status === 'pending' && (
                        <p className="text-sm text-gray-500 mt-1 italic">
                          Debes completar los pasos anteriores primero
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 text-lg font-semibold cursor-pointer"
            >
              Iniciar Proceso de Adopción
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
