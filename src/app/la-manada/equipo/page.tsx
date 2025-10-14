export default function Equipo() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Equipo Humano y Peludo
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Human Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Equipo Humano
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍⚕️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-orange font-semibold mb-2">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-blue font-semibold mb-2">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍🏫</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-green font-semibold mb-2">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Furry Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Equipo Peludo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-orange font-semibold mb-2">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐱</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-blue font-semibold mb-2">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Lorem Ipsum</h4>
                <p className="text-accent-green font-semibold mb-2">Lorem Ipsum</p>
                <p className="text-primary/80 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}