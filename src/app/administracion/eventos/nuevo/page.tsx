'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface EventForm {
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar?: string;
  imagen_url?: string;
  enlace?: string;
  activo: boolean;
}

export default function NewEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id ? parseInt(params.id as string) : null;
  const [loading, setLoading] = useState(!!eventId);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<EventForm>({
    nombre: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    lugar: '',
    imagen_url: '',
    enlace: '',
    activo: true,
  });

  const loadEvent = useCallback(async () => {
    if (!eventId) return;
    try {
      const response = await api.get(`/events/${eventId}`);
      const event = response.data;
      setFormData({
        nombre: event.nombre,
        descripcion: event.descripcion,
        fecha: event.fecha.split('T')[0],
        lugar: event.lugar || '',
        imagen_url: event.imagen_url || '',
        enlace: event.enlace || '',
        activo: event.activo,
      });
    } catch (error) {
      console.error('Error loading event:', error);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      loadEvent();
    }
  }, [eventId, loadEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = {
        ...formData,
        fecha: new Date(formData.fecha).toISOString(),
      };

      if (eventId) {
        await api.put(`/events/${eventId}`, submitData);
      } else {
        await api.post('/events', submitData);
      }
      router.push('/administracion/eventos');
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {eventId ? 'Editar Evento' : 'Nuevo Evento'}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Realización *</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">Los eventos pasados no se mostrarán en el frontend</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar (opcional)</label>
            <input
              type="text"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen *</label>
          <input
            type="url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            required
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">Solo se mostrará la imagen en el frontend</p>
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
          <label className="flex items-center">
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link
            href="/administracion/eventos"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

