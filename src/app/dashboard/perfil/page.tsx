'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService, auth, User } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [deactivateForm, setDeactivateForm] = useState({
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [deactivateError, setDeactivateError] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeactivateForm, setShowDeactivateForm] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      if (!auth.isAuthenticated()) {
        router.push('/auth/login');
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch {
        auth.removeToken();
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validaciones
    if (!passwordForm.current_password || !passwordForm.new_password || !passwordForm.confirm_password) {
      setPasswordError('Todos los campos son requeridos');
      return;
    }

    if (passwordForm.new_password.length < 8) {
      setPasswordError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    if (passwordForm.current_password === passwordForm.new_password) {
      setPasswordError('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    setChangingPassword(true);
    try {
      await api.post('/auth/change-password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });
      setPasswordSuccess('Contraseña actualizada exitosamente');
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      setShowPasswordForm(false);
      setTimeout(() => setPasswordSuccess(''), 5000);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setPasswordError(getErrorMessage(apiError, 'Error al cambiar la contraseña'));
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeactivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeactivateError('');

    if (!deactivateForm.password) {
      setDeactivateError('Debes ingresar tu contraseña para confirmar');
      return;
    }

    if (!confirm('¿Estás seguro de que deseas desactivar tu cuenta? Esta acción no se puede deshacer y no podrás iniciar sesión nuevamente.')) {
      return;
    }

    setDeactivating(true);
    try {
      await api.post('/auth/deactivate-account', {
        password: deactivateForm.password,
      });
      alert('Tu cuenta ha sido desactivada exitosamente');
      authService.logout();
      router.push('/auth/login');
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setDeactivateError(getErrorMessage(apiError, 'Error al desactivar la cuenta'));
    } finally {
      setDeactivating(false);
    }
  };

  const getRoleLabel = (rol: string) => {
    const labels: Record<string, string> = {
      admin: 'Administrador',
      fundacion: 'Empleado',
      albergue: 'Albergue',
      adoptante: 'Adoptante',
    };
    return labels[rol] || rol;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

      {/* Información de la Cuenta */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información de la Cuenta</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <p className="text-gray-900">{user.nombre}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <p className="text-gray-900 capitalize">{getRoleLabel(user.rol)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              user.activo
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {user.activo ? 'Activa' : 'Desactivada'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Verificado</label>
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              user.email_verificado
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.email_verificado ? 'Verificado' : 'No Verificado'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Registro</label>
            <p className="text-gray-900">
              {new Date(user.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Cambiar Contraseña */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cambiar Contraseña</h2>
          <button
            onClick={() => {
              setShowPasswordForm(!showPasswordForm);
              setPasswordError('');
              setPasswordSuccess('');
              setPasswordForm({
                current_password: '',
                new_password: '',
                confirm_password: '',
              });
            }}
            className="text-primary hover:underline cursor-pointer"
          >
            {showPasswordForm ? 'Ocultar' : 'Cambiar Contraseña'}
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {passwordSuccess}
              </div>
            )}

            <div>
              <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña Actual
              </label>
              <input
                type="password"
                id="current_password"
                value={passwordForm.current_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="new_password"
                value={passwordForm.new_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                id="confirm_password"
                value={passwordForm.confirm_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={8}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={changingPassword}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {changingPassword ? 'Cambiando...' : 'Cambiar Contraseña'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordError('');
                  setPasswordSuccess('');
                  setPasswordForm({
                    current_password: '',
                    new_password: '',
                    confirm_password: '',
                  });
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Desactivar Cuenta */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Desactivar Cuenta</h2>
            <p className="text-sm text-gray-600 mt-1">
              Al desactivar tu cuenta, no podrás iniciar sesión nuevamente. Esta acción no se puede deshacer.
            </p>
          </div>
          <button
            onClick={() => {
              setShowDeactivateForm(!showDeactivateForm);
              setDeactivateError('');
              setDeactivateForm({ password: '' });
            }}
            className="text-red-600 hover:underline cursor-pointer"
          >
            {showDeactivateForm ? 'Ocultar' : 'Desactivar Cuenta'}
          </button>
        </div>

        {showDeactivateForm && (
          <form onSubmit={handleDeactivate} className="space-y-4">
            {deactivateError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {deactivateError}
              </div>
            )}

            <div>
              <label htmlFor="deactivate_password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirma tu Contraseña
              </label>
              <input
                type="password"
                id="deactivate_password"
                value={deactivateForm.password}
                onChange={(e) => setDeactivateForm({ password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ingresa tu contraseña para confirmar"
                required
              />
              <p className="text-xs text-red-600 mt-1">
                Esta acción es permanente y no se puede deshacer
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={deactivating}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {deactivating ? 'Desactivando...' : 'Desactivar Cuenta'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeactivateForm(false);
                  setDeactivateError('');
                  setDeactivateForm({ password: '' });
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

