'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  talla: string;
  numero_chip?: string;
}

export default function ShelterAnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await api.get('/animals?limit=100');
      setAnimals(response.data);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al cargar animales'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await api.put(`/animals/${id}`, { estado: newStatus });
      fetchAnimals();
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al actualizar estado');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando animales...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Animales</h1>
        <Link
          href="/albergue/animales/nuevo"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Agregar Animal
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Raza</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chip</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{animal.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{animal.especie}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.raza}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.edad} meses</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.numero_chip || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={animal.estado}
                    onChange={(e) => handleStatusChange(animal.id, e.target.value)}
                    className={`text-xs rounded-full px-2 py-1 border-0 ${
                      animal.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                      animal.estado === 'adoptado' ? 'bg-blue-100 text-blue-800' :
                      animal.estado === 'fallecido' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="disponible">Disponible</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="adoptado">Adoptado</option>
                    <option value="fallecido">Fallecido</option>
                    <option value="otro">Otro</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/albergue/animales/${animal.id}`}
                    className="text-primary hover:text-primary/80"
                  >
                    Editar
                  </Link>
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
    </div>
  );
}

