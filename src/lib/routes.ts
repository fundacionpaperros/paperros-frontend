// Definición de rutas por rol
export interface RouteConfig {
  href: string;
  label: string;
  roles: ('admin' | 'fundacion' | 'albergue')[];
}

// Rutas del dashboard centralizado
export const dashboardRoutes: RouteConfig[] = [
  // Dashboard principal
  { href: '/dashboard', label: 'Dashboard', roles: ['admin', 'fundacion', 'albergue'] },
  
  // Rutas de administración (solo admin)
  { href: '/dashboard/administrador/patrocinadores', label: 'Patrocinadores', roles: ['admin'] },
  { href: '/dashboard/administrador/eventos', label: 'Eventos', roles: ['admin'] },
  { href: '/dashboard/administrador/lista-negra', label: 'Lista Negra', roles: ['admin'] },
  
  // Rutas de empleado/fundación (admin y fundacion)
  { href: '/dashboard/administrador/animales', label: 'Animales', roles: ['admin', 'fundacion'] },
  { href: '/dashboard/administrador/adopciones', label: 'Adopciones', roles: ['admin', 'fundacion'] },
  { href: '/dashboard/administrador/adoptantes', label: 'Adoptantes', roles: ['admin', 'fundacion'] },
  { href: '/dashboard/administrador/seguimiento', label: 'Seguimiento', roles: ['admin', 'fundacion'] },
  { href: '/dashboard/administrador/mensajes', label: 'Mensajes', roles: ['admin', 'fundacion'] },
  
  // Rutas de albergue (solo albergue)
  { href: '/dashboard/albergue/animales', label: 'Mis Animales', roles: ['albergue'] },
  { href: '/dashboard/albergue/animales/nuevo', label: 'Agregar Animal', roles: ['albergue'] },
];

// Función para obtener rutas visibles según el rol
export function getRoutesForRole(role: string): RouteConfig[] {
  return dashboardRoutes.filter(route => route.roles.includes(role as 'admin' | 'fundacion' | 'albergue'));
}

// Función para verificar si un rol puede acceder a una ruta
export function canAccessRoute(role: string, pathname: string): boolean {
  // El dashboard principal es accesible para todos los roles permitidos
  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    return ['admin', 'fundacion', 'albergue'].includes(role);
  }
  
  // Buscar la ruta en la configuración
  const route = dashboardRoutes.find(r => 
    pathname === r.href || pathname.startsWith(r.href + '/')
  );
  
  if (!route) {
    // Si la ruta no está en la configuración, verificar si es una ruta protegida
    // Rutas de administrador: solo admin
    if (pathname.startsWith('/dashboard/administrador/')) {
      // Rutas específicas de admin
      const adminOnlyRoutes = ['/dashboard/administrador/patrocinadores', 
                               '/dashboard/administrador/eventos', '/dashboard/administrador/lista-negra'];
      if (adminOnlyRoutes.some(r => pathname.startsWith(r))) {
        return role === 'admin';
      }
      // Otras rutas de administrador: admin y fundacion
      return ['admin', 'fundacion'].includes(role);
    }
    
    // Rutas de albergue: solo albergue
    if (pathname.startsWith('/dashboard/albergue/')) {
      return role === 'albergue';
    }
    
    // Por defecto, si no está en la configuración, no permitir acceso
    return false;
  }
  
  return route.roles.includes(role as 'admin' | 'fundacion' | 'albergue');
}

