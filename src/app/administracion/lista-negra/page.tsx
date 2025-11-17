'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface BlacklistEntry {
  id: number;
  cedula: string;
  razon_reporte: string;
  activo: boolean;
  created_at: string;
}

export default function BlacklistPage() {
  const [entries, setEntries] = useState<BlacklistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ cedula: '', razon_reporte: '' });

  useEffect(() => {
    fetchBlacklist();
  }, []);

  const fetchBlacklist = async () => {
    try {
      const response = await api.get('/blacklist?limit=100');
      setEntries(response.data);
    } catch (error) {
      console.error('Error loading blacklist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/blacklist', formData);
      setShowForm(false);
      setFormData({ cedula: '', razon_reporte: '' });
      fetchBlacklist();
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al agregar');
    }
  };

  const handleToggle = async (id: number, activo: boolean) => {
    try {
      await api.put(`/blacklist/${id}`, { activo: !activo });
      fetchBlacklist();
    } catch {
      alert('Error al actualizar');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta entrada?')) return;
    try {
      await api.delete(`/blacklist/${id}`);
      fetchBlacklist();
    } catch {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista Negra</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          {showForm ? 'Cancelar' : 'Agregar Entrada'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Nueva Entrada</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cédula *
              </label>
              <input
                type="text"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Razón del Reporte *
              </label>
              <textarea
                value={formData.razon_reporte}
                onChange={(e) => setFormData({ ...formData, razon_reporte: e.target.value })}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            >
              Agregar
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cédula</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Razón</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{entry.cedula}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{entry.razon_reporte}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString('es-CO')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    entry.activo ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {entry.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleToggle(entry.id, entry.activo)}
                    className="text-primary hover:text-primary/80 mr-4"
                  >
                    {entry.activo ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

