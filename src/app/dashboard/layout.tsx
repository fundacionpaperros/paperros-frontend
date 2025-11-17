'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, auth, User } from '@/lib/auth';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth.isAuthenticated()) {
        router.push('/auth/login');
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        // Solo permitir roles que tienen dashboard
        if (!['admin', 'fundacion', 'albergue'].includes(userData.rol)) {
          router.push('/');
          return;
        }
      } catch {
        auth.removeToken();
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Título según el rol
  const getTitle = () => {
    switch (user.rol) {
      case 'admin':
        return 'Panel Administrativo';
      case 'fundacion':
        return 'Panel de Empleado';
      case 'albergue':
        return 'Panel de Albergue';
      default:
        return 'Dashboard';
    }
  };

  // Obtener rutas según el rol (el DashboardLayout las obtendrá automáticamente)
  const navigationItems: Array<{ href: string; label: string }> = [];

  return (
    <DashboardLayout
      allowedRoles={['admin', 'fundacion', 'albergue']}
      title={getTitle()}
      navigationItems={navigationItems}
    >
      {children}
    </DashboardLayout>
  );
}

