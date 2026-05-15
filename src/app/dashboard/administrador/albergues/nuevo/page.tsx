'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';
import { v, FormErrors, sanitize } from '@/lib/validators';
import { authService } from '@/lib/auth';
import toast from 'react-hot-toast';

interface ShelterForm {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
  nombre_usuario?: string;
  activo: boolean;
}

export default function NewShelterPage() {
  const router = useRouter();
  const params = useParams();
  const shelterId = params?.id ? parseInt(params.id as string) : null;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
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
      toast.error('Error al cargar el albergue');
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
          setLoading(false);
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

    const newErrors: FormErrors = {};
    if (v.pipe(formData.nombre, v.required, v.maxLength(100))) newErrors.nombre = v.pipe(formData.nombre, v.required, v.maxLength(100))!;
    if (v.pipe(formData.email, v.required, v.email)) newErrors.email = v.pipe(formData.email, v.required, v.email)!;
    if (v.phone(formData.telefono)) newErrors.telefono = v.phone(formData.telefono)!;
    if (v.pipe(formData.direccion, v.required, v.maxLength(200))) newErrors.direccion = v.pipe(formData.direccion, v.required, v.maxLength(200))!;
    if (!shelterId && v.pipe(formData.password, v.required, v.password)) newErrors.password = v.pipe(formData.password, v.required, v.password)!;
    if (shelterId && formData.password && v.password(formData.password)) newErrors.password = v.password(formData.password)!;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);

    try {
      if (shelterId) {
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
      } else {
        // Para crear, enviar todos los campos incluyendo password
        await api.post('/shelters/', {
          nombre: sanitize(formData.nombre, 100),
          direccion: sanitize(formData.direccion, 200),
          telefono: formData.telefono.replace(/\D/g, ''),
          email: sanitize(formData.email),
          password: formData.password,
          nombre_usuario: formData.nombre_usuario ? sanitize(formData.nombre_usuario, 100) : undefined,
        });
      }
      toast.success('Albergue guardado correctamente');
      router.push('/dashboard/administrador/albergues');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      toast.error(getErrorMessage(apiError, 'Error al guardar'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {shelterId ? 'Editar Albergue' : 'Nuevo Albergue'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              maxLength={100}
              className={`w-full px-3 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
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
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
              maxLength={10}
              placeholder="Ej: 3001234567"
              className={`w-full px-3 py-2 border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Usuario (Opcional)
            </label>
            <input
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario || ''}
              onChange={handleChange}
              placeholder="Si no se especifica, se usará el nombre del albergue"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Si no se especifica, se usará el nombre del albergue
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña {shelterId ? '(Dejar vacío para no cambiar)' : '*'}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!shelterId}
              className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {!shelterId && <p className="text-gray-400 text-xs mt-1">Mínimo 8 caracteres, una letra y un número</p>}
            {shelterId && (
              <p className="text-xs text-gray-500 mt-1">
                Dejar vacío para mantener la contraseña actual
              </p>
            )}
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
              maxLength={200}
              className={`w-full px-3 py-2 border rounded-md ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
          </div>

          {shelterId && (
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
          )}
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

