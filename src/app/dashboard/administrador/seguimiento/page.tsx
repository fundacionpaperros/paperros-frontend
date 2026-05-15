'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';
import { FormErrors } from '@/lib/validators';
import { confirmToast } from '@/lib/confirm-toast';
import toast from 'react-hot-toast';

interface AdoptanteInfo {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  cedula: string;
}

interface AnimalInfo {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
}

interface AdopcionInfo {
  id: number;
  seguimiento_completado: boolean;
  fecha_alta_seguimiento?: string;
}

interface FollowUpVisit {
  id: number;
  adopcion_id: number;
  fecha_visita: string;
  estado_salud: string;
  condiciones_hogar: string;
  comportamiento: string;
  observaciones?: string;
  proxima_visita_fecha?: string;
  realizado_por_usuario_id: number;
  created_at: string;
  adoptante?: AdoptanteInfo;
  animal?: AnimalInfo;
  adopcion?: AdopcionInfo;
}

interface FormState {
  adopcion_id: string;
  fecha_visita: string;
  estado_salud: string;
  condiciones_hogar: string;
  comportamiento: string;
  observaciones: string;
  proxima_visita_fecha: string;
}

const EMPTY_FORM: FormState = {
  adopcion_id: '',
  fecha_visita: '',
  estado_salud: '',
  condiciones_hogar: '',
  comportamiento: '',
  observaciones: '',
  proxima_visita_fecha: '',
};

// Envía la hora tal como la escribe el usuario — sin conversión UTC.
// El backend almacena datetimes como hora colombiana (naive).
const toISO = (datetimeLocal: string): string | null =>
  datetimeLocal ? `${datetimeLocal}:00` : null;

// Lee la hora guardada en BD (naive colombiana) y la pone en el input.
const toDatetimeLocal = (isoString?: string): string => {
  if (!isoString) return '';
  return isoString.slice(0, 16);
};

// Muestra la hora almacenada en BD como hora colombiana legible.
const formatColombianDatetime = (isoString: string): string => {
  if (!isoString) return '';
  // Añadir offset colombiano para que el navegador la interprete correctamente.
  const hasOffset = isoString.endsWith('Z') || isoString.includes('+') || /T.*-\d{2}:\d{2}$/.test(isoString);
  const withTZ = hasOffset ? isoString : `${isoString}-05:00`;
  return new Date(withTZ).toLocaleString('es-CO', { timeZone: 'America/Bogota' });
};

