'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { uploadFile, validateImageFile } from '@/lib/upload';
import { ApiErrorResponse } from '@/lib/types';

interface EventForm {
  nombre: string;
  fecha: string;
  lugar?: string;
  imagen_url: string;
  activo: boolean;
}

export default function NewEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id ? parseInt(params.id as string) : null;
  const [loading, setLoading] = useState(!!eventId);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<EventForm>({
    nombre: '',
    fecha: new Date().toISOString().split('T')[0],
    lugar: '',
    imagen_url: '',
    activo: true,
  });

  const loadEvent = useCallback(async () => {
    if (!eventId) return;
    try {
      const response = await api.get(`/events/${eventId}`);
      const event = response.data;
      setFormData({
        nombre: event.nombre,
        fecha: event.fecha.split('T')[0],
        lugar: event.lugar || '',
        imagen_url: event.imagen_url || '',
        activo: event.activo,
      });
      // Mostrar preview si hay imagen
      if (event.imagen_url) {
        setPreviewUrl(event.imagen_url.startsWith('/static/') 
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'}${event.imagen_url}`
          : event.imagen_url);
      }
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar archivo
    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Subir archivo
    setUploading(true);
    try {
      const filePath = await uploadFile(file, 'event');
      setFormData({ ...formData, imagen_url: filePath });
    } catch (error: unknown) {
      const uploadError = error as Error;
      alert(uploadError.message || 'Error al subir imagen');
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imagen_url && !eventId) {
      alert('Por favor, sube una imagen para el evento');
      return;
    }

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
      router.push('/dashboard/administrador/eventos');
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Banner del Evento *</label>
          
          {/* Input de archivo */}
          <div className="mb-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              required={!eventId}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 disabled:opacity-50"
            />
            {uploading && (
              <p className="text-sm text-blue-600 mt-1">Subiendo imagen...</p>
            )}
          </div>

          {/* Preview de imagen */}
          {previewUrl && (
            <div className="mb-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-48 object-contain border border-gray-300 rounded-md"
              />
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-1">Solo se mostrará el banner (imagen) en el frontend</p>
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
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link
            href="/dashboard/administrador/eventos"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

