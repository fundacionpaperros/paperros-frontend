'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

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
      
      // Verificar si la respuesta es un error
      if (response.data && typeof response.data === 'object' && 'detail' in response.data) {
        // Es un objeto de error, no datos válidos
        const errorDetail = response.data.detail;
        let errorMessage = 'Error al cargar animales';
        
        if (typeof errorDetail === 'string') {
          errorMessage = errorDetail;
        } else if (Array.isArray(errorDetail)) {
          const errorArray = errorDetail as Array<string | { loc?: string[]; msg?: string }>;
          errorMessage = errorArray.map((e: string | { loc?: string[]; msg?: string }) => {
            if (typeof e === 'string') return e;
            if (e && typeof e === 'object' && 'msg' in e) {
              return `${e.loc?.join('.') || 'campo'}: ${e.msg || 'Error de validación'}`;
            }
            return 'Error de validación';
          }).join(', ');
        } else if (typeof errorDetail === 'object') {
          errorMessage = 'Error de validación en la respuesta del servidor';
        }
        
        setError(errorMessage);
        setAnimals([]);
        return;
      }
      
      // Asegurarse de que response.data sea un array
      const animalsData = Array.isArray(response.data) ? response.data : [];
      // Validar que cada animal tenga los campos necesarios
      const validAnimals = animalsData.filter((animal: unknown) => 
        animal && typeof animal === 'object' && 'id' in animal && 'nombre' in animal
      ) as Animal[];
      setAnimals(validAnimals);
      setError('');
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      const errorDetail = apiError.response?.data?.detail;
      let errorMessage = 'Error al cargar animales';
      
      if (errorDetail) {
        if (typeof errorDetail === 'string') {
          errorMessage = errorDetail;
        } else if (Array.isArray(errorDetail)) {
          // Es un array de errores de validación de Pydantic
          const errorArray = errorDetail as Array<string | { loc?: string[]; msg?: string }>;
          errorMessage = errorArray.map((e: string | { loc?: string[]; msg?: string }) => {
            if (typeof e === 'string') return e;
            if (e && typeof e === 'object' && 'msg' in e) {
              return `${e.loc?.join('.') || 'campo'}: ${e.msg || 'Error de validación'}`;
            }
            return 'Error de validación';
          }).join(', ');
        } else if (typeof errorDetail === 'object') {
          errorMessage = 'Error de validación en la respuesta del servidor';
        }
      }
      
      setError(errorMessage);
      setAnimals([]);
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
      const errorDetail = apiError.response?.data?.detail;
      let errorMessage = 'Error al actualizar estado';
      
      if (errorDetail) {
        if (typeof errorDetail === 'string') {
          errorMessage = errorDetail;
        } else if (Array.isArray(errorDetail)) {
          const errorArray = errorDetail as Array<string | { loc?: string[]; msg?: string }>;
          errorMessage = errorArray.map((e: string | { loc?: string[]; msg?: string }) => 
            typeof e === 'string' ? e : `${e.loc?.join('.') || 'campo'}: ${e.msg || 'Error de validación'}`
          ).join(', ');
        } else if (typeof errorDetail === 'object') {
          errorMessage = JSON.stringify(errorDetail);
        }
      }
      
      alert(errorMessage);
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
          href="/dashboard/albergue/animales/nuevo"
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {typeof animal.nombre === 'string' ? animal.nombre : String(animal.nombre || '')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {typeof animal.especie === 'string' ? animal.especie : String(animal.especie || '')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof animal.raza === 'string' ? animal.raza : String(animal.raza || '')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof animal.edad === 'number' ? `${animal.edad} ${animal.edad === 1 ? 'año' : 'años'}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {animal.numero_chip && typeof animal.numero_chip === 'string' ? animal.numero_chip : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={typeof animal.estado === 'string' ? animal.estado : 'disponible'}
                    onChange={(e) => handleStatusChange(animal.id, e.target.value)}
                    className={`text-xs rounded-full px-2 py-1 border-0 ${
                      (typeof animal.estado === 'string' && animal.estado === 'disponible') ? 'bg-green-100 text-green-800' :
                      (typeof animal.estado === 'string' && animal.estado === 'adoptado') ? 'bg-blue-100 text-blue-800' :
                      (typeof animal.estado === 'string' && animal.estado === 'fallecido') ? 'bg-red-100 text-red-800' :
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
                    href={`/dashboard/albergue/animales/${animal.id}`}
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

