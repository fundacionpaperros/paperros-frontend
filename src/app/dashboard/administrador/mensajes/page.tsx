'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface ContactMessage {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string;
  mensaje: string;
  leido: boolean;
  created_at: string;
  updated_at: string;
}

const getAsuntoLabel = (asunto: string) => {
  const labels: Record<string, string> = {
    adopcion: 'Adopción',
    donacion: 'Donación',
    voluntariado: 'Voluntariado',
    servicios: 'Servicios',
    charlas: 'Charlas Educativas',
    otro: 'Otro'
  };
  return labels[asunto] || asunto;
};

export default function MensajesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const loadMessages = useCallback(async () => {
    try {
      const leido = filter === 'all' ? undefined : filter === 'read';
      const response = await api.get<ContactMessage[]>('/contact/', {
        params: { leido, limit: 100 }
      });
      setMessages(response.data);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      console.error('Error loading messages:', getErrorMessage(apiError, 'Error al cargar mensajes'));
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authService.validateSession();
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (user.rol !== 'admin' && user.rol !== 'fundacion') {
          router.push('/dashboard');
          return;
        }
        await loadMessages();
      } catch {
        router.push('/auth/login');
        return;
      }
    };

    checkAuth();
  }, [router, loadMessages]);

  const markAsRead = async (messageId: number) => {
    try {
      await api.put(`/contact/${messageId}`, { leido: true });
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, leido: true } : msg
      ));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, leido: true } : null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      alert(getErrorMessage(apiError, 'Error al marcar como leído'));
    }
  };

  const markAsUnread = async (messageId: number) => {
    try {
      await api.put(`/contact/${messageId}`, { leido: false });
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, leido: false } : msg
      ));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, leido: false } : null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      alert(getErrorMessage(apiError, 'Error al marcar como no leído'));
    }
  };

  const deleteMessage = async (messageId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      return;
    }

    try {
      await api.delete(`/contact/${messageId}`);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      alert(getErrorMessage(apiError, 'Error al eliminar mensaje'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  const unreadCount = messages.filter(msg => !msg.leido).length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Mensajes de Contacto</h1>
          <p className="text-gray-600">Gestiona los mensajes recibidos desde el formulario de contacto</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No leídos ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Leídos ({messages.length - unreadCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de mensajes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Mensajes</h2>
              </div>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No hay mensajes</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.leido) {
                            markAsRead(message.id);
                          }
                        }}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedMessage?.id === message.id ? 'bg-primary/10' : ''
                        } ${!message.leido ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {message.nombre}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {message.email}
                            </p>
                          </div>
                          {!message.leido && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">
                          {getAsuntoLabel(message.asunto)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(message.created_at).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detalle del mensaje */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">
                        {selectedMessage.nombre}
                      </h2>
                      <p className="text-gray-600">{selectedMessage.email}</p>
                      {selectedMessage.telefono && (
                        <p className="text-gray-600">Tel: {selectedMessage.telefono}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {selectedMessage.leido ? (
                        <button
                          onClick={() => markAsUnread(selectedMessage.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                        >
                          Marcar como no leído
                        </button>
                      ) : (
                        <button
                          onClick={() => markAsRead(selectedMessage.id)}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium"
                        >
                          Marcar como leído
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {getAsuntoLabel(selectedMessage.asunto)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Fecha de envío:</p>
                    <p className="text-gray-700">
                      {new Date(selectedMessage.created_at).toLocaleString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Mensaje:</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.mensaje}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">Selecciona un mensaje para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

