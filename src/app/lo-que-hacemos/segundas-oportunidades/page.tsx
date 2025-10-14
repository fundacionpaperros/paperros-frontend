export default function SegundasOportunidades() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Por Segundas Oportunidades
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Trabajamos por segundas oportunidades para cada vida que merece amor
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
                Transformando Vidas con Amor
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Pa Perros trabajamos por segundas oportunidades. Nos hemos formado para acompañar a los perros 
                adultos de los albergues en sus procesos de adaptación y aprendizaje, ayudándolos a recuperar la 
                confianza y a prepararse para una adopción responsable.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Junto a nuestros aliados y profesionales, también apoyamos la rehabilitación física y emocional 
                de perros y gatos rescatados, mejorando su bienestar y abriéndoles el camino hacia una vida nueva, 
                llena de amor y cuidado.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-green rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">❤️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Proceso de Rehabilitación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Evaluación</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Rehabilitación</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Socialización</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Adopción</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Historias de Éxito
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Story 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Lorem Ipsum</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="text-accent-orange font-semibold text-sm">
                  Tiempo de rehabilitación: Lorem ipsum
                </div>
              </div>

              {/* Story 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Lorem Ipsum</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="text-accent-blue font-semibold text-sm">
                  Tiempo de rehabilitación: Lorem ipsum
                </div>
              </div>

              {/* Story 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Lorem Ipsum</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="text-accent-green font-semibold text-sm">
                  Tiempo de rehabilitación: Lorem ipsum
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestros Servicios de Rehabilitación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Rehabilitación Física</h4>
                <p className="text-primary/80 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Rehabilitación Emocional</h4>
                <p className="text-primary/80 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Socialización</h4>
                <p className="text-primary/80 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Preparación para Adopción</h4>
                <p className="text-primary/80 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres apoyar nuestras segundas oportunidades?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Cada donación nos ayuda a brindar rehabilitación, cuidado y amor a más animales 
              que merecen una segunda oportunidad.
            </p>
            <a 
              href="/dona"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Donar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}