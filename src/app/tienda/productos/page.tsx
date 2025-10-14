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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
                Lorem Ipsum Dolor
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
                  <span className="text-6xl">🛍️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Categorías de Productos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">👕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎒</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">☕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📚</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎁</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Lorem Ipsum</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Productos Destacados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-full h-48 bg-accent-orange/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">👕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-orange font-semibold mb-3">$50.000</p>
                <p className="text-primary/80 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Comprar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-full h-48 bg-accent-blue/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🎒</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-blue font-semibold mb-3">$80.000</p>
                <p className="text-primary/80 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Comprar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-full h-48 bg-accent-green/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">☕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-green font-semibold mb-3">$25.000</p>
                <p className="text-primary/80 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Comprar
                </button>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Impacto de tus Compras
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-orange mb-2">100%</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-blue mb-2">Lorem</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-green mb-2">Lorem</h4>
                <p className="text-primary font-semibold">Lorem Ipsum</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ver más productos?
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