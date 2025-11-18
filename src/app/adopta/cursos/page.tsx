'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, authService } from '@/lib/auth';
import api from '@/lib/api';
import { ApiErrorResponse } from '@/lib/types';

interface Course {
  id: number;
  titulo: string;
  descripcion: string;
  url_video_youtube: string;
  orden: number;
}

interface CourseProgress {
  curso_id: number;
  completado: boolean;
  fecha_completado?: string;
}

interface ExamQuestion {
  id: number;
  pregunta: string;
  opciones: string[];
}

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<Record<number, CourseProgress>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [takingExam, setTakingExam] = useState(false);
  const [examResult, setExamResult] = useState<{ passed: boolean; score: number; message?: string } | null>(null);

  useEffect(() => {
    const validateAndLoad = async () => {
      // Validar que la sesión sea realmente válida
      const authenticated = await authService.validateSession();
      if (!authenticated) {
        router.push('/auth/login');
        return;
      }

      // Validar que el usuario tenga bandera verde
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
      }

      loadData();
    };

    validateAndLoad();
  }, [router]);

  const loadData = async () => {
    try {
      const [coursesRes, progressRes] = await Promise.all([
        api.get('/courses?active_only=true'),
        api.get('/courses/me/progress'),
      ]);
      setCourses(coursesRes.data);
      const progressMap: Record<number, CourseProgress> = {};
      progressRes.data.forEach((p: CourseProgress) => {
        progressMap[p.curso_id] = p;
      });
      setProgress(progressMap);
    } catch {
      console.error('Error loading courses');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (courseId: number) => {
    try {
      await api.post(`/courses/${courseId}/complete`);
      await loadData();
    } catch {
      alert('Error al marcar curso como completado');
    }
  };

  const loadQuestions = async (courseId: number) => {
    try {
      const response = await api.get(`/courses/${courseId}/questions`);
      setQuestions(response.data);
      setSelectedCourse(courseId);
      setTakingExam(true);
      setExamResult(null);
      setAnswers({});
    } catch {
      alert('Error al cargar preguntas');
    }
  };

  const handleSubmitExam = async () => {
    if (!selectedCourse) return;

    const respuestas: Record<string, number> = {};
    Object.keys(answers).forEach(qId => {
      respuestas[qId] = answers[parseInt(qId)];
    });

    try {
      const response = await api.post(`/courses/${selectedCourse}/exam`, respuestas);
      setExamResult(response.data);
      await loadData();
    } catch (error: unknown) {
      const apiError = error as ApiErrorResponse;
      alert(apiError.response?.data?.detail || 'Error al enviar examen');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background py-12 text-center">Cargando cursos...</div>;
  }

  if (takingExam && selectedCourse) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Examen</h2>
            
            {examResult ? (
              <div>
                <div className={`p-6 rounded-lg mb-4 ${
                  examResult.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <h3 className="text-xl font-bold mb-2">
                    {examResult.passed ? '¡Aprobado!' : 'No Aprobado'}
                  </h3>
                  <p>Puntuación: {examResult.score}%</p>
                  {examResult.passed && <p className="mt-2">¡Has obtenido tu certificado!</p>}
                </div>
                <button
                  onClick={() => {
                    setTakingExam(false);
                    setSelectedCourse(null);
                    setExamResult(null);
                  }}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
                >
                  Volver a Cursos
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((question, idx) => (
                  <div key={question.id} className="border-b pb-4">
                    <h3 className="font-semibold mb-3">{idx + 1}. {question.pregunta}</h3>
                    <div className="space-y-2">
                      {question.opciones.map((opcion, optIdx) => (
                        <label key={optIdx} className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optIdx}
                            checked={answers[question.id] === optIdx}
                            onChange={() => setAnswers({ ...answers, [question.id]: optIdx })}
                            className="mr-2"
                          />
                          <span>{opcion}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-4">
                  <button
                    onClick={handleSubmitExam}
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
                  >
                    Enviar Examen
                  </button>
                  <button
                    onClick={() => {
                      setTakingExam(false);
                      setSelectedCourse(null);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-primary text-center">
          Cursos de Capacitación
        </h1>

        <div className="space-y-6">
          {courses.map((course) => {
            const courseProgress = progress[course.id];
            const isCompleted = courseProgress?.completado;

            return (
              <div key={course.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">{course.titulo}</h2>
                    <p className="text-gray-600 mt-2">{course.descripcion}</p>
                  </div>
                  {isCompleted && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Completado
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <a
                      href={course.url_video_youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Ver video en YouTube →
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  {!isCompleted ? (
                    <>
                      <button
                        onClick={() => handleMarkComplete(course.id)}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 cursor-pointer"
                      >
                        Marcar como Completado
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => loadQuestions(course.id)}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
                    >
                      Realizar Examen
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/adopta"
            className="text-primary hover:underline"
          >
            Volver al Proceso de Adopción
          </Link>
        </div>
      </div>
    </div>
  );
}

