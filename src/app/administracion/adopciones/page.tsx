'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Adoption {
  id: number;
  adoptante_id: number;
  animal_id: number;
  estado: string;
  fecha_match?: string;
  fecha_cita?: string;
  fecha_adopcion_final?: string;
  animal_nombre?: string;
  adoptante_nombre?: string;
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
      const response = await api.get('/adoption-process/adoptions?limit=100');
      setAdoptions(response.data);
    } catch (error) {
      console.error('Error loading adoptions:', error);
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
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente_match">Pendiente de Match</option>
          <option value="match_realizado">Match Realizado</option>
          <option value="cita_agendada">Cita Agendada</option>
          <option value="periodo_prueba_2dias">Prueba 2 días</option>
          <option value="periodo_prueba_2meses">Prueba 2 meses</option>
          <option value="adoptado_final">Adoptado</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adoptante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Animal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdoptions.map((adoption) => (
              <tr key={adoption.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{adoption.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{adoption.adoptante_nombre || `#${adoption.adoptante_id}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{adoption.animal_nombre || `#${adoption.animal_id}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {getEstadoLabel(adoption.estado)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {adoption.fecha_match ? new Date(adoption.fecha_match).toLocaleDateString('es-CO') : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/administracion/adopciones/${adoption.id}`}
                    className="text-primary hover:text-primary/80"
                  >
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

