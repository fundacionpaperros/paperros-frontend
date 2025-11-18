export default function Voluntario() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              Quiero ser Voluntario
            </h1>
            <div className="w-24 h-1 bg-accent-orange mx-auto mb-6"></div>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto mb-12">
              Únete a nuestro equipo de voluntarios y ayuda a transformar vidas
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-10 shadow-lg text-center">
            <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Formulario de Aplicación
            </h2>
            <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              Completa nuestro formulario para ser parte de nuestro equipo de voluntarios
            </p>
            <a 
              href="https://forms.gle/S9ZeuoJP4yuX6MVg6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Completar Formulario
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}