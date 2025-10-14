import Image from 'next/image';

export default function Mimos() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mimos en Casa
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Servicio de niñera para el bienestar y tranquilidad de tu peludo
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
                Cuidado integral en el hogar
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Con nuestro servicio de niñera buscamos el bienestar y la tranquilidad de cada peludo. 
                Acompañamos a las mascotas en su propio hogar, reduciendo el estrés (especialmente en los gaticos) 
                y brindándoles atención con amor, responsabilidad y cuidado integral: físico, emocional y recreativo.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Nuestro servicio está diseñado para mantener la rutina de tu mascota mientras tú no estás, 
                proporcionando compañía, ejercicio y cuidados especializados en el ambiente familiar.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 23.png"
                  alt="Mimos en casa"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestros Servicios de Cuidado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Alimentación</h4>
                <p className="text-primary/80 text-sm">
                  Servimos las comidas según la rutina establecida, respetando horarios 
                  y cantidades recomendadas por el veterinario.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💧</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Hidratación</h4>
                <p className="text-primary/80 text-sm">
                  Aseguramos que siempre tengan agua fresca y limpia, especialmente 
                  importante en días calurosos.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎾</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Ejercicio y Juego</h4>
                <p className="text-primary/80 text-sm">
                  Realizamos actividades físicas y mentales apropiadas para la edad 
                  y condición de cada mascota.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛁</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Aseo Básico</h4>
                <p className="text-primary/80 text-sm">
                  Cepillado, limpieza de ojos y oídos, y mantenimiento de higiene 
                  según las necesidades de cada animal.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💊</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Medicación</h4>
                <p className="text-primary/80 text-sm">
                  Administramos medicamentos según prescripción veterinaria, 
                  respetando horarios y dosis exactas.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Compañía</h4>
                <p className="text-primary/80 text-sm">
                  Brindamos compañía y afecto, reduciendo la ansiedad por separación 
                  y manteniendo el bienestar emocional.
                </p>
              </div>
            </div>
          </div>

          {/* Service Packages */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Paquetes de Servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">⏰</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">Visita Básica</h4>
                <p className="text-primary/80 mb-6">
                  Servicio de 2 horas para mascotas que necesitan atención básica
                </p>
                <ul className="text-primary/70 space-y-2 mb-6 text-left">
                  <li>• Alimentación e hidratación</li>
                  <li>• Paseo corto (perros)</li>
                  <li>• Aseo básico</li>
                  <li>• Compañía y juegos</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-orange text-white px-6 py-2 rounded-lg text-lg font-semibold">
                    $40.000
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-accent-blue">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">⭐</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">Visita Premium</h4>
                <p className="text-primary/80 mb-6">
                  Servicio de 4 horas con atención integral y actividades especiales
                </p>
                <ul className="text-primary/70 space-y-2 mb-6 text-left">
                  <li>• Todo lo incluido en Básica</li>
                  <li>• Ejercicio intensivo</li>
                  <li>• Baño completo</li>
                  <li>• Entrenamiento básico</li>
                  <li>• Reporte detallado</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-blue text-white px-6 py-2 rounded-lg text-lg font-semibold">
                    $70.000
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏠</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">Cuidado Nocturno</h4>
                <p className="text-primary/80 mb-6">
                  Servicio de 8 horas para mascotas que necesitan atención nocturna
                </p>
                <ul className="text-primary/70 space-y-2 mb-6 text-left">
                  <li>• Cuidado durante la noche</li>
                  <li>• Alimentación nocturna</li>
                  <li>• Paseos nocturnos</li>
                  <li>• Vigilancia especial</li>
                  <li>• Atención de emergencia</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-green text-white px-6 py-2 rounded-lg text-lg font-semibold">
                    $120.000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Care */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Cuidados Especiales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🐱</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4 text-center">
                  Cuidado Especial para Gatos
                </h4>
                <p className="text-primary/80 mb-6 text-center">
                  Servicio especializado para gatos que requieren atención en su propio ambiente
                </p>
                <ul className="text-primary/70 space-y-2">
                  <li>• Reducción de estrés por cambio de ambiente</li>
                  <li>• Mantenimiento de rutinas específicas</li>
                  <li>• Limpieza de areneros</li>
                  <li>• Estimulación mental con juguetes</li>
                  <li>• Monitoreo de comportamiento</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">👴</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4 text-center">
                  Cuidado para Mascotas Senior
                </h4>
                <p className="text-primary/80 mb-6 text-center">
                  Atención especializada para mascotas adultas mayores con necesidades específicas
                </p>
                <ul className="text-primary/70 space-y-2">
                  <li>• Administración de medicamentos</li>
                  <li>• Ejercicio suave y controlado</li>
                  <li>• Monitoreo de salud</li>
                  <li>• Cuidado de articulaciones</li>
                  <li>• Atención a necesidades especiales</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Requisitos para el Servicio
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">Documentación</h4>
                  <ul className="space-y-3 text-primary/80">
                    <li className="flex items-start">
                      <span className="text-accent-orange mr-2">✓</span>
                      Carné de vacunación actualizado
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-orange mr-2">✓</span>
                      Instrucciones detalladas de cuidado
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-orange mr-2">✓</span>
                      Contacto de emergencia
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-orange mr-2">✓</span>
                      Autorización firmada
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">Preparación del Hogar</h4>
                  <ul className="space-y-3 text-primary/80">
                    <li className="flex items-start">
                      <span className="text-accent-blue mr-2">✓</span>
                      Acceso a todas las áreas necesarias
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-blue mr-2">✓</span>
                      Alimentos y medicamentos disponibles
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-blue mr-2">✓</span>
                      Juguetes y elementos de entretenimiento
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-blue mr-2">✓</span>
                      Instrucciones de seguridad del hogar
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas cuidado para tu mascota?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Contáctanos para programar una consulta inicial y conocer más sobre 
              nuestros servicios de cuidado en casa.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Solicitar Servicio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
