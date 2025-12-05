'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';
import { authService } from '@/lib/auth';

interface ShelterForm {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
  nombre_usuario?: string;
  activo: boolean;
}

export default function EditShelterPage() {
  const router = useRouter();
  const params = useParams();
  const shelterId = params?.id ? parseInt(params.id as string) : null;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ShelterForm>({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    nombre_usuario: '',
    activo: true,
  });

  const loadShelter = useCallback(async () => {
    if (!shelterId) return;
    try {
      const response = await api.get(`/shelters/${shelterId}`);
      setFormData({
        nombre: response.data.nombre,
        direccion: response.data.direccion,
        telefono: response.data.telefono,
        email: response.data.email,
        password: '', // No cargar la contraseña
        nombre_usuario: response.data.usuario_nombre || '',
        activo: response.data.activo,
      });
    } catch (error) {
      console.error('Error loading shelter:', error);
      alert('Error al cargar el albergue');
    } finally {
      setLoading(false);
    }
  }, [shelterId]);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authService.validateSession();
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (user.rol !== 'admin') {
          router.push('/dashboard');
          return;
        }
        if (shelterId) {
          await loadShelter();
        } else {
          router.push('/dashboard/administrador/albergues/nuevo');
        }
      } catch {
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router, shelterId, loadShelter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Para editar, solo enviar los campos que se pueden actualizar
      const updateData: {
        nombre: string;
        direccion: string;
        telefono: string;
        email: string;
        activo: boolean;
        password?: string;
      } = {
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono,
        email: formData.email,
        activo: formData.activo,
      };
      // Solo incluir password si se proporcionó uno nuevo
      if (formData.password) {
        updateData.password = formData.password;
      }
      await api.put(`/shelters/${shelterId}`, updateData);
      router.push('/dashboard/administrador/albergues');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(getErrorMessage(apiError, 'Error al guardar'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Albergue</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Albergue *
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña (Dejar vacío para no cambiar)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Dejar vacío para mantener la contraseña actual
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Activo</span>
            </label>
          </div>
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
            href="/dashboard/administrador/albergues"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

