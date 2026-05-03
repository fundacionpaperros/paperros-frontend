'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

interface AnsweredQuestion {
  pregunta_id: number;
  respuesta: number;
  tiempo_segundos: number;
}

interface ExamResult {
  aprobado: boolean;
  correctas: number;
  total: number;
  porcentaje: number;
  message: string;
  intentos_fallidos_consecutivos?: number;
  intentos_restantes_hasta_bloqueo?: number;
  proximo_intento_disponible?: string | null;
  bloqueado_hasta?: string | null;
}

interface Eligibility {
  puede_presentar: boolean;
  mensaje: string | null;
  ya_aprobado: boolean;
  bandera_verde: boolean;
  intentos_fallidos_consecutivos: number;
  intentos_restantes_hasta_bloqueo: number;
  proximo_intento_disponible: string | null;
  bloqueado_hasta: string | null;
}

function formatDateForUser(isoDate: string | null | undefined): string {
  if (!isoDate) return '';
  try {
    return new Date(isoDate).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return isoDate;
  }
}

const VIDEO_URL = 'https://www.youtube.com/embed/P9aex_NTm24';

export default function CertificacionPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Flujo de pantallas
  const [showExam, setShowExam] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);

  // Envío automático del certificado por correo al aprobar
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Estado del examen pregunta por pregunta
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const questionStartTime = useRef<number>(0);

  const fetchEligibility = useCallback(async (): Promise<Eligibility | null> => {
    try {
      const response = await api.get<Eligibility>('/adoption-process/certificate-exam/eligibility');
      setEligibility(response.data);
      return response.data;
    } catch (err: unknown) {
      setError(getErrorMessage(err as ApiErrorResponse, 'Error al verificar elegibilidad'));
      return null;
    }
  }, []);

  const loadQuestions = useCallback(async () => {
    try {
      const response = await api.get('/adoption-process/certificate-exam');
      setQuestions(response.data.questions);
    } catch (err: unknown) {
      setError(getErrorMessage(err as ApiErrorResponse, 'Error al cargar preguntas'));
    } finally {
      setLoadingQuestions(false);
    }
  }, []);

  const checkCertificate = useCallback(async () => {
    try {
      await api.get('/adoption-process/certificate');
      router.push('/adopta/informacion-hogar');
      return;
    } catch (certErr: unknown) {
      const apiError = certErr as ApiErrorResponse;
      if (apiError.response?.status !== 404) {
        setError(getErrorMessage(apiError, 'Error al verificar certificado'));
        setLoading(false);
        return;
      }
    }
    const data = await fetchEligibility();
    if (data?.ya_aprobado) {
      router.push('/adopta/informacion-hogar');
      return;
    }
    setLoading(false);
  }, [router, fetchEligibility]);

  useEffect(() => {
    const validateAndCheck = async () => {
      const authenticated = await authService.validateSession();
      if (!authenticated) { router.push('/auth/login'); return; }

      try {
        const progress = await api.get<{ bandera: string }>('/adoption-process/progress');
        if (progress.data.bandera !== 'verde') {
          router.push(`/adopta?bandera=${progress.data.bandera}`);
          return;
        }
      } catch (err: unknown) {
        const apiError = err as ApiErrorResponse;
        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
          router.push('/auth/login');
          return;
        }
        router.push('/adopta');
        return;
      }
      checkCertificate();
    };
    validateAndCheck();
  }, [router, checkCertificate]);

  // Enviar certificado automáticamente al aprobar
  useEffect(() => {
    if (result?.aprobado && !emailSent && !emailSending) {
      (async () => {
        setEmailSending(true);
        try {
          await api.post('/adoption-process/certificate/send-email');
          setEmailSent(true);
        } catch (err: unknown) {
          setEmailError(getErrorMessage(err as ApiErrorResponse, 'Error al enviar el certificado por correo'));
        } finally {
          setEmailSending(false);
        }
      })();
    }
  }, [result, emailSent, emailSending]);

  // Registrar tiempo de inicio cuando cambia la pregunta actual
  useEffect(() => {
    if (showExam && !loadingQuestions && questions.length > 0) {
      questionStartTime.current = Date.now();
      setSelectedOption(null);
    }
  }, [showExam, currentIndex, loadingQuestions, questions.length]);

  const handleStartExam = () => {
    if (!eligibility?.puede_presentar) return;
    setShowExam(true);
    setCurrentIndex(0);
    setAnsweredQuestions([]);
    setSelectedOption(null);
    setLoadingQuestions(true);
    loadQuestions();
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const elapsed = (Date.now() - questionStartTime.current) / 1000;
    const currentQuestion = questions[currentIndex];

    const newAnswered: AnsweredQuestion = {
      pregunta_id: currentQuestion.id,
      respuesta: selectedOption,
      tiempo_segundos: parseFloat(elapsed.toFixed(2)),
    };

    const updatedAnswers = [...answeredQuestions, newAnswered];
    const isLast = currentIndex === questions.length - 1;

    if (!isLast) {
      setAnsweredQuestions(updatedAnswers);
      setCurrentIndex(currentIndex + 1);
      return;
    }

    // Última pregunta: enviar todas las respuestas
    setSubmitting(true);
    setError('');
    try {
      const response = await api.post('/adoption-process/certificate-exam', {
        respuestas: updatedAnswers,
      });
      setResult(response.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      setError(getErrorMessage(err as ApiErrorResponse, 'Error al enviar respuestas'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = async () => {
    setResult(null);
    setShowExam(false);
    setCurrentIndex(0);
    setAnsweredQuestions([]);
    setSelectedOption(null);
    setError('');
    setEmailSent(false);
    setEmailSending(false);
    setEmailError('');
    await fetchEligibility();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const progress = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Certificación de Adoptante
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Resultado */}
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
                <span className="ml-2 text-sm">
                  ({result.correctas} de {result.total} preguntas correctas
                  {!result.aprobado && ' — necesitas al menos 70% para aprobar'})
                </span>
              </p>

              {!result.aprobado && (
                <div className="mt-4 pt-4 border-t border-red-300 space-y-2 text-sm">
                  {typeof result.intentos_fallidos_consecutivos === 'number' && (
                    <p>Intentos fallidos consecutivos: <span className="font-semibold">{result.intentos_fallidos_consecutivos}</span></p>
                  )}
                  {typeof result.intentos_restantes_hasta_bloqueo === 'number' && (
                    <p>Te quedan <span className="font-semibold">{result.intentos_restantes_hasta_bloqueo}</span> intento(s) antes de un bloqueo temporal.</p>
                  )}
                  {result.bloqueado_hasta ? (
                    <p className="font-medium mt-2">
                      Has alcanzado el máximo de intentos. Podrás intentar de nuevo después del{' '}
                      <span className="font-bold">{formatDateForUser(result.bloqueado_hasta)}</span>.
                    </p>
                  ) : result.proximo_intento_disponible ? (
                    <p className="font-medium mt-2">
                      Podrás volver a intentar el{' '}
                      <span className="font-bold">{formatDateForUser(result.proximo_intento_disponible)}</span>.
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            {result.aprobado && (
              <>
                {emailSending && (
                  <p className="mb-4 text-blue-700 font-medium">Enviando el certificado a tu correo...</p>
                )}
                {emailSent && (
                  <p className="mb-4 text-green-700 font-medium">El certificado ha sido enviado a tu correo.</p>
                )}
                {emailError && (
                  <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{emailError}</div>
                )}
                <button
                  onClick={() => router.push('/adopta/informacion-hogar')}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
                >
                  Continuar al Siguiente Paso
                </button>
              </>
            )}

            {!result.aprobado && (
              <button
                onClick={handleRetry}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer"
              >
                Volver al curso
              </button>
            )}
          </div>
        )}

        {/* Video + elegibilidad */}
        {!showExam && !result && eligibility !== null && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Video Educativo</h2>
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

            {!eligibility.bandera_verde && (
              <div className="mb-4 p-4 bg-amber-100 border border-amber-400 text-amber-800 rounded-lg">
                <p className="font-medium">Aún no puedes presentar el examen. La fundación te habilitará cuando esté listo tu proceso.</p>
              </div>
            )}
            {eligibility.bandera_verde && !eligibility.puede_presentar && eligibility.mensaje && (
              <div className="mb-4 p-4 bg-amber-100 border border-amber-400 text-amber-800 rounded-lg space-y-2">
                <p className="font-medium">{eligibility.mensaje}</p>
                {eligibility.bloqueado_hasta && (
                  <p>Podrás intentar de nuevo después del <span className="font-bold">{formatDateForUser(eligibility.bloqueado_hasta)}</span>.</p>
                )}
                {!eligibility.bloqueado_hasta && eligibility.proximo_intento_disponible && (
                  <p>Podrás intentar de nuevo el <span className="font-bold">{formatDateForUser(eligibility.proximo_intento_disponible)}</span>.</p>
                )}
              </div>
            )}
            {eligibility.bandera_verde && eligibility.puede_presentar && (
              <p className="mb-4 text-gray-700 text-sm">
                Te quedan <span className="font-semibold">{eligibility.intentos_restantes_hasta_bloqueo}</span> intento(s) antes de un bloqueo temporal.
              </p>
            )}

            <button
              onClick={handleStartExam}
              disabled={!eligibility.puede_presentar || !eligibility.bandera_verde}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Presentar examen
            </button>
          </div>
        )}

        {/* Examen pregunta por pregunta */}
        {showExam && !result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {loadingQuestions || questions.length === 0 ? (
              <div className="py-12 text-center text-gray-600">Cargando preguntas...</div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Pregunta {currentIndex + 1} de {questions.length}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(progress)}% completado
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-primary mb-6">
                  {currentQuestion.pregunta}
                </h3>

                <div className="space-y-3 mb-8">
                  {currentQuestion.opciones.map((opcion, optIndex) => (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => setSelectedOption(optIndex)}
                      className={`w-full flex items-center p-4 border-2 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                        selectedOption === optIndex
                          ? 'border-primary bg-primary/5 text-primary font-medium'
                          : 'border-gray-200 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                        selectedOption === optIndex ? 'border-primary bg-primary' : 'border-gray-300'
                      }`}>
                        {selectedOption === optIndex && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </span>
                      {opcion}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedOption === null || submitting}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {submitting ? 'Enviando...' : isLast ? 'Enviar Respuestas' : 'Siguiente Pregunta →'}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Una vez avances no podrás volver a la pregunta anterior.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
