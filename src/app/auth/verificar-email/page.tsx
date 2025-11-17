'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const verifyEmail = useCallback(async () => {
    if (!token) {
      setStatus('error');
      setMessage('Token de verificación no proporcionado');
      return;
    }
    try {
      await api.post('/auth/verify-email', { token });
      setStatus('success');
      setMessage('Email verificado exitosamente. Ya puedes iniciar sesión.');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      setStatus('error');
      setMessage(getErrorMessage(apiError, 'Error al verificar el email'));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('Token de verificación no proporcionado');
    }
  }, [token, verifyEmail]);

  const resendVerification = async () => {
    try {
      await api.post('/auth/resend-verification');
      setMessage('Email de verificación reenviado. Revisa tu bandeja de entrada.');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      setMessage(getErrorMessage(apiError, 'Error al reenviar el email'));
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-primary mb-4">Verificando Email...</h1>
              <p className="text-gray-600">Por favor espera mientras verificamos tu email.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-primary mb-4">¡Email Verificado!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link
                href="/adopta"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 inline-block"
              >
                Continuar al Proceso
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-primary mb-4">Error de Verificación</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={resendVerification}
                  className="w-full bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
                >
                  Reenviar Email de Verificación
                </button>
                <Link
                  href="/auth/registro"
                  className="block text-primary hover:underline"
                >
                  Volver al Registro
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-primary mb-4">Cargando...</h1>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

