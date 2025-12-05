'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService, auth } from '@/lib/auth';
import { canAccessRoute } from '@/lib/routes';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'fundacion' | 'albergue')[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/auth/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!auth.isAuthenticated()) {
        router.push(redirectTo);
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        
        // Si se especificaron roles permitidos, validar contra ellos
        if (allowedRoles && allowedRoles.length > 0) {
          if (!allowedRoles.includes(userData.rol as 'admin' | 'fundacion' | 'albergue')) {
            router.push('/dashboard'); // Redirigir al dashboard si no tiene acceso
            setLoading(false);
            return;
          }
        }
        
        // Validar acceso a la ruta según el rol
        if (!canAccessRoute(userData.rol, pathname || '')) {
          router.push('/dashboard'); // Redirigir al dashboard si no tiene acceso a esta ruta
          setLoading(false);
          return;
        }
        
        setIsAuthorized(true);
      } catch {
        auth.removeToken();
        router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [pathname, router, allowedRoles, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

