import Image from 'next/image';

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
              Trabajamos por segundas oportunidades para cada animal que lo necesite
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
                Cada vida merece una segunda oportunidad
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Pa Perros trabajamos por segundas oportunidades. Nos hemos formado para acompañar 
                a los perros adultos de los albergues en sus procesos de adaptación y aprendizaje, 
                ayudándolos a recuperar la confianza y a prepararse para una adopción responsable.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Junto a nuestros aliados y profesionales, también apoyamos la rehabilitación física 
                y emocional de perros y gatos rescatados, mejorando su bienestar y abriéndoles el 
                camino hacia una vida nueva, llena de amor y cuidado.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 23.png"
                  alt="Segundas oportunidades"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Enfoque de Rehabilitación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Evaluación Inicial</h4>
                <p className="text-primary/80 text-sm">
                  Realizamos una evaluación completa del estado físico y emocional 
                  de cada animal para diseñar un plan de rehabilitación personalizado.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Rehabilitación Emocional</h4>
                <p className="text-primary/80 text-sm">
                  Trabajamos en la confianza y el vínculo humano-animal a través de 
                  técnicas especializadas de comportamiento y terapia asistida.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Rehabilitación Física</h4>
                <p className="text-primary/80 text-sm">
                  Proporcionamos atención veterinaria especializada, fisioterapia 
                  y tratamientos para recuperar la salud física de nuestros animales.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Socialización</h4>
                <p className="text-primary/80 text-sm">
                  Enseñamos habilidades sociales básicas para que puedan adaptarse 
                  a la vida familiar y convivir con otros animales y personas.
                </p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Historias de Transformación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Bella</h4>
                <p className="text-primary/80 text-sm mb-4">
                  &ldquo;Bella llegó con miedo extremo a los humanos después de ser abandonada. 
                  Después de 6 meses de trabajo paciente, hoy es la mascota más cariñosa 
                  de la familia Martínez.&rdquo;
                </p>
                <div className="text-accent-orange font-semibold text-sm">
                  Tiempo de rehabilitación: 6 meses
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Simón</h4>
                <p className="text-primary/80 text-sm mb-4">
                  &ldquo;Simón tenía problemas de agresividad por maltrato. Con terapia 
                  especializada y mucho amor, se convirtió en el gato más tranquilo 
                  y cariñoso del refugio.&rdquo;
                </p>
                <div className="text-accent-blue font-semibold text-sm">
                  Tiempo de rehabilitación: 4 meses
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Rex</h4>
                <p className="text-primary/80 text-sm mb-4">
                  &ldquo;Rex llegó con una pata fracturada y desnutrido. Hoy corre y juega 
                  como cualquier perro sano, y es el mejor amigo de los niños del barrio.&rdquo;
                </p>
                <div className="text-accent-green font-semibold text-sm">
                  Tiempo de rehabilitación: 8 meses
                </div>
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Proceso de Rehabilitación
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Rescate</h4>
                  <p className="text-primary/80 text-sm">
                    Identificamos y rescatamos animales en situación de vulnerabilidad
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Evaluación</h4>
                  <p className="text-primary/80 text-sm">
                    Realizamos diagnóstico completo físico y emocional
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Rehabilitación</h4>
                  <p className="text-primary/80 text-sm">
                    Aplicamos tratamiento especializado según las necesidades
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Adopción</h4>
                  <p className="text-primary/80 text-sm">
                    Preparamos al animal para su nueva familia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres apoyar nuestras segundas oportunidades?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Cada donación nos permite seguir rehabilitando animales y dándoles 
              la segunda oportunidad que merecen. Tu apoyo hace la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/dona"
                className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
              >
                Donar Ahora
              </a>
              <a 
                href="/adopta"
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-secondary hover:text-primary transition-colors duration-200"
              >
                Ver Animales Disponibles
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
