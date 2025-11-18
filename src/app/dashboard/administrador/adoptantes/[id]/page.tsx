'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
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
    foto_url?: string;
  };
}

export default function AdopterDetailPage() {
  const params = useParams();
  const adopterId = params?.id ? parseInt(params.id as string) : null;
  const [adopter, setAdopter] = useState<Adopter | null>(null);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!adopterId) return;
    try {
      const adopterRes = await api.get(`/adopters/${adopterId}`);
      setAdopter(adopterRes.data);

      // Load adoptions for this adopter
      const adoptionsRes = await api.get(`/adoption-process/adoptions?adoptante_id=${adopterId}&limit=100`).catch(() => ({ data: [] }));
      setAdoptions(adoptionsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [adopterId]);

  useEffect(() => {
    if (adopterId) {
      loadData();
    }
  }, [adopterId, loadData]);

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

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (!adopter) return <div className="text-center py-8">Adoptante no encontrado</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalle de Adoptante</h1>
        <Link
          href="/dashboard/administrador/adoptantes"
          className="text-primary hover:underline"
        >
          Volver
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Información Personal</h2>
        <div className="grid grid-cols-2 gap-4">
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

