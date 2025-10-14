import Image from 'next/image';

export default function Educacion() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Educación y Cultura de Pelos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Promovemos la tenencia responsable como un acto de amor y compromiso
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
                Transformando la cultura de tenencia responsable
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Fundación Pa Perros promovemos la tenencia responsable como un acto de amor y compromiso. 
                Acompañamos a los tutores para fortalecer el vínculo con sus peludos, basados en el respeto, 
                el cuidado y los derechos de los animales que garantizan una vida digna, tal como lo establece la legislación.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                También compartimos este mensaje a través de charlas en comunidades, colegios, universidades 
                y empresas, sembrando conciencia y empatía hacia todos los animales.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 22.png"
                  alt="Educación y cultura de pelos"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestros Programas Educativos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏫</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Charlas en Colegios</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Programas educativos diseñados para niños y jóvenes, enseñándoles sobre 
                  el respeto hacia los animales y la responsabilidad de tener una mascota.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Cuidado básico de mascotas</li>
                  <li>• Señales de bienestar animal</li>
                  <li>• Prevención de maltrato</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Talleres Universitarios</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Formación especializada para estudiantes universitarios interesados en 
                  el bienestar animal y la medicina veterinaria.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Legislación animal</li>
                  <li>• Etología básica</li>
                  <li>• Primeros auxilios</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Capacitación Empresarial</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Programas para empresas que quieren implementar políticas de bienestar 
                  animal y responsabilidad social.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Políticas corporativas</li>
                  <li>• Voluntariado empresarial</li>
                  <li>• Responsabilidad social</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏘️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Charlas Comunitarias</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Educación directa en barrios y comunidades sobre tenencia responsable 
                  y convivencia con animales.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Convivencia vecinal</li>
                  <li>• Control de población</li>
                  <li>• Salud pública</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👮</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Capacitación Policial</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Formación especializada para fuerzas del orden sobre manejo de casos 
                  de maltrato animal y aplicación de la ley.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Identificación de maltrato</li>
                  <li>• Procedimientos legales</li>
                  <li>• Rescate seguro</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Talleres Familiares</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Programas diseñados para toda la familia, promoviendo la adopción 
                  responsable y el cuidado integral de mascotas.
                </p>
                <ul className="text-primary/70 text-sm space-y-1">
                  <li>• Preparación para adopción</li>
                  <li>• Cuidado diario</li>
                  <li>• Vínculo humano-animal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Impacto Educativo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">850+</h4>
                <p className="text-accent-orange font-semibold">Niños Educados</p>
                <p className="text-primary/80 text-sm">En charlas escolares</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">300+</h4>
                <p className="text-accent-blue font-semibold">Policías Capacitados</p>
                <p className="text-primary/80 text-sm">En manejo de casos</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">50+</h4>
                <p className="text-accent-green font-semibold">Comunidades</p>
                <p className="text-primary/80 text-sm">Impactadas</p>
              </div>
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">200+</h4>
                <p className="text-accent-orange font-semibold">Horas de Educación</p>
                <p className="text-primary/80 text-sm">Impartidas este año</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres que llevemos educación a tu comunidad?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Estamos disponibles para realizar charlas, talleres y capacitaciones 
              en colegios, universidades, empresas y comunidades.
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
