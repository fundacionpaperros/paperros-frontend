import Link from 'next/link';

export default function LoQueHacemos() {
  return (
    <div className="bg-secondary">
      {/* Hero minimalista */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Lo que hacemos
          </h1>
          <div className="w-16 h-1 bg-accent-orange mx-auto"></div>
        </div>
      </section>

      {/* Grid de secciones con imágenes de fondo */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Transformando la cultura */}
          <div className="relative rounded-3xl overflow-hidden mb-8 group h-[550px] md:h-[500px]">
            <img 
              src="/Transformando la cultura de la tenencia responsable.jpg" 
              alt="Transformando la cultura de la tenencia responsable de mascotas" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-primary/90 via-primary/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-end">
              <div className="p-4 md:p-12 w-full md:max-w-2xl">
                <div className="bg-secondary rounded-2xl p-5 md:p-8 shadow-xl text-center md:text-right">
                  <div className="inline-block bg-accent-orange px-4 py-1 rounded-full text-sm font-semibold text-secondary mb-3 md:mb-4">
                    Educación
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 md:mb-4 leading-tight">
                    Transformando la cultura de la tenencia responsable de mascotas
                  </h2>
                  <p className="text-primary text-base md:text-lg leading-relaxed">
                    Promovemos la tenencia responsable como un acto de amor y compromiso. 
                    Acompañamos a los tutores para fortalecer el vínculo con sus peludos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Transformando vidas con amor */}
            <div className="relative rounded-3xl overflow-hidden group h-[400px]">
              <img 
                src="/Transformando vidas con amor.jpg" 
                alt="Transformando vidas con amor" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-secondary rounded-2xl p-5 shadow-xl">
                  <div className="inline-block bg-accent-green px-4 py-1 rounded-full text-sm font-semibold text-secondary mb-3">
                    Rescate
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
                    Transformando vidas con amor
                  </h2>
                  <p className="text-primary text-sm md:text-base leading-relaxed">
                    Acompañamos a los perros adultos de los albergues en sus procesos de adaptación, 
                    ayudándolos a recuperar la confianza.
                  </p>
                </div>
              </div>
            </div>

            {/* Un compromiso de por vida */}
            <div className="relative rounded-3xl overflow-hidden group h-[400px]">
              <img 
                src="/Un compromiso de por vida.png" 
                alt="Un compromiso de por vida" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-secondary rounded-2xl p-5 shadow-xl">
                  <div className="inline-block bg-accent-blue px-4 py-1 rounded-full text-sm font-semibold text-secondary mb-3">
                    Adopción
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
                    Un compromiso de por vida
                  </h2>
                  <p className="text-primary text-sm md:text-base leading-relaxed">
                    Adoptar es un acto de amor, no de impulso. El vínculo crece con paciencia, 
                    respeto y ternura.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prevención y Compasión - Ancho completo */}
          <div className="relative rounded-3xl overflow-hidden group h-[550px] md:h-[500px]">
            <img 
              src="/Prevención y compasión.jpeg" 
              alt="Prevención y Compasión" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-start">
              <div className="p-4 md:p-12 w-full md:max-w-2xl">
                <div className="bg-secondary rounded-2xl p-5 md:p-8 shadow-xl text-center md:text-left">
                  <div className="inline-block bg-accent-orange px-4 py-1 rounded-full text-sm font-semibold text-secondary mb-3 md:mb-4">
                    Esterilización
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 md:mb-4 leading-tight">
                    Prevención y Compasión
                  </h2>
                  <p className="text-primary text-base md:text-lg leading-relaxed">
                    Promovemos la esterilización como un acto de responsabilidad. 
                    Prevenimos la sobrepoblación y reducimos el abandono.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            ¿Quieres ser parte del cambio?
          </h2>
          <p className="text-xl mb-8 text-secondary">
            Únete a nuestra misión de promover el bienestar animal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/adopta"
              className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
            >
              Adoptar Ahora
            </Link>
            <Link 
              href="/contacto"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-secondary hover:text-primary transition-colors duration-200"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
