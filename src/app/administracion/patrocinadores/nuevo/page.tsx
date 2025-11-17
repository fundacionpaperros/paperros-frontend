'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface SponsorForm {
  nombre: string;
  logo_url: string;
  enlace?: string;
  descripcion?: string;
  activo: boolean;
  orden: number;
}

export default function NewSponsorPage() {
  const router = useRouter();
  const params = useParams();
  const sponsorId = params?.id ? parseInt(params.id as string) : null;
  const [loading, setLoading] = useState(!!sponsorId);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<SponsorForm>({
    nombre: '',
    logo_url: '',
    enlace: '',
    descripcion: '',
    activo: true,
    orden: 1,
  });

  const loadSponsor = useCallback(async () => {
    if (!sponsorId) return;
    try {
      const response = await api.get(`/sponsors/${sponsorId}`);
      const sponsor = response.data;
      setFormData({
        nombre: sponsor.nombre,
        logo_url: sponsor.logo_url,
        enlace: sponsor.enlace || '',
        descripcion: sponsor.descripcion || '',
        activo: sponsor.activo,
        orden: sponsor.orden,
      });
    } catch (error) {
      console.error('Error loading sponsor:', error);
    } finally {
      setLoading(false);
    }
  }, [sponsorId]);

  useEffect(() => {
    if (sponsorId) {
      loadSponsor();
    }
  }, [sponsorId, loadSponsor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (sponsorId) {
        await api.put(`/sponsors/${sponsorId}`, formData);
      } else {
        await api.post('/sponsors', formData);
      }
      router.push('/administracion/patrocinadores');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {sponsorId ? 'Editar Patrocinador' : 'Nuevo Patrocinador'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL del Logo *</label>
          <input
            type="url"
            name="logo_url"
            value={formData.logo_url}
            onChange={handleChange}
            required
            placeholder="https://ejemplo.com/logo.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enlace (opcional)</label>
          <input
            type="url"
            name="enlace"
            value={formData.enlace}
            onChange={handleChange}
            placeholder="https://ejemplo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Orden *</label>
            <input
              type="number"
              name="orden"
              value={formData.orden}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="flex items-center mt-6">
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Activo</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link
            href="/administracion/patrocinadores"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

