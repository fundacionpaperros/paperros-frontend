
export default function Equipo() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Equipo Humano y Peludo
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Conoce a las personas y mascotas que hacen posible nuestra misión
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Nuestro Equipo Interdisciplinario
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Un grupo de profesionales apasionados por el bienestar animal y comprometidos 
              con la transformación social a través de la adopción responsable.
            </p>
          </div>

          {/* Human Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Equipo Humano
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍⚕️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Dr. María González</h4>
                <p className="text-accent-orange font-semibold mb-2">Directora Veterinaria</p>
                <p className="text-primary/80 text-sm">
                  Veterinaria con 15 años de experiencia en medicina animal y bienestar. 
                  Especialista en rehabilitación de animales rescatados.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Carlos Rodríguez</h4>
                <p className="text-accent-blue font-semibold mb-2">Director Ejecutivo</p>
                <p className="text-primary/80 text-sm">
                  Administrador de empresas con amplia experiencia en gestión de organizaciones 
                  sin ánimo de lucro y desarrollo de proyectos sociales.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍🏫</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Ana Martínez</h4>
                <p className="text-accent-green font-semibold mb-2">Coordinadora de Educación</p>
                <p className="text-primary/80 text-sm">
                  Psicóloga especializada en comportamiento animal y educación comunitaria. 
                  Líder de nuestros programas de sensibilización.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🔬</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Luis Herrera</h4>
                <p className="text-accent-orange font-semibold mb-2">Coordinador de Rescates</p>
                <p className="text-primary/80 text-sm">
                  Técnico auxiliar veterinario con 10 años de experiencia en rescate y 
                  rehabilitación de animales en situación de abandono.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍💻</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Sofia Jiménez</h4>
                <p className="text-accent-blue font-semibold mb-2">Coordinadora de Comunicaciones</p>
                <p className="text-primary/80 text-sm">
                  Comunicadora social especializada en marketing digital y gestión de redes sociales. 
                  Responsable de nuestra presencia online.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-32 h-32 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍⚖️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Roberto Silva</h4>
                <p className="text-accent-green font-semibold mb-2">Asesor Legal</p>
                <p className="text-primary/80 text-sm">
                  Abogado especializado en derecho animal y legislación ambiental. 
                  Asesor en temas de normativa y protección animal.
                </p>
              </div>
            </div>
          </div>

          {/* Furry Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Equipo Peludo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Max</h4>
                <p className="text-accent-orange font-semibold mb-2">Embajador de Adopciones</p>
                <p className="text-primary/80 text-sm">
                  Nuestro perro estrella que ayuda a socializar a los nuevos rescatados 
                  y demuestra que las segundas oportunidades funcionan.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐱</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Luna</h4>
                <p className="text-accent-blue font-semibold mb-2">Terapeuta Felina</p>
                <p className="text-primary/80 text-sm">
                  Nuestra gata especialista en ayudar a otros felinos a superar traumas 
                  y adaptarse a nuevos hogares.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐕</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Rocky</h4>
                <p className="text-accent-green font-semibold mb-2">Guía de Rehabilitación</p>
                <p className="text-primary/80 text-sm">
                  Perro senior que enseña a los más jóvenes sobre paciencia, 
                  respeto y el valor de la familia.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🐱</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Mimi</h4>
                <p className="text-accent-orange font-semibold mb-2">Especialista en Socialización</p>
                <p className="text-primary/80 text-sm">
                  Gata que ayuda a otros animales a aprender a convivir en armonía 
                  y a confiar en los humanos.
                </p>
              </div>
            </div>
          </div>

          {/* Join Team CTA */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ser parte de nuestro equipo?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Siempre estamos buscando personas apasionadas por el bienestar animal 
              que quieran contribuir a nuestra misión.
            </p>
            <a 
              href="/contacto/voluntario"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Únete como Voluntario
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
