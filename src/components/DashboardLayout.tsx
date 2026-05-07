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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        if (!allowedRoles.includes(userData.rol)) {
          router.push('/auth/login');
          return;
        }

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

  // Cerrar sidebar al cambiar de ruta en móvil
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

  const displayItems = menuItems.length > 0 ? menuItems : navigationItems;

  const SidebarContent = () => (
    <>
      <div className="p-4 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pa&apos; Perros</h1>
          <p className="text-sm text-white/80">{title}</p>
        </div>
        {/* Botón cerrar en móvil */}
        <button
          className="md:hidden text-white/80 hover:text-white p-1"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2">
        {displayItems.map((item) => {
          const isActive = (() => {
            if (pathname === item.href) return true;
            if (pathname.startsWith(item.href + '/')) {
              const hasMoreSpecificMatch = displayItems.some(other =>
                other.href !== item.href &&
                other.href.startsWith(item.href + '/') &&
                pathname.startsWith(other.href)
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
                isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 pt-8 border-t border-white/20 flex-shrink-0">
        <div className="px-4 py-2 text-sm">
          <p className="font-semibold truncate">{user?.nombre}</p>
          <p className="text-white/70 truncate" title={user?.email}>{user?.email}</p>
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
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar desktop: siempre visible */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-primary text-white flex-col z-30">
        <SidebarContent />
      </aside>

      {/* Sidebar móvil: drawer deslizante */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-primary text-white flex flex-col z-30 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Barra superior móvil con hamburguesa */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-primary text-white flex items-center px-4 h-14 shadow">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white p-1 mr-3"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-lg">Pa&apos; Perros</span>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 pt-14 md:pt-0 p-4 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
