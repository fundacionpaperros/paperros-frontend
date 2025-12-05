'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';
import { authService } from '@/lib/auth';

interface Shelter {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  usuario_id: number;
  activo: boolean;
  usuario_nombre?: string;
  usuario_email?: string;
  created_at: string;
  updated_at: string;
}

export default function SheltersPage() {
  const router = useRouter();
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

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
        await fetchShelters();
      } catch {
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchShelters = async () => {
    try {
      const response = await api.get<Shelter[]>('/shelters/?limit=100');
      setShelters(response.data);
    } catch (error) {
      console.error('Error loading shelters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shelterId: number, nombre: string) => {
    if (!confirm(`¿Está seguro de eliminar el albergue "${nombre}"? Esta acción también eliminará el usuario asociado.`)) {
      return;
    }

    try {
      await api.delete(`/shelters/${shelterId}`);
      await fetchShelters();
      alert('Albergue eliminado exitosamente');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(getErrorMessage(apiError, 'Error al eliminar albergue'));
    }
  };

  const handleToggleActive = async (shelter: Shelter) => {
    try {
      await api.put(`/shelters/${shelter.id}`, {
        activo: !shelter.activo
      });
      await fetchShelters();
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(getErrorMessage(apiError, 'Error al actualizar estado'));
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Albergues</h1>
        <Link
          href="/dashboard/administrador/albergues/nuevo"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 cursor-pointer"
        >
          Nuevo Albergue
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dirección
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shelters.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No hay albergues registrados
                </td>
              </tr>
            ) : (
              shelters.map((shelter) => (
                <tr key={shelter.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shelter.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shelter.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shelter.telefono}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {shelter.direccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        shelter.activo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {shelter.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/dashboard/administrador/albergues/${shelter.id}`}
                      className="text-primary hover:text-primary/80"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleToggleActive(shelter)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {shelter.activo ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => handleDelete(shelter.id, shelter.nombre)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

