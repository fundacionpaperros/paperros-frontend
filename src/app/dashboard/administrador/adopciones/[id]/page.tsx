'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';
import { confirmToast } from '@/lib/confirm-toast';
import toast from 'react-hot-toast';

interface Adoption {
  id: number;
  adoptante_id: number;
  animal_id: number;
  estado: string;
  fecha_match?: string;
  fecha_cita?: string;
  fecha_adopcion_final?: string;
  seguimiento_completado: boolean;
  fecha_alta_seguimiento?: string;
  animal?: {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    foto_url?: string;
  };
  adoptante?: {
    id: number;
    nombre: string;
    email: string;
    cedula: string;
    telefono?: string;
    ciudad?: string;
  };
}

interface Appointment {
  id: number;
  fecha_hora: string;
  lugar: string;
  estado: string;
  observaciones?: string;
}

interface FollowUpVisit {
  id: number;
  fecha_visita: string;
  estado_salud: string;
  condiciones_hogar: string;
  comportamiento: string;
  observaciones?: string;
}

export default function AdoptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const adoptionId = params?.id ? parseInt(params.id as string) : null;
  const [adoption, setAdoption] = useState<Adoption | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [visits, setVisits] = useState<FollowUpVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [givingAlta, setGivingAlta] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<string>('');

  const loadData = useCallback(async () => {
    if (!adoptionId) return;
    try {
      const [adoptionRes, appointmentsRes, visitsRes] = await Promise.all([
        api.get(`/adoption-process/adoptions/${adoptionId}`),
        api.get(`/adoption-process/adoptions/${adoptionId}/appointments`).catch(() => ({ data: [] })),
        api.get(`/follow-up/?adopcion_id=${adoptionId}`).catch(() => ({ data: [] })),
      ]);
      setAdoption(adoptionRes.data);
      setSelectedEstado(adoptionRes.data.estado);
      setAppointments(appointmentsRes.data);
      setVisits(visitsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [adoptionId]);

  useEffect(() => {
    if (adoptionId) {
      loadData();
    }
  }, [adoptionId, loadData]);

  const handleUpdateEstado = async () => {
    if (!adoption || !selectedEstado || selectedEstado === adoption.estado) {
      return;
    }

    setUpdating(true);
    try {
      const response = await api.put(`/adoption-process/adoptions/${adoption.id}`, {
        estado: selectedEstado,
      });
      setAdoption(response.data);
      toast.success('Estado actualizado correctamente');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      toast.error((apiError.response?.data?.detail as string) || 'Error al actualizar el estado');
    } finally {
      setUpdating(false);
    }
  };

  const handleAltaSeguimiento = async () => {
    if (!adoption) return;
    const confirmed = await confirmToast(
      `¿Confirmas que el animal "${adoption.animal?.nombre || 'este animal'}" se ha adaptado completamente a su nuevo hogar y deseas cerrar el programa de seguimiento? Esta acción no se puede deshacer.`,
      { confirmLabel: 'Confirmar alta', danger: false }
    );
    if (!confirmed) return;
    setGivingAlta(true);
    try {
      const response = await api.post(`/adoption-process/adoptions/${adoption.id}/alta-seguimiento`);
      setAdoption(response.data);
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      toast.error((apiError.response?.data?.detail as string) || 'Error al otorgar el alta');
    } finally {
      setGivingAlta(false);
    }
  };

  const handleDelete = async () => {
    if (!adoption) return;
    const confirmed = await confirmToast('¿Estás seguro de eliminar esta adopción? Se eliminarán también las visitas de seguimiento asociadas.');
    if (!confirmed) return;
    try {
      await api.delete(`/adoption-process/adoptions/${adoption.id}`);
      toast.success('Adopción eliminada correctamente');
      router.push('/dashboard/administrador/adopciones');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      toast.error((apiError.response?.data?.detail as string) || 'Error al eliminar');
    }
  };

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

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (!adoption) return <div className="text-center py-8">Adopción no encontrada</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Adopción #{adoption.id}</h1>
        <div className="flex gap-3 items-center">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer text-sm"
          >
            Eliminar
          </button>
          <Link href="/dashboard/administrador/adopciones" className="text-primary hover:underline text-sm">
            Volver
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Información General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Adoptante</p>
            <p className="font-semibold">{adoption.adoptante?.nombre || 'Sin nombre'}</p>
            {adoption.adoptante?.email && (
              <p className="text-xs text-gray-500">{adoption.adoptante.email}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">Animal</p>
            <p className="font-semibold">{adoption.animal?.nombre || 'Sin nombre'}</p>
            {adoption.animal && (
              <p className="text-xs text-gray-500 capitalize">
                {adoption.animal.especie || ''} {adoption.animal.raza ? `• ${adoption.animal.raza}` : ''}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">Estado Actual</p>
            <p className="font-semibold">{getEstadoLabel(adoption.estado)}</p>
          </div>
          {adoption.fecha_match && (
            <div>
              <p className="text-sm text-gray-600">Fecha Match</p>
              <p className="font-semibold">{new Date(adoption.fecha_match).toLocaleDateString('es-CO')}</p>
            </div>
          )}
        </div>

        {/* Selector de Estado */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Cambiar Estado</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                Nuevo Estado
              </label>
              <select
                id="estado"
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="pendiente_match">Pendiente de Match</option>
                <option value="match_realizado">Match Realizado</option>
                <option value="cita_agendada">Cita Agendada</option>
                <option value="cita_completada">Cita Completada</option>
                <option value="periodo_prueba_2dias">Periodo de Prueba (2 días)</option>
                <option value="periodo_prueba_2meses">Periodo de Prueba (2 meses)</option>
                <option value="adoptado_final">Adoptado</option>
                <option value="adopcion_no_concretada">Adopción No Concretada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <button
              onClick={handleUpdateEstado}
              disabled={updating || selectedEstado === adoption.estado}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
            >
              {updating ? 'Actualizando...' : 'Actualizar Estado'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Citas</h2>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border-l-4 border-primary pl-4">
                <p className="font-semibold">{new Date(appointment.fecha_hora).toLocaleString('es-CO')}</p>
                <p className="text-gray-600">Lugar: {appointment.lugar}</p>
                <p className="text-sm">Estado: {appointment.estado}</p>
                {appointment.observaciones && (
                  <p className="text-sm text-gray-500 mt-2">{appointment.observaciones}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay citas registradas</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Visitas de Seguimiento</h2>
        {visits.length > 0 ? (
          <div className="space-y-4">
            {visits.map((visit) => (
              <div key={visit.id} className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold">{new Date(visit.fecha_visita).toLocaleDateString('es-CO')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-600">Salud</p>
                    <p className="text-sm">{visit.estado_salud}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hogar</p>
                    <p className="text-sm">{visit.condiciones_hogar}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Comportamiento</p>
                    <p className="text-sm">{visit.comportamiento}</p>
                  </div>
                </div>
                {visit.observaciones && (
                  <p className="text-sm text-gray-500 mt-2">{visit.observaciones}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay visitas registradas</p>
        )}
      </div>

      {/* Sección de alta del seguimiento — solo visible para adopciones en adoptado_final */}
      {adoption.estado === 'adoptado_final' && (
        <div className={`rounded-lg shadow p-6 mt-6 ${adoption.seguimiento_completado ? 'bg-green-50 border border-green-200' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-2">Seguimiento Post-Adopción</h2>
          {adoption.seguimiento_completado ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                ✓ Alta otorgada
              </span>
              {adoption.fecha_alta_seguimiento && (
                <span className="text-sm text-gray-600">
                  el {new Date(adoption.fecha_alta_seguimiento).toLocaleDateString('es-CO', { timeZone: 'America/Bogota' })}
                </span>
              )}
              <p className="w-full text-sm text-gray-500 mt-1">
                El animal ha completado su proceso de seguimiento y fue dado de alta del programa.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                El animal está activo en el programa de seguimiento. Cuando se haya verificado su adaptación total al nuevo hogar, puedes cerrar formalmente el caso.
              </p>
              <button
                onClick={handleAltaSeguimiento}
                disabled={givingAlta}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold text-sm"
              >
                {givingAlta ? 'Procesando...' : 'Dar Alta del Seguimiento'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

