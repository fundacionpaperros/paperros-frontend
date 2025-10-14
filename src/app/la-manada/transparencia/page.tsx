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
              Nuestro compromiso con la transparencia y el impacto medible
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Nuestro Impacto en Números
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Cada campaña, cada acción, cada vida transformada cuenta. Aquí puedes ver el impacto real de nuestro trabajo.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Esterilizaciones */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">✂️</span>
              </div>
              <h3 className="text-4xl font-bold text-accent-orange mb-2">120+</h3>
              <h4 className="text-xl font-bold text-primary mb-4">Mascotas Esterilizadas</h4>
              <p className="text-primary/80">
                Prevención de sobrepoblación y mejora de la calidad de vida
              </p>
            </div>

            {/* Desparasitaciones */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">💊</span>
              </div>
              <h3 className="text-4xl font-bold text-accent-blue mb-2">300+</h3>
              <h4 className="text-xl font-bold text-primary mb-4">Animales Desparasitados</h4>
              <p className="text-primary/80">
                Cuidado preventivo y mejora de la salud animal
              </p>
            </div>

            {/* Charlas Educativas */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-4xl font-bold text-accent-green mb-2">850+</h3>
              <h4 className="text-xl font-bold text-primary mb-4">Niños en Charlas</h4>
              <p className="text-primary/80">
                Educación en tenencia responsable desde la infancia
              </p>
            </div>

            {/* Capacitaciones */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">👮‍♂️</span>
              </div>
              <h3 className="text-4xl font-bold text-accent-orange mb-2">300+</h3>
              <h4 className="text-xl font-bold text-primary mb-4">Auxiliares y Profesionales Capacitados</h4>
              <p className="text-primary/80">
                Policía Metropolitana de Manizales y otros profesionales
              </p>
            </div>

            {/* Emprendimientos */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-4xl font-bold text-accent-blue mb-2">25+</h3>
              <h4 className="text-xl font-bold text-primary mb-4">Emprendimientos de Mascotas Apoyados</h4>
              <p className="text-primary/80">
                Fomento del emprendimiento en el sector animal
              </p>
            </div>

            {/* Campañas */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="text-4xl font-bold text-accent-green mb-2">10+</h3>
              <h4 className="text-xl font-bold text-primary mb-4">Campañas de Tenencia Responsable</h4>
              <p className="text-primary/80">
                En centros comerciales y espacios públicos
              </p>
            </div>
          </div>

          {/* Financial Transparency */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Transparencia Financiera
            </h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="text-2xl font-bold text-accent-orange mb-2">85%</h4>
                  <p className="text-primary font-semibold mb-2">Programas Directos</p>
                  <p className="text-primary/80 text-sm">
                    Esterilizaciones, rescates, rehabilitación y adopciones
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-accent-blue mb-2">10%</h4>
                  <p className="text-primary font-semibold mb-2">Educación y Capacitación</p>
                  <p className="text-primary/80 text-sm">
                    Charlas, talleres y programas de sensibilización
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-accent-green mb-2">5%</h4>
                  <p className="text-primary font-semibold mb-2">Administración</p>
                  <p className="text-primary/80 text-sm">
                    Gastos operativos y administrativos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Informes y Reportes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Informe Anual 2024</h4>
                <p className="text-primary/80 text-center mb-6">
                  Resumen completo de nuestras actividades, logros y uso de recursos
                </p>
                <button className="w-full bg-accent-orange text-white py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Descargar PDF
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 text-center">Reporte de Impacto</h4>
                <p className="text-primary/80 text-center mb-6">
                  Métricas detalladas de nuestro impacto social y ambiental
                </p>
                <button className="w-full bg-accent-blue text-white py-3 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Ver Reporte
                </button>
              </div>
            </div>
          </div>

          {/* Contact for More Info */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas más información?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Estamos comprometidos con la transparencia total. Si necesitas información adicional 
              sobre nuestros programas, financiación o impacto, no dudes en contactarnos.
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