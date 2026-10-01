import type { Metadata } from 'next';
import { whatsappUrl } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Con propósito — Cursos y formación en bienestar animal',
  description: 'Programas educativos de la Fundación Pa\' Perros para formar ciudadanos responsables con los animales en Colombia.',
  alternates: { canonical: 'https://www.fundacionpaperros.com/con-proposito' },
  openGraph: {
    title: "Con propósito — Fundación Pa' Perros",
    description: 'Formación y educación en bienestar y tenencia responsable de animales.',
    url: 'https://www.fundacionpaperros.com/con-proposito',
  },
};

export default function ConProposito() {
  const cursos = [
    { nombre: 'Curso de Primeros Auxilios para perros y gatos', emoji: '🩺', precio: '$350.000', duracion: '16 horas prácticas' },
    { nombre: 'Curso Entendiendo a mi gato', emoji: '🐱', precio: '$900.000', duracion: '46 horas teórico-prácticas' },
    { nombre: 'Curso Escuela de cachorros', emoji: '🐶', precio: '$350.000', duracion: '16 horas prácticas' },
    { nombre: 'Curso Educando a tu perro', emoji: '🎓', precio: '$1.200.000', duracion: '100 horas teórico-prácticas' },
  ];

  const servicios = [
    {
      id: 'ninera',
      titulo: 'Niñera en Casa',
      descripcion: 'Cuidamos a tu mascota en su propio hogar, reduciendo el estrés y brindándoles atención con amor y responsabilidad.',
      color: 'accent-blue',
      bgColor: 'bg-accent-blue',
      icon: '🏠',
      beneficios: ['Reducción del estrés', 'Cuidado personalizado', 'Reportes constantes'],
    },
    {
      id: 'adiestramiento',
      titulo: 'Adiestramiento canino y modificación de conducta',
      descripcion: 'Métodos positivos y respetuosos para una comunicación efectiva con tu perro y una convivencia armoniosa.',
      color: 'accent-orange',
      bgColor: 'bg-accent-orange',
      icon: '🎯',
      beneficios: ['Obediencia básica', 'Entrenamiento avanzado', 'Vínculo fortalecido'],
    },
    {
      id: 'paseos',
      titulo: 'Paseos',
      descripcion: 'Grupos de máximo 6 perros, no se mezcla el tamaño de los peludos, se camina al ritmo del que más lento va.',
      color: 'accent-green',
      bgColor: 'bg-accent-green',
      icon: '🌿',
      beneficios: ['Máximo 6 perros', 'Grupos por tamaño', 'Al ritmo de cada peludo'],
    },
  ];

  return (
    <div className="bg-secondary">
      {/* Hero minimalista */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Con Propósito
          </h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Servicios diseñados con amor para el bienestar de tu mascota
          </p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      {/* Cursos - Diseño compacto */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Cursos y Talleres</h2>
                <p className="text-secondary max-w-2xl">
                  Buscamos que los tutores de mascotas estén formados para educar y convivir de la mejor manera con los miembros peludos de su familia.
                </p>
              </div>
              <a
                href={whatsappUrl('Hola, quiero inscribirme a un curso de la Fundación Pa\' Perros')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block text-center"
              >
                Inscríbete
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cursos.map((curso) => (
                <a
                  key={curso.nombre}
                  href={whatsappUrl(`Hola, quiero inscribirme al ${curso.nombre}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFE9D2]/20 hover:bg-[#FFE9D2]/30 rounded-xl p-5 transition-all duration-300 group flex flex-col"
                >
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{curso.emoji}</span>
                  <h3 className="text-base md:text-lg font-semibold text-secondary leading-tight mb-3">{curso.nombre}</h3>
                  <p className="text-2xl font-bold text-accent-orange mt-auto">{curso.precio}</p>
                  <p className="text-sm text-secondary">{curso.duracion}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios - Grid dinámico */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio) => (
              <div 
                key={servicio.id}
                className="bg-primary rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 ${servicio.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{servicio.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-1">{servicio.titulo}</h3>
                      <p className="text-secondary text-sm md:text-base">{servicio.descripcion}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {servicio.beneficios.map((beneficio, idx) => (
                      <span 
                        key={idx}
                        className="bg-secondary text-primary text-xs md:text-sm px-3 py-1 rounded-full"
                      >
                        {beneficio}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={whatsappUrl(`Hola, quiero más información sobre el servicio de ${servicio.titulo}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${servicio.bgColor} text-secondary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 inline-block text-sm`}
                  >
                    Más información
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            ¿Tienes preguntas sobre nuestros servicios?
          </h2>
          <p className="text-secondary mb-8">
            Estamos aquí para ayudarte a elegir el servicio ideal para ti y tu mascota.
          </p>
          <a
            href={whatsappUrl('Hola, tengo una pregunta sobre los servicios de la Fundación Pa\' Perros')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-orange text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-accent-orange/90 transition-colors duration-200 inline-block"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}
