'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, auth, User } from '@/lib/auth';
import Link from 'next/link';
import api from '@/lib/api';

interface Adoption {
  id: number;
  animal_id?: number;
  adoptante_id?: number;
  estado: string;
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
  };
  fecha_cita?: string;
  created_at: string;
}

interface Appointment {
  id: number;
  fecha_hora: string;
  lugar: string;
  estado: string;
  adoption_ids?: number[];
  animals?: Array<{
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    foto_url?: string;
  }>;
  adoptante?: {
    id: number;
    nombre: string;
    email: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    animales: 0,
    adopciones: 0,
    adoptantes: 0,
    seguimientos: 0,
    citas_proximas: 0,
  });
  const [recentAdoptions, setRecentAdoptions] = useState<Adoption[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!auth.isAuthenticated()) {
        router.push('/auth/login');
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        // Cargar estadísticas solo para admin y fundacion
        if (userData.rol === 'admin' || userData.rol === 'fundacion') {
          try {
            const statsResponse = await api.get('/adoption-process/stats');
            setStats({
              animales: statsResponse.data.animales || 0,
              adopciones: statsResponse.data.adopciones || 0,
              adoptantes: statsResponse.data.adoptantes || 0,
              seguimientos: statsResponse.data.seguimientos || 0,
              citas_proximas: statsResponse.data.citas_proximas || 0,
            });

            // Cargar adopciones recientes (últimas 5)
            const adoptionsResponse = await api.get('/adoption-process/adoptions?limit=5');
            setRecentAdoptions(adoptionsResponse.data || []);

            // Cargar citas próximas (próximas 5)
            const appointmentsResponse = await api.get('/adoption-process/appointments?upcoming_only=true&limit=5');
            setUpcomingAppointments(appointmentsResponse.data || []);
          } catch {
            console.error('Error loading dashboard data');
          }
        }
      } catch {
        auth.removeToken();
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Definir tarjetas según el rol
  const getStatCards = () => {
    const baseCards = [
      { title: 'Animales', value: stats.animales, link: '/dashboard/administrador/animales', color: 'bg-blue-500', roles: ['admin', 'fundacion'] },
      { title: 'Animales', value: stats.animales, link: '/dashboard/albergue/animales', color: 'bg-blue-500', roles: ['albergue'] },
      { title: 'Adopciones', value: stats.adopciones, link: '/dashboard/administrador/adopciones', color: 'bg-green-500', roles: ['admin', 'fundacion'] },
      { title: 'Adoptantes', value: stats.adoptantes, link: '/dashboard/administrador/adoptantes', color: 'bg-purple-500', roles: ['admin', 'fundacion'] },
      { title: 'Seguimientos', value: stats.seguimientos, link: '/dashboard/administrador/seguimiento', color: 'bg-orange-500', roles: ['admin', 'fundacion'] },
      { title: 'Citas Próximas', value: stats.citas_proximas, link: '/dashboard/administrador/adopciones', color: 'bg-pink-500', roles: ['admin', 'fundacion'] },
    ];

    return baseCards.filter(card => card.roles.includes(user.rol));
  };

  const statCards = getStatCards();

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

  const getEstadoColor = (estado: string) => {
    if (estado === 'adoptado_final') return 'bg-green-100 text-green-800';
    if (estado === 'adopcion_no_concretada' || estado === 'cancelada') return 'bg-red-100 text-red-800';
    if (estado.includes('prueba')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenido, {user.nombre}</h1>
        <p className="text-gray-600 capitalize">Rol: {user.rol}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.link}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className={`${stat.color} w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
              {stat.value}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
          </Link>
        ))}
      </div>

      {/* Sección de Adopciones Recientes - Solo para admin y fundacion */}
      {(user.rol === 'admin' || user.rol === 'fundacion') && recentAdoptions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Adopciones Recientes</h2>
            <Link
              href="/dashboard/administrador/adopciones"
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              Ver todas →
            </Link>
          </div>
          <div className="space-y-4">
            {recentAdoptions.map((adoption) => (
              <div key={adoption.id} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {adoption.animal?.foto_url && (
                        <img
                          src={adoption.animal.foto_url.startsWith('http') ? adoption.animal.foto_url : `http://localhost:8000${adoption.animal.foto_url}`}
                          alt={adoption.animal.nombre}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">
                          {adoption.animal?.nombre || `Animal #${adoption.animal_id}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {adoption.adoptante?.nombre || `Adoptante #${adoption.adoptante_id}`}
                          {adoption.adoptante?.email && ` • ${adoption.adoptante.email}`}
                        </p>
                      </div>
                    </div>
                    {adoption.fecha_cita && (
                      <p className="text-sm text-gray-500">
                        Cita: {new Date(adoption.fecha_cita).toLocaleString('es-CO')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(adoption.estado)}`}>
                      {getEstadoLabel(adoption.estado)}
                    </span>
                    <Link
                      href={`/dashboard/administrador/adopciones/${adoption.id}`}
                      className="block mt-2 text-sm text-primary hover:underline cursor-pointer"
                    >
                      Ver detalles →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Citas Próximas - Solo para admin y fundacion */}
      {(user.rol === 'admin' || user.rol === 'fundacion') && upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Citas Próximas</h2>
            <Link
              href="/dashboard/administrador/adopciones"
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              Ver todas →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border-l-4 border-pink-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 mb-1">Mascotas incluidas:</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {appointment.animals && appointment.animals.length > 0 ? (
                          appointment.animals.map((animal, idx) => (
                            <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                              {animal.foto_url && (
                                <img
                                  src={animal.foto_url.startsWith('http') ? animal.foto_url : `http://localhost:8000${animal.foto_url}`}
                                  alt={animal.nombre}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              )}
                              {animal.nombre}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">Sin animales asociados</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {appointment.adoptante?.nombre || 'Adoptante'}
                        {appointment.adoptante?.email && ` • ${appointment.adoptante.email}`}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(appointment.fecha_hora).toLocaleString('es-CO', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">Lugar: {appointment.lugar}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.estado === 'confirmada' ? 'bg-green-100 text-green-800' :
                      appointment.estado === 'cancelada' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.estado}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.rol === 'admin' && (
            <>
              <Link
                href="/dashboard/administrador/patrocinadores"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Gestionar Patrocinadores</h3>
                <p className="text-sm text-gray-600">Administrar aliados y patrocinadores</p>
              </Link>
              <Link
                href="/dashboard/administrador/eventos"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Gestionar Eventos</h3>
                <p className="text-sm text-gray-600">Administrar eventos públicos</p>
              </Link>
            </>
          )}
          
          {(user.rol === 'admin' || user.rol === 'fundacion') && (
            <>
              <Link
                href="/dashboard/administrador/animales"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Gestionar Animales</h3>
                <p className="text-sm text-gray-600">Agregar, editar o eliminar animales</p>
              </Link>
              <Link
                href="/dashboard/administrador/adopciones"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Ver Adopciones</h3>
                <p className="text-sm text-gray-600">Revisar estado de adopciones</p>
              </Link>
              <Link
                href="/dashboard/administrador/seguimiento"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Seguimiento</h3>
                <p className="text-sm text-gray-600">Visitas y recordatorios</p>
              </Link>
            </>
          )}
          
          {user.rol === 'albergue' && (
            <>
              <Link
                href="/dashboard/albergue/animales"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Mis Animales</h3>
                <p className="text-sm text-gray-600">Ver y gestionar mis animales</p>
              </Link>
              <Link
                href="/dashboard/albergue/animales/nuevo"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-semibold">Agregar Animal</h3>
                <p className="text-sm text-gray-600">Registrar un nuevo animal</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

