
export default function Adopta() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Adopta
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Encuentra a tu compañero perfecto y dale una segunda oportunidad
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Animales Disponibles para Adopción
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Cada uno de nuestros animales ha sido evaluado, rehabilitado y está listo 
              para encontrar su hogar definitivo. Conoce sus historias y encuentra 
              al compañero perfecto para tu familia.
            </p>
          </div>

          {/* Filter Options */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Filtrar por:</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange">
                  <option>Todos los animales</option>
                  <option>Perros</option>
                  <option>Gatos</option>
                </select>
                <select className="border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange">
                  <option>Todas las edades</option>
                  <option>Cachorros (0-1 año)</option>
                  <option>Adultos (1-7 años)</option>
                  <option>Senior (7+ años)</option>
                </select>
                <select className="border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange">
                  <option>Todos los tamaños</option>
                  <option>Pequeño</option>
                  <option>Mediano</option>
                  <option>Grande</option>
                </select>
                <select className="border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange">
                  <option>Todos los géneros</option>
                  <option>Macho</option>
                  <option>Hembra</option>
                </select>
              </div>
            </div>
          </div>

          {/* Available Animals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Animal 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-accent-orange/20 flex items-center justify-center">
                <span className="text-8xl">🐕</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Max</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Perro
                  </span>
                  <span className="text-primary/60 text-sm">3 años • Macho</span>
                </div>
                <p className="text-primary/80 text-sm mb-4">
                  Max es un perro tranquilo y cariñoso, perfecto para familias con niños. 
                  Le encanta jugar y es muy obediente. Ha sido rehabilitado y está listo 
                  para encontrar su hogar definitivo.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Esterilizado
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Vacunado
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Desparasitado
                  </div>
                </div>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Animal 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-accent-blue/20 flex items-center justify-center">
                <span className="text-8xl">🐱</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Luna</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Gata
                  </span>
                  <span className="text-primary/60 text-sm">2 años • Hembra</span>
                </div>
                <p className="text-primary/80 text-sm mb-4">
                  Luna es una gata independiente pero cariñosa. Ideal para personas 
                  que buscan compañía tranquila. Le gusta jugar con juguetes y 
                  acurrucarse en lugares cómodos.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Esterilizada
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Vacunada
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Desparasitada
                  </div>
                </div>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Animal 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-accent-green/20 flex items-center justify-center">
                <span className="text-8xl">🐕</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Rocky</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Perro
                  </span>
                  <span className="text-primary/60 text-sm">5 años • Macho</span>
                </div>
                <p className="text-primary/80 text-sm mb-4">
                  Rocky es un perro adulto muy tranquilo, perfecto para personas mayores 
                  o familias que buscan compañía relajada. Es muy leal y protector.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Esterilizado
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Vacunado
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Desparasitado
                  </div>
                </div>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Animal 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-accent-orange/20 flex items-center justify-center">
                <span className="text-8xl">🐱</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Mimi</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Gata
                  </span>
                  <span className="text-primary/60 text-sm">1 año • Hembra</span>
                </div>
                <p className="text-primary/80 text-sm mb-4">
                  Mimi es una gata joven muy juguetona y sociable. Le encanta interactuar 
                  con personas y otros animales. Perfecta para familias activas.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Esterilizada
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Vacunada
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Desparasitada
                  </div>
                </div>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Animal 5 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-accent-blue/20 flex items-center justify-center">
                <span className="text-8xl">🐕</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Bella</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Perra
                  </span>
                  <span className="text-primary/60 text-sm">4 años • Hembra</span>
                </div>
                <p className="text-primary/80 text-sm mb-4">
                  Bella es una perra muy dulce y cariñosa. Le encanta estar cerca de las personas 
                  y es muy buena con los niños. Ha superado un proceso de rehabilitación exitoso.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Esterilizada
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Vacunada
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Desparasitada
                  </div>
                </div>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Animal 6 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-accent-green/20 flex items-center justify-center">
                <span className="text-8xl">🐱</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Simón</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-accent-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Gato
                  </span>
                  <span className="text-primary/60 text-sm">3 años • Macho</span>
                </div>
                <p className="text-primary/80 text-sm mb-4">
                  Simón es un gato tranquilo y observador. Le gusta estar en lugares altos 
                  y observar el mundo desde ahí. Es muy independiente pero cariñoso.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Esterilizado
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Vacunado
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                    Desparasitado
                  </div>
                </div>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Conocer Más
                </button>
              </div>
            </div>
          </div>

          {/* Process Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Proceso de Adopción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Registro</h4>
                <p className="text-primary/80 text-sm">
                  Completa el formulario de adopción con tus datos y preferencias
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Formación</h4>
                <p className="text-primary/80 text-sm">
                  Participa en nuestro curso de adopción responsable
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Evaluación</h4>
                <p className="text-primary/80 text-sm">
                  Realiza la evaluación que certifica tu preparación
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Adopción</h4>
                <p className="text-primary/80 text-sm">
                  Conoce a tu nuevo compañero y llévalo a casa
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Contáctanos para conocer más animales disponibles o para recibir 
              notificaciones cuando lleguen nuevos compañeros.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Contactar Fundación
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
