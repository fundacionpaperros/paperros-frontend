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
              Síguenos en nuestras redes sociales y mantente al día con nuestro trabajo
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Media Links */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestras Redes Sociales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Instagram */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📷</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Instagram</h3>
                <p className="text-primary/80 mb-6">@fundacionpaperros</p>
                <a 
                  href="https://instagram.com/fundacionpaperros" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 inline-block"
                >
                  Seguir
                </a>
              </div>

              {/* TikTok */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎵</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">TikTok</h3>
                <p className="text-primary/80 mb-6">fundacionpaperros</p>
                <a 
                  href="https://tiktok.com/@fundacionpaperros" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 inline-block"
                >
                  Seguir
                </a>
              </div>

              {/* Facebook */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Facebook</h3>
                <p className="text-primary/80 mb-6">Fundación Pa Perros</p>
                <a 
                  href="https://facebook.com/fundacionpaperros" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
                >
                  Seguir
                </a>
              </div>

              {/* YouTube */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📺</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">YouTube</h3>
                <p className="text-primary/80 mb-6">Fundación Pa Perros</p>
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
          </div>

          {/* Content Types */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              ¿Qué Encontrarás en Nuestras Redes?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📸</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Historias de Éxito</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🎥</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Videos Educativos</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Eventos y Actividades</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🐕</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Animales en Adopción</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Consejos de Cuidado</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Comunidad</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestra Comunidad Digital
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-orange mb-2">5K+</h4>
                <p className="text-primary font-semibold">Seguidores en Instagram</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-blue mb-2">3K+</h4>
                <p className="text-primary font-semibold">Me Gusta en Facebook</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-green mb-2">2K+</h4>
                <p className="text-primary font-semibold">Suscriptores en YouTube</p>
              </div>
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <h4 className="text-4xl font-bold text-accent-orange mb-2">1K+</h4>
                <p className="text-primary font-semibold">Seguidores en TikTok</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Mantente Informado
              </h3>
              <p className="text-primary/80 mb-6 max-w-2xl mx-auto">
                Suscríbete a nuestro boletín para recibir actualizaciones sobre nuestros programas, 
                eventos y historias de éxito directamente en tu correo.
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                />
                <button className="bg-accent-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres ser parte de nuestra comunidad?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Síguenos en nuestras redes sociales para estar al día con nuestro trabajo, 
              participar en nuestras actividades y ser parte de la transformación del bienestar animal en Colombia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://instagram.com/fundacionpaperros" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Instagram
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
                href="https://tiktok.com/@fundacionpaperros" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}