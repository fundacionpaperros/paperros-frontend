'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService, RegisterData, auth } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';
import { v, FormErrors, sanitize } from '@/lib/validators';

interface AdoptionProgress {
  proceso_paso: number | null;
  bandera: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData & { apellido: string }>({
    email: '',
    nombre: '',
    apellido: '',
    password: '',
    cedula: '',
    telefono: '',
    direccion: '',
    ciudad: '',
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [alertMessage, setAlertMessage] = useState<{ type: 'roja' | 'naranja' | null; message: string } | null>(null);
  const [aceptaPolitica, setAceptaPolitica] = useState(false);

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
          // Si hay error al obtener el usuario, permitir acceso al registro
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
    
    const newErrors: FormErrors = {};
    if (v.pipe(formData.nombre, v.required, v.onlyLetters, v.maxLength(50))) newErrors.nombre = v.pipe(formData.nombre, v.required, v.onlyLetters, v.maxLength(50))!;
    if (v.pipe(formData.apellido, v.required, v.onlyLetters, v.maxLength(50))) newErrors.apellido = v.pipe(formData.apellido, v.required, v.onlyLetters, v.maxLength(50))!;
    if (v.pipe(formData.email, v.required, v.email)) newErrors.email = v.pipe(formData.email, v.required, v.email)!;
    if (v.pipe(formData.password, v.required, v.password)) newErrors.password = v.pipe(formData.password, v.required, v.password)!;
    if (v.pipe(formData.cedula, v.required, v.cedula)) newErrors.cedula = v.pipe(formData.cedula, v.required, v.cedula)!;
    if (v.phone(formData.telefono)) newErrors.telefono = v.phone(formData.telefono)!;
    if (v.pipe(formData.ciudad, v.required, v.maxLength(100))) newErrors.ciudad = v.pipe(formData.ciudad, v.required, v.maxLength(100))!;
    if (v.pipe(formData.direccion, v.required, v.maxLength(200))) newErrors.direccion = v.pipe(formData.direccion, v.required, v.maxLength(200))!;
    if (!aceptaPolitica) newErrors.aceptaPolitica = 'Debe aceptar la política de tratamiento de datos';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const nombreCompleto = `${sanitize(formData.nombre, 50)} ${sanitize(formData.apellido, 50)}`.trim();

      const result = await authService.register({
        ...formData,
        nombre: nombreCompleto,
        cedula: formData.cedula.replace(/\D/g, ''),
        telefono: formData.telefono.replace(/\D/g, ''),
      });

      // Construir parámetros para la página de verificación
      const params = new URLSearchParams();
      params.set('registered', 'true');
      if (result.bandera) {
        params.set('bandera', result.bandera);
      }

      // Redirigir siempre a verificación de correo. El servidor habrá enviado
      // un código al email y la página de verificación mostrará mensajes
      // adicionales según la bandera.
      router.push(`/auth/verificar-email?${params.toString()}`);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      // Manejar errores de validación de Pydantic
      let errorDetail = 'Error al registrar';
      
      if (apiError.response?.data?.detail) {
        if (Array.isArray(apiError.response.data.detail)) {
          // Es un array de errores de validación de Pydantic
          const errorArray = apiError.response.data.detail as Array<{ loc?: string[]; msg?: string }>;
          const validationErrors = errorArray.map((e: { loc?: string[]; msg?: string }) => {
            const field = e.loc ? e.loc.join('.') : 'campo';
            return `${field}: ${e.msg || 'error'}`;
          }).join(', ');
          errorDetail = `Error de validación: ${validationErrors}`;
        } else if (typeof apiError.response.data.detail === 'string') {
          errorDetail = apiError.response.data.detail;
        } else {
          errorDetail = JSON.stringify(apiError.response.data.detail);
        }
      }
      
      setError(errorDetail);
      
      // Si el error indica bandera roja
      if (errorDetail.includes('no es adoptante apto') || errorDetail.includes('blacklist')) {
        setAlertMessage({
          type: 'roja',
          message: 'No puede seguir con el proceso ya que no es adoptante apto.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Registro de Adoptante
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido *
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <p className="text-gray-400 text-xs mt-1">Mínimo 8 caracteres, una letra y un número</p>
              </div>

              <div>
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">
                  Cédula *
                </label>
                <input
                  id="cedula"
                  name="cedula"
                  type="text"
                  value={formData.cedula}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.cedula ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder="Ej: 3001234567"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad *
                </label>
                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.ciudad ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.ciudad && <p className="text-red-500 text-xs mt-1">{errors.ciudad}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección *
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                value={formData.direccion}
                onChange={handleChange}
                required
                maxLength={200}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
            </div>

            <div className="flex items-start flex-col gap-1">
              <div className="flex items-start">
              <input
                id="aceptaPolitica"
                name="aceptaPolitica"
                type="checkbox"
                checked={aceptaPolitica}
                onChange={(e) => setAceptaPolitica(e.target.checked)}
                required
                className="mt-1 mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="aceptaPolitica" className="text-sm text-gray-700">
                Acepto la{' '}
                <Link
                  href="/politica-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Tratamiento de Datos Personales
                </Link>
                {' '}*
              </label>
              </div>
              {errors.aceptaPolitica && <p className="text-red-500 text-xs">{errors.aceptaPolitica}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !!alertMessage}
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

