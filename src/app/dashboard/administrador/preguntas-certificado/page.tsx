'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { authService } from '@/lib/auth';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface CertificateQuestion {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
  ponderacion: number;
  orden: number;
  activa: boolean;
}

export default function PreguntasCertificadoPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<CertificateQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<CertificateQuestion | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadQuestions = useCallback(async () => {
    try {
      const response = await api.get('/certificate-questions/');
      setQuestions(response.data);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al cargar preguntas'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authService.validateSession();
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (user.rol !== 'admin') {
          router.push('/dashboard');
          return;
        }
        await loadQuestions();
      } catch {
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router, loadQuestions]);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
      return;
    }

    try {
      await api.delete(`/certificate-questions/${id}`);
      setSuccess('Pregunta eliminada exitosamente');
      await loadQuestions();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al eliminar pregunta'));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleToggleActive = async (question: CertificateQuestion) => {
    try {
      await api.put(`/certificate-questions/${question.id}`, {
        activa: !question.activa
      });
      setSuccess('Estado actualizado exitosamente');
      await loadQuestions();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al actualizar estado'));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEdit = (question: CertificateQuestion) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingQuestion(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Preguntas de Certificado</h1>
          <button
            onClick={handleNew}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
          >
            Nueva Pregunta
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {showForm && (
          <QuestionForm
            question={editingQuestion}
            onClose={() => {
              setShowForm(false);
              setEditingQuestion(null);
            }}
            onSuccess={async () => {
              setShowForm(false);
              setEditingQuestion(null);
              setSuccess('Pregunta guardada exitosamente');
              await loadQuestions();
              setTimeout(() => setSuccess(''), 3000);
            }}
          />
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pregunta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ponderación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question) => (
                <tr key={question.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.orden}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-md truncate" title={question.pregunta}>
                      {question.pregunta}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.ponderacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      question.activa 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {question.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => handleEdit(question)}
                        className="text-primary hover:text-primary/80 font-medium cursor-pointer transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggleActive(question)}
                        className={`font-medium cursor-pointer transition-colors duration-200 ${
                          question.activa 
                            ? 'text-yellow-600 hover:text-yellow-800' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {question.activa ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="text-red-600 hover:text-red-800 font-medium cursor-pointer transition-colors duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QuestionForm({ 
  question, 
  onClose, 
  onSuccess 
}: { 
  question: CertificateQuestion | null; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    pregunta: question?.pregunta || '',
    opciones: question?.opciones || ['', '', '', ''],
    respuesta_correcta: question?.respuesta_correcta ?? 0,
    ponderacion: question?.ponderacion ?? 1.0,
    orden: question?.orden ?? 0,
    activa: question?.activa ?? true
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.pregunta.trim()) {
      setError('La pregunta es requerida');
      return;
    }

    if (formData.opciones.filter(o => o.trim()).length < 2) {
      setError('Debe tener al menos 2 opciones');
      return;
    }

    if (formData.respuesta_correcta >= formData.opciones.filter(o => o.trim()).length) {
      setError('La respuesta correcta debe ser un índice válido');
      return;
    }

    if (formData.ponderacion < 0.1 || formData.ponderacion > 10.0) {
      setError('La ponderación debe estar entre 0.1 y 10.0');
      return;
    }

    setSubmitting(true);

    try {
      const opcionesFiltradas = formData.opciones.filter(o => o.trim());
      
      if (question) {
        await api.put(`/certificate-questions/${question.id}`, {
          pregunta: formData.pregunta,
          opciones: opcionesFiltradas,
          respuesta_correcta: formData.respuesta_correcta,
          ponderacion: formData.ponderacion,
          orden: formData.orden,
          activa: formData.activa
        });
      } else {
        await api.post('/certificate-questions/', {
          pregunta: formData.pregunta,
          opciones: opcionesFiltradas,
          respuesta_correcta: formData.respuesta_correcta,
          ponderacion: formData.ponderacion,
          orden: formData.orden,
          activa: formData.activa
        });
      }
      onSuccess();
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al guardar pregunta'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpcionChange = (index: number, value: string) => {
    const newOpciones = [...formData.opciones];
    newOpciones[index] = value;
    setFormData({ ...formData, opciones: newOpciones });
  };

  const addOpcion = () => {
    if (formData.opciones.length < 10) {
      setFormData({
        ...formData,
        opciones: [...formData.opciones, '']
      });
    }
  };

  const removeOpcion = (index: number) => {
    if (formData.opciones.length > 2) {
      const newOpciones = formData.opciones.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        opciones: newOpciones,
        respuesta_correcta: formData.respuesta_correcta >= newOpciones.length 
          ? newOpciones.length - 1 
          : formData.respuesta_correcta
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-primary">
              {question ? 'Editar Pregunta' : 'Nueva Pregunta'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200 cursor-pointer"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pregunta *
              </label>
              <textarea
                value={formData.pregunta}
                onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opciones *
              </label>
              {formData.opciones.map((opcion, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="respuesta_correcta"
                    checked={formData.respuesta_correcta === index}
                    onChange={() => setFormData({ ...formData, respuesta_correcta: index })}
                    className="mr-2 w-4 h-4 text-primary focus:ring-primary border-gray-300 cursor-pointer"
                    disabled={!opcion.trim()}
                  />
                  <input
                    type="text"
                    value={opcion}
                    onChange={(e) => handleOpcionChange(index, e.target.value)}
                    placeholder={`Opción ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {formData.opciones.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOpcion(index)}
                      className="ml-2 text-red-600 hover:text-red-800 font-medium cursor-pointer transition-colors duration-200 px-2 py-1 rounded hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
              {formData.opciones.length < 10 && (
                <button
                  type="button"
                  onClick={addOpcion}
                  className="mt-2 text-primary hover:text-primary/80 text-sm font-medium cursor-pointer transition-colors duration-200 px-3 py-1 rounded hover:bg-primary/10"
                >
                  + Agregar Opción
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ponderación (0.1 - 10.0) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10.0"
                  value={formData.ponderacion}
                  onChange={(e) => setFormData({ ...formData, ponderacion: parseFloat(e.target.value) || 1.0 })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Orden *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.orden}
                  onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.activa}
                  onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                  className="mr-2 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700">Pregunta activa</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium cursor-pointer transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer transition-colors duration-200"
              >
                {submitting ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

