'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';
import { confirmToast } from '@/lib/confirm-toast';
import toast from 'react-hot-toast';

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  talla: string;
  albergue_id: number;
}

interface Shelter {
  id: number;
  nombre: string;
}

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [selectedShelterId, setSelectedShelterId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchShelters = useCallback(async () => {
    try {
      const response = await api.get('/shelters/simple');
      setShelters(response.data);
    } catch {
      // no-op: filtro simplemente no aparece si falla
    }
  }, []);

  const fetchAnimals = useCallback(async (shelterId?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (shelterId) params.set('albergue_id', shelterId);
      const response = await api.get(`/animals/?${params.toString()}`);
      setAnimals(response.data);
    } catch (err: unknown) {
      setError(getErrorMessage(err as ApiErrorResponse, 'Error al cargar animales'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShelters();
    fetchAnimals();
  }, [fetchShelters, fetchAnimals]);

  const handleShelterChange = (value: string) => {
    setSelectedShelterId(value);
    fetchAnimals(value || undefined);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirmToast('¿Estás seguro de eliminar este animal?');
    if (!confirmed) return;
    try {
      await api.delete(`/animals/${id}`);
      toast.success('Animal eliminado correctamente');
      fetchAnimals(selectedShelterId || undefined);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      toast.error((apiError.response?.data?.detail as string) || 'Error al eliminar');
    }
  };

  const shelterName = (id: number) =>
    shelters.find((s) => s.id === id)?.nombre ?? `Albergue #${id}`;


  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Animales</h1>
        <Link
          href="/dashboard/administrador/animales/nuevo"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 cursor-pointer"
        >
          Agregar Animal
        </Link>
      </div>

      {/* Filtro por albergue */}
      {shelters.length > 0 && (
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Filtrar por albergue:</label>
          <select
            value={selectedShelterId}
            onChange={(e) => handleShelterChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos los albergues</option>
            {shelters.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Cargando animales...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Raza</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad (años)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Talla</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Albergue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{animal.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/adopciones/${animal.id}`} className="text-primary hover:text-accent-orange hover:underline transition-colors">
                      {animal.nombre}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{animal.especie}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.raza}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.edad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{animal.talla}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      animal.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                      animal.estado === 'adoptado' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {animal.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shelterName(animal.albergue_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/dashboard/administrador/animales/${animal.id}`}
                      className="text-primary hover:text-primary/80 mr-4"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(animal.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {animals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay animales registrados
            </div>
          )}
        </div>
      )}
    </div>
  );
}
