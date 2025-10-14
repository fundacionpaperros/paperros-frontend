import Image from 'next/image';

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
              Únete a nuestro equipo y ayuda a transformar vidas
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
                Tu tiempo puede cambiar vidas
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Como voluntario de la Fundación Pa Perros, tendrás la oportunidad de 
                contribuir directamente al bienestar animal y ser parte de una comunidad 
                apasionada por hacer la diferencia.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                No necesitas experiencia previa, solo ganas de ayudar y aprender. 
                Te capacitaremos en todo lo que necesites saber.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 13.png"
                  alt="Voluntariado"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Volunteer Opportunities */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Oportunidades de Voluntariado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Cuidado Directo</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Alimentación, paseos, limpieza y cuidado directo de los animales rescatados.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Alimentación y hidratación</li>
                  <li>• Paseos y ejercicio</li>
                  <li>• Limpieza de espacios</li>
                  <li>• Acompañamiento emocional</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Educación</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Ayuda en charlas educativas, talleres y programas de sensibilización.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Apoyo en charlas escolares</li>
                  <li>• Preparación de material</li>
                  <li>• Logística de eventos</li>
                  <li>• Difusión en redes sociales</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚗</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Transporte</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Transporte de animales a citas veterinarias, eventos y hogares temporales.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Transporte veterinario</li>
                  <li>• Entrega de adopciones</li>
                  <li>• Recogida de donaciones</li>
                  <li>• Apoyo en eventos</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Comunicaciones</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Apoyo en redes sociales, fotografía, videografía y contenido digital.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Gestión de redes sociales</li>
                  <li>• Fotografía de animales</li>
                  <li>• Creación de contenido</li>
                  <li>• Diseño gráfico</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Apoyo Veterinario</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Para profesionales o estudiantes de veterinaria que quieren ayudar.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Asistencia en consultas</li>
                  <li>• Apoyo en cirugías</li>
                  <li>• Cuidados post-operatorios</li>
                  <li>• Educación sanitaria</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Hogar Temporal</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Acoge temporalmente a un animal mientras encuentra su hogar definitivo.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Cuidado temporal</li>
                  <li>• Socialización</li>
                  <li>• Evaluación de comportamiento</li>
                  <li>• Preparación para adopción</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Requisitos para Ser Voluntario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold text-primary mb-4">Requisitos Básicos</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Ser mayor de 18 años (o 16 con autorización de padres)
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Tener amor por los animales
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Compromiso mínimo de 4 horas semanales
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Disponibilidad para capacitación inicial
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Responsabilidad y puntualidad
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h4 className="text-xl font-bold text-primary mb-4">Lo que Ofrecemos</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Capacitación especializada
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Certificado de voluntariado
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Experiencia en bienestar animal
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Comunidad de voluntarios
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Seguro de voluntariado
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Proceso de Aplicación
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Aplicación</h4>
                  <p className="text-primary/80 text-sm">
                    Completa el formulario de aplicación con tus datos y preferencias
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Entrevista</h4>
                  <p className="text-primary/80 text-sm">
                    Entrevista personal para conocer tus motivaciones y disponibilidad
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Capacitación</h4>
                  <p className="text-primary/80 text-sm">
                    Capacitación inicial sobre nuestros protocolos y mejores prácticas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Inicio</h4>
                  <p className="text-primary/80 text-sm">
                    Comienzas tu voluntariado con acompañamiento y supervisión
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para ser parte del cambio?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Completa nuestro formulario de aplicación y comienza tu jornada como voluntario. 
              Tu ayuda hace la diferencia en la vida de muchos animales.
            </p>
            <a 
              href="https://forms.gle/S9ZeuoJP4yuX6MVg6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Aplicar como Voluntario
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
