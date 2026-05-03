'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import WompiCheckout from '@/components/WompiCheckout';

interface Product {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagen_url: string | null;
  activo: boolean;
  stock: number | null;
}

const MONTOS_RAPIDOS = [5000, 10000, 20000, 50000, 100000];

const PRODUCT_EMOJIS: Record<string, string> = {
  'Muñeco Kahu': '🧸',
  "Camiseta Pa' Perros": '👕',
};

function formatCOP(pesos: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(pesos);
}

export default function Tienda() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [montoSeleccionado, setMontoSeleccionado] = useState<number>(10000);
  const [montoPersonalizado, setMontoPersonalizado] = useState<string>('');

  useEffect(() => {
    api.get('/products/')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoadingProducts(false));
  }, []);

  const getQty = (id: number) => quantities[id] ?? 1;
  const setQty = (id: number, qty: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));

  const montoFinal = montoPersonalizado
    ? parseInt(montoPersonalizado.replace(/[^0-9]/g, ''), 10) || 0
    : montoSeleccionado;

  const montoValido = montoFinal >= 1500;

  return (
    <div className="bg-secondary">
      {/* Hero */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Tienda Solidaria</h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Cada compra apoya nuestra misión de transformar vidas
          </p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      {/* Productos */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-primary rounded-3xl p-8 shadow-xl animate-pulse">
                  <div className="h-6 bg-secondary/20 rounded mb-4 w-2/3"></div>
                  <div className="h-4 bg-secondary/10 rounded mb-6 w-full"></div>
                  <div className="h-10 bg-secondary/20 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-primary rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-accent-orange rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {product.imagen_url ? (
                          <img
                            src={product.imagen_url}
                            alt={product.nombre}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          <span className="text-4xl">{PRODUCT_EMOJIS[product.nombre] ?? '🛍️'}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-secondary">{product.nombre}</h3>
                        <p className="text-secondary text-sm md:text-base">{product.descripcion}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-accent-orange">
                        {formatCOP(product.precio)}
                      </span>
                      {product.stock !== null && (
                        <span className="text-secondary text-sm bg-[#FFE9D2]/20 px-3 py-1 rounded-xl">
                          Stock: {product.stock}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-secondary text-sm font-medium">Cantidad:</span>
                      <div className="flex items-center gap-2 bg-[#FFE9D2]/20 rounded-xl px-3 py-1">
                        <button
                          onClick={() => setQty(product.id, getQty(product.id) - 1)}
                          className="text-secondary font-bold w-6 text-center hover:text-accent-orange"
                        >
                          −
                        </button>
                        <span className="text-secondary font-bold w-6 text-center">
                          {getQty(product.id)}
                        </span>
                        <button
                          onClick={() => setQty(product.id, getQty(product.id) + 1)}
                          disabled={product.stock !== null && getQty(product.id) >= product.stock}
                          className="text-secondary font-bold w-6 text-center hover:text-accent-orange disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-secondary text-sm">
                        Total:{' '}
                        <strong>{formatCOP(product.precio * getQty(product.id))}</strong>
                      </span>
                    </div>

                    <WompiCheckout
                      payload={{
                        tipo: 'producto',
                        producto_id: product.id,
                        cantidad: getQty(product.id),
                      }}
                      label={`Comprar · ${formatCOP(product.precio * getQty(product.id))}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Donaciones */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Donaciones</h2>
              <p className="text-secondary">Tu aporte hace posible nuestra labor diaria · Pago seguro con Wompi</p>
            </div>

            <div className="max-w-lg mx-auto">
              <p className="text-secondary font-semibold mb-3">Monto de tu donación</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {MONTOS_RAPIDOS.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMontoSeleccionado(m);
                      setMontoPersonalizado('');
                    }}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      montoSeleccionado === m && !montoPersonalizado
                        ? 'bg-accent-orange text-secondary'
                        : 'bg-[#FFE9D2]/20 text-secondary hover:bg-[#FFE9D2]/40'
                    }`}
                  >
                    {formatCOP(m)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-[#FFE9D2]/20 rounded-xl px-4 py-3 mb-1">
                <span className="text-secondary font-bold">$</span>
                <input
                  type="number"
                  placeholder="Otro monto en pesos"
                  value={montoPersonalizado}
                  onChange={(e) => setMontoPersonalizado(e.target.value)}
                  className="bg-transparent text-secondary flex-1 outline-none placeholder:text-secondary/50"
                  min="1500"
                />
                <span className="text-secondary text-sm">COP</span>
              </div>
              {!montoValido && montoPersonalizado && (
                <p className="text-red-400 text-xs mb-2">El monto mínimo es $1.500 COP</p>
              )}

              <div className="mt-4">
                {montoValido ? (
                  <WompiCheckout
                    payload={{ tipo: 'donacion', monto: montoFinal }}
                    label={`Donar ${formatCOP(montoFinal)}`}
                  />
                ) : (
                  <button
                    disabled
                    className="bg-accent-orange/50 text-secondary px-6 py-3 rounded-xl font-semibold w-full cursor-not-allowed"
                  >
                    Ingresa un monto válido
                  </button>
                )}
              </div>

              <p className="text-secondary text-xs text-center mt-4">
                🔒 Pago seguro · No almacenamos datos de tu tarjeta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            ¿Tienes preguntas sobre nuestros productos?
          </h2>
          <p className="text-secondary mb-8">
            Contáctanos para más información sobre disponibilidad y envíos.
          </p>
          <Link
            href="/contacto"
            className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  );
}
