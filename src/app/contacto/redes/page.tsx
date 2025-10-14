import Image from 'next/image';

export default function Redes() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encuéntranos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Síguenos en nuestras redes sociales y mantente al día con nuestra labor
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Nuestras Redes Sociales
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Mantente conectado con nosotros y sigue las historias de transformación 
              de los animales que ayudamos. Cada like, compartir y comentario nos ayuda 
              a llegar a más personas.
            </p>
          </div>

          {/* Social Media Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">📷</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Instagram</h3>
              <p className="text-primary/80 mb-6">
                @fundacionpaperros
              </p>
              <p className="text-primary/70 text-sm mb-6">
                Fotos y videos de nuestros animales, historias de adopción exitosas 
                y contenido educativo sobre tenencia responsable.
              </p>
              <a 
                href="https://instagram.com/fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 inline-block"
              >
                Seguir
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">🎵</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">TikTok</h3>
              <p className="text-primary/80 mb-6">
                fundacionpaperros
              </p>
              <p className="text-primary/70 text-sm mb-6">
                Videos cortos y divertidos de nuestros animales, consejos rápidos 
                de cuidado y momentos tiernos de rehabilitación.
              </p>
              <a 
                href="https://tiktok.com/@fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 inline-block"
              >
                Seguir
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">📘</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Facebook</h3>
              <p className="text-primary/80 mb-6">
                Fundación Pa Perros
              </p>
              <p className="text-primary/70 text-sm mb-6">
                Eventos, noticias, historias completas de adopción y comunidad 
                de adoptantes y voluntarios.
              </p>
              <a 
                href="https://facebook.com/fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
              >
                Seguir
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">📺</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">YouTube</h3>
              <p className="text-primary/80 mb-6">
                Fundación Pa Perros
              </p>
              <p className="text-primary/70 text-sm mb-6">
                Videos educativos, documentales de rescates, tutoriales de cuidado 
                y charlas completas sobre bienestar animal.
              </p>
              <a 
                href="https://youtube.com/@fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 inline-block"
              >
                Suscribirse
              </a>
            </div>
          </div>

          {/* Content Types */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              ¿Qué Encontrarás en Nuestras Redes?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📸</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Historias de Rescate</h4>
                <p className="text-primary/80 text-sm">
                  Seguimiento completo del proceso de rescate, rehabilitación y adopción 
                  de nuestros animales.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Contenido Educativo</h4>
                <p className="text-primary/80 text-sm">
                  Tips de cuidado, señales de bienestar animal, prevención de maltrato 
                  y tenencia responsable.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Eventos y Actividades</h4>
                <p className="text-primary/80 text-sm">
                  Información sobre jornadas de esterilización, charlas educativas, 
                  eventos de adopción y actividades comunitarias.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Testimonios</h4>
                <p className="text-primary/80 text-sm">
                  Historias de familias adoptantes, voluntarios y personas que han 
                  sido impactadas por nuestra labor.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📢</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Urgencias</h4>
                <p className="text-primary/80 text-sm">
                  Alertas sobre animales en situación de emergencia que necesitan 
                  ayuda inmediata o hogares temporales.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Campañas</h4>
                <p className="text-primary/80 text-sm">
                  Campañas de donación, adopción simbólica, apadrinamiento y 
                  otras formas de apoyar nuestra misión.
                </p>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Impacto en Redes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">5K+</h4>
                <p className="text-accent-orange font-semibold">Seguidores Instagram</p>
                <p className="text-primary/80 text-sm">Comunidad activa</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">2K+</h4>
                <p className="text-accent-blue font-semibold">Seguidores TikTok</p>
                <p className="text-primary/80 text-sm">Crecimiento rápido</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">3K+</h4>
                <p className="text-accent-green font-semibold">Me Gusta Facebook</p>
                <p className="text-primary/80 text-sm">Comunidad local</p>
              </div>
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">1K+</h4>
                <p className="text-accent-orange font-semibold">Suscriptores YouTube</p>
                <p className="text-primary/80 text-sm">Contenido educativo</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¡Síguenos y sé parte del cambio!
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Cada like, compartir y comentario nos ayuda a llegar a más personas 
              y crear conciencia sobre el bienestar animal. Tu apoyo digital es muy valioso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://instagram.com/fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                Instagram
              </a>
              <a 
                href="https://tiktok.com/@fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                TikTok
              </a>
              <a 
                href="https://facebook.com/fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Facebook
              </a>
              <a 
                href="https://youtube.com/@fundacionpaperros"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
