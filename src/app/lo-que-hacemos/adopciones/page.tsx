import Image from 'next/image';

export default function Adopciones() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Adopciones Responsables
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Creemos que adoptar es un acto de amor, no de impulso
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
                Un proceso diseñado para el éxito
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Pa Perros creemos que adoptar es un acto de amor, no de impulso. Cada proceso 
                debe darse con calma, desde la empatía y el compromiso, permitiendo que el vínculo 
                entre el tutor y su nuevo compañero crezca con paciencia, respeto y ternura.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Nuestro proceso de adopción está diseñado para garantizar que tanto el adoptante 
                como el animal tengan la mejor experiencia posible, creando vínculos duraderos 
                y responsables.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 24.png"
                  alt="Adopciones responsables"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Proceso de Adopción
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-3">Registro y Formulario</h4>
                  <p className="text-primary/80 text-sm">
                    Completas un formulario detallado sobre tu estilo de vida, 
                    experiencia con mascotas y expectativas.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-3">Formación Obligatoria</h4>
                  <p className="text-primary/80 text-sm">
                    Participas en nuestro curso de adopción responsable y 
                    tenencia de mascotas.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-3">Evaluación y Certificación</h4>
                  <p className="text-primary/80 text-sm">
                    Realizas una evaluación que certifica tu preparación 
                    para la adopción responsable.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-3">Seguimiento Continuo</h4>
                  <p className="text-primary/80 text-sm">
                    Te acompañamos con visitas de seguimiento y apoyo 
                    durante el proceso de adaptación.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Requisitos para Adoptar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">Requisitos Básicos</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Ser mayor de 18 años
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Tener identificación válida
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Completar el formulario de adopción
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Participar en la formación obligatoria
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-orange mr-2">✓</span>
                    Aprobar la evaluación de certificación
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">Compromisos del Adoptante</h4>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Proporcionar cuidados veterinarios regulares
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Mantener al animal esterilizado
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Proporcionar alimentación adecuada
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Permitir visitas de seguimiento
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-blue mr-2">✓</span>
                    Notificar cambios de domicilio
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Available Animals Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Animales Disponibles para Adopción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-accent-orange/20 flex items-center justify-center">
                  <span className="text-6xl">🐕</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">Max</h4>
                  <p className="text-accent-orange font-semibold mb-2">Perro • 3 años • Macho</p>
                  <p className="text-primary/80 text-sm mb-4">
                    Max es un perro tranquilo y cariñoso, perfecto para familias con niños. 
                    Le encanta jugar y es muy obediente.
                  </p>
                  <a 
                    href="/adopta"
                    className="bg-accent-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
                  >
                    Conocer Más
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-accent-blue/20 flex items-center justify-center">
                  <span className="text-6xl">🐱</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">Luna</h4>
                  <p className="text-accent-blue font-semibold mb-2">Gata • 2 años • Hembra</p>
                  <p className="text-primary/80 text-sm mb-4">
                    Luna es una gata independiente pero cariñosa. Ideal para personas 
                    que buscan compañía tranquila.
                  </p>
                  <a 
                    href="/adopta"
                    className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-blue/90 transition-colors duration-200"
                  >
                    Conocer Más
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-accent-green/20 flex items-center justify-center">
                  <span className="text-6xl">🐕</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">Rocky</h4>
                  <p className="text-accent-green font-semibold mb-2">Perro • 5 años • Macho</p>
                  <p className="text-primary/80 text-sm mb-4">
                    Rocky es un perro adulto muy tranquilo, perfecto para personas mayores 
                    o familias que buscan compañía relajada.
                  </p>
                  <a 
                    href="/adopta"
                    className="bg-accent-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-green/90 transition-colors duration-200"
                  >
                    Conocer Más
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para darle una segunda oportunidad a un animal?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Comienza tu proceso de adopción responsable hoy mismo. 
              Te acompañaremos en cada paso del camino.
            </p>
            <a 
              href="/adopta"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Iniciar Proceso de Adopción
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
