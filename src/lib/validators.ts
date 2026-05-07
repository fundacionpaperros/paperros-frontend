export type FormErrors = Record<string, string>;

export const sanitize = (val: string, maxLen = 500): string =>
  val.trim().slice(0, maxLen);

const required = (val: string): string | null =>
  !val.trim() ? 'Este campo es obligatorio' : null;

const email = (val: string): string | null =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim())
    ? null
    : 'Correo electrónico inválido';

const password = (val: string): string | null => {
  if (val.length < 8) return 'Mínimo 8 caracteres';
  if (!/[A-Za-z]/.test(val)) return 'Debe contener al menos una letra';
  if (!/[0-9]/.test(val)) return 'Debe contener al menos un número';
  return null;
};

const phone = (val: string): string | null => {
  if (!val.trim()) return null;
  const digits = val.replace(/\D/g, '');
  if (digits.length !== 10) return 'El teléfono debe tener 10 dígitos';
  return null;
};

const cedula = (val: string): string | null => {
  const digits = val.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 10)
    return 'La cédula debe tener entre 6 y 10 dígitos';
  if (!/^\d+$/.test(digits)) return 'La cédula solo debe contener números';
  return null;
};

const maxLength = (max: number) => (val: string): string | null =>
  val.trim().length > max ? `Máximo ${max} caracteres` : null;

const minLength = (min: number) => (val: string): string | null =>
  val.trim().length > 0 && val.trim().length < min
    ? `Mínimo ${min} caracteres`
    : null;

const numberRange = (min: number, max: number) => (val: number): string | null =>
  val < min || val > max ? `Debe estar entre ${min} y ${max}` : null;

const url = (val: string): string | null => {
  if (!val.trim()) return null;
  try {
    new URL(val);
    return null;
  } catch {
    return 'URL inválida (ej: https://ejemplo.com)';
  }
};

const onlyLetters = (val: string): string | null =>
  val.trim() && /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]/.test(val.trim())
    ? 'Solo se permiten letras'
    : null;

const noScript = (val: string): string | null =>
  /<script|javascript:|on\w+=/i.test(val)
    ? 'Contenido no permitido'
    : null;

// Pipe: runs validators in order, returns first error
const pipe = (val: string, ...fns: Array<(v: string) => string | null>): string | null => {
  for (const fn of fns) {
    const err = fn(val);
    if (err) return err;
  }
  return null;
};

export const v = {
  required,
  email,
  password,
  phone,
  cedula,
  maxLength,
  minLength,
  numberRange,
  url,
  onlyLetters,
  noScript,
  pipe,
};
