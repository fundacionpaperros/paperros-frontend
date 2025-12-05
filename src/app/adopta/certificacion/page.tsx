'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { authService } from '@/lib/auth';
import { ApiErrorResponse, getErrorMessage } from '@/lib/types';

interface Question {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
}

const VIDEO_URL = 'https://www.youtube.com/embed/P9aex_NTm24';

export default function CertificacionPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExam, setShowExam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ aprobado: boolean; correctas: number; total: number; porcentaje: number; message: string } | null>(null);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos en segundos
  const [timerActive, setTimerActive] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const loadQuestions = useCallback(async () => {
    try {
      const response = await api.get('/adoption-process/certificate-exam');
      setQuestions(response.data.questions);
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al cargar preguntas'));
    } finally {
      setLoading(false);
    }
  }, []);

  const checkCertificate = useCallback(async () => {
    try {
      // Verificar si ya tiene certificado aprobado
      await api.get('/adoption-process/certificate');
      // Si tiene certificado, redirigir al siguiente paso
      router.push('/adopta/informacion-hogar');
      return;
    } catch (certErr: unknown) {
      const apiError = certErr as ApiErrorResponse;
      // Si no tiene certificado (404), continuar cargando las preguntas
      if (apiError.response?.status !== 404) {
        setError(getErrorMessage(apiError, 'Error al verificar certificado'));
        setLoading(false);
        return;
      }
    }

    // Si no tiene certificado, cargar las preguntas
    loadQuestions();
  }, [router, loadQuestions]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeExpired) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimeExpired(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeExpired]);

  // Scroll to top when result is set
  useEffect(() => {
    if (result) {
      // Pequeño delay para asegurar que el DOM se actualice
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // También intentar hacer scroll al elemento si existe
        const resultElement = document.getElementById('result-alert');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [result]);

  useEffect(() => {
    const validateAndCheck = async () => {
      // Validar que la sesión sea realmente válida
      const authenticated = await authService.validateSession();
      
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      // Validar que el usuario tenga bandera verde - REDIRIGIR INMEDIATAMENTE si no es verde
      try {
        const progress = await api.get<{ bandera: string }>('/adoption-process/progress');
        const { bandera } = progress.data;
        
        if (bandera !== 'verde') {
          // Redirigir inmediatamente a /adopta con el parámetro de bandera
          router.push(`/adopta?bandera=${bandera}`);
          return;
        }
      } catch (err: unknown) {
        const apiError = err as ApiErrorResponse;
        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
          router.push('/auth/login');
          return;
        }
        // Si hay error, redirigir a /adopta
        router.push('/adopta');
        return;
      }

      checkCertificate();
    };

    validateAndCheck();
  }, [router, checkCertificate]);

  const handleStartExam = () => {
    setShowExam(true);
    setTimerActive(true);
    setTimeLeft(600); // Reiniciar a 10 minutos
    setTimeExpired(false);
  };

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (timeExpired) {
      setError('El tiempo ha expirado. Por favor, intenta nuevamente.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Verificar que todas las preguntas estén respondidas
    if (Object.keys(answers).length !== questions.length) {
      setError('Debe responder todas las preguntas');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    setError('');
    setTimerActive(false);

    try {
      const response = await api.post('/adoption-process/certificate-exam', answers);
      setResult(response.data);
      // Hacer scroll hacia arriba para mostrar el resultado
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError, 'Error al enviar respuestas'));
      // Hacer scroll hacia arriba para mostrar el error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Certificación de Adoptante
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-8" id="result-alert">
            <div className={`mb-6 p-4 rounded-lg ${
              result.aprobado 
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              <p className="font-semibold text-lg">{result.message}</p>
              <p className="mt-2">
                Porcentaje obtenido: <span className="font-bold">{result.porcentaje.toFixed(1)}%</span>
                {result.aprobado ? (
                  <span className="ml-2 text-sm">({result.correctas} de {result.total} preguntas correctas)</span>
                ) : (
                  <span className="ml-2 text-sm">(Necesitas al menos 70% para aprobar)</span>
                )}
              </p>
            </div>
            {result.aprobado && (
              <button
                onClick={() => router.push('/adopta/informacion-hogar')}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
              >
                Continuar al Siguiente Paso
              </button>
            )}
            {!result.aprobado && (
              <button
                onClick={() => {
                  setResult(null);
                  setShowExam(false);
                  setAnswers({});
                  setError('');
                  setTimeLeft(600);
                  setTimerActive(false);
                  setTimeExpired(false);
                }}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
              >
                Intentar Nuevamente
              </button>
            )}
          </div>
        )}

        {!showExam && !result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Video Educativo
            </h2>
            <p className="text-gray-600 mb-6">
              Por favor, ve el siguiente video sobre bienestar familiar, Ley Ángel y Ley Kiara.
            </p>
            
            <div className="mb-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={VIDEO_URL}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
            >
              Continuar al Examen
            </button>
          </div>
        )}

        {showExam && !result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-primary">
                  Examen de Certificación
                </h2>
                <p className="text-gray-600 mt-2">
                  Responde todas las preguntas. Debes obtener al menos 70% para aprobar.
                </p>
              </div>
              <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${
                timeLeft <= 60 
                  ? 'bg-red-100 text-red-700' 
                  : timeLeft <= 300 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-green-100 text-green-700'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>
            
            {timeExpired && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">El tiempo ha expirado. Por favor, intenta nuevamente.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    {index + 1}. {question.pregunta}
                  </h3>
                  <div className="space-y-2">
                    {question.opciones.map((opcion, optIndex) => (
                      <label
                        key={optIndex}
                        className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optIndex}
                          checked={answers[question.id] === optIndex}
                          onChange={() => handleAnswerChange(question.id, optIndex)}
                          className="mr-3"
                        />
                        <span>{opcion}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting || Object.keys(answers).length !== questions.length || timeExpired}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : timeExpired ? 'Tiempo Expirado' : 'Enviar Respuestas'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

