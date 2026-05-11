import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dona y apoya el bienestar animal',
  description: 'Tu donación ayuda a rescatar, rehabilitar y encontrar hogares para animales en Colombia. Apoya a la Fundación Pa\' Perros con cualquier aporte.',
  alternates: { canonical: 'https://www.fundacionpaperros.com/dona' },
  openGraph: {
    title: "Dona — Fundación Pa' Perros",
    description: 'Cada aporte transforma vidas animales en Colombia.',
    url: 'https://www.fundacionpaperros.com/dona',
  },
};

export default function PlanPadrino() {
  return (
    <div className="bg-secondary">
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Plan Padrino</h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">Conviértete en padrino y ayuda a transformar vidas</p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            <div className="bg-primary rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent-orange rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">💝</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary">¿Por qué ser padrino?</h2>
                  <p className="text-secondary">Tu apoyo hace la diferencia</p>
                </div>
              </div>
              <p className="text-secondary mb-6">
                El Plan Padrino es un programa de apoyo mensual que nos permite planificar y ejecutar
                nuestros programas de rescate, rehabilitación y adopción de manera sostenible.
              </p>
              <div className="space-y-3 mb-6">
                {['Impacto sostenible y duradero', 'Reportes mensuales de tu aporte', 'Conexión directa con la fundación'].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-[#FFE9D2]/20 rounded-xl p-3">
                    <span className="text-accent-orange text-xl">✓</span>
                    <span className="text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://forms.gle/6onYHCNfDXGtxtEQ6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-orange text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-[#FB7B53]/90 transition-colors duration-200 inline-block w-full text-center"
              >
                Quiero ser Padrino
              </a>
            </div>

            <div className="space-y-6">
              <div className="bg-primary rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-secondary mb-4">Bancolombia</h3>
                <div className="bg-[#FFE9D2]/20 rounded-xl p-4 mb-3">
                  <p className="text-secondary text-sm mb-1">Número de cuenta:</p>
                  <p className="font-bold text-2xl text-secondary">70600002371</p>
                </div>
                <div className="text-secondary text-sm space-y-1">
                  <p>Tipo: Cuenta de Ahorros</p>
                  <p>A nombre de: FUNDACIÓN PA PERROS</p>
                  <p>NIT: 901871359-3</p>
                </div>
              </div>
              <div className="bg-primary rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-secondary mb-4">Davivienda</h3>
                <div className="bg-[#FFE9D2]/20 rounded-xl p-4 mb-3">
                  <p className="text-secondary text-sm mb-1">Número de cuenta:</p>
                  <p className="font-bold text-2xl text-secondary">084500098383</p>
                </div>
                <div className="text-secondary text-sm space-y-1">
                  <p>Tipo: Cuenta de Ahorros</p>
                  <p>A nombre de: FUNDACIÓN PA PERROS</p>
                  <p>NIT: 901871359-3</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent-orange rounded-3xl p-8 text-center shadow-xl">
            <h3 className="text-2xl font-bold text-secondary mb-4">¿Tienes preguntas sobre el Plan Padrino?</h3>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Estamos aquí para resolver todas tus dudas sobre cómo ser padrino y el impacto de tu aporte.
            </p>
            <Link href="/contacto" className="bg-primary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-[#01778D]/90 transition-colors duration-200 inline-block">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
