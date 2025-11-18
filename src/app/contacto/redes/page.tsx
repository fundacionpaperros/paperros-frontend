export default function Redes() {
  const redes = [
    {
      nombre: 'Instagram',
      usuario: '@fundacionpaperros',
      enlace: 'https://instagram.com/fundacionpaperros',
      color: 'from-purple-500 to-pink-500',
      icono: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      nombre: 'TikTok',
      usuario: 'fundacionpaperros',
      enlace: 'https://tiktok.com/@fundacionpaperros',
      color: 'bg-black',
      icono: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
    },
    {
      nombre: 'Facebook',
      usuario: 'Fundación Pa Perros',
      enlace: 'https://facebook.com/fundacionpaperros',
      color: 'bg-blue-600',
      icono: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      nombre: 'YouTube',
      usuario: 'Fundación Pa Perros',
      enlace: 'https://youtube.com/@fundacionpaperros',
      color: 'bg-red-600',
      icono: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              Encuéntranos
            </h1>
            <div className="w-24 h-1 bg-accent-orange mx-auto mb-6"></div>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Síguenos en nuestras redes sociales y mantente al día con nuestro trabajo
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {redes.map((red, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-200 text-center">
                <div className={`w-20 h-20 ${red.color.includes('from') ? `bg-gradient-to-br ${red.color}` : red.color} rounded-full mx-auto mb-6 flex items-center justify-center text-white`}>
                  {red.icono}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{red.nombre}</h3>
                <p className="text-primary/80 mb-6">{red.usuario}</p>
                <a 
                  href={red.enlace} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${red.color.includes('from') ? `bg-gradient-to-r ${red.color}` : red.color} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 inline-block`}
                >
                  {red.nombre === 'YouTube' ? 'Suscribirse' : 'Seguir'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}