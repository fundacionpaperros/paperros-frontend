'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

interface PaymentStatus {
  referencia: string;
  wompi_transaction_id: string | null;
  tipo: string;
  monto_en_centavos: number;
  moneda: string;
  estado: string;
  metodo_pago: string | null;
  email_cliente: string | null;
  nombre_cliente: string | null;
  categoria_donacion: string | null;
  producto_id: number | null;
  nombre_producto: string | null;
  cantidad: number | null;
}

function formatCOP(centavos: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(centavos / 100);
}

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const [payment, setPayment] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);

  // Wompi redirige con ?id=<wompi_transaction_id> o podemos guardar la referencia
  // en sessionStorage antes de redirigir
  const wompiId = searchParams.get('id');
  const referencia = searchParams.get('ref') || (typeof window !== 'undefined' ? sessionStorage.getItem('wompi_referencia') : null);

  useEffect(() => {
    if (!referencia) {
      setError('No se encontró información del pago.');
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 12; // máximo 1 minuto de polling cada 5s

    const fetchStatus = async () => {
      try {
        const res = await api.get(`/payments/status/${referencia}`);
        const data: PaymentStatus = res.data;
        setPayment(data);

        if (data.estado !== 'PENDING' || attempts >= maxAttempts) {
          setPolling(false);
          setLoading(false);
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('wompi_referencia');
          }
        } else {
          attempts++;
        }
      } catch {
        setError('No se pudo obtener el estado del pago.');
        setLoading(false);
        setPolling(false);
      }
    };

    fetchStatus();
    const interval = setInterval(() => {
      if (!polling) {
        clearInterval(interval);
        return;
      }
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [referencia]);

  const estadoConfig = {
    APPROVED: {
      icon: '✅',
      titulo: '¡Pago exitoso!',
      mensaje: 'Tu pago fue procesado correctamente. ¡Gracias por tu apoyo!',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    DECLINED: {
      icon: '❌',
      titulo: 'Pago rechazado',
      mensaje: 'Tu pago no pudo ser procesado. Por favor intenta con otro método de pago.',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    VOIDED: {
      icon: '↩️',
      titulo: 'Pago anulado',
      mensaje: 'La transacción fue anulada.',
      color: 'text-gray-600',
      bg: 'bg-gray-50',
    },
    ERROR: {
      icon: '⚠️',
      titulo: 'Error en el pago',
      mensaje: 'Ocurrió un error procesando tu pago. Contáctanos si el problema persiste.',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    PENDING: {
      icon: '⏳',
      titulo: 'Procesando pago...',
      mensaje: 'Tu pago está siendo verificado. Este proceso puede tardar unos segundos.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  };

  const config = payment ? estadoConfig[payment.estado as keyof typeof estadoConfig] ?? estadoConfig.PENDING : estadoConfig.PENDING;

  return (
    <div className="bg-secondary min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl text-center">
          {loading ? (
            <div>
              <div className="text-6xl mb-6">⏳</div>
              <h1 className="text-2xl font-bold text-secondary mb-4">Verificando tu pago...</h1>
              <p className="text-secondary">Por favor espera mientras confirmamos tu transacción.</p>
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
              </div>
            </div>
          ) : error ? (
            <div>
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-2xl font-bold text-secondary mb-4">Error</h1>
              <p className="text-secondary mb-8">{error}</p>
              <Link href="/contacto" className="bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold">
                Contáctanos
              </Link>
            </div>
          ) : payment ? (
            <div>
              <div className="text-6xl mb-6">{config.icon}</div>
              <h1 className={`text-2xl font-bold mb-4 ${config.color}`}>{config.titulo}</h1>
              <p className="text-secondary mb-8">{config.mensaje}</p>

              <div className={`${config.bg} rounded-2xl p-6 mb-8 text-left space-y-3`}>
                <div className="flex justify-between">
                  <span className="text-secondary font-medium">Referencia</span>
                  <span className="text-secondary font-mono text-sm">{payment.referencia}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary font-medium">Tipo</span>
                  <span className="text-secondary capitalize">
                    {payment.tipo === 'donacion' ? 'Donación' : 'Producto'}
                  </span>
                </div>
                {payment.tipo === 'donacion' && payment.categoria_donacion && (
                  <div className="flex justify-between">
                    <span className="text-secondary font-medium">Categoría</span>
                    <span className="text-secondary capitalize">{payment.categoria_donacion}</span>
                  </div>
                )}
                {payment.tipo === 'producto' && payment.nombre_producto && (
                  <div className="flex justify-between">
                    <span className="text-secondary font-medium">Producto</span>
                    <span className="text-secondary">
                      {payment.nombre_producto}
                      {payment.cantidad && payment.cantidad > 1 ? ` x${payment.cantidad}` : ''}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-secondary font-medium">Monto</span>
                  <span className="text-secondary font-bold text-lg">{formatCOP(payment.monto_en_centavos)}</span>
                </div>
                {payment.metodo_pago && (
                  <div className="flex justify-between">
                    <span className="text-secondary font-medium">Método</span>
                    <span className="text-secondary">{payment.metodo_pago}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {payment.estado === 'APPROVED' && (
                  <Link href="/" className="bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors">
                    Volver al inicio
                  </Link>
                )}
                {(payment.estado === 'DECLINED' || payment.estado === 'ERROR') && (
                  <>
                    <Link href="/dona" className="bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors">
                      Intentar de nuevo
                    </Link>
                    <Link href="/contacto" className="bg-secondary text-primary px-6 py-3 rounded-xl font-semibold border border-primary hover:bg-secondary/80 transition-colors">
                      Contáctanos
                    </Link>
                  </>
                )}
                {payment.estado === 'PENDING' && (
                  <p className="text-secondary text-sm">Si el pago fue completado, el estado se actualizará automáticamente.</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={
      <div className="bg-secondary min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
      </div>
    }>
      <ConfirmacionContent />
    </Suspense>
  );
}
