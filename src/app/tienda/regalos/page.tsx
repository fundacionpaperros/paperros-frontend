
export default function Regalos() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Regalos para Peludos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Sorprende a tu mascota con regalos que también ayudan a otros animales
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Próximamente
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Estamos preparando una sección especial de regalos para tus peludos, 
              donde cada compra contribuye directamente a nuestros programas de rescate.
            </p>
          </div>

          {/* Coming Soon Gifts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-accent-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Cajas Sorpresa</h3>
              <p className="text-primary/80 text-sm mb-4">
                Cajas temáticas con juguetes, snacks y accesorios seleccionados especialmente para tu mascota.
              </p>
              <div className="text-accent-orange font-semibold text-sm">Próximamente</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-accent-blue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🍖</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Snacks Gourmet</h3>
              <p className="text-primary/80 text-sm mb-4">
                Deliciosos snacks naturales y saludables para consentir a tu peludo.
              </p>
              <div className="text-accent-blue font-semibold text-sm">Próximamente</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-accent-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🛏️</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Camas Personalizadas</h3>
              <p className="text-primary/80 text-sm mb-4">
                Camas cómodas y acogedoras diseñadas para el máximo confort de tu mascota.
              </p>
              <div className="text-accent-green font-semibold text-sm">Próximamente</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-accent-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🎀</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">Accesorios</h3>
              <p className="text-primary/80 text-sm mb-4">
                Collares, correas, ropa y accesorios únicos para que tu mascota luzca especial.
              </p>
              <div className="text-accent-orange font-semibold text-sm">Próximamente</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ser el primero en conocer nuestros regalos?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Suscríbete a nuestro boletín y recibe notificaciones exclusivas sobre nuevos productos.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Suscribirse
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
