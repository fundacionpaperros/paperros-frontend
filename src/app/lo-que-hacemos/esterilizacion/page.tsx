export default function Esterilizacion() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Programas de Esterilización
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Un acto de responsabilidad y compasión
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
                Prevención y Compasión
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Pa Perros promovemos la esterilización en estratos 0, 1, 2 y en zona rural, como un acto de 
                responsabilidad y compasión. Con ella prevenimos la sobrepoblación, reducimos el abandono y ayudamos 
                a que menos animales sufran en las calles, construyendo así comunidades más sanas y solidarias con la vida.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-green rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">✂️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Beneficios de la Esterilización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🚫</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Previene Sobrepoblación</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Reduce el Abandono</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Mejora la Salud</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏘️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Comunidades Más Sanas</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">💰</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Reduce Costos</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Responsabilidad Social</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Target Population */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Población Objetivo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">0</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Estrato 0</h4>
                <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
              </div>

              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">1</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Estrato 1</h4>
                <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
              </div>

              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">2</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Estrato 2</h4>
                <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
              </div>

              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Zona Rural</h4>
                <p className="text-primary/80">Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Proceso
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Registro</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Evaluación</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Cirugía</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Seguimiento</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Impacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-orange mb-2">120+</h4>
                <p className="text-primary font-semibold">Mascotas Esterilizadas</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-blue mb-2">15+</h4>
                <p className="text-primary font-semibold">Jornadas Realizadas</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-green mb-2">5</h4>
                <p className="text-primary font-semibold">Municipios Atendidos</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres participar en nuestras jornadas?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Mantente informado sobre nuestras próximas jornadas de esterilización gratuita 
              y ayuda a construir comunidades más sanas y solidarias.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Informarme
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}