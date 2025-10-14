import Image from 'next/image';

export default function NuestraHistoria() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nuestra Historia
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              En Pa Perros creemos que cada vida merece una segunda oportunidad
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
                Nacimos para transformar vidas
              </h2>
              <p className="text-lg text-primary/80 leading-relaxed">
                En Pa Perros creemos que cada vida merece una segunda oportunidad. Nacimos para cuidar, 
                proteger y transformar la historia de los animales que han sufrido el abandono o la indiferencia. 
                Nuestra labor impulsa el fortalecimiento de otras fundaciones y grupos que, como nosotros, 
                rescatan, rehabilitan y promueven la adopción responsable.
              </p>
              <p className="text-lg text-primary/80 leading-relaxed">
                Contamos con un equipo interdisciplinario lleno de corazón, alianzas que multiplican el impacto 
                y una red de manos solidarias que hacen posible nuestro propósito: crear un mundo más justo, 
                compasivo y feliz para todos los animales.
              </p>
            </div>
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src="/image 13.png"
                  alt="Fundación Pa' Perros"
                  width={500}
                  height={400}
                  className="object-cover rounded-2xl w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-accent-orange/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Misión</h3>
              <p className="text-primary/80 leading-relaxed">
                Promover la adopción responsable y el bienestar animal a través de la educación, 
                el acompañamiento y la creación de una red solidaria que transforme la cultura 
                de tenencia de mascotas en Colombia.
              </p>
            </div>
            <div className="bg-accent-blue/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Visión</h3>
              <p className="text-primary/80 leading-relaxed">
                Ser la fundación líder en Colombia en la promoción de la adopción responsable, 
                creando un mundo donde todos los animales tengan acceso a una vida digna, 
                llena de amor y cuidado.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Compasión</h3>
                <p className="text-primary/80">
                  Tratamos a cada animal con el amor y respeto que merece
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Solidaridad</h3>
                <p className="text-primary/80">
                  Trabajamos en equipo para multiplicar nuestro impacto
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🌟</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Excelencia</h3>
                <p className="text-primary/80">
                  Buscamos la mejor calidad en todos nuestros procesos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
