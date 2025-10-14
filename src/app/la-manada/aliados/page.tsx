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
              Organizaciones que comparten nuestra visión y nos ayudan a multiplicar nuestro impacto
            </p>
          </div>
        </div>
      </section>

      {/* Allies Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Nuestros Aliados Estratégicos
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Trabajamos de la mano con instituciones, organizaciones y profesionales comprometidos con el bienestar animal
            </p>
          </div>

          {/* Academic Allies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Académicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Universidad Autónoma de Manizales</h4>
                <p className="text-accent-orange font-semibold mb-4 text-center">Paz y Competitividad</p>
                <p className="text-primary/80 text-center mb-4">
                  Aliado estratégico en proyectos de investigación y desarrollo social
                </p>
                <a 
                  href="https://www.autonoma.edu.co/proyeccion/paz-y-competitividad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center bg-accent-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
                >
                  Visitar Sitio Web
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Universidad de Caldas</h4>
                <p className="text-accent-blue font-semibold mb-4 text-center">Vicerrectoría de Proyección</p>
                <p className="text-primary/80 text-center mb-4">
                  Colaboración en programas de extensión y proyección social
                </p>
                <a 
                  href="https://viceproyeccion.ucaldas.edu.co/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center bg-accent-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200"
                >
                  Visitar Sitio Web
                </a>
              </div>
            </div>
          </div>

          {/* Specialized Organizations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Organizaciones Especializadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Latimos Bocalán</h4>
                <p className="text-primary/80 text-center mb-4">
                  Especialistas en terapia asistida con animales y bienestar canino
                </p>
                <a 
                  href="https://latimosbocalan.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center bg-accent-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200"
                >
                  Visitar Sitio Web
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">K9 Coaching Colombia</h4>
                <p className="text-primary/80 text-center mb-4">
                  Entrenamiento especializado y rehabilitación canina
                </p>
                <a 
                  href="https://instagram.com/k9coachingcolombia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center bg-accent-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
                >
                  Ver Instagram
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🧠</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">EtoLógica</h4>
                <p className="text-primary/80 text-center mb-4">
                  Especialistas en etología y comportamiento animal
                </p>
                <a 
                  href="https://instagram.com/eto_logica" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center bg-accent-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200"
                >
                  Ver Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Government Allies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Gubernamentales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Secretaría de Medio Ambiente</h4>
                <p className="text-primary/80">
                  Colaboración en programas de conservación y protección ambiental
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🚜</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Secretaría de Agricultura</h4>
                <p className="text-primary/80">
                  Apoyo en programas de bienestar animal y desarrollo rural
                </p>
              </div>
            </div>
          </div>

          {/* Veterinary Allies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Aliados Veterinarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Veterinaria Golden Vet</h4>
                <p className="text-primary/80">
                  Servicios veterinarios especializados y atención de emergencias
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Veterinaria San Miguel</h4>
                <p className="text-primary/80">
                  Atención veterinaria integral y programas de esterilización
                </p>
              </div>
            </div>
          </div>

          {/* Join as Ally CTA */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ser nuestro aliado?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Si tu organización comparte nuestra visión y quiere contribuir al bienestar animal, 
              contáctanos para explorar oportunidades de colaboración.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}