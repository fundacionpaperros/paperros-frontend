'use client';

export default function PoliticaTratamientoDatosPage() {
  return (
    <div className="min-h-screen bg-secondary py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Política de Tratamiento de Datos Personales
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Información General</h2>
              <p>
                La Fundación Pa&apos; Perros, en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, 
                informa a los usuarios de su sitio web y plataforma sobre la política de tratamiento de datos personales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Responsable del Tratamiento</h2>
              <p>
                <strong>Fundación Pa&apos; Perros</strong><br />
                NIT: [Número de identificación tributaria]<br />
                Dirección: Manizales, Colombia<br />
                Email: contacto@fundacionpaperros.com<br />
                Teléfono: +57 (1) 234-5678
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Datos Personales que Recolectamos</h2>
              <p>
                La Fundación Pa&apos; Perros recolecta y trata los siguientes datos personales:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Número de identificación (cédula)</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de residencia</li>
                <li>Ciudad de residencia</li>
                <li>Información sobre preferencias de adopción</li>
                <li>Información sobre el hogar y condiciones de vida</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Finalidad del Tratamiento</h2>
              <p>
                Los datos personales recolectados serán utilizados para las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestionar el proceso de adopción de animales</li>
                <li>Verificar la idoneidad de los adoptantes</li>
                <li>Realizar seguimiento post-adopción</li>
                <li>Comunicarnos con los usuarios sobre el estado de sus solicitudes</li>
                <li>Enviar información relevante sobre el bienestar animal</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Derechos del Titular</h2>
              <p>
                Como titular de los datos personales, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conocer, actualizar y rectificar sus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Revocar la autorización y/o solicitar la supresión del dato</li>
                <li>Acceder de forma gratuita a sus datos personales</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Medidas de Seguridad</h2>
              <p>
                La Fundación Pa&apos; Perros implementa medidas técnicas, humanas y administrativas necesarias 
                para garantizar la seguridad de los datos personales y evitar su adulteración, pérdida, consulta, 
                uso o acceso no autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Transferencia de Datos</h2>
              <p>
                Los datos personales no serán transferidos a terceros, salvo cuando sea necesario para el 
                cumplimiento de las finalidades descritas, previa autorización del titular, o cuando exista 
                una obligación legal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Vigencia</h2>
              <p>
                La presente política de tratamiento de datos personales rige a partir de la fecha de su 
                publicación y permanecerá vigente mientras la Fundación Pa&apos; Perros continúe operando 
                y prestando sus servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Contacto</h2>
              <p>
                Para ejercer sus derechos o realizar consultas sobre el tratamiento de sus datos personales, 
                puede contactarnos a través de:
              </p>
              <ul className="list-none pl-0 space-y-2">
                <li>📧 Email: contacto@fundacionpaperros.com</li>
                <li>📞 Teléfono: +57 (1) 234-5678</li>
                <li>📍 Dirección: Manizales, Colombia</li>
              </ul>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Última actualización: {new Date().toLocaleDateString('es-CO', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

