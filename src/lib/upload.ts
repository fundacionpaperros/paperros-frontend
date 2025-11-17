import api from './api';
import { ApiErrorResponse, getErrorMessage } from './types';

export type UploadType = 'event' | 'sponsor' | 'animal';

export interface UploadResponse {
  message: string;
  file_path: string;
  filename: string;
}

/**
 * Subir un archivo al servidor
 * @param file - Archivo a subir
 * @param type - Tipo de archivo (event, sponsor, animal)
 * @returns Ruta del archivo subido
 */
export async function uploadFile(
  file: File,
  type: UploadType
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post<UploadResponse>(`/upload/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.file_path;
  } catch (error: unknown) {
    const apiError = error as ApiErrorResponse;
    const errorMessage = getErrorMessage(apiError, 'Error al subir archivo');
    throw new Error(errorMessage);
  }
}

/**
 * Validar que el archivo sea una imagen válida
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de archivo no permitido. Solo se permiten imágenes (JPG, PNG, GIF, WEBP)',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'El archivo es muy grande. Tamaño máximo: 10MB',
    };
  }

  return { valid: true };
}

