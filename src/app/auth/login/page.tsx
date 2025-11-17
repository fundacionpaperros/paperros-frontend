'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService, auth } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface AdoptionProgress {
  proceso_paso: number | null;
  bandera: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [alertMessage, setAlertMessage] = useState<{ type: 'roja' | 'naranja' | null; message: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (auth.isAuthenticated()) {
        try {
          const user = await authService.getCurrentUser();
          
          // Redirigir según el rol
          if (user.rol === 'adoptante') {
            try {
              const progress = await api.get<AdoptionProgress>('/adoption-process/progress');
              const { proceso_paso } = progress.data;
              
              if (proceso_paso && proceso_paso >= 6) {
                router.push('/adopta/mis-adopciones');
              } else if (proceso_paso === 5) {
                router.push('/adopta/cita');
              } else if (proceso_paso === 4) {
                router.push('/adopta/match');
              } else if (proceso_paso === 3) {
                router.push('/adopta/informacion-hogar');
              } else {
                router.push('/adopta/certificacion');
              }
            } catch {
              router.push('/adopta/certificacion');
            }
          } else if (user.rol === 'admin' || user.rol === 'fundacion' || user.rol === 'albergue') {
            router.push('/dashboard');
          } else {
            router.push('/');
          }
        } catch {
          // Si hay error al obtener el usuario, permitir acceso al login
          setCheckingAuth(false);
        }
      } else {
        setCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAlertMessage(null);
    setLoading(true);

    try {
      await authService.loginJson({ email, password });
      const user = await authService.getCurrentUser();
      
      // Redirect based on role
      if (user.rol === 'adoptante') {
        // Obtener progreso y bandera
        try {
          const progress = await api.get<AdoptionProgress>('/adoption-process/progress');
          const { proceso_paso, bandera } = progress.data;

          // Validar bandera
          if (bandera === 'roja') {
            setAlertMessage({
              type: 'roja',
              message: 'No es apto para adoptar y no puede seguir el proceso.',
            });
            setLoading(false);
            return;
          }

          if (bandera === 'amarilla' || bandera === 'naranja') {
            setAlertMessage({
              type: 'naranja',
              message: 'Debe esperar a que la Fundación lo contacte. No puede continuar con el proceso por ahora.',
            });
            setLoading(false);
            return;
          }

          // Redirigir según progreso
          if (!proceso_paso || proceso_paso === 1 || proceso_paso === 2) {
            router.push('/adopta/certificacion');
          } else if (proceso_paso === 3) {
            router.push('/adopta/informacion-hogar');
          } else if (proceso_paso === 4) {
            router.push('/adopta/match');
          } else if (proceso_paso === 5) {
            router.push('/adopta/cita');
          } else if (proceso_paso >= 6) {
            router.push('/adopta/mis-adopciones');
          } else {
            router.push('/adopta/match');
          }
        } catch {
          // Si no tiene progreso, ir a certificación
          router.push('/adopta/certificacion');
        }
      } else {
        // Otros roles van al dashboard
        switch (user.rol) {
          case 'admin':
          case 'fundacion':
          case 'albergue':
            router.push('/dashboard');
            break;
          default:
            router.push('/');
        }
      }
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al iniciar sesión'));
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Pa&apos; Perros
        </h1>
        <h2 className="text-xl font-semibold text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {alertMessage && (
            <div className={`p-4 rounded-lg ${
              alertMessage.type === 'roja' 
                ? 'bg-red-100 border border-red-400 text-red-700'
                : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
            }`}>
              <p className="font-semibold">{alertMessage.message}</p>
            </div>
          )}

          {error && !alertMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!alertMessage}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/registro" className="text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>

        <div className="mt-6 text-sm text-gray-600 text-center border-t pt-4">
          <p className="font-semibold mb-2">Credenciales de prueba:</p>
          <p>Admin: admin@paperros.org / admin123</p>
          <p>Albergue: albergue1@paperros.org / albergue123</p>
        </div>
      </div>
    </div>
  );
}

