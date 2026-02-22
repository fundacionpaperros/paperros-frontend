'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const bandera = searchParams.get('bandera');
  const [codeDigits, setCodeDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const verifyEmail = useCallback(async (code: string) => {
    if (!code || code.length !== 6) {
      setStatus('error');
      setMessage('Por favor ingresa un código de 6 dígitos');
      return;
    }
    setStatus('loading');
    try {
      await api.post('/auth/verify-email', { code });
      setStatus('success');
      setMessage('Email verificado exitosamente. Ya puedes iniciar sesión.');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      setStatus('error');
      setMessage(getErrorMessage(apiError, 'El código ingresado no es correcto. Por favor, intenta de nuevo.'));
      // Limpiar los campos para reintentar
      setCodeDigits(['', '', '', '', '', '']);
    }
  }, []);



  const resendVerification = async () => {
    try {
      await api.post('/auth/resend-verification');
      setMessage('Email de verificación reenviado. Revisa tu bandeja de entrada.');
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      setMessage(getErrorMessage(apiError, 'Error al reenviar el email'));
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    // Solo permitir dígitos
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    
    const newDigits = [...codeDigits];
    newDigits[index] = digit;
    setCodeDigits(newDigits);
    
    // Auto-focus al siguiente input si se ingresa un dígito
    if (digit && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si presionan backspace y el campo está vacío, ir al anterior
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        // Limpiar el dígito anterior
        const newDigits = [...codeDigits];
        newDigits[index - 1] = '';
        setCodeDigits(newDigits);
      }
    }
  };

  const getFullCode = () => codeDigits.join('');

  return (
    <div className="min-h-screen bg-background py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {(status === 'loading' || status === 'idle' || status === 'error') ? (
            <>
              {/* Si no hay token y estamos en estado idle o error mostramos el formulario de ingreso de código */}
              {registered && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
                  <p>Se ha enviado un código de verificación a tu correo electrónico. Revisa tu bandeja de entrada.</p>
                </div>
              )}
              {/* muestra alerta de bandera, si existe */}
              {bandera === 'roja' && (
                <div className="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700 mb-4">
                  <p className="font-semibold">No puede seguir con el proceso ya que no es adoptante apto.</p>
                </div>
              )}
              {(bandera === 'amarilla' || bandera === 'naranja') && (
                <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-700 mb-4">
                  <p className="font-semibold">Se revisará su información y luego se le contactará. No puede continuar con el proceso por ahora.</p>
                </div>
              )}
              {/* Mostrar mensaje de error en la misma pantalla */}
              {status === 'error' && message && (
                <div className="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700 mb-4">
                  <p className="font-semibold">{message}</p>
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fullCode = getFullCode();
                  if (fullCode.length === 6) {
                    verifyEmail(fullCode);
                  }
                }}
                className="space-y-6"
              >
                <h1 className="text-2xl font-bold text-primary mb-4">
                  Verificar Email
                </h1>
                <p className="text-gray-600 mb-6">
                  Ingresa el código de 6 dígitos que recibiste en tu correo electrónico.
                </p>
                
                {/* Contenedor de los 6 inputs para el código */}
                <div className="flex gap-3 justify-center mb-6">
                  {codeDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={`digit-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-gray-400 transition-colors"
                      placeholder="0"
                    />
                  ))}
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading' || getFullCode().length !== 6}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {status === 'loading' ? 'Validando...' : 'Validar código'}
                </button>
                
                {/* Opción de reenviar código */}
                <button
                  type="button"
                  onClick={resendVerification}
                  className="w-full text-primary text-sm hover:underline"
                >
                  ¿No recibiste el código? Reenviar
                </button>
              </form>
            </>
          ) : null}

          {status === 'success' ? (
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
          ) : null}
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

