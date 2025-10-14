import Image from 'next/image';

export default function Dona() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dona
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Tu donación transforma vidas y construye un mundo mejor para los animales
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
                Cada donación hace la diferencia
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                Con tu apoyo podemos seguir rescatando, rehabilitando y encontrando hogares 
                para animales que han sufrido abandono. Cada peso que donas se convierte 
                en atención veterinaria, alimentación, medicamentos y amor para nuestros peludos.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Tu generosidad nos permite mantener nuestros programas de esterilización, 
                educación comunitaria y rehabilitación de animales con necesidades especiales.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 13.png"
                  alt="Donaciones"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Donation Options */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Formas de Donar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">💳</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">Transferencia Bancaria</h4>
                <p className="text-primary/80 mb-6">
                  Realiza tu donación directamente a nuestra cuenta bancaria
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="bg-accent-orange/10 p-3 rounded-lg">
                    <p className="font-semibold text-primary">Banco: Bancolombia</p>
                    <p className="text-primary/80">Cuenta: 123-456789-01</p>
                    <p className="text-primary/80">A nombre de: Fundación Pa&apos; Perros</p>
                  </div>
                </div>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Copiar Datos
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">📱</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">Pago Móvil</h4>
                <p className="text-primary/80 mb-6">
                  Donación rápida y segura desde tu celular
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="bg-accent-blue/10 p-3 rounded-lg">
                    <p className="font-semibold text-primary">Número: 300-123-4567</p>
                    <p className="text-primary/80">Referencia: Donación Pa&apos; Perros</p>
                    <p className="text-primary/80">Cédula: 900.123.456-7</p>
                  </div>
                </div>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Ver Instrucciones
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌐</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">Donación Online</h4>
                <p className="text-primary/80 mb-6">
                  Donación segura a través de nuestra plataforma online
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="bg-accent-green/10 p-3 rounded-lg">
                    <p className="font-semibold text-primary">Procesamiento seguro</p>
                    <p className="text-primary/80">Tarjetas de crédito y débito</p>
                    <p className="text-primary/80">Recibo inmediato</p>
                  </div>
                </div>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Donar Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Donation Amounts */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Montos Sugeridos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center border-2 border-accent-orange">
                <h4 className="text-3xl font-bold text-primary mb-2">$25.000</h4>
                <p className="text-accent-orange font-semibold mb-4">Alimentación Básica</p>
                <p className="text-primary/80 text-sm mb-4">
                  Cubre la alimentación de un animal por una semana
                </p>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Donar
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">$50.000</h4>
                <p className="text-accent-blue font-semibold mb-4">Vacunación</p>
                <p className="text-primary/80 text-sm mb-4">
                  Vacuna completa para un animal rescatado
                </p>
                <button className="w-full bg-accent-blue text-white py-2 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors duration-200">
                  Donar
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">$100.000</h4>
                <p className="text-accent-green font-semibold mb-4">Esterilización</p>
                <p className="text-primary/80 text-sm mb-4">
                  Esterilización gratuita para una familia necesitada
                </p>
                <button className="w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors duration-200">
                  Donar
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">$200.000</h4>
                <p className="text-accent-orange font-semibold mb-4">Rehabilitación</p>
                <p className="text-primary/80 text-sm mb-4">
                  Proceso completo de rehabilitación de un animal
                </p>
                <button className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                  Donar
                </button>
              </div>
            </div>
          </div>

          {/* What Your Donation Covers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              ¿En qué se usa tu donación?
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">Atención Veterinaria (40%)</h4>
                  <ul className="space-y-2 text-primary/80">
                    <li>• Consultas médicas</li>
                    <li>• Cirugías de esterilización</li>
                    <li>• Vacunaciones</li>
                    <li>• Medicamentos</li>
                    <li>• Tratamientos especializados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">Alimentación (20%)</h4>
                  <ul className="space-y-2 text-primary/80">
                    <li>• Alimento balanceado</li>
                    <li>• Suplementos nutricionales</li>
                    <li>• Alimentación especial</li>
                    <li>• Tratamiento para desnutrición</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">Programas Educativos (25%)</h4>
                  <ul className="space-y-2 text-primary/80">
                    <li>• Charlas comunitarias</li>
                    <li>• Material didáctico</li>
                    <li>• Capacitaciones</li>
                    <li>• Campañas de sensibilización</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4">Administración (15%)</h4>
                  <ul className="space-y-2 text-primary/80">
                    <li>• Gastos operativos</li>
                    <li>• Transporte</li>
                    <li>• Comunicaciones</li>
                    <li>• Infraestructura</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Impacto de las Donaciones
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

          {/* Other Ways to Help */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Otras Formas de Ayudar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Donaciones en Especie</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Alimento, medicamentos, juguetes, cobijas y otros elementos que necesitamos
                </p>
                  <a 
                    href="/contacto/escribenos"
                    className="text-accent-orange hover:text-accent-orange/80 font-semibold"
                  >
                    Ver Lista de Necesidades →
                  </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Voluntariado</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Dona tu tiempo y habilidades para ayudar directamente a nuestros animales
                </p>
                <a 
                  href="/contacto/voluntario"
                  className="text-accent-blue hover:text-accent-blue/80 font-semibold"
                >
                  Ser Voluntario →
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📢</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Difusión</h4>
                <p className="text-primary/80 text-sm mb-4">
                  Comparte nuestra labor en redes sociales y ayuda a crear conciencia
                </p>
                <a 
                  href="/contacto/redes"
                  className="text-accent-green hover:text-accent-green/80 font-semibold"
                >
                  Seguir en Redes →
                </a>
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
              Tu generosidad es la esperanza de muchos animales que buscan una segunda oportunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200">
                Donar Ahora
              </button>
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
