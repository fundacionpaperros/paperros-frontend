import Image from 'next/image';

export default function AdopcionSimbolica() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Adopción Simbólica
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Apoya a un animal específico sin la responsabilidad de la adopción física
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              ¿Qué es la Adopción Simbólica?
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              La adopción simbólica te permite apoyar económicamente a un animal específico 
              sin llevarlo a casa. Es perfecta para personas que quieren ayudar pero no pueden 
              adoptar físicamente, o para regalar a alguien especial.
            </p>
          </div>

          {/* How it Works */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              ¿Cómo Funciona?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Elige un Animal</h4>
                <p className="text-primary/80 text-sm">
                  Selecciona de nuestra galería de animales que necesitan apoyo especial
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Haz tu Donación</h4>
                <p className="text-primary/80 text-sm">
                  Realiza una donación mensual o única para cubrir sus gastos
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Recibe Actualizaciones</h4>
                <p className="text-primary/80 text-sm">
                  Te enviamos fotos y reportes del progreso de tu animal adoptado
                </p>
              </div>
            </div>
          </div>

          {/* Available Animals */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Animales Disponibles para Adopción Simbólica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-accent-orange/20 flex items-center justify-center">
                  <span className="text-6xl">🐕</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">Max - Necesita Cirugía</h4>
                  <p className="text-accent-orange font-semibold mb-2">Perro • 4 años • Macho</p>
                  <p className="text-primary/80 text-sm mb-4">
                    Max necesita una cirugía de cadera. Tu apoyo le dará una segunda oportunidad.
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-primary/70">Costo mensual:</span>
                    <span className="font-bold text-accent-orange">$50.000</span>
                  </div>
                  <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                    Adoptar Simbólicamente
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-accent-blue/20 flex items-center justify-center">
                  <span className="text-6xl">🐱</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">Luna - Rehabilitación</h4>
                  <p className="text-accent-blue font-semibold mb-2">Gata • 2 años • Hembra</p>
                  <p className="text-primary/80 text-sm mb-4">
                    Luna está en proceso de rehabilitación emocional. Necesita cuidados especiales.
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-primary/70">Costo mensual:</span>
                    <span className="font-bold text-accent-blue">$30.000</span>
                  </div>
                  <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                    Adoptar Simbólicamente
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-accent-green/20 flex items-center justify-center">
                  <span className="text-6xl">🐕</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">Rocky - Senior</h4>
                  <p className="text-accent-green font-semibold mb-2">Perro • 8 años • Macho</p>
                  <p className="text-primary/80 text-sm mb-4">
                    Rocky es un perro senior que necesita medicamentos especiales y cuidados.
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-primary/70">Costo mensual:</span>
                    <span className="font-bold text-accent-green">$40.000</span>
                  </div>
                  <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                    Adoptar Simbólicamente
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Beneficios de la Adopción Simbólica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">Para Ti</h4>
                <ul className="space-y-2 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Ayudas directamente a un animal específico
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Recibes actualizaciones regulares
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Certificado de adopción simbólica
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Puedes cancelar cuando quieras
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">Para el Animal</h4>
                <ul className="space-y-2 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Cobertura de gastos médicos
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Alimentación de calidad
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Cuidados especializados
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Preparación para adopción real
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para hacer la diferencia en la vida de un animal?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Con la adopción simbólica puedes ayudar a un animal específico sin la responsabilidad 
              de la adopción física. Es una forma perfecta de contribuir a nuestra misión.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Iniciar Adopción Simbólica
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
