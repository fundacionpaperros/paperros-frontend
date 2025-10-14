
export default function Aliados() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Aliados y Patrocinadores
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Juntos multiplicamos el impacto y creamos un mundo mejor para los animales
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Nuestros Aliados Estratégicos
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Trabajamos de la mano con instituciones, organizaciones y empresas que comparten 
              nuestra visión de un mundo más compasivo con los animales.
            </p>
          </div>

          {/* Academic Partners */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Académicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  Universidad Autónoma de Manizales
                </h4>
                <p className="text-accent-orange font-semibold mb-4">
                  Paz y Competitividad
                </p>
                <p className="text-primary/80 mb-4">
                  Colaboramos en proyectos de investigación sobre bienestar animal y 
                  desarrollo de programas educativos comunitarios.
                </p>
                <a 
                  href="https://www.autonoma.edu.co/proyeccion/paz-y-competitividad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-orange hover:text-accent-orange/80 font-semibold"
                >
                  Visitar sitio web →
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  Universidad de Caldas
                </h4>
                <p className="text-accent-blue font-semibold mb-4">
                  Vicerrectoría de Proyección
                </p>
                <p className="text-primary/80 mb-4">
                  Desarrollamos programas de extensión universitaria enfocados en 
                  la tenencia responsable de mascotas y bienestar animal.
                </p>
                <a 
                  href="https://viceproyeccion.ucaldas.edu.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:text-accent-blue/80 font-semibold"
                >
                  Visitar sitio web →
                </a>
              </div>
            </div>
          </div>

          {/* Professional Partners */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Profesionales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🐕</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-3">
                  Latimos Bocalán
                </h4>
                <p className="text-primary/80 text-sm mb-4">
                  Especialistas en terapia asistida con animales y rehabilitación 
                  de perros con necesidades especiales.
                </p>
                <a 
                  href="https://latimosbocalan.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-green hover:text-accent-green/80 font-semibold text-sm"
                >
                  Visitar sitio web →
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-3">
                  K9 Coaching Colombia
                </h4>
                <p className="text-primary/80 text-sm mb-4">
                  Entrenadores profesionales especializados en comportamiento canino 
                  y técnicas de socialización.
                </p>
                <a 
                  href="https://instagram.com/k9coachingcolombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-orange hover:text-accent-orange/80 font-semibold text-sm"
                >
                  Ver en Instagram →
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-3">
                  EtoLógica
                </h4>
                <p className="text-primary/80 text-sm mb-4">
                  Consultoría especializada en etología animal y desarrollo de 
                  protocolos de bienestar.
                </p>
                <a 
                  href="https://instagram.com/eto_logica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:text-accent-blue/80 font-semibold text-sm"
                >
                  Ver en Instagram →
                </a>
              </div>
            </div>
          </div>

          {/* Government Partners */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Gubernamentales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  Secretaría de Medio Ambiente
                </h4>
                <p className="text-primary/80">
                  Colaboramos en programas de conservación ambiental y promoción de 
                  la tenencia responsable de mascotas en espacios públicos.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌾</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  Secretaría de Agricultura
                </h4>
                <p className="text-primary/80">
                  Trabajamos juntos en programas de salud animal y prevención de 
                  enfermedades zoonóticas en zonas rurales.
                </p>
              </div>
            </div>
          </div>

          {/* Veterinary Partners */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Veterinarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  Veterinaria Golden Vet
                </h4>
                <p className="text-primary/80">
                  Nuestro aliado principal en servicios veterinarios, ofreciendo 
                  atención especializada y descuentos para nuestros animales rescatados.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">
                  Veterinaria San Miguel
                </h4>
                <p className="text-primary/80">
                  Especialistas en cirugía y rehabilitación, nos apoyan en los 
                  casos más complejos de nuestros animales rescatados.
                </p>
              </div>
            </div>
          </div>

          {/* Become Partner CTA */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ser nuestro aliado?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Estamos siempre abiertos a nuevas alianzas que nos permitan ampliar 
              nuestro impacto y llegar a más animales que necesitan ayuda.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Contáctanos para Aliarte
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
