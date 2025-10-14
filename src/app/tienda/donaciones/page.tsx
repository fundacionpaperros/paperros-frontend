
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
              Apoya nuestra misión de bienestar animal de diferentes maneras
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Formas de Apoyar
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mx-auto">
              Cada forma de apoyo nos ayuda a seguir transformando vidas y creando 
              un mundo mejor para los animales.
            </p>
          </div>

          {/* Donation Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Donación Única</h3>
              <p className="text-primary/80 mb-6">
                Realiza una donación única para apoyar nuestros programas de rescate y rehabilitación.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-primary/70">$25.000</span>
                  <span className="text-accent-orange font-semibold">Alimentación básica</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">$50.000</span>
                  <span className="text-accent-orange font-semibold">Vacunación completa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">$100.000</span>
                  <span className="text-accent-orange font-semibold">Esterilización</span>
                </div>
              </div>
              <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                Donar Ahora
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-accent-blue">
              <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Donación Recurrente</h3>
              <p className="text-primary/80 mb-6">
                Hazte padrino o madrina con una donación mensual que nos permite planificar mejor.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-primary/70">$30.000/mes</span>
                  <span className="text-accent-blue font-semibold">Apadrinamiento básico</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">$50.000/mes</span>
                  <span className="text-accent-blue font-semibold">Apadrinamiento premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">$100.000/mes</span>
                  <span className="text-accent-blue font-semibold">Apadrinamiento completo</span>
                </div>
              </div>
              <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                Hacerse Padrino
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Donación en Especie</h3>
              <p className="text-primary/80 mb-6">
                Dona alimentos, medicamentos, juguetes u otros elementos que necesitamos.
              </p>
              <div className="space-y-2 mb-6">
                <div className="text-primary/70 text-sm">• Alimento para perros y gatos</div>
                <div className="text-primary/70 text-sm">• Medicamentos veterinarios</div>
                <div className="text-primary/70 text-sm">• Juguetes y accesorios</div>
                <div className="text-primary/70 text-sm">• Materiales de limpieza</div>
              </div>
              <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                Ver Lista de Necesidades
              </button>
            </div>
          </div>

          {/* Bank Information */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Información Bancaria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
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

              <div className="bg-white rounded-lg shadow-lg p-8">
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

          {/* Impact */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Tu Impacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">120+</h4>
                <p className="text-accent-orange font-semibold">Animales Esterilizados</p>
                <p className="text-primary/80 text-sm">Con tu apoyo</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">300+</h4>
                <p className="text-accent-blue font-semibold">Animales Desparasitados</p>
                <p className="text-primary/80 text-sm">Este año</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">50+</h4>
                <p className="text-accent-green font-semibold">Adopciones Exitosas</p>
                <p className="text-primary/80 text-sm">Gracias a tu ayuda</p>
              </div>
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">850+</h4>
                <p className="text-accent-orange font-semibold">Personas Educadas</p>
                <p className="text-primary/80 text-sm">En tenencia responsable</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para hacer la diferencia?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Cada donación, sin importar el monto, nos ayuda a seguir transformando vidas. 
              Tu generosidad es la esperanza de muchos animales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://forms.gle/S9ZeuoJP4yuX6MVg6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
              >
                Formulario de Donación
              </a>
              <a 
                href="/contacto/escribenos"
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-secondary hover:text-primary transition-colors duration-200"
              >
                Contactar para Más Info
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
