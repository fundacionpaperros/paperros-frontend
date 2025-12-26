import Link from 'next/link';

export default function ConProposito() {
  const cursos = [
    { nombre: 'Primeros Auxilios para Mascotas', emoji: '🩺' },
    { nombre: 'Educación y comportamiento básico', emoji: '📚' },
    { nombre: 'Modificación de conducta para Perros', emoji: '🐕' },
    { nombre: 'Modificación de conducta para Gatos', emoji: '🐱' },
    { nombre: 'Adiestrador Canino Integral', emoji: '🎓' },
    { nombre: 'Intervenciones Asistidas con Perros', emoji: '💕' },
    { nombre: 'Estética de especies pequeñas', emoji: '✨' },
  ];

  const servicios = [
    {
      id: 'mimos',
      titulo: 'Mimos en Casa',
      descripcion: 'Cuidamos a tu mascota en su propio hogar, reduciendo el estrés y brindándoles atención con amor y responsabilidad.',
      color: 'accent-blue',
      bgColor: 'bg-accent-blue',
      icon: '🏠',
      beneficios: ['Reducción del estrés', 'Cuidado personalizado', 'Reportes constantes'],
    },
    {
      id: 'etologia',
      titulo: 'Consulta de Etología',
      descripcion: 'Especialistas que te ayudan a comprender el comportamiento de tu mascota y encontrar soluciones efectivas.',
      color: 'accent-green',
      bgColor: 'bg-accent-green',
      icon: '🧠',
      beneficios: ['Diagnóstico profesional', 'Tratamiento personalizado', 'Seguimiento continuo'],
    },
    {
      id: 'adiestramiento',
      titulo: 'Adiestramiento Canino',
      descripcion: 'Métodos positivos y respetuosos para una comunicación efectiva con tu perro y una convivencia armoniosa.',
      color: 'accent-orange',
      bgColor: 'bg-accent-orange',
      icon: '🎯',
      beneficios: ['Obediencia básica', 'Entrenamiento avanzado', 'Vínculo fortalecido'],
    },
    {
      id: 'caminatas',
      titulo: 'Caminatas Grupales',
      descripcion: 'Paseos en entornos naturales donde tu peludo puede socializar, explorar y disfrutar de forma segura.',
      color: 'accent-blue',
      bgColor: 'bg-accent-blue',
      icon: '🌿',
      beneficios: ['Socialización', 'Ejercicio guiado', 'Conexión con la naturaleza'],
    },
  ];

  return (
    <div className="bg-secondary">
      {/* Hero minimalista */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Con Propósito
          </h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Servicios diseñados con amor para el bienestar de tu mascota
          </p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      {/* Cursos - Diseño compacto */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Cursos y Talleres</h2>
                <p className="text-secondary">Formación para tutores responsables</p>
              </div>
              <Link 
                href="/contacto"
                className="mt-4 md:mt-0 bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block text-center"
              >
                Inscríbete
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {cursos.map((curso, index) => (
                <div 
                  key={index} 
                  className="bg-[#FFE9D2]/20 hover:bg-[#FFE9D2]/30 rounded-xl p-4 transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{curso.emoji}</span>
                  <h3 className="text-sm md:text-base font-semibold text-secondary leading-tight">{curso.nombre}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios - Grid dinámico */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicios.map((servicio) => (
              <div 
                key={servicio.id}
                className="bg-primary rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 ${servicio.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{servicio.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-1">{servicio.titulo}</h3>
                      <p className="text-secondary text-sm md:text-base">{servicio.descripcion}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {servicio.beneficios.map((beneficio, idx) => (
                      <span 
                        key={idx}
                        className="bg-secondary text-primary text-xs md:text-sm px-3 py-1 rounded-full"
                      >
                        {beneficio}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href="/contacto"
                    className={`${servicio.bgColor} text-secondary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 inline-block text-sm`}
                  >
                    Más información
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            ¿Tienes preguntas sobre nuestros servicios?
          </h2>
          <p className="text-secondary mb-8">
            Estamos aquí para ayudarte a elegir el servicio ideal para ti y tu mascota.
          </p>
          <Link 
            href="/contacto"
            className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  );
}