export default function FollowUpPage() {
  const [upcomingVisits, setUpcomingVisits] = useState<FollowUpVisit[]>([]);
  const [allVisits, setAllVisits] = useState<FollowUpVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterAdopcionId, setFilterAdopcionId] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [alertaBandera, setAlertaBandera] = useState(false);
  const [alertaPendiente, setAlertaPendiente] = useState<{ adoptanteId: number; nombre: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [upcomingRes, allRes] = await Promise.all([
        api.get('/follow-up/upcoming?days_ahead=30').catch(() => ({ data: [] })),
        api.get('/follow-up/?limit=100').catch(() => ({ data: [] })),
      ]);
      setUpcomingVisits(upcomingRes.data || []);
      setAllVisits(allRes.data || []);
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      console.error('Error loading visits:', apiError);
    } finally {
      setLoading(false);
    }
  };

  const handleNuevaVisita = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setAlertaBandera(false);
    setAlertaPendiente(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditar = (visit: FollowUpVisit) => {
    setEditingId(visit.id);
    setForm({
      adopcion_id: String(visit.adopcion_id),
      fecha_visita: toDatetimeLocal(visit.fecha_visita),
      estado_salud: visit.estado_salud,
      condiciones_hogar: visit.condiciones_hogar,
      comportamiento: visit.comportamiento,
      observaciones: visit.observaciones || '',
      proxima_visita_fecha: toDatetimeLocal(visit.proxima_visita_fecha),
    });
    setErrors({});
    setAlertaBandera(false);
    setAlertaPendiente(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelar = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setAlertaBandera(false);
  };

  const handleSubmit = async () => {
    const newErrors: FormErrors = {};

    if (editingId === null && (!form.adopcion_id || isNaN(Number(form.adopcion_id))))
      newErrors.adopcion_id = 'ID de adopción requerido (número)';
    if (!form.fecha_visita)
      newErrors.fecha_visita = 'La fecha de la visita es obligatoria';
    if (!form.estado_salud.trim())
      newErrors.estado_salud = 'El estado de salud es obligatorio';
    if (!form.condiciones_hogar.trim())
      newErrors.condiciones_hogar = 'Las condiciones del hogar son obligatorias';
    if (!form.comportamiento.trim())
      newErrors.comportamiento = 'El comportamiento es obligatorio';
    if (!form.proxima_visita_fecha)
      newErrors.proxima_visita_fecha = 'Obligatorio según política (solo omitir al dar el alta del seguimiento)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...(editingId === null && { adopcion_id: Number(form.adopcion_id) }),
      fecha_visita: toISO(form.fecha_visita),
      estado_salud: form.estado_salud.trim(),
      condiciones_hogar: form.condiciones_hogar.trim(),
      comportamiento: form.comportamiento.trim(),
      observaciones: form.observaciones.trim() || null,
      proxima_visita_fecha: toISO(form.proxima_visita_fecha),
    };

    setSaving(true);
    try {
      let savedVisit: FollowUpVisit | null = null;
      if (editingId !== null) {
        const res = await api.put(`/follow-up/${editingId}`, payload);
        savedVisit = res.data;
      } else {
        const res = await api.post('/follow-up/', payload);
        savedVisit = res.data;
      }
      const marcarAlerta = alertaBandera;
      toast.success('Visita guardada correctamente');
      handleCancelar();
      await loadData();
      if (marcarAlerta && savedVisit?.adoptante) {
        setAlertaPendiente({
          adoptanteId: savedVisit.adoptante.id,
          nombre: savedVisit.adoptante.nombre,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (marcarAlerta) {
        // Si la visita no tiene adoptante cargado aún, recargamos y buscamos
        setAlertaPendiente({ adoptanteId: 0, nombre: 'el adoptante' });
      }
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      const detail = apiError.response?.data?.detail;
      const structured = detail as { field?: string; message?: string } | string | undefined;
      if (structured && typeof structured === 'object' && structured.field) {
        setErrors({ [structured.field]: structured.message ?? 'Error de validación' });
      } else if (apiError.response?.status === 409 || apiError.response?.status === 400) {
        setErrors({ adopcion_id: typeof structured === 'string' ? structured : 'Error de validación' });
      } else {
        toast.error(typeof structured === 'string' ? structured : 'Error al guardar la visita');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async (visitId: number) => {
    const confirmed = await confirmToast('¿Estás seguro de eliminar esta visita de seguimiento?');
    if (!confirmed) return;
    try {
      await api.delete(`/follow-up/${visitId}`);
      toast.success('Visita eliminada correctamente');
      loadData();
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      toast.error((apiError.response?.data?.detail as string) || 'Error al eliminar la visita');
    }
  };

  const visits = (showUpcoming ? upcomingVisits : allVisits).filter((v) =>
    filterAdopcionId ? v.adopcion_id === Number(filterAdopcionId) : true
  );

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Seguimiento Post-Adopción</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="number"
            placeholder="Filtrar por ID adopción"
            value={filterAdopcionId}
            onChange={(e) => setFilterAdopcionId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm w-44"
          />
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
          <button
            onClick={handleNuevaVisita}
            className="px-4 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/90 font-semibold"
          >
            + Nueva Visita
          </button>
        </div>
      </div>

      {/* Banner de alerta pendiente */}
      {alertaPendiente && (
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-orange-800 mb-1">
              ⚠ Acción requerida — Revisar bandera del adoptante
            </p>
            <p className="text-sm text-orange-700">
              La visita fue guardada con señales de alerta. Revisa el perfil de{' '}
              <span className="font-semibold">{alertaPendiente.nombre}</span> y actualiza
              su bandera si corresponde.
            </p>
            {alertaPendiente.adoptanteId > 0 && (
              <Link
                href={`/dashboard/administrador/adoptantes/${alertaPendiente.adoptanteId}`}
                className="inline-block mt-2 px-4 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded hover:bg-orange-600"
              >
                Ir al perfil del adoptante →
              </Link>
            )}
          </div>
          <button
            onClick={() => setAlertaPendiente(null)}
            className="text-orange-400 hover:text-orange-600 text-xl font-bold leading-none cursor-pointer shrink-0"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      )}

      {/* Formulario crear / editar */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId !== null ? `Editar Visita #${editingId}` : 'Nueva Visita de Seguimiento'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editingId === null && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID de Adopción *
                </label>
                <input
                  type="number"
                  value={form.adopcion_id}
                  onChange={(e) => setForm({ ...form, adopcion_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ej: 12"
                />
                {errors.adopcion_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.adopcion_id}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de la Visita *
              </label>
              <input
                type="datetime-local"
                value={form.fecha_visita}
                onChange={(e) => setForm({ ...form, fecha_visita: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              />
              {errors.fecha_visita && (
                <p className="text-red-500 text-xs mt-1">{errors.fecha_visita}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Próxima Visita Programada *
              </label>
              <input
                type="datetime-local"
                value={form.proxima_visita_fecha}
                onChange={(e) => setForm({ ...form, proxima_visita_fecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              />
              {errors.proxima_visita_fecha && (
                <p className="text-red-500 text-xs mt-1">{errors.proxima_visita_fecha}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Obligatorio según política. Solo omitir al dar el alta del seguimiento.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado de Salud *
              </label>
              <textarea
                rows={3}
                value={form.estado_salud}
                onChange={(e) => setForm({ ...form, estado_salud: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Descripción del bienestar físico y sanitario del animal..."
              />
              {errors.estado_salud && (
                <p className="text-red-500 text-xs mt-1">{errors.estado_salud}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condiciones del Hogar *
              </label>
              <textarea
                rows={3}
                value={form.condiciones_hogar}
                onChange={(e) => setForm({ ...form, condiciones_hogar: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Evaluación del entorno y seguridad de las instalaciones..."
              />
              {errors.condiciones_hogar && (
                <p className="text-red-500 text-xs mt-1">{errors.condiciones_hogar}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comportamiento *
              </label>
              <textarea
                rows={3}
                value={form.comportamiento}
                onChange={(e) => setForm({ ...form, comportamiento: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Análisis de la conducta y nivel de adaptación del animal..."
              />
              {errors.comportamiento && (
                <p className="text-red-500 text-xs mt-1">{errors.comportamiento}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones / Señales de Alerta
              </label>
              <textarea
                rows={2}
                value={form.observaciones}
                onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Factores de riesgo, señales de alerta u observaciones adicionales..."
              />
            </div>
          </div>

          {/* Checkbox de alerta — no se guarda en BD */}
          <div className="mt-5 p-3 bg-orange-50 border border-orange-200 rounded-md">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={alertaBandera}
                onChange={(e) => setAlertaBandera(e.target.checked)}
                className="mt-0.5 h-4 w-4 cursor-pointer accent-orange-500"
              />
              <span className="text-sm text-orange-800">
                <span className="font-semibold">⚠ Esta visita presenta señales de alerta.</span>
                {' '}Al guardar, recibirás un recordatorio para actualizar la bandera del adoptante.
              </span>
            </label>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
            >
              {saving ? 'Guardando...' : editingId !== null ? 'Actualizar Visita' : 'Registrar Visita'}
            </button>
            <button
              onClick={handleCancelar}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Aviso sin próximas visitas */}
      {showUpcoming && upcomingVisits.length === 0 && !showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          No hay visitas programadas para los próximos 30 días.
        </div>
      )}

      {/* Lista de visitas */}
      <div className="space-y-4">
        {visits.map((visit) => (
          <div key={visit.id} className="bg-white rounded-lg shadow p-6">

            {/* Header: adoptante + animal + fecha */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold">Visita #{visit.id}</h3>
                  <span className="text-sm text-gray-400">Adopción #{visit.adopcion_id}</span>
                  {visit.adopcion?.seguimiento_completado ? (
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      ✓ Alta otorgada
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      En seguimiento
                    </span>
                  )}
                </div>
                {visit.adoptante ? (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium text-gray-800">{visit.adoptante.nombre}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-600">{visit.adoptante.telefono}</span>
                    <span className="text-gray-400">·</span>
                    <Link
                      href={`/dashboard/administrador/adoptantes/${visit.adoptante.id}`}
                      className="text-primary hover:underline text-xs font-medium"
                    >
                      Ver perfil
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Adoptante no disponible</p>
                )}
                {visit.animal && (
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    <span className="font-medium">{visit.animal.nombre}</span>
                    {' '}· {visit.animal.especie} · {visit.animal.raza}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Fecha visita: {formatColombianDatetime(visit.fecha_visita)}
                </p>
              </div>
              {visit.proxima_visita_fecha && (
                <div className="text-right bg-primary/5 border border-primary/20 rounded px-3 py-2">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">Próxima Visita</p>
                  <p className="text-sm text-gray-700 mt-0.5">
                    {formatColombianDatetime(visit.proxima_visita_fecha)}
                  </p>
                </div>
              )}
            </div>

            {/* Evaluación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
              <div>
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1">Estado de Salud</h4>
                <p className="text-sm text-gray-700">{visit.estado_salud}</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1">Condiciones del Hogar</h4>
                <p className="text-sm text-gray-700">{visit.condiciones_hogar}</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1">Comportamiento</h4>
                <p className="text-sm text-gray-700">{visit.comportamiento}</p>
              </div>
            </div>

            {visit.observaciones && (
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
                <h4 className="font-semibold text-xs text-yellow-700 uppercase tracking-wide mb-1">Observaciones / Alertas</h4>
                <p className="text-sm text-yellow-800">{visit.observaciones}</p>
              </div>
            )}

            <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEditar(visit)}
                className="text-primary hover:text-primary/80 text-sm cursor-pointer font-medium"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(visit.id)}
                className="text-red-600 hover:text-red-800 text-sm cursor-pointer font-medium"
              >
                Eliminar
              </button>
            </div>
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
