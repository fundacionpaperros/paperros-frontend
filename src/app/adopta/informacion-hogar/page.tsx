'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface HomeInfo {
  tipo_vivienda: 'casa' | 'apartamento' | 'otro';
  tiene_patio: boolean;
  metros_cuadrados?: number;
  numero_personas: number;
  tiene_ninos: boolean;
  edad_ninos?: string;
  tiene_otros_animales: boolean;
  otros_animales_descripcion?: string;
}

export default function HomeInfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<HomeInfo>({
    tipo_vivienda: 'casa',
    tiene_patio: false,
    metros_cuadrados: undefined,
    numero_personas: 1,
    tiene_ninos: false,
    edad_ninos: undefined,
    tiene_otros_animales: false,
    otros_animales_descripcion: undefined,
  });

  const loadHomeInfo = useCallback(async () => {
    try {
      const response = await api.get('/adoption-process/home-info');
      setFormData(response.data);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      if (apiError.response?.status !== 404) {
        setError('Error al cargar información');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const validateAccess = useCallback(async () => {
    try {
      // Verificar que tenga certificado
      await api.get('/adoption-process/certificate');
      loadHomeInfo();
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      if (apiError.response?.status === 404) {
        setError('Debe completar la certificación antes de continuar');
        setTimeout(() => router.push('/adopta/certificacion'), 2000);
      } else {
        setError('Error al validar acceso');
      }
      setLoading(false);
    }
  }, [router, loadHomeInfo]);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    // Validar certificado antes de cargar
    validateAccess();
  }, [router, validateAccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await api.post('/adoption-process/home-info', formData);
      router.push('/adopta/match');
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al guardar información'));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: value ? parseInt(value) : undefined });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Información del Hogar
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Vivienda *
              </label>
              <select
                name="tipo_vivienda"
                value={formData.tipo_vivienda}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="tiene_patio"
                  checked={formData.tiene_patio}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">¿Tienes patio?</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metros Cuadrados (opcional)
              </label>
              <input
                type="number"
                name="metros_cuadrados"
                value={formData.metros_cuadrados || ''}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Personas *
              </label>
              <input
                type="number"
                name="numero_personas"
                value={formData.numero_personas}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="tiene_ninos"
                  checked={formData.tiene_ninos}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">¿Hay niños en el hogar?</span>
              </label>
              {formData.tiene_ninos && (
                <input
                  type="text"
                  name="edad_ninos"
                  value={formData.edad_ninos || ''}
                  onChange={handleChange}
                  placeholder="Ej: 5 y 8 años"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="tiene_otros_animales"
                  checked={formData.tiene_otros_animales}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">¿Tienes otros animales?</span>
              </label>
              {formData.tiene_otros_animales && (
                <textarea
                  name="otros_animales_descripcion"
                  value={formData.otros_animales_descripcion || ''}
                  onChange={handleChange}
                  placeholder="Describe los otros animales que tienes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
              >
                {saving ? 'Guardando...' : 'Guardar y Continuar'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/adopta')}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

