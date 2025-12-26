'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.post('/contact/', {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || undefined,
        asunto: formData.asunto,
        mensaje: formData.mensaje
      });

      setSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al enviar el mensaje. Por favor, intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/fundacionpaperros', 
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    { 
      name: 'TikTok', 
      url: 'https://tiktok.com/@fundacionpaperros', 
      color: 'bg-black',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/fundacionpaperros', 
      color: 'bg-blue-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/@fundacionpaperros', 
      color: 'bg-red-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-secondary">
      {/* Hero minimalista */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Estamos aquí para ayudarte
          </p>
          <div className="w-16 h-1 bg-accent-orange mx-auto mt-6"></div>
        </div>
      </section>

      {/* Grid principal */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Formulario - ocupa 2 columnas */}
            <div className="lg:col-span-2 bg-primary rounded-3xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-secondary mb-2">Escríbenos</h2>
              <p className="text-secondary mb-6">Completa el formulario y te responderemos pronto</p>
              
              {success && (
                <div className="mb-6 p-4 bg-accent-green rounded-xl">
                  <p className="font-semibold text-primary">¡Mensaje enviado exitosamente!</p>
                  <p className="text-sm text-primary">Nos pondremos en contacto contigo pronto.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-accent-orange rounded-xl">
                  <p className="font-semibold text-secondary">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-secondary mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#FFE9D2]/20 border border-[#FFE9D2]/30 rounded-xl text-secondary placeholder-[#FFE9D2]/50 focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#FFE9D2]/20 border border-[#FFE9D2]/30 rounded-xl text-secondary placeholder-[#FFE9D2]/50 focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-secondary mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FFE9D2]/20 border border-[#FFE9D2]/30 rounded-xl text-secondary placeholder-[#FFE9D2]/50 focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="asunto" className="block text-sm font-medium text-secondary mb-2">
                      Asunto *
                    </label>
                    <select
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#FFE9D2]/20 border border-[#FFE9D2]/30 rounded-xl text-secondary focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    >
                      <option value="" className="text-primary">Selecciona</option>
                      <option value="adopcion" className="text-primary">Adopción</option>
                      <option value="donacion" className="text-primary">Donación</option>
                      <option value="voluntariado" className="text-primary">Voluntariado</option>
                      <option value="servicios" className="text-primary">Servicios</option>
                      <option value="charlas" className="text-primary">Charlas Educativas</option>
                      <option value="otro" className="text-primary">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-secondary mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={10}
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFE9D2]/20 border border-[#FFE9D2]/30 rounded-xl text-secondary placeholder-[#FFE9D2]/50 focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-orange text-secondary py-3 rounded-xl font-semibold hover:bg-[#FB7B53]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>

            {/* Sidebar - información */}
            <div className="space-y-6">
              {/* Info de contacto */}
              <div className="bg-primary rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-secondary mb-4">Información</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-secondary text-sm">Email</p>
                      <p className="text-secondary font-medium">contacto@fundacionpaperros.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-secondary text-sm">Teléfonos</p>
                      <p className="text-secondary font-medium">+573206889919</p>
                      <p className="text-secondary font-medium">+573022356602</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-secondary text-sm">Ubicación</p>
                      <p className="text-secondary font-medium">Manizales, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voluntariado */}
              <div className="bg-accent-blue rounded-3xl p-6 shadow-xl">
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🙋</span>
                  <h3 className="text-xl font-bold text-primary mb-2">¿Quieres ser voluntario?</h3>
                  <p className="text-primary text-sm mb-4">Únete a nuestro equipo</p>
                  <a 
                    href="https://forms.gle/EnQg794q8YA11jAP7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-secondary px-6 py-3 rounded-xl font-semibold hover:bg-[#01778D]/90 transition-colors duration-200 inline-block text-sm"
                  >
                    Aplicar
                  </a>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-primary rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-secondary mb-4 text-center">Síguenos</h3>
                <div className="grid grid-cols-4 gap-3">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`${social.color} w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-secondary text-sm text-center mt-4">@fundacionpaperros</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
