export default function Escribenos() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Escríbenos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Estamos aquí para ayudarte y responder todas tus preguntas
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Envíanos un Mensaje</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="adopcion">Adopción</option>
                    <option value="donacion">Donación</option>
                    <option value="voluntariado">Voluntariado</option>
                    <option value="servicios">Servicios</option>
                    <option value="charlas">Charlas Educativas</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-orange text-white py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Correo Electrónico</p>
                      <p className="text-primary/80">contacto@fundacionpaperros.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">WhatsApp</p>
                      <p className="text-primary/80">+57 300 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">🕒</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Horarios de Atención</p>
                      <p className="text-primary/80">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-primary/80">Sábados: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-6">Respuesta Rápida</h3>
                <div className="space-y-4">
                  <div className="bg-accent-orange/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">¿Cómo puedo ser voluntario?</h4>
                    <p className="text-primary/80">
                      Puedes contactarnos a través del formulario seleccionando &ldquo;Voluntariado&rdquo; o enviando un email 
                      a voluntarios@fundacionpaperros.com. Trabajamos con albergues aliados y rescatistas.
                    </p>
                  </div>

                  <div className="bg-accent-blue/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">¿Qué diferencia a la Fundación Pa&apos; Perros?</h4>
                    <p className="text-primary/80">
                      A diferencia de un albergue tradicional, nos enfocamos en promover la adopción responsable 
                      y generar conciencia sobre el bienestar animal, transformando la cultura de adopción en Colombia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Preguntas Frecuentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-primary mb-3">¿Cuánto tiempo toma el proceso de adopción?</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-primary mb-3">¿Qué incluye el servicio de paseos?</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-primary mb-3">¿Cómo puedo donar?</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-primary mb-3">¿Ofrecen servicios veterinarios?</h4>
                <p className="text-primary/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas ayuda inmediata?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Si tienes una emergencia con un animal o necesitas ayuda urgente, 
              contáctanos directamente por WhatsApp para una respuesta más rápida.
            </p>
            <a 
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}