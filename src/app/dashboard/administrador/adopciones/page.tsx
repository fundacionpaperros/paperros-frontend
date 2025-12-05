'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface Adoption {
  id: number;
  adoptante_id: number;
  animal_id: number;
  estado: string;
  fecha_match?: string;
  fecha_cita?: string;
  fecha_adopcion_final?: string;
  animal?: {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    foto_url?: string;
  };
  adoptante?: {
    id: number;
    nombre: string;
    email: string;
    cedula: string;
    telefono?: string;
    ciudad?: string;
  };
}

export default function AdoptionsPage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const response = await api.get('/adoption-process/adoptions/?limit=100');
      setAdoptions(response.data || []);
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      console.error('Error loading adoptions:', apiError);
      if (apiError.response?.status === 403) {
        console.error('No tienes permisos para ver adopciones');
      }
    } finally {
      setLoading(false);
    }
  };

  const getEstadoLabel = (estado: string) => {
    const estados: Record<string, string> = {
      pendiente_match: 'Pendiente de Match',
      match_realizado: 'Match Realizado',
      cita_agendada: 'Cita Agendada',
      cita_completada: 'Cita Completada',
      periodo_prueba_2dias: 'Periodo de Prueba (2 días)',
      periodo_prueba_2meses: 'Periodo de Prueba (2 meses)',
      adoptado_final: 'Adoptado',
      adopcion_no_concretada: 'Adopción No Concretada',
      cancelada: 'Cancelada',
    };
    return estados[estado] || estado;
  };

  const filteredAdoptions = filter
    ? adoptions.filter(a => a.estado === filter)
    : adoptions;

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Adopciones</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded cursor-pointer"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente_match">Pendiente de Match</option>
          <option value="match_realizado">Match Realizado</option>
          <option value="cita_agendada">Cita Agendada</option>
          <option value="cita_completada">Cita Completada</option>
          <option value="periodo_prueba_2dias">Prueba 2 días</option>
          <option value="periodo_prueba_2meses">Prueba 2 meses</option>
          <option value="adoptado_final">Adoptado</option>
          <option value="adopcion_no_concretada">Adopción No Concretada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adoptante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdoptions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay adopciones registradas
                </td>
              </tr>
            ) : (
              filteredAdoptions.map((adoption) => (
                <tr key={adoption.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium">
                      {adoption.adoptante?.nombre || 'Sin nombre'}
                    </div>
                    {adoption.adoptante?.email && (
                      <div className="text-xs text-gray-500">{adoption.adoptante.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium">
                      {adoption.animal?.nombre || 'Sin nombre'}
                    </div>
                    {adoption.animal && (
                      <div className="text-xs text-gray-500 capitalize">
                        {adoption.animal.especie || ''} {adoption.animal.raza ? `• ${adoption.animal.raza}` : ''}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      adoption.estado === 'adoptado_final' ? 'bg-green-100 text-green-800' :
                      adoption.estado === 'adopcion_no_concretada' || adoption.estado === 'cancelada' ? 'bg-red-100 text-red-800' :
                      adoption.estado.includes('prueba') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getEstadoLabel(adoption.estado)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {adoption.fecha_match ? new Date(adoption.fecha_match).toLocaleDateString('es-CO') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/dashboard/administrador/adopciones/${adoption.id}`}
                      className="text-primary hover:text-primary/80 cursor-pointer"
                    >
                      Ver Detalles
                    </Link>
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

