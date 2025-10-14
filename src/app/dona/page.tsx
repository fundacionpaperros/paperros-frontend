export default function Dona() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dona
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Se puede crear un enlace directo a los bancos
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
                Tu Donación Hace la Diferencia
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-orange rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">💝</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Methods */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Formas de Donar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bank Transfer */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-4">Transferencia Bancaria</h4>
                <div className="space-y-3">
                  <div className="bg-accent-orange/10 p-4 rounded-lg">
                    <p className="font-semibold text-primary">Banco: Lorem Ipsum</p>
                    <p className="text-primary/80">Cuenta: Lorem Ipsum</p>
                    <p className="text-primary/80">A nombre de: Lorem Ipsum</p>
                    <p className="text-primary/80">NIT: Lorem Ipsum</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Copiar Datos
                </button>
              </div>

              {/* Mobile Payment */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-4">Pago Móvil</h4>
                <div className="space-y-3">
                  <div className="bg-accent-blue/10 p-4 rounded-lg">
                    <p className="font-semibold text-primary">Número: Lorem Ipsum</p>
                    <p className="text-primary/80">Referencia: Lorem Ipsum</p>
                    <p className="text-primary/80">Cédula: Lorem Ipsum</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Ver Instrucciones
                </button>
              </div>
            </div>
          </div>

          {/* Impact of Donations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Impacto de tus Donaciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✂️</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-orange mb-2">Lorem</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm mt-2">Lorem ipsum dolor sit amet</p>
              </div>

              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-blue mb-2">Lorem</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm mt-2">Lorem ipsum dolor sit amet</p>
              </div>

              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🍖</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-green mb-2">Lorem</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm mt-2">Lorem ipsum dolor sit amet</p>
              </div>

              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-orange mb-2">Lorem</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm mt-2">Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>

          {/* Monthly Donation */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Donación Mensual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <div className="text-3xl font-bold text-accent-orange mb-4">Lorem</div>
                <p className="text-primary/80 text-sm mb-6">Lorem ipsum</p>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-orange">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-orange">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-orange">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                </ul>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Lorem Ipsum
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-accent-blue">
                <div className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Lorem Ipsum
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <div className="text-3xl font-bold text-accent-blue mb-4">Lorem</div>
                <p className="text-primary/80 text-sm mb-6">Lorem ipsum</p>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-blue">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-blue">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-blue">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                </ul>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Lorem Ipsum
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <div className="text-3xl font-bold text-accent-green mb-4">Lorem</div>
                <p className="text-primary/80 text-sm mb-6">Lorem ipsum</p>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                </ul>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Lorem Ipsum
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Tienes preguntas sobre las donaciones?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}