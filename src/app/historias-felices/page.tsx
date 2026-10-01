import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Historias felices — Adopciones que transforman vidas',
  description: 'Historias reales de adopción responsable acompañadas por la Fundación Pa\' Perros en Colombia.',
  alternates: { canonical: 'https://www.fundacionpaperros.com/historias-felices' },
  openGraph: {
    title: "Historias felices — Fundación Pa' Perros",
    description: 'Cada adopción exitosa es una historia de amor y segundas oportunidades.',
    url: 'https://www.fundacionpaperros.com/historias-felices',
  },
};

export default function HistoriasFelices() {
  return (
    <div className="bg-secondary">
      {/* Hero minimalista */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Historias Felices
          </h1>
          <p className="text-lg text-primary max-w-3xl mx-auto">
            Cada adopción exitosa es una historia de amor, esperanza y segundas oportunidades que nos inspira a seguir adelante
          </p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      <section className="pb-20 bg-secondary text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Historia 1 - Samy y Perla Giraldo */}
            <div className="relative rounded-3xl overflow-hidden group h-[400px] md:h-[500px]">
              <img
                src="/Perla y Samy.jpeg"
                alt="Perla y Samy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-accent-orange">Samy y Perla Giraldo</h3>
                <p className="text-secondary/90 leading-relaxed text-sm md:text-base mb-4">
                  &ldquo;Samy llegó de Cartagena, luego de que su dueño le pegó un machetazo, y yo la conocí en la Fundación Huella Amiga.
                  Ella estaba en proceso de adopción, pero supongo que por la falta de su manito, no la adoptaron.
                  Entonces yo decidí adoptarla.&rdquo;
                </p>
                <div className="inline-block bg-accent-orange/30 backdrop-blur-sm rounded-lg px-4 py-2 border-l-4 border-accent-orange">
                  <p className="text-sm text-secondary font-medium">- Perla Giraldo</p>
                </div>
              </div>
            </div>

            {/* Historia 2 - Monstro y Camilo Bravo */}
            <div className="relative rounded-3xl overflow-hidden group h-[500px] md:h-[650px]">
              <img
                src="/Camilo y Monstro.jpg"
                alt="Camilo y Monstro"
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute top-0 right-0 p-8 md:p-12 max-w-xl text-right">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-accent-blue">Monstro y Camilo Bravo</h3>
                <p className="text-secondary/90 leading-relaxed text-sm md:text-base mb-4">
                  &ldquo;Desde las ausencias de mis viejos he sufrido de depresión. Pero desde que Monstro llegó a mi vida,
                  a mitad de la pandemia, se volvió un perro sanador. Yo lo adopté de una Fundación en Bogotá,
                  cuando tenía un mes. Encontraron a la mamá muerta con 3 hermanitos.&rdquo;
                </p>
                <div className="inline-block bg-accent-blue/30 backdrop-blur-sm rounded-lg px-4 py-2 border-r-4 border-accent-blue">
                  <p className="text-sm text-secondary font-medium">- Camilo Bravo</p>
                </div>
              </div>
            </div>

            {/* Historia 3 - Aby, Lía y Juliana Salazar - Contenedor unificado */}
            <div className="bg-primary rounded-3xl overflow-hidden border border-accent-green/30">
              {/* Imágenes */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Juliana y Lía */}
                <div className="relative overflow-hidden group h-[350px] md:h-[450px]">
                  <img
                    src="/Juliana y Lía.jpeg"
                    alt="Juliana y Lía"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-accent-green">Juliana y Lía</h3>
                  </div>
                </div>

                {/* Juliana y Aby */}
                <div className="relative overflow-hidden group h-[350px] md:h-[450px]">
                  <img
                    src="/Juliana y Aby.jpeg"
                    alt="Juliana y Aby"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-accent-green">Juliana y Aby</h3>
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4 text-accent-green text-center">Aby, Lía y Juliana Salazar</h3>
                <p className="text-secondary/90 leading-relaxed text-center mb-4 max-w-3xl mx-auto">
                  &ldquo;Yo tuve una experiencia traumática en Bogotá, cuando fui atracada y, consecuencia de eso, sufrí graves fracturas.
                  La recuperación física, pero especialmente la emocional, tuve la fortuna de tener dos acompañantes de lujo:
                  Lía y Aby. Ambas rescatadas, ambas con historias tristes, pero con todo el amor para brindarme durante una larga recuperación.
                  Siempre que vengo de Argentina, aprovecho para saludarlas.&rdquo;
                </p>
                <p className="text-center text-accent-green font-medium">- Juliana Salazar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-orange mb-4">
            ¿Quieres ser parte de una historia feliz?
          </h2>
          <p className="text-secondary mb-8">
            Cada día, más animales esperan una segunda oportunidad. Únete a nuestra misión y
            transforma una vida para siempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/adopta"
              className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200"
            >
              Ver Animales Disponibles
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-secondary hover:text-primary transition-colors duration-200"
            >
              Ser Voluntario
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
