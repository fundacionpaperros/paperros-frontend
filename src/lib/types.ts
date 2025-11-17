// Tipos comunes para el frontend
import { AxiosError, AxiosResponse } from 'axios';

export interface ApiError {
  response?: {
    data?: {
      detail?: string | Array<string | { loc?: string[]; msg?: string }> | object;
    };
    status?: number;
  };
  message?: string;
}

export interface ApiErrorResponse extends Omit<AxiosError, 'response'> {
  response?: AxiosResponse<{
    detail?: string | Array<string | { loc?: string[]; msg?: string }> | object;
  }>;
}

/**
 * Convierte el detail de un ApiErrorResponse a string
 */
export function getErrorMessage(error: ApiErrorResponse | null | undefined, defaultMessage: string = 'Error desconocido'): string {
  if (!error?.response?.data?.detail) {
    return defaultMessage;
  }

  const detail = error.response.data.detail;

  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    const errorArray = detail as Array<string | { loc?: string[]; msg?: string }>;
    return errorArray.map((e: string | { loc?: string[]; msg?: string }) => {
      if (typeof e === 'string') return e;
      if (e && typeof e === 'object' && 'msg' in e) {
        return `${e.loc?.join('.') || 'campo'}: ${e.msg || 'Error de validación'}`;
      }
      return 'Error de validación';
    }).join(', ');
  }

  if (typeof detail === 'object') {
    return JSON.stringify(detail);
  }

  return defaultMessage;
}

