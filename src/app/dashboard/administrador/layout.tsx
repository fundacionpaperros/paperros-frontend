'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdministradorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['admin', 'fundacion']}>
      {children}
    </ProtectedRoute>
  );
}
