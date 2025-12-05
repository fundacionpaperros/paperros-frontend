'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface Adoption {
  id: number;
  animal_id: number;
  estado: string;
  fecha_match?: string;
  fecha_cita?: string;
  fecha_adopcion_final?: string;
  animal_nombre?: string;
  animal_especie?: string;
  animal?: {
    id: number;
    nombre: string;
    especie?: string;
    raza?: string;
  };
}

export default function MyAdoptionsPage() {
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdoptions = useCallback(async () => {
    try {
      const response = await api.get('/adoption-process/my-adoptions');
      setAdoptions(response.data);
    } catch (error) {
      console.error('Error loading adoptions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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

      loadAdoptions();
    };

    validateAndLoad();
  }, [router, loadAdoptions]);

  const getEstadoLabel = (estado: string) => {
    const estados: Record<string, string> = {
      pendiente_match: 'Pendiente de Match',
      match_realizado: 'Match Realizado',
      cita_agendada: 'Cita Agendada',
      cita_completada: 'Cita Completada',
      periodo_prueba_2dias: 'Periodo de Prueba (2 días)',
      periodo_prueba_2meses: 'Periodo de Prueba (2 meses)',
      adoptado_final: 'Adoptado',
      adopcion_no_concretada: 'Adopción No Concretada',
      cancelada: 'Cancelada',
    };
    return estados[estado] || estado;
  };

  const getEstadoColor = (estado: string) => {
    if (estado === 'adoptado_final') return 'bg-green-100 text-green-800';
    if (estado === 'adopcion_no_concretada' || estado === 'cancelada') return 'bg-red-100 text-red-800';
    if (estado.includes('prueba')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return <div className="min-h-screen bg-background py-12 text-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Mis Adopciones
        </h1>

        {adoptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">No tienes adopciones registradas.</p>
            <Link href="/adopta" className="text-primary hover:underline">
              Ver animales disponibles
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-6">
              {adoptions.map((adoption) => (
                <div key={adoption.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">
                        {adoption.animal?.nombre || adoption.animal_nombre || 'Sin nombre'}
                      </h2>
                      <p className="text-gray-600 capitalize">
                        {adoption.animal?.especie || adoption.animal_especie || ''}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(adoption.estado)}`}>
                      {getEstadoLabel(adoption.estado)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    {adoption.fecha_match && (
                      <p>Match realizado: {new Date(adoption.fecha_match).toLocaleDateString('es-CO')}</p>
                    )}
                    {adoption.fecha_cita && (
                      <p>Cita agendada: {new Date(adoption.fecha_cita).toLocaleString('es-CO')}</p>
                    )}
                    {adoption.fecha_adopcion_final && (
                      <p className="font-semibold text-green-600">
                        Adoptado el: {new Date(adoption.fecha_adopcion_final).toLocaleDateString('es-CO')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Ver Citas */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Link
                href="/adopta/citas"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
              >
                Ver Mis Citas
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

