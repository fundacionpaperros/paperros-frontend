// Número de WhatsApp de la fundación (sin "+" ni espacios)
export const WHATSAPP_NUMBER = '573206889919';

// Construye un enlace de WhatsApp con un mensaje inicial opcional
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
