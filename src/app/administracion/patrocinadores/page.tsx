'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Sponsor {
  id: number;
  nombre: string;
  logo_url: string;
  enlace?: string;
  descripcion?: string;
  activo: boolean;
  orden: number;
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await api.get('/sponsors?limit=100');
      setSponsors(response.data);
    } catch {
      console.error('Error loading sponsors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este patrocinador?')) return;
    try {
      await api.delete(`/sponsors/${id}`);
      fetchSponsors();
    } catch {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patrocinadores</h1>
        <Link
          href="/administracion/patrocinadores/nuevo"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Agregar Patrocinador
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enlace</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sponsors.map((sponsor) => (
              <tr key={sponsor.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{sponsor.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sponsor.logo_url}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sponsor.enlace || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    sponsor.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {sponsor.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/administracion/patrocinadores/${sponsor.id}`}
                    className="text-primary hover:text-primary/80 mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(sponsor.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

