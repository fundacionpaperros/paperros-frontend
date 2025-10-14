export default function Paseos() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Paseos Felices
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Paseo consciente cumpliendo con la Ley Kiara
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Paseo Consciente y Responsable
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Uno de nuestros servicios con propósito es el paseo consciente. Cumplimos con la Ley Kiara y cada 
                salida está a cargo de técnicos auxiliares veterinarios. Caminamos en grupos pequeños, sin mezclar 
                tamaños, al ritmo del más tranquilo, priorizando siempre su bienestar, su seguridad y su felicidad.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-green rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🚶‍♂️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Características de Nuestro Servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Técnicos Auxiliares Veterinarios</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">👥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Grupos Pequeños</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📏</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Sin Mezclar Tamaños</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🐌</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Al Ritmo del Más Tranquilo</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Bienestar Garantizado</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Seguridad Primero</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Law Kiara Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Cumplimiento de la Ley Kiara
            </h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">¿Qué es la Ley Kiara?</h4>
                  <p className="text-primary/80 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="text-primary/80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">⚖️</span>
                  </div>
                  <p className="text-primary font-semibold">Cumplimiento Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Detalles del Servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-6">Incluye</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-6">Requisitos</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres que tu mascota disfrute de paseos felices?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Contáctanos para agendar el servicio de paseos conscientes para tu mascota. 
              Garantizamos su bienestar, seguridad y felicidad.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Solicitar Servicio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}