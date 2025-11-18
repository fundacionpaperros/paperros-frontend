'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface Adoption {
  id: number;
  animal_id: number;
  estado: string;
  animal_nombre?: string;
}

function CreateAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adoptionId = searchParams.get('adoption_id') ? parseInt(searchParams.get('adoption_id')!) : null;
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    adopcion_id: adoptionId || 0,
    fecha_hora: '',
    lugar: '',
    observaciones: '',
  });

  const loadAdoptions = useCallback(async () => {
    try {
      const response = await api.get('/adoption-process/my-adoptions');
      setAdoptions(response.data);
      if (adoptionId && response.data.find((a: Adoption) => a.id === adoptionId)) {
        setFormData(prev => ({ ...prev, adopcion_id: adoptionId }));
      }
    } catch (error) {
      console.error('Error loading adoptions:', error);
    } finally {
      setLoading(false);
    }
  }, [adoptionId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.post('/adoption-process/appointments', {
        ...formData,
        fecha_hora: new Date(formData.fecha_hora).toISOString(),
      });
      router.push('/adopta/citas');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al crear cita');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <div className="min-h-screen bg-background py-12 text-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Crear Cita
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adopción *
              </label>
              <select
                name="adopcion_id"
                value={formData.adopcion_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="0">Selecciona una adopción</option>
                {adoptions.map((adoption) => (
                  <option key={adoption.id} value={adoption.id}>
                    Adopción #{adoption.id} - {adoption.animal_nombre || `Animal #${adoption.animal_id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha y Hora *
              </label>
              <input
                type="datetime-local"
                name="fecha_hora"
                value={formData.fecha_hora}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lugar *
              </label>
              <input
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
                required
                placeholder="Ej: Albergue San Miguel, Calle 123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones (opcional)
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
              >
                {saving ? 'Creando...' : 'Crear Cita'}
              </button>
              <Link
                href="/adopta/citas"
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-3xl font-bold mb-6 text-primary">Cargando...</h1>
          </div>
        </div>
      </div>
    }>
      <CreateAppointmentContent />
    </Suspense>
  );
}

