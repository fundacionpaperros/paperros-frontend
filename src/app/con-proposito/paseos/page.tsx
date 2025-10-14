import Image from 'next/image';

export default function Paseos() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Paseos Felices
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Paseo consciente cumpliendo con la Ley Kiara
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
                Paseo consciente y responsable
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Uno de nuestros servicios con propósito es el paseo consciente. Cumplimos con la Ley Kiara 
                y cada salida está a cargo de técnicos auxiliares veterinarios. Caminamos en grupos pequeños, 
                sin mezclar tamaños, al ritmo del más tranquilo, priorizando siempre su bienestar, 
                su seguridad y su felicidad.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Nuestros paseos no son solo ejercicio físico, son momentos de socialización, 
                estimulación mental y fortalecimiento del vínculo humano-animal.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 22.png"
                  alt="Paseos felices"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Características de Nuestros Paseos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Personal Calificado</h4>
                <p className="text-primary/80 text-sm">
                  Técnicos auxiliares veterinarios especializados en comportamiento animal 
                  y manejo seguro de mascotas.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Grupos Pequeños</h4>
                <p className="text-primary/80 text-sm">
                  Máximo 6 perros por grupo, separados por tamaño y temperamento 
                  para garantizar la seguridad de todos.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Cumplimiento Legal</h4>
                <p className="text-primary/80 text-sm">
                  Cumplimos con la Ley Kiara y todas las normativas de tenencia 
                  responsable de mascotas.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Ritmo Adaptado</h4>
                <p className="text-primary/80 text-sm">
                  Caminamos al ritmo del perro más tranquilo, respetando las necesidades 
                  y capacidades de cada uno.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Seguridad Total</h4>
                <p className="text-primary/80 text-sm">
                  Equipos de seguridad, botiquín de primeros auxilios y rutas 
                  previamente evaluadas.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Seguimiento</h4>
                <p className="text-primary/80 text-sm">
                  Reportes detallados del comportamiento y recomendaciones 
                  personalizadas para cada mascota.
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Tipos de Paseos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌅</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4 text-center">
                  Paseo Matutino
                </h4>
                <p className="text-primary/80 mb-6 text-center">
                  Ideal para perros activos que necesitan empezar el día con energía
                </p>
                <ul className="text-primary/70 space-y-2 mb-6">
                  <li>• Duración: 45 minutos</li>
                  <li>• Horario: 6:00 AM - 7:00 AM</li>
                  <li>• Incluye: Ejercicio, socialización, hidratación</li>
                  <li>• Recomendado para: Perros jóvenes y activos</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-orange text-white px-6 py-2 rounded-lg text-sm font-semibold">
                    $25.000 por paseo
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌆</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4 text-center">
                  Paseo Vespertino
                </h4>
                <p className="text-primary/80 mb-6 text-center">
                  Perfecto para perros que necesitan relajarse después del trabajo
                </p>
                <ul className="text-primary/70 space-y-2 mb-6">
                  <li>• Duración: 60 minutos</li>
                  <li>• Horario: 5:00 PM - 6:00 PM</li>
                  <li>• Incluye: Paseo relajado, juegos, cepillado</li>
                  <li>• Recomendado para: Perros adultos y seniors</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-blue text-white px-6 py-2 rounded-lg text-sm font-semibold">
                    $30.000 por paseo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Requisitos para el Servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">Documentación Requerida</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Carné de vacunación al día
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Certificado de esterilización
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Registro de identificación (microchip o tatuaje)
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Autorización firmada por el propietario
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">Condiciones del Animal</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Buen estado de salud general
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Comportamiento social adecuado
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    No agresividad hacia otros perros
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Responder a comandos básicos
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres que tu perro disfrute de paseos felices?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Contáctanos para programar una evaluación inicial y conocer más sobre 
              nuestros servicios de paseo consciente.
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
