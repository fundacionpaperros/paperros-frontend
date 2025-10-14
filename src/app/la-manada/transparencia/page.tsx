
export default function Transparencia() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transparencia y Rendición de Cuentas
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Nuestro compromiso con la transparencia y el uso responsable de los recursos
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Nuestro Impacto en Números
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Cada donación, cada voluntario y cada aliado nos permite seguir transformando vidas. 
              Aquí puedes ver el impacto real de nuestro trabajo.
            </p>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">💉</span>
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">120+</h3>
              <p className="text-accent-orange font-semibold">Mascotas Esterilizadas</p>
              <p className="text-primary/80 text-sm mt-2">
                En nuestros programas de esterilización gratuita
              </p>
            </div>

            <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">🐛</span>
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">300+</h3>
              <p className="text-accent-blue font-semibold">Animales Desparasitados</p>
              <p className="text-primary/80 text-sm mt-2">
                En nuestras jornadas de salud animal
              </p>
            </div>

            <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">👶</span>
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">850+</h3>
              <p className="text-accent-green font-semibold">Niños Educados</p>
              <p className="text-primary/80 text-sm mt-2">
                En nuestras charlas de tenencia responsable
              </p>
            </div>

            <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">👮</span>
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">300+</h3>
              <p className="text-accent-orange font-semibold">Policías Capacitados</p>
              <p className="text-primary/80 text-sm mt-2">
                Auxiliares y profesionales de la Policía Metropolitana
              </p>
            </div>
          </div>

          {/* Additional Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">25+</h3>
              <p className="text-accent-blue font-semibold mb-2">Emprendimientos Apoyados</p>
              <p className="text-primary/80 text-sm">
                De mascotas que hemos respaldado en su desarrollo
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">10+</h3>
              <p className="text-accent-green font-semibold mb-2">Campañas en Centros Comerciales</p>
              <p className="text-primary/80 text-sm">
                De tenencia responsable de mascotas realizadas
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-accent-orange font-semibold mb-2">Adopciones Exitosas</p>
              <p className="text-primary/80 text-sm">
                De animales que encontraron su hogar definitivo
              </p>
            </div>
          </div>

          {/* Financial Transparency */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Transparencia Financiera
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-primary mb-4">Uso de Recursos</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Atención Veterinaria</span>
                      <span className="font-semibold text-accent-orange">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Programas Educativos</span>
                      <span className="font-semibold text-accent-blue">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Alimentación</span>
                      <span className="font-semibold text-accent-green">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Administración</span>
                      <span className="font-semibold text-primary">15%</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-primary mb-4">Fuentes de Financiación</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Donaciones</span>
                      <span className="font-semibold text-accent-orange">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Eventos</span>
                      <span className="font-semibold text-accent-blue">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary/80">Aliados</span>
                      <span className="font-semibold text-accent-green">15%</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-primary mb-4">Reportes Anuales</h4>
                  <div className="space-y-3">
                    <a href="#" className="block text-accent-orange hover:text-accent-orange/80 font-semibold">
                      Reporte 2024 →
                    </a>
                    <a href="#" className="block text-accent-blue hover:text-accent-blue/80 font-semibold">
                      Reporte 2023 →
                    </a>
                    <a href="#" className="block text-accent-green hover:text-accent-green/80 font-semibold">
                      Reporte 2022 →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Certificaciones y Reconocimientos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Personería Jurídica</h4>
                <p className="text-primary/80 text-sm">
                  Reconocida por la Cámara de Comercio de Manizales
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Registro DIAN</h4>
                <p className="text-primary/80 text-sm">
                  Organización sin ánimo de lucro registrada
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Certificación ICBF</h4>
                <p className="text-primary/80 text-sm">
                  Entidad de utilidad común reconocida
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">Premio Solidario</h4>
                <p className="text-primary/80 text-sm">
                  Reconocimiento por impacto social 2023
                </p>
              </div>
            </div>
          </div>

          {/* Contact for More Info */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas más información?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Estamos comprometidos con la transparencia total. Si necesitas información 
              adicional sobre nuestros procesos, finanzas o impacto, no dudes en contactarnos.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Solicitar Información
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
