
export default function Productos() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Productos con Causa
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Cada compra apoya directamente nuestra misión de bienestar animal
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
              Estamos trabajando en una tienda solidaria donde podrás encontrar productos 
              que no solo benefician a tu mascota, sino que también apoyan nuestra labor 
              de rescate y rehabilitación.
            </p>
          </div>

          {/* Coming Soon Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-accent-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🦴</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Alimentos Premium</h3>
              <p className="text-primary/80 text-sm mb-4">
                Alimentos de alta calidad para perros y gatos, con una parte de las ganancias 
                destinada a nuestros programas de rescate.
              </p>
              <div className="text-accent-orange font-semibold">Próximamente</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-accent-blue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🎾</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Juguetes Solidarios</h3>
              <p className="text-primary/80 text-sm mb-4">
                Juguetes seguros y divertidos para tus mascotas, diseñados para enriquecer 
                su bienestar mental y físico.
              </p>
              <div className="text-accent-blue font-semibold">Próximamente</div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-accent-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👕</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Merchandising</h3>
              <p className="text-primary/80 text-sm mb-4">
                Camisetas, tazas, stickers y otros productos con nuestro logo para 
                mostrar tu apoyo a la causa animal.
              </p>
              <div className="text-accent-green font-semibold">Próximamente</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ser notificado cuando abramos la tienda?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Déjanos tu email y te avisaremos cuando nuestros productos estén disponibles.
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
