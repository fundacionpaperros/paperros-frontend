'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Adopter {
  id: number;
  cedula: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  bandera: 'verde' | 'amarilla' | 'roja';
  usuario_nombre?: string;
}

export default function AdoptersPage() {
  const [adopters, setAdopters] = useState<Adopter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetchAdopters();
  }, []);

  const fetchAdopters = async () => {
    try {
      const response = await api.get('/adopters?limit=100');
      setAdopters(response.data);
    } catch (error) {
      console.error('Error loading adopters:', error);
    } finally {
      setLoading(false);
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

  const getBanderaLabel = (bandera: string) => {
    const labels: Record<string, string> = {
      verde: 'Bandera Verde',
      amarilla: 'Bandera Amarilla',
      roja: 'Bandera Roja',
    };
    return labels[bandera] || bandera;
  };

  const filteredAdopters = filter
    ? adopters.filter(a => a.bandera === filter)
    : adopters;

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Adoptantes</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">Todas las banderas</option>
          <option value="verde">Bandera Verde</option>
          <option value="amarilla">Bandera Amarilla</option>
          <option value="roja">Bandera Roja</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cédula</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bandera</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdopters.map((adopter) => (
              <tr key={adopter.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {adopter.usuario_nombre || `Adoptante #${adopter.id}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{adopter.cedula}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{adopter.telefono}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{adopter.ciudad}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getBanderaColor(adopter.bandera)}`}>
                    {getBanderaLabel(adopter.bandera)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/administracion/adoptantes/${adopter.id}`}
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

