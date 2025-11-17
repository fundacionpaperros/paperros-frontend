import api, { safeFetch } from './api';

// Types
export interface Sponsor {
  id: number;
  nombre: string;
  logo_url: string;
  enlace?: string;
  descripcion?: string;
  activo: boolean;
  orden: number;
}

export interface Event {
  id: number;
  nombre: string;
  fecha: string;
  lugar?: string;
  imagen_url: string;
  activo: boolean;
}

export interface Animal {
  id: number;
  numero_chip?: string;
  nombre: string;
  especie: 'perro' | 'gato' | 'otro';
  raza: string;
  color: string;
  sexo: 'macho' | 'hembra';
  talla: 'pequeño' | 'mediano' | 'grande';
  edad: number;
  estado: 'disponible' | 'en_proceso' | 'adoptado' | 'fallecido' | 'otro';
  foto_url?: string;
}

// Public content services
export const publicContentService = {
  getSponsors: async (activeOnly: boolean = true): Promise<Sponsor[]> => {
    return safeFetch(
      async () => {
        const response = await api.get<Sponsor[]>('/sponsors', {
          params: { active_only: activeOnly },
        });
        return response.data;
      },
      [] // Fallback to empty array
    );
  },

  getEvents: async (activeOnly: boolean = true, upcomingOnly: boolean = false): Promise<Event[]> => {
    return safeFetch(
      async () => {
        const response = await api.get<Event[]>('/events', {
          params: { active_only: activeOnly, upcoming_only: upcomingOnly },
        });
        return response.data;
      },
      [] // Fallback to empty array
    );
  },

  getAnimals: async (availableOnly: boolean = true): Promise<Animal[]> => {
    return safeFetch(
      async () => {
        const response = await api.get<Animal[]>('/animals', {
          params: { available_only: availableOnly },
        });
        return response.data;
      },
      [] // Fallback to empty array
    );
  },
};

