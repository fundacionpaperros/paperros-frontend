import Image from 'next/image';

export default function Esterilizacion() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Programas de Esterilización
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Promovemos la esterilización como un acto de responsabilidad y compasión
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
                Un acto de responsabilidad y compasión
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Pa Perros promovemos la esterilización en estratos 0, 1, 2 y en zona rural, 
                como un acto de responsabilidad y compasión. Con ella prevenimos la sobrepoblación, 
                reducimos el abandono y ayudamos a que menos animales sufran en las calles, 
                construyendo así comunidades más sanas y solidarias con la vida.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Nuestros programas de esterilización son completamente gratuitos y están dirigidos 
                a familias de escasos recursos que desean ser responsables con sus mascotas.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 13.png"
                  alt="Programas de esterilización"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Beneficios de la Esterilización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚫</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Control de Población</h4>
                <p className="text-primary/80 text-sm">
                  Previene la sobrepoblación de animales callejeros y reduce el abandono
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Mejor Salud</h4>
                <p className="text-primary/80 text-sm">
                  Reduce el riesgo de cáncer y enfermedades del sistema reproductivo
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Comportamiento</h4>
                <p className="text-primary/80 text-sm">
                  Reduce comportamientos agresivos y de marcaje territorial
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Ahorro</h4>
                <p className="text-primary/80 text-sm">
                  Evita costos futuros de camadas no deseadas y cuidados veterinarios
                </p>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestros Programas de Esterilización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🏘️</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4 text-center">
                  Esterilización Urbana
                </h4>
                <p className="text-primary/80 mb-6">
                  Programas dirigidos a familias de estratos 0, 1 y 2 en zonas urbanas de Manizales. 
                  Realizamos jornadas en barrios y comunidades con mayor necesidad.
                </p>
                <ul className="text-primary/70 space-y-2 mb-6">
                  <li>• Jornadas mensuales en diferentes barrios</li>
                  <li>• Servicio completamente gratuito</li>
                  <li>• Atención veterinaria especializada</li>
                  <li>• Seguimiento post-operatorio</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-orange text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Estratos 0, 1, 2
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌾</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4 text-center">
                  Esterilización Rural
                </h4>
                <p className="text-primary/80 mb-6">
                  Programas especiales para zonas rurales del departamento de Caldas. 
                  Llevamos nuestros servicios a veredas y corregimientos donde el acceso 
                  a servicios veterinarios es limitado.
                </p>
                <ul className="text-primary/70 space-y-2 mb-6">
                  <li>• Brigadas rurales trimestrales</li>
                  <li>• Transporte gratuito para familias</li>
                  <li>• Educación sobre tenencia responsable</li>
                  <li>• Atención a perros y gatos</li>
                </ul>
                <div className="text-center">
                  <span className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Zona Rural
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Proceso de Esterilización
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Registro</h4>
                  <p className="text-primary/80 text-sm">
                    Inscripción previa con documentos de identificación y comprobante de estrato
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Evaluación</h4>
                  <p className="text-primary/80 text-sm">
                    Examen veterinario para verificar que el animal esté en condiciones óptimas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Cirugía</h4>
                  <p className="text-primary/80 text-sm">
                    Procedimiento quirúrgico realizado por veterinarios especializados
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">Seguimiento</h4>
                  <p className="text-primary/80 text-sm">
                    Control post-operatorio y recomendaciones para el cuidado en casa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              Nuestro Impacto en Esterilización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">120+</h4>
                <p className="text-accent-orange font-semibold">Animales Esterilizados</p>
                <p className="text-primary/80 text-sm">Este año</p>
              </div>
              <div className="bg-accent-blue/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">15+</h4>
                <p className="text-accent-blue font-semibold">Jornadas Realizadas</p>
                <p className="text-primary/80 text-sm">En diferentes barrios</p>
              </div>
              <div className="bg-accent-green/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">8+</h4>
                <p className="text-accent-green font-semibold">Veredas Atendidas</p>
                <p className="text-primary/80 text-sm">En zona rural</p>
              </div>
              <div className="bg-accent-orange/10 rounded-2xl p-6 text-center">
                <h4 className="text-4xl font-bold text-primary mb-2">95%</h4>
                <p className="text-accent-orange font-semibold">Tasa de Éxito</p>
                <p className="text-primary/80 text-sm">Sin complicaciones</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres esterilizar a tu mascota?
            </h3>
            <p className="text-secondary/80 mb-6 max-w-2xl mx-auto">
              Si cumples con los requisitos de estrato, puedes inscribir a tu mascota 
              en nuestros próximos programas de esterilización gratuita.
            </p>
            <a 
              href="/contacto/escribenos"
              className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
            >
              Inscribir Mascota
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
