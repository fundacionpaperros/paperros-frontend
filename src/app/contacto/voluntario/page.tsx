export default function Voluntario() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Quiero ser Voluntario
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Únete a nuestro equipo de voluntarios y ayuda a transformar vidas
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
                Sé Parte del Cambio
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Fundación Pa&apos; Perros trabajamos con albergues aliados y rescatistas para promover 
                la adopción responsable y generar conciencia sobre el bienestar animal. Como voluntario, 
                serás parte de esta transformación cultural.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                A diferencia de un albergue tradicional, nos enfocamos en crear un impacto sostenible 
                a través de la educación, la sensibilización y el apoyo a organizaciones que comparten nuestra misión.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-green rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🤝</span>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Opportunities */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Oportunidades de Voluntariado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📚</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Educación y Charlas</h4>
                <p className="text-primary/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-accent-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Aplicar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Comunicaciones</h4>
                <p className="text-primary/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-accent-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Aplicar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎪</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Eventos y Actividades</h4>
                <p className="text-primary/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-accent-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Aplicar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Apoyo Veterinario</h4>
                <p className="text-primary/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-accent-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Aplicar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🚶‍♂️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Servicios con Propósito</h4>
                <p className="text-primary/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-accent-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Aplicar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">💻</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Administración</h4>
                <p className="text-primary/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-accent-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Requisitos para Ser Voluntario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-6">Requisitos Generales</h4>
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
                <h4 className="text-xl font-bold text-primary mb-6">Beneficios del Voluntariado</h4>
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

          {/* Application Form */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Formulario de Aplicación
            </h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">📝</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">Aplica como Voluntario</h4>
              <p className="text-primary/80 mb-6">
                Completa nuestro formulario para ser parte de nuestro equipo de voluntarios
              </p>
              <a 
                href="https://forms.gle/S9ZeuoJP4yuX6MVg6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200 inline-block"
              >
                Completar Formulario
              </a>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Testimonios de Voluntarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Lorem Ipsum</h4>
                    <p className="text-primary/80 text-sm">Voluntaria desde 2023</p>
                  </div>
                </div>
                <p className="text-primary/80">
                  &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-blue rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Lorem Ipsum</h4>
                    <p className="text-primary/80 text-sm">Voluntario desde 2022</p>
                  </div>
                </div>
                <p className="text-primary/80">
                  &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para hacer la diferencia?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Únete a nuestro equipo de voluntarios y ayuda a transformar la cultura de adopción 
              y bienestar animal en Colombia. Tu tiempo y dedicación pueden cambiar vidas.
            </p>
            <a 
              href="https://forms.gle/S9ZeuoJP4yuX6MVg6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Aplicar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}