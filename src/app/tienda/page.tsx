'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import WompiCheckout from '@/components/WompiCheckout';
import { whatsappUrl } from '@/lib/contact';

interface Product {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagen_url: string | null;
  activo: boolean;
  stock: number | null;
}

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

  useEffect(() => {
    api.get('/products/')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoadingProducts(false));
  }, []);

  const getQty = (id: number) => quantities[id] ?? 1;
  const setQty = (id: number, qty: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));

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

      {/* Muñecos Kahu */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img
                src="/Munecos Kahu.jpg"
                alt="Muñecos Kahu de perro y gato"
                className="w-full md:w-80 h-56 md:h-72 object-cover rounded-3xl flex-shrink-0 bg-white"
              />
              <div className="text-secondary space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Muñecos Kahu con propósito, de perro o gato
                </h2>
                <p className="leading-relaxed">
                  Desde la Fundación Pa Perros, transformamos el significado de Kahu en una acción concreta:
                  dejar de ser espectador y convertirte en protector de un perro que necesita un hogar.
                </p>
                <p className="leading-relaxed">
                  En hawaiano, Kahu no es el dueño de una mascota. Es la persona en quien se confía la protección
                  de algo sagrado. Lo que un Kahu protege no es suyo: es una parte de su alma.
                </p>
                <p className="leading-relaxed">
                  Hoy, ese vínculo toma forma en un acto real: apadrinar un perro de un albergue. Este muñeco Kahu
                  no es solo un símbolo: es el puente entre tú y la vida que decides cuidar.
                </p>
                <a
                  href={whatsappUrl('Hola, quiero un muñeco Kahu con propósito')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
                >
                  Quiero mi Kahu
                </a>
              </div>
            </div>
          </div>
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

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            ¿Tienes preguntas sobre nuestros productos?
          </h2>
          <p className="text-secondary mb-8">
            Contáctanos para más información sobre disponibilidad y envíos.
          </p>
          <a
            href={whatsappUrl('Hola, tengo una pregunta sobre los productos de la Tienda Solidaria')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}
