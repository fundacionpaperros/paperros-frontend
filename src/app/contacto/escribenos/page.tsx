'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contactType: 'general' | 'adoption' | 'volunteer' | 'donation' | 'services';
}

export default function Escribenos() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Escríbenos
            </h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              ¿Tienes preguntas sobre nuestros servicios? ¿Quieres adoptar, ser voluntario o hacer una donación? 
              Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-accent-green rounded-lg">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Dirección</h3>
              <p className="text-primary">
                Manizales, Colombia<br />
                Organización sin ánimo de lucro<br />
                Registro Nacional
              </p>
            </div>
            
            <div className="text-center p-6 bg-accent-blue rounded-lg">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Teléfono</h3>
              <p className="text-primary">
                +57 (1) 234-5678<br />
                <span className="text-sm">Lunes a Viernes: 9:00 AM - 6:00 PM</span><br />
                <span className="text-sm">Sábados: 9:00 AM - 2:00 PM</span>
              </p>
            </div>
            
            <div className="text-center p-6 bg-accent-orange rounded-lg">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Email</h3>
              <p className="text-primary">
                contacto@fundacionpaperros.com<br />
                adopciones@fundacionpaperros.com<br />
                voluntarios@fundacionpaperros.com
              </p>
            </div>
            
            <div className="text-center p-6 bg-accent-green rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Redes Sociales</h3>
              <p className="text-primary">
                Instagram: @fundacionpaperros<br />
                TikTok: fundacionpaperros<br />
                Facebook: Fundación Pa Perros<br />
                YouTube: Fundación Pa Perros
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Formulario de Contacto
          </h2>
          
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-accent-green border border-accent-orange text-primary rounded-lg">
              <p className="text-center">¡Gracias por contactarnos! Te responderemos pronto.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-center">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
            </div>
          )}

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                    {...register('name', { 
                      required: 'El nombre es requerido',
                      minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                    })}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                    {...register('email', { 
                      required: 'El email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                    {...register('phone', {
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: 'Número de teléfono inválido'
                      }
                    })}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="contactType" className="block text-sm font-medium text-primary mb-2">
                    Tipo de Consulta *
                  </label>
                  <select
                    id="contactType"
                    className="w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                    {...register('contactType', { required: 'Selecciona un tipo de consulta' })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="general">Consulta General</option>
                    <option value="adoption">Proceso de Adopción</option>
                    <option value="volunteer">Voluntariado</option>
                    <option value="donation">Donación</option>
                    <option value="services">Servicios (Paseos, Mimos, Charlas)</option>
                  </select>
                  {errors.contactType && <p className="mt-1 text-sm text-red-600">{errors.contactType.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                  {...register('subject', { 
                    required: 'El asunto es requerido',
                    minLength: { value: 5, message: 'El asunto debe tener al menos 5 caracteres' }
                  })}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                  {...register('message', { 
                    required: 'El mensaje es requerido',
                    minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
                  })}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-accent-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-accent-green p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">
                ¿Cómo funciona el proceso de adopción responsable?
              </h3>
              <p className="text-primary">
                Nuestro proceso incluye registro, curso formativo sobre adopción responsable y normativa colombiana, 
                evaluación con certificación digital, perfil personal detallado y periodo de prueba de dos meses.
              </p>
            </div>
            
            <div className="bg-accent-blue p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">
                ¿Qué incluye el seguimiento post-adopción?
              </h3>
              <p className="text-primary">
                Mantenemos acompañamiento posterior con revisiones periódicas y seguimiento anual, 
                garantizando que las mascotas vivan en un entorno seguro y saludable.
              </p>
            </div>
            
            <div className="bg-accent-orange p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">
                ¿Cómo puedo ser voluntario?
              </h3>
              <p className="text-primary">
                Puedes contactarnos a través del formulario seleccionando &ldquo;Voluntariado&rdquo; o enviando un email 
                a voluntarios@fundacionpaperros.com. Trabajamos con albergues aliados y rescatistas.
              </p>
            </div>
            
            <div className="bg-accent-green p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">
                ¿Qué diferencia a la Fundación Pa&apos; Perros?
              </h3>
              <p className="text-primary">
                A diferencia de un albergue tradicional, nos enfocamos en promover la adopción responsable 
                y generar conciencia sobre el bienestar animal, transformando la cultura de adopción en Colombia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
