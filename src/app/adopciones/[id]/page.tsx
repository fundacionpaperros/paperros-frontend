'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { authService } from '@/lib/auth';

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  color: string;
  sexo: string;
  talla: string;
  edad: number;
  estado_reproductivo: string;
  esquema_vacunacion: string;
  senales_particulares: string | null;
  discapacidad: string | null;
  numero_chip: string | null;
  estado: string;
  foto_url: string | null;
  albergue_id: number;
}

function getImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'https://api.fundacionpaperros.com';
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
}

const TALLA_LABELS: Record<string, string> = {
  'pequeño': 'Pequeño',
  mediano: 'Mediano',
  grande: 'Grande',
};

const ESPECIE_EMOJI: Record<string, string> = {
  perro: '🐕',
  gato: '🐱',
  otro: '🐾',
};

const ESTADO_LABELS: Record<string, { label: string; color: string }> = {
  disponible:  { label: 'Disponible',   color: 'bg-green-100 text-green-800' },
  en_proceso:  { label: 'En proceso',   color: 'bg-yellow-100 text-yellow-800' },
  adoptado:    { label: 'Adoptado',     color: 'bg-blue-100 text-blue-800' },
  fallecido:   { label: 'Fallecido',    color: 'bg-gray-100 text-gray-600' },
  otro:        { label: 'Otro',         color: 'bg-gray-100 text-gray-800' },
};

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 py-3 pl-6 border-b border-white/10 last:border-0">
      <span className="text-xl w-7 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-white/60 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-white font-semibold capitalize">{value}</p>
      </div>
    </div>
  );
}

export default function AnimalProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      // Verificar autenticación y rol
      const authenticated = await authService.validateSession();
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (!['admin', 'fundacion', 'albergue'].includes(user.rol)) {
          router.push('/dashboard');
          return;
        }
        setUserRole(user.rol);
      } catch {
        router.push('/auth/login');
        return;
      }

      // Cargar animal
      try {
        const r = await api.get(`/animals/${id}`);
        setAnimal(r.data);
      } catch (e: unknown) {
        const err = e as { response?: { status?: number } };
        if (err.response?.status === 404) setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) init();
  }, [id, router]);

  const handleBack = () => {
    if (userRole === 'albergue') {
      router.push('/dashboard/albergue/animales');
    } else {
      router.push('/dashboard/administrador/animales');
    }
  };

  const handleEdit = () => {
    if (userRole === 'albergue') {
      router.push(`/dashboard/albergue/animales/${id}`);
    } else {
      router.push(`/dashboard/administrador/animales/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-primary text-lg">Cargando perfil...</div>
      </div>
    );
  }

  if (notFound || !animal) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center gap-4">
        <p className="text-primary text-xl font-semibold">Animal no encontrado</p>
        <button onClick={handleBack} className="text-accent-orange underline">
          Volver a la lista
        </button>
      </div>
    );
  }

  const imgUrl = getImageUrl(animal.foto_url);
  const emoji = ESPECIE_EMOJI[animal.especie] ?? '🐾';
  const estadoInfo = ESTADO_LABELS[animal.estado] ?? { label: animal.estado, color: 'bg-gray-100 text-gray-800' };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Barra superior: volver | nombre | editar */}
      <div className="bg-primary shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium flex-shrink-0"
          >
            ← Volver
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl flex-shrink-0">{emoji}</span>
            <h1 className="text-lg font-bold text-white truncate">{animal.nombre}</h1>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${estadoInfo.color}`}>
              {estadoInfo.label}
            </span>
          </div>

          <button
            onClick={handleEdit}
            className="bg-accent-orange text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent-orange/90 transition-colors flex-shrink-0"
          >
            Editar mascota
          </button>
        </div>
      </div>

      {/* Contenido: foto e info al mismo nivel */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Foto — ancho fijo en desktop */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
              {imgUrl ? (
                <Image
                  src={imgUrl}
                  alt={animal.nombre}
                  fill
                  className="object-cover"
                  unoptimized={imgUrl.startsWith('http')}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  {emoji}
                </div>
              )}
            </div>

            {/* Badge estado */}
            <div className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${estadoInfo.color}`}>
              <span className="w-2 h-2 rounded-full bg-current inline-block opacity-60" />
              {estadoInfo.label}
            </div>
          </div>

          {/* Info — ocupa el resto */}
          <div className="flex-1 space-y-4">
            {/* Datos principales */}
            <div className="bg-primary rounded-2xl shadow-md overflow-hidden">
              <InfoRow icon="🐾" label="Raza"   value={animal.raza} />
              <InfoRow icon="🎨" label="Color"  value={animal.color} />
              <InfoRow icon="⚧"  label="Sexo"   value={animal.sexo} />
              <InfoRow icon="📅" label="Edad"   value={`${animal.edad} ${animal.edad === 1 ? 'año' : 'años'}`} />
              <InfoRow icon="📏" label="Talla"  value={TALLA_LABELS[animal.talla] ?? animal.talla} />
              <InfoRow
                icon="✂️"
                label="Esterilización"
                value={animal.estado_reproductivo === 'esterilizado' ? 'Esterilizado/a' : 'No esterilizado/a'}
              />
              <InfoRow icon="💉" label="Vacunación" value={animal.esquema_vacunacion} />
              {animal.numero_chip && (
                <InfoRow icon="🔖" label="Microchip" value={animal.numero_chip} />
              )}
            </div>

            {/* Info adicional */}
            {(animal.senales_particulares || animal.discapacidad) && (
              <div className="bg-primary rounded-2xl shadow-md pl-6 pr-5 py-5 space-y-4">
                {animal.senales_particulares && (
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-1">
                      Señales particulares
                    </p>
                    <p className="text-white">{animal.senales_particulares}</p>
                  </div>
                )}
                {animal.discapacidad && (
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-1">
                      Condición especial
                    </p>
                    <p className="text-white">{animal.discapacidad}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
