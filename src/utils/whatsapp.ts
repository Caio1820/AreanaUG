export const ARENA_WHATSAPP_NUMBER = '5596991217979';
export const ARENA_INSTAGRAM_URL = 'https://www.instagram.com/arena_underground_/';
export const ARENA_MAPS_URL = 'https://maps.app.goo.gl/RoX8LEsR1AYDRTzw7';
export const ARENA_ADDRESS_FULL = 'Rua General Rondon, n.° 1467 - Centro, Macapá/AP';
export const ARENA_PIX_KEY = '5596991217979'; // Chave Telefone

/**
 * Encodes and creates standard WhatsApp deep links
 */
export function getWhatsAppLink(message: string): string {
  const cleanNumber = ARENA_WHATSAPP_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Triggers direct navigation to WhatsApp
 */
export function openWhatsAppWith(message: string): void {
  const url = getWhatsAppLink(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
