'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface DonationPayload {
  tipo: 'donacion';
  monto: number;
  email_cliente?: string;
  nombre_cliente?: string;
}

interface ProductPayload {
  tipo: 'producto';
  producto_id: number;
  cantidad?: number;
  email_cliente?: string;
  nombre_cliente?: string;
}

type CheckoutPayload = DonationPayload | ProductPayload;

interface WompiCheckoutProps {
  payload: CheckoutPayload;
  label?: string;
  className?: string;
}

interface PaymentIntent {
  referencia: string;
  monto: number;
  moneda: string;
  firma_integridad: string;
  wompi_public_key: string;
  checkout_url: string;
}

export default function WompiCheckout({ payload, label = 'Pagar ahora', className }: WompiCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      let intent: PaymentIntent;
      if (payload.tipo === 'donacion') {
        const { tipo, ...body } = payload;
        const res = await api.post('/payments/donation', body);
        intent = res.data;
      } else {
        const { tipo, ...body } = payload;
        const res = await api.post('/payments/product', body);
        intent = res.data;
      }
      sessionStorage.setItem('wompi_referencia', intent.referencia);
      window.location.href = intent.checkout_url;
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        'Error al iniciar el pago. Intenta de nuevo.';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={className ?? 'bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 w-full disabled:opacity-60 disabled:cursor-not-allowed'}
      >
        {loading ? 'Redirigiendo...' : label}
      </button>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}
