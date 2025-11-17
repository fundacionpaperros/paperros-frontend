'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface FollowUpVisit {
  id: number;
  adopcion_id: number;
  fecha_visita: string;
  estado_salud: string;
  condiciones_hogar: string;
  comportamiento: string;
  observaciones?: string;
  proxima_visita_fecha?: string;
}

export default function FollowUpPage() {
  const [upcomingVisits, setUpcomingVisits] = useState<FollowUpVisit[]>([]);
  const [allVisits, setAllVisits] = useState<FollowUpVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [upcomingRes, allRes] = await Promise.all([
        api.get('/follow-up/upcoming?days_ahead=30').catch(() => ({ data: [] })),
        api.get('/follow-up?limit=100').catch(() => ({ data: [] })),
      ]);
      setUpcomingVisits(upcomingRes.data || []);
      setAllVisits(allRes.data || []);
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      console.error('Error loading visits:', apiError);
      if (apiError.response?.status === 403) {
        console.error('No tienes permisos para ver visitas');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  const visits = showUpcoming ? upcomingVisits : allVisits;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seguimiento Post-Adopción</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-4 py-2 rounded cursor-pointer ${
              showUpcoming ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Próximas Visitas
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-4 py-2 rounded cursor-pointer ${
              !showUpcoming ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Todas las Visitas
          </button>
        </div>
      </div>

      {showUpcoming && upcomingVisits.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          No hay visitas programadas para los próximos 30 días.
        </div>
      )}

      <div className="space-y-4">
        {visits.map((visit) => (
          <div key={visit.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">Visita - Adopción #{visit.adopcion_id}</h3>
                <p className="text-sm text-gray-600">
                  Fecha: {new Date(visit.fecha_visita).toLocaleString('es-CO')}
                </p>
              </div>
              {visit.proxima_visita_fecha && (
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">Próxima Visita:</p>
                  <p className="text-sm text-gray-600">
                    {new Date(visit.proxima_visita_fecha).toLocaleDateString('es-CO')}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Estado de Salud</h4>
                <p className="text-sm text-gray-600">{visit.estado_salud}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Condiciones del Hogar</h4>
                <p className="text-sm text-gray-600">{visit.condiciones_hogar}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Comportamiento</h4>
                <p className="text-sm text-gray-600">{visit.comportamiento}</p>
              </div>
            </div>

            {visit.observaciones && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-1">Observaciones</h4>
                <p className="text-sm text-gray-600">{visit.observaciones}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {visits.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No hay visitas registradas.
        </div>
      )}
    </div>
  );
}

