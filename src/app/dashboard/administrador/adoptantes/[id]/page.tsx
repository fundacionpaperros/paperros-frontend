'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';
import { v, FormErrors, sanitize } from '@/lib/validators';

interface Adopter {
  id: number;
  cedula: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  bandera: 'verde' | 'amarilla' | 'roja';
  usuario_nombre?: string;
  usuario_email?: string;
}

interface Adoption {
  id: number;
  animal_id: number;
  estado: string;
  fecha_match?: string;
  animal?: {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
  };
}

export default function AdopterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const adopterId = params?.id ? parseInt(params.id as string) : null;
  const [adopter, setAdopter] = useState<Adopter | null>(null);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [editForm, setEditForm] = useState({
    telefono: '',
    direccion: '',
    ciudad: '',
    bandera: 'verde' as 'verde' | 'amarilla' | 'roja',
  });

  const loadData = useCallback(async () => {
    if (!adopterId) return;
    try {
      const adopterRes = await api.get(`/adopters/${adopterId}`);
      setAdopter(adopterRes.data);
      setEditForm({
        telefono: adopterRes.data.telefono || '',
        direccion: adopterRes.data.direccion || '',
        ciudad: adopterRes.data.ciudad || '',
        bandera: adopterRes.data.bandera,
      });
      const adoptionsRes = await api.get(`/adoption-process/adoptions?adoptante_id=${adopterId}&limit=100`).catch(() => ({ data: [] }));
      setAdoptions(adoptionsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [adopterId]);

  useEffect(() => {
    if (adopterId) loadData();
  }, [adopterId, loadData]);

  const handleSave = async () => {
    if (!adopterId) return;
    const newErrors: FormErrors = {};
    if (v.phone(editForm.telefono)) newErrors.telefono = v.phone(editForm.telefono)!;
    if (v.pipe(editForm.direccion, v.required, v.maxLength(200))) newErrors.direccion = v.pipe(editForm.direccion, v.required, v.maxLength(200))!;
    if (v.pipe(editForm.ciudad, v.required, v.maxLength(100))) newErrors.ciudad = v.pipe(editForm.ciudad, v.required, v.maxLength(100))!;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      await api.put(`/adopters/${adopterId}`, {
        ...editForm,
        telefono: editForm.telefono.replace(/\D/g, ''),
        direccion: sanitize(editForm.direccion, 200),
        ciudad: sanitize(editForm.ciudad, 100),
      });
      await loadData();
      setEditing(false);
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!adopterId) return;
    if (!confirm('¿Estás seguro de eliminar este adoptante? Se eliminará también su cuenta de usuario y todas sus adopciones.')) return;
    try {
      await api.delete(`/adopters/${adopterId}`);
      router.push('/dashboard/administrador/adoptantes');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al eliminar');
    }
  };

  const getBanderaColor = (bandera: string) => {
    const colors: Record<string, string> = {
      verde: 'bg-green-100 text-green-800',
      amarilla: 'bg-yellow-100 text-yellow-800',
      roja: 'bg-red-100 text-red-800',
    };
    return colors[bandera] || 'bg-gray-100 text-gray-800';
  };

  const getBanderaLabel = (bandera: string) => ({
    verde: 'Bandera Verde',
    amarilla: 'Bandera Amarilla',
    roja: 'Bandera Roja',
  }[bandera] || bandera);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (!adopter) return <div className="text-center py-8">Adoptante no encontrado</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Detalle de Adoptante</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 cursor-pointer text-sm"
          >
            {editing ? 'Cancelar' : 'Editar'}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer text-sm"
          >
            Eliminar
          </button>
          <Link href="/dashboard/administrador/adoptantes" className="text-primary hover:underline text-sm flex items-center">
            Volver
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Información Personal</h2>

        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nombre</p>
                <p className="font-semibold">{adopter.usuario_nombre || 'Sin nombre'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold">{adopter.usuario_email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Cédula</p>
                <p className="font-semibold">{adopter.cedula}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={editForm.telefono}
                  onChange={e => setEditForm({ ...editForm, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Dirección</label>
                <input
                  type="text"
                  value={editForm.direccion}
                  onChange={e => setEditForm({ ...editForm, direccion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ciudad</label>
                <input
                  type="text"
                  value={editForm.ciudad}
                  onChange={e => setEditForm({ ...editForm, ciudad: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bandera</label>
                <select
                  value={editForm.bandera}
                  onChange={e => setEditForm({ ...editForm, bandera: e.target.value as 'verde' | 'amarilla' | 'roja' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="verde">Verde</option>
                  <option value="amarilla">Amarilla</option>
                  <option value="roja">Roja</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50 cursor-pointer text-sm"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="font-semibold">{adopter.usuario_nombre || 'Sin nombre'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{adopter.usuario_email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cédula</p>
              <p className="font-semibold">{adopter.cedula}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Teléfono</p>
              <p className="font-semibold">{adopter.telefono}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dirección</p>
              <p className="font-semibold">{adopter.direccion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ciudad</p>
              <p className="font-semibold">{adopter.ciudad}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bandera</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBanderaColor(adopter.bandera)}`}>
                {getBanderaLabel(adopter.bandera)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Adopciones</h2>
        {adoptions.length > 0 ? (
          <div className="space-y-2">
            {adoptions.map((adoption) => (
              <div key={adoption.id} className="border-l-4 border-primary pl-4 py-2">
                <Link
                  href={`/dashboard/administrador/adopciones/${adoption.id}`}
                  className="text-primary hover:underline font-semibold"
                >
                  Adopción #{adoption.id}
                </Link>
                <p className="text-sm text-gray-600">
                  Animal: {adoption.animal?.nombre || 'Sin nombre'}
                  {adoption.animal && (
                    <span className="text-xs text-gray-500 capitalize ml-2">
                      {adoption.animal.especie || ''} {adoption.animal.raza ? `• ${adoption.animal.raza}` : ''}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600">Estado: {adoption.estado}</p>
                {adoption.fecha_match && (
                  <p className="text-sm text-gray-500">
                    Fecha: {new Date(adoption.fecha_match).toLocaleDateString('es-CO')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tiene adopciones registradas</p>
        )}
      </div>
    </div>
  );
}
