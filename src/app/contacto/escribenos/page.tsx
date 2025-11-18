'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

export default function Escribenos() {
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

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
              CONTÁCTANOS
            </h1>
            <div className="w-24 h-1 bg-accent-orange mx-auto mb-6"></div>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto mb-4">
              Escríbenos
            </p>
            <p className="text-lg text-primary/70">
              contacto@fundacionpaperros.com
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">Envíanos un Mensaje</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-semibold">¡Mensaje enviado exitosamente!</p>
                <p className="text-sm">Nos pondremos en contacto contigo pronto.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-primary mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-primary mb-2">
                  Teléfono (Opcional)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  placeholder="+57 300 123 4567"
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-primary mb-2">
                  Asunto *
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="adopcion">Adopción</option>
                  <option value="donacion">Donación</option>
                  <option value="voluntariado">Voluntariado</option>
                  <option value="servicios">Servicios</option>
                  <option value="charlas">Charlas Educativas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-primary mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-orange text-white py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}