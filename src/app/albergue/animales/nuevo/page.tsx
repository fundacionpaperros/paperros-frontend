'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface AnimalForm {
  numero_chip?: string;
  nombre: string;
  especie: 'perro' | 'gato' | 'otro';
  raza: string;
  color: string;
  sexo: 'macho' | 'hembra';
  talla: 'pequeño' | 'mediano' | 'grande';
  edad: number;
  estado_reproductivo: 'esterilizado' | 'no_esterilizado';
  esquema_vacunacion: string;
  senales_particulares?: string;
  discapacidad?: string;
  estado: 'disponible' | 'en_proceso' | 'adoptado' | 'fallecido' | 'otro';
  albergue_id: number;
  foto_url?: string;
}

export default function NewAnimalPage() {
  const router = useRouter();
  const params = useParams();
  const animalId = params?.id ? parseInt(params.id as string) : null;
  const [saving, setSaving] = useState(false);
  const [myShelterId, setMyShelterId] = useState<number | null>(null);
  const [formData, setFormData] = useState<AnimalForm>({
    nombre: '',
    especie: 'perro',
    raza: '',
    color: '',
    sexo: 'macho',
    talla: 'mediano',
    edad: 0,
    estado_reproductivo: 'esterilizado',
    esquema_vacunacion: '',
    estado: 'disponible',
    albergue_id: 0,
  });

  const loadMyShelter = useCallback(async () => {
    try {
      // Get shelter associated with user
      // This would need a specific endpoint, for now we'll use a workaround
      await api.get('/auth/me'); // Verificar autenticación pero no usar el resultado
      const animalsRes = await api.get('/animals?limit=1');
      if (animalsRes.data.length > 0) {
        setMyShelterId(animalsRes.data[0].albergue_id);
        setFormData(prev => ({ ...prev, albergue_id: animalsRes.data[0].albergue_id }));
      }
    } catch (error) {
      console.error('Error loading shelter:', error);
    }
  }, []);

  const loadAnimal = useCallback(async () => {
    if (!animalId) return;
    try {
      const response = await api.get(`/animals/${animalId}`);
      setFormData(response.data);
      setMyShelterId(response.data.albergue_id);
    } catch (error) {
      console.error('Error loading animal:', error);
    }
  }, [animalId]);

  useEffect(() => {
    loadMyShelter();
    if (animalId) {
      loadAnimal();
    }
  }, [animalId, loadMyShelter, loadAnimal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myShelterId) {
      alert('No se pudo determinar tu albergue');
      return;
    }

    setSaving(true);
    const submitData = { ...formData, albergue_id: myShelterId };

    try {
      if (animalId) {
        await api.put(`/animals/${animalId}`, submitData);
      } else {
        await api.post('/animals', submitData);
      }
      router.push('/albergue/animales');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {animalId ? 'Editar Animal' : 'Nuevo Animal'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Chip</label>
            <input
              type="text"
              name="numero_chip"
              value={formData.numero_chip || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Especie *</label>
            <select
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Raza *</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexo *</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Talla *</label>
            <select
              name="talla"
              value={formData.talla}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Edad (meses) *</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Reproductivo *</label>
            <select
              name="estado_reproductivo"
              value={formData.estado_reproductivo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="esterilizado">Esterilizado</option>
              <option value="no_esterilizado">No Esterilizado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Esquema de Vacunación *</label>
            <input
              type="text"
              name="esquema_vacunacion"
              value={formData.esquema_vacunacion}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="disponible">Disponible</option>
              <option value="en_proceso">En Proceso</option>
              <option value="adoptado">Adoptado</option>
              <option value="fallecido">Fallecido</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Señales Particulares</label>
          <textarea
            name="senales_particulares"
            value={formData.senales_particulares || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discapacidad</label>
          <textarea
            name="discapacidad"
            value={formData.discapacidad || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de Foto</label>
          <input
            type="url"
            name="foto_url"
            value={formData.foto_url || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link
            href="/albergue/animales"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

