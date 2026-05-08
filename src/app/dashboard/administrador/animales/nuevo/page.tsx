'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { uploadFile, validateImageFile } from '@/lib/upload';
import { ApiErrorResponse } from '@/lib/types';
import { v, FormErrors, sanitize } from '@/lib/validators';

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
  temperamento?: 'social' | 'agresivo' | 'pasivo_agresivo' | 'timido' | 'independiente';
  albergue_id: number;
  foto_url?: string;
}

interface Shelter {
  id: number;
  nombre: string;
}

export default function NewAnimalPage() {
  const router = useRouter();
  const params = useParams();
  const animalId = params?.id ? parseInt(params.id as string) : null;
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const loadShelters = useCallback(async () => {
    try {
      const response = await api.get('/shelters/simple');
      setShelters(response.data);
      if (response.data.length > 0 && !animalId) {
        setFormData(prev => ({ ...prev, albergue_id: response.data[0].id }));
      }
    } catch (error) {
      console.error('Error loading shelters:', error);
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  const loadAnimal = useCallback(async () => {
    if (!animalId) return;
    try {
      const response = await api.get(`/animals/${animalId}`);
      setFormData(response.data);
      if (response.data.foto_url) {
        setPreviewUrl(response.data.foto_url.startsWith('/static/')
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com'}${response.data.foto_url}`
          : response.data.foto_url);
      }
    } catch (error) {
      console.error('Error loading animal:', error);
    }
  }, [animalId]);

  useEffect(() => {
    loadShelters();
    if (animalId) {
      loadAnimal();
    }
  }, [animalId, loadShelters, loadAnimal]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => { setPreviewUrl(reader.result as string); };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const filePath = await uploadFile(file, 'animal');
      setFormData(prev => ({ ...prev, foto_url: filePath }));
    } catch (error: unknown) {
      const uploadError = error as Error;
      alert(uploadError.message || 'Error al subir foto');
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const nombreErr = v.pipe(formData.nombre, v.required, v.maxLength(100));
    if (nombreErr) newErrors.nombre = nombreErr;
    const razaErr = v.pipe(formData.raza, v.required, v.maxLength(100));
    if (razaErr) newErrors.raza = razaErr;
    const colorErr = v.pipe(formData.color, v.required, v.maxLength(50));
    if (colorErr) newErrors.color = colorErr;
    const edadErr = v.numberRange(0, 30)(formData.edad);
    if (edadErr) newErrors.edad = edadErr;
    const vacunaErr = v.pipe(formData.esquema_vacunacion, v.required, v.maxLength(300));
    if (vacunaErr) newErrors.esquema_vacunacion = vacunaErr;
    if (formData.numero_chip) {
      const chipErr = v.maxLength(50)(formData.numero_chip);
      if (chipErr) newErrors.numero_chip = chipErr;
    }
    if (formData.senales_particulares) {
      const senalesErr = v.noScript(formData.senales_particulares);
      if (senalesErr) newErrors.senales_particulares = senalesErr;
    }
    if (formData.discapacidad) {
      const discErr = v.noScript(formData.discapacidad);
      if (discErr) newErrors.discapacidad = discErr;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const sanitized = {
      ...formData,
      nombre: sanitize(formData.nombre, 100),
      raza: sanitize(formData.raza, 100),
      color: sanitize(formData.color, 50),
      esquema_vacunacion: sanitize(formData.esquema_vacunacion, 300),
      senales_particulares: formData.senales_particulares ? sanitize(formData.senales_particulares, 500) : undefined,
      discapacidad: formData.discapacidad ? sanitize(formData.discapacidad, 500) : undefined,
      temperamento: formData.temperamento || undefined,
    };

    setApiError(null);
    setSaving(true);

    try {
      if (animalId) {
        await api.put(`/animals/${animalId}`, sanitized);
      } else {
        await api.post('/animals/', sanitized);
      }
      router.push('/dashboard/administrador/animales');
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      const msg = err.response?.data?.detail || 'Error al guardar. Verifica los datos e intenta de nuevo.';
      setApiError(typeof msg === 'string' ? msg : JSON.stringify(msg));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const parsed = (type === 'number' || name === 'albergue_id') ? (parseInt(value) || 0) : value;
    setFormData(prev => ({ ...prev, [name]: parsed }));
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {animalId ? 'Editar Animal' : 'Nuevo Animal'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Chip</label>
            <input
              type="text"
              name="numero_chip"
              value={formData.numero_chip || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.numero_chip ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.numero_chip && <p className="text-red-500 text-xs mt-1">{errors.numero_chip}</p>}
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
              className={`w-full px-3 py-2 border rounded-md ${errors.raza ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.raza && <p className="text-red-500 text-xs mt-1">{errors.raza}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${errors.color ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Edad (años) *</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              min="0"
              max="30"
              className={`w-full px-3 py-2 border rounded-md ${errors.edad ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad}</p>}
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
              className={`w-full px-3 py-2 border rounded-md ${errors.esquema_vacunacion ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.esquema_vacunacion && <p className="text-red-500 text-xs mt-1">{errors.esquema_vacunacion}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Albergue *</label>
            <select
              name="albergue_id"
              value={formData.albergue_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {shelters.map((shelter) => (
                <option key={shelter.id} value={shelter.id}>
                  {shelter.nombre}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperamento</label>
            <select
              name="temperamento"
              value={formData.temperamento || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.temperamento ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Sin especificar</option>
              <option value="social">Social</option>
              <option value="agresivo">Agresivo</option>
              <option value="pasivo_agresivo">Pasivo-Agresivo</option>
              <option value="timido">Tímido</option>
              <option value="independiente">Independiente</option>
            </select>
            {errors.temperamento && <p className="text-red-500 text-xs mt-1">{errors.temperamento}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Señales Particulares</label>
          <textarea
            name="senales_particulares"
            value={formData.senales_particulares || ''}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md ${errors.senales_particulares ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.senales_particulares && <p className="text-red-500 text-xs mt-1">{errors.senales_particulares}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discapacidad</label>
          <textarea
            name="discapacidad"
            value={formData.discapacidad || ''}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md ${errors.discapacidad ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.discapacidad && <p className="text-red-500 text-xs mt-1">{errors.discapacidad}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto del Animal</label>
          <div className="mb-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 disabled:opacity-50"
            />
            {uploading && <p className="text-sm text-blue-600 mt-1">Subiendo foto...</p>}
          </div>
          {previewUrl && (
            <div className="mb-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-64 object-contain border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error al guardar</p>
            <p className="text-sm mt-1">{apiError}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link
            href="/dashboard/administrador/animales"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
