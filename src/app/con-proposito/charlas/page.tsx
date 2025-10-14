import Image from 'next/image';

export default function Charlas() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Charlas Educativas y Talleres
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Educación especializada para el bienestar animal y la tenencia responsable
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
                Educación que transforma vidas
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Nuestras charlas educativas y talleres están diseñados para crear conciencia 
                sobre el bienestar animal y promover la tenencia responsable. Trabajamos con 
                diferentes audiencias para generar un impacto positivo en la comunidad.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Cada charla y taller está adaptado a las necesidades específicas de la audiencia, 
                utilizando metodologías participativas y recursos didácticos especializados.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 24.png"
                  alt="Charlas educativas"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Types of Talks */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Tipos de Charlas y Talleres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👶</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Para Niños (5-12 años)</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Charlas interactivas con juegos y actividades para enseñar respeto hacia los animales
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Duración: 45 minutos</li>
                  <li>• Material didáctico incluido</li>
                  <li>• Actividades prácticas</li>
                  <li>• Certificado de participación</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👦</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Para Jóvenes (13-18 años)</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Talleres especializados sobre tenencia responsable y prevención del maltrato animal
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Duración: 90 minutos</li>
                  <li>• Casos prácticos</li>
                  <li>• Debate y reflexión</li>
                  <li>• Material de apoyo</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Para Familias</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Talleres integrales para toda la familia sobre adopción responsable y cuidado de mascotas
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Duración: 2 horas</li>
                  <li>• Actividades familiares</li>
                  <li>• Planificación de adopción</li>
                  <li>• Seguimiento post-taller</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👮</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Para Policías</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Capacitación especializada en manejo de casos de maltrato animal y aplicación de la ley
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Duración: 4 horas</li>
                  <li>• Casos reales</li>
                  <li>• Procedimientos legales</li>
                  <li>• Certificación oficial</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Para Empresas</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Programas de responsabilidad social empresarial enfocados en bienestar animal
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Duración: 1-2 horas</li>
                  <li>• Adaptado a la empresa</li>
                  <li>• Voluntariado corporativo</li>
                  <li>• Impacto medible</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👩‍⚕️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Para Profesionales</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Talleres especializados para veterinarios, rescatistas y trabajadores del sector
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Duración: 3-4 horas</li>
                  <li>• Contenido técnico</li>
                  <li>• Casos complejos</li>
                  <li>• Certificación profesional</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Temáticas Principales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold text-primary mb-6">Bienestar Animal</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Necesidades básicas de perros y gatos
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Señales de bienestar y malestar
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Enriquecimiento ambiental
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Manejo del estrés y ansiedad
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Prevención de enfermedades
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold text-primary mb-6">Tenencia Responsable</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">•</span>
                    Compromisos del propietario responsable
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">•</span>
                    Importancia de la esterilización
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">•</span>
                    Identificación y registro
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">•</span>
                    Cuidados veterinarios regulares
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">•</span>
                    Convivencia vecinal
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold text-primary mb-6">Prevención del Maltrato</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-green mr-2">•</span>
                    Identificación de signos de maltrato
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-green mr-2">•</span>
                    Procedimientos de denuncia
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-green mr-2">•</span>
                    Marco legal colombiano
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-green mr-2">•</span>
                    Intervención segura
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-green mr-2">•</span>
                    Apoyo a víctimas
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold text-primary mb-6">Adopción Responsable</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Proceso de adopción adecuado
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Evaluación de compatibilidad
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Adaptación en el nuevo hogar
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Seguimiento post-adopción
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    Manejo de problemas de comportamiento
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestra Metodología
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Enfoque Práctico</h4>
                <p className="text-primary/80 text-sm">
                  Utilizamos casos reales y situaciones cotidianas para facilitar el aprendizaje
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Participativo</h4>
                <p className="text-primary/80 text-sm">
                  Fomentamos la participación activa y el intercambio de experiencias
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Material Didáctico</h4>
                <p className="text-primary/80 text-sm">
                  Proporcionamos recursos visuales y materiales de apoyo especializados
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Evaluación</h4>
                <p className="text-primary/80 text-sm">
                  Medimos el impacto y la comprensión de los participantes
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Impacto Educativo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">850+</h4>
                <p className="text-accent-orange font-semibold">Personas Capacitadas</p>
                <p className="text-primary/80 text-sm">Este año</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">50+</h4>
                <p className="text-accent-blue font-semibold">Charlas Realizadas</p>
                <p className="text-primary/80 text-sm">En diferentes instituciones</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">25+</h4>
                <p className="text-accent-green font-semibold">Instituciones</p>
                <p className="text-primary/80 text-sm">Atendidas</p>
              </div>
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">95%</h4>
                <p className="text-accent-orange font-semibold">Satisfacción</p>
                <p className="text-primary/80 text-sm">De los participantes</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres que llevemos educación a tu institución?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Contáctanos para programar una charla o taller personalizado 
              según las necesidades de tu comunidad.
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
