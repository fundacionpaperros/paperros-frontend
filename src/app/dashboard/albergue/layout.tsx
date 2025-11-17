'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function AlbergueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['albergue']}>
      {children}
    </ProtectedRoute>
  );
}

