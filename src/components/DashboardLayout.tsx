'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { authService, auth, User } from '@/lib/auth';
import { getRoutesForRole } from '@/lib/routes';

interface DashboardLayoutProps {
  children: ReactNode;
  allowedRoles: string[];
  title: string;
  navigationItems: Array<{
    href: string;
    label: string;
  }>;
}

export default function DashboardLayout({
  children,
  allowedRoles,
  title,
  navigationItems,
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<Array<{ href: string; label: string }>>([]);

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
        
        // Check if user has allowed role
        if (!allowedRoles.includes(userData.rol)) {
          router.push('/auth/login');
          return;
        }
        
        // Obtener rutas según el rol del usuario
        const routes = getRoutesForRole(userData.rol);
        setMenuItems(routes.map(route => ({
          href: route.href,
          label: route.label,
        })));
        
        setIsAuthenticated(true);
      } catch {
        auth.removeToken();
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    authService.logout();
  };

  // Usar menuItems si están disponibles, sino usar navigationItems como fallback
  const displayItems = menuItems.length > 0 ? menuItems : navigationItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col">
        {/* Header - Fixed */}
        <div className="p-4 flex-shrink-0">
          <h1 className="text-2xl font-bold">Pa&apos; Perros</h1>
          <p className="text-sm text-white/80">{title}</p>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-2">
          {displayItems.map((item) => {
            // Determinar si esta ruta está activa
            const isActive = (() => {
              // Si la ruta es exactamente igual al pathname
              if (pathname === item.href) {
                return true;
              }
              // Si el pathname empieza con la ruta seguida de '/', es una subruta
              // Pero solo si no hay otra ruta más específica que también coincida
              if (pathname.startsWith(item.href + '/')) {
                // Verificar que no haya otra ruta más específica que también coincida
                const hasMoreSpecificMatch = displayItems.some(otherItem => 
                  otherItem.href !== item.href && 
                  otherItem.href.startsWith(item.href + '/') &&
                  pathname.startsWith(otherItem.href)
                );
                return !hasMoreSpecificMatch;
              }
              return false;
            })();

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-white/20 font-semibold' 
                    : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer - Fixed */}
        <div className="p-4 pt-8 border-t border-white/20 flex-shrink-0">
          <div className="px-4 py-2 text-sm">
            <p className="font-semibold">{user?.nombre}</p>
            <p className="text-white/70">{user?.email}</p>
            {user?.rol && (
              <p className="text-white/70 capitalize">{user.rol}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

