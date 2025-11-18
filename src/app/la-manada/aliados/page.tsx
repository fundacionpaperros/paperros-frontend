export default function Aliados() {
  const aliados = [
    {
      nombre: 'Universidad Autónoma de Manizales',
      subtitulo: 'Paz y Competitividad',
      enlace: 'https://www.autonoma.edu.co/proyeccion/paz-y-competitividad',
      tipoEnlace: 'web',
      imagen: '/UAM.jpg',
    },
    {
      nombre: 'Universidad de Caldas',
      subtitulo: 'Vicerrectoría de Proyección',
      enlace: 'https://viceproyeccion.ucaldas.edu.co/',
      tipoEnlace: 'web',
      imagen: '/logoCaldas.png',
    },
    {
      nombre: 'Latimos Bocalán',
      enlace: 'https://latimosbocalan.org/',
      tipoEnlace: 'web',
      imagen: '/latimoBocalan.png',
    },
    {
      nombre: 'EtoLógica',
      enlace: 'https://instagram.com/eto_logica',
      tipoEnlace: 'instagram',
      imagen: '/etologica.jpg',
    },
    {
      nombre: 'Secretaría de Medio Ambiente',
      imagen: '/logoMzl.png',
    },
    {
      nombre: 'Secretaría de Agricultura',
      imagen: '/logoMzl.png',
    },
    {
      nombre: 'Veterinaria Golden Vet',
      imagen: '/goldenVet.jpg',
    },
    {
      nombre: 'Veterinaria San Miguel',
      imagen: '/sanMiguel.jpg',
    },
  ];

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              Aliados y Patrocinadores
            </h1>
            <div className="w-24 h-1 bg-accent-orange mx-auto mb-6"></div>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Organizaciones que comparten nuestra visión y nos ayudan a multiplicar nuestro impacto
            </p>
          </div>
        </div>
      </section>

      {/* Allies Section */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {aliados.map((aliado, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {/* Imagen del aliado */}
                <div className="w-full h-40 mb-4 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden">
                  {aliado.imagen ? (
                    <img
                      src={aliado.imagen}
                      alt={aliado.nombre}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center px-4">
                      Imagen del aliado
                    </span>
                  )}
                </div>

                {/* Nombre */}
                <h3 className="text-lg font-bold text-primary mb-2 text-center">
                  {aliado.nombre}
                </h3>

                {/* Subtítulo si existe */}
                {aliado.subtitulo && (
                  <p className="text-sm text-primary/70 mb-4 text-center">
                    {aliado.subtitulo}
                  </p>
                )}

                {/* Enlace si existe */}
                {aliado.enlace && (
                  <div className="mt-4">
                    <a
                      href={aliado.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                        aliado.tipoEnlace === 'instagram'
                          ? 'bg-accent-blue text-white hover:bg-accent-blue/90'
                          : 'bg-accent-orange text-white hover:bg-accent-orange/90'
                      }`}
                    >
                      {aliado.tipoEnlace === 'instagram' ? 'Ver Instagram' : 'Visitar Sitio Web'}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Join as Ally CTA */}
          <div className="bg-primary text-secondary rounded-lg p-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Quieres ser nuestro aliado?
              </h3>
              <p className="text-secondary/90 mb-6 text-lg">
                Si tu organización comparte nuestra visión y quiere contribuir al bienestar animal, 
                contáctanos para explorar oportunidades de colaboración.
              </p>
              <a
                href="/contacto/escribenos"
                className="bg-accent-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}