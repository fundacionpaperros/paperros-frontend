export default function Educacion() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Educación y Cultura de Pelos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Promovemos la tenencia responsable como un acto de amor y compromiso
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
                Transformando la Cultura de Tenencia
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Fundación Pa Perros promovemos la tenencia responsable como un acto de amor y compromiso. 
                Acompañamos a los tutores para fortalecer el vínculo con sus peludos, basados en el respeto, 
                el cuidado y los derechos de los animales que garantizan una vida digna, tal como lo establece la legislación.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                También compartimos este mensaje a través de charlas en comunidades, colegios, universidades y empresas, 
                sembrando conciencia y empatía hacia todos los animales.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-orange rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestros Programas Educativos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Community Talks */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏘️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Charlas Comunitarias</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* School Programs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏫</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Programas Escolares</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* University Workshops */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Talleres Universitarios</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Corporate Training */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏢</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Capacitación Empresarial</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Online Resources */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">💻</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Recursos Digitales</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Family Workshops */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Talleres Familiares</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Impacto Educativo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-orange mb-2">850+</h4>
                <p className="text-primary font-semibold">Niños Educados</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-blue mb-2">50+</h4>
                <p className="text-primary font-semibold">Instituciones Visitadas</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-green mb-2">100+</h4>
                <p className="text-primary font-semibold">Charlas Realizadas</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres que visitemos tu institución?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Estamos disponibles para realizar charlas educativas en colegios, universidades, 
              empresas y comunidades. Contáctanos para coordinar una visita.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Solicitar Charla
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}