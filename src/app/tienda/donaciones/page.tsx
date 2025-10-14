export default function Donaciones() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Donaciones y Apadrinamientos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Tu contribución hace posible nuestro trabajo por el bienestar animal
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
                Tu Apoyo Transforma Vidas
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Cada donación nos permite continuar con nuestra misión de promover la adopción responsable, 
                brindar cuidado a animales rescatados y educar a la comunidad sobre el bienestar animal.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Con tu apoyo podemos esterilizar más mascotas, rescatar más animales y llegar a más personas 
                con nuestro mensaje de amor y responsabilidad hacia los animales.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-accent-orange rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">💝</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Methods */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Formas de Donar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bank Transfer */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-4">Transferencia Bancaria</h4>
                <div className="space-y-3">
                  <div className="bg-accent-orange/10 p-4 rounded-lg">
                    <p className="font-semibold text-primary">Banco: Bancolombia</p>
                    <p className="text-primary/80">Cuenta: 123-456789-01</p>
                    <p className="text-primary/80">A nombre de: Fundación Pa&apos; Perros</p>
                    <p className="text-primary/80">NIT: 900.123.456-7</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Copiar Datos
                </button>
              </div>

              {/* Mobile Payment */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-primary mb-4">Pago Móvil</h4>
                <div className="space-y-3">
                  <div className="bg-accent-blue/10 p-4 rounded-lg">
                    <p className="font-semibold text-primary">Número: 300-123-4567</p>
                    <p className="text-primary/80">Referencia: Donación Pa&apos; Perros</p>
                    <p className="text-primary/80">Cédula: 900.123.456-7</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Ver Instrucciones
                </button>
              </div>
            </div>
          </div>

          {/* Sponsorship Form */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Formulario de Apadrinamiento
            </h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">📝</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">Formulario de Apadrinamiento</h4>
              <p className="text-primary/80 mb-6">
                Completa nuestro formulario para apadrinar un animal específico o contribuir a nuestros programas
              </p>
              <a 
                href="https://forms.gle/S9ZeuoJP4yuX6MVg6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200 inline-block"
              >
                Completar Formulario
              </a>
            </div>
          </div>

          {/* Impact of Donations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Impacto de tus Donaciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✂️</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-orange mb-2">$50.000</h4>
                <p className="text-primary font-semibold">Esterilización</p>
                <p className="text-primary/80 text-sm mt-2">Cubre el costo de una esterilización</p>
              </div>

              <div className="bg-accent-blue/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-blue mb-2">$100.000</h4>
                <p className="text-primary font-semibold">Atención Veterinaria</p>
                <p className="text-primary/80 text-sm mt-2">Cubre consulta y medicamentos</p>
              </div>

              <div className="bg-accent-green/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🍖</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-green mb-2">$30.000</h4>
                <p className="text-primary font-semibold">Alimentación</p>
                <p className="text-primary/80 text-sm mt-2">Alimenta un animal por un mes</p>
              </div>

              <div className="bg-accent-orange/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="text-2xl font-bold text-accent-orange mb-2">$200.000</h4>
                <p className="text-primary font-semibold">Charla Educativa</p>
                <p className="text-primary/80 text-sm mt-2">Financia una charla en colegio</p>
              </div>
            </div>
          </div>

          {/* Monthly Sponsorship */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Apadrinamiento Mensual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <h4 className="text-xl font-bold text-primary mb-4">Apadrinamiento Básico</h4>
                <div className="text-3xl font-bold text-accent-orange mb-4">$50.000</div>
                <p className="text-primary/80 text-sm mb-6">mensual</p>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-orange">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-orange">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-orange">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                </ul>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Apadrinar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-accent-blue">
                <div className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Más Popular
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">Apadrinamiento Completo</h4>
                <div className="text-3xl font-bold text-accent-blue mb-4">$100.000</div>
                <p className="text-primary/80 text-sm mb-6">mensual</p>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-blue">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-blue">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-blue">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                </ul>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Apadrinar
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <h4 className="text-xl font-bold text-primary mb-4">Apadrinamiento Premium</h4>
                <div className="text-3xl font-bold text-accent-green mb-4">$200.000</div>
                <p className="text-primary/80 text-sm mb-6">mensual</p>
                <ul className="space-y-2 text-left mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green">✓</span>
                    <span className="text-primary/80 text-sm">Lorem ipsum dolor sit amet</span>
                  </li>
                </ul>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Apadrinar
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Tienes preguntas sobre las donaciones?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Si necesitas más información sobre cómo donar o sobre el uso de los recursos, 
              no dudes en contactarnos. Estamos aquí para ayudarte.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}