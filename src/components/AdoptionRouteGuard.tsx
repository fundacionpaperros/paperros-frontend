'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface AdoptionRouteGuardProps {
  children: React.ReactNode;
  requiredStep?: number;
  requireCertificate?: boolean;
  requireGreenFlag?: boolean;
}

interface AdoptionProgress {
  proceso_paso: number | null;
  bandera: string;
}

export default function AdoptionRouteGuard({
  children,
  requiredStep,
  requireCertificate = false,
  requireGreenFlag = false,
}: AdoptionRouteGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const validateAccess = async () => {
      // Validar que la sesión sea realmente válida
      const authenticated = await authService.validateSession();
      
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      try {
        // Obtener progreso y bandera
        const progress = await api.get<AdoptionProgress>('/adoption-process/progress');
        const { proceso_paso, bandera } = progress.data;

        // Validar bandera si es requerida
        if (requireGreenFlag && bandera !== 'verde') {
          if (bandera === 'roja') {
            setError('No es apto para adoptar y no puede seguir el proceso.');
          } else if (bandera === 'amarilla' || bandera === 'naranja') {
            setError('Debe esperar a que la Fundación lo contacte. No puede continuar con el proceso por ahora.');
          }
          setLoading(false);
          return;
        }

        // Validar certificado si es requerido
        if (requireCertificate) {
          try {
            await api.get('/adoption-process/certificate');
          } catch (certErr: unknown) {
            const apiError = certErr as ApiErrorResponse;
            if (apiError.response?.status === 404) {
              setError('Debe completar la certificación antes de continuar.');
              setTimeout(() => router.push('/adopta/certificacion'), 2000);
              setLoading(false);
              return;
            }
          }
        }

        // Validar paso si es requerido
        if (requiredStep !== undefined) {
          if (!proceso_paso || proceso_paso < requiredStep) {
            // Redirigir al paso correspondiente
            if (!proceso_paso || proceso_paso === 1) {
              router.push('/adopta/certificacion');
            } else if (proceso_paso === 2) {
              router.push('/adopta/certificacion');
            } else if (proceso_paso === 3) {
              router.push('/adopta/informacion-hogar');
            } else {
              router.push('/adopta/match');
            }
            return;
          }
        }

        setLoading(false);
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        // Si es 401 o 403, la sesión expiró - ya se limpió en validateSession
        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
          router.push('/auth/login');
          return;
        }
        setError('Error al validar acceso');
        setLoading(false);
      }
    };

    validateAccess();
  }, [router, requiredStep, requireCertificate, requireGreenFlag]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-4 rounded-lg ${
            error.includes('no es apto') 
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
          }`}>
            <p className="font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

