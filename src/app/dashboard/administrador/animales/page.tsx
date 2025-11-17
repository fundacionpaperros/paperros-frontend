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
}

export default function AnimalsPage() {
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

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este animal?')) return;

    try {
      await api.delete(`/animals/${id}`);
      fetchAnimals();
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al eliminar');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando animales...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Animales</h1>
        <Link
          href="/dashboard/administrador/animales/nuevo"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 cursor-pointer"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Raza</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edad (meses)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Talla</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{animal.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{animal.nombre}</td>
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
    </div>
  );
}

