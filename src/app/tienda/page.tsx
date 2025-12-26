import Link from 'next/link';

export default function Tienda() {
  const productos = [
    {
      id: 'kahu',
      nombre: 'Muñeco Kahu',
      descripcion: 'Nuestro muñeco emblemático. Cada Kahu contribuye a los programas de rescate y adopción.',
      emoji: '🧸',
      color: 'accent-orange',
    },
    {
      id: 'camiseta',
      nombre: 'Camiseta Pa\' Perros',
      descripcion: 'Viste con orgullo tu amor por los animales. Logo bordado de la fundación.',
      emoji: '👕',
      color: 'accent-blue',
    },
  ];

  return (
    <div className="bg-secondary">
      {/* Hero minimalista */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Tienda Solidaria
          </h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Cada compra apoya nuestra misión de transformar vidas
          </p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      {/* Productos */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productos.map((producto) => (
              <div 
                key={producto.id}
                className="bg-primary rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-20 h-20 bg-${producto.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className="text-4xl">{producto.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-secondary">{producto.nombre}</h3>
                      <p className="text-secondary text-sm md:text-base">{producto.descripcion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-secondary rounded-xl px-4 py-2">
                      <span className="text-xl font-bold text-primary">$</span>
                    </div>
                    <Link 
                      href="/contacto"
                      className={`bg-${producto.color} text-secondary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 inline-block text-sm`}
                    >
                      Adquirir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donaciones */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Donaciones</h2>
              <p className="text-secondary">Tu aporte hace posible nuestra labor diaria</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#FFE9D2]/20 rounded-xl p-4 text-center group hover:bg-[#FFE9D2]/30 transition-all cursor-pointer">
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">✂️</span>
                <p className="text-secondary font-semibold text-sm">Esterilización</p>
                <p className="text-secondary text-lg font-bold mt-1">$</p>
              </div>
              
              <div className="bg-[#FFE9D2]/20 rounded-xl p-4 text-center group hover:bg-[#FFE9D2]/30 transition-all cursor-pointer">
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">🏥</span>
                <p className="text-secondary font-semibold text-sm">Atención Veterinaria</p>
                <p className="text-secondary text-lg font-bold mt-1">$</p>
              </div>
              
              <div className="bg-[#FFE9D2]/20 rounded-xl p-4 text-center group hover:bg-[#FFE9D2]/30 transition-all cursor-pointer">
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">🍖</span>
                <p className="text-secondary font-semibold text-sm">Alimentación</p>
                <p className="text-secondary text-lg font-bold mt-1">$</p>
              </div>
              
              <div className="bg-[#FFE9D2]/20 rounded-xl p-4 text-center group hover:bg-[#FFE9D2]/30 transition-all cursor-pointer">
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">📚</span>
                <p className="text-secondary font-semibold text-sm">Charla Educativa</p>
                <p className="text-secondary text-lg font-bold mt-1">$</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/dona"
                className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
              >
                Ver Formas de Donar
              </Link>
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
            Contáctanos para más información sobre disponibilidad, envíos y formas de pago.
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
