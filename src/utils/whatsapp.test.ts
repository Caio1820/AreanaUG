import { describe, it, expect } from 'vitest';
import { getWhatsAppLink, ARENA_WHATSAPP_NUMBER, ARENA_MAPS_URL } from './whatsapp.ts';
import { PACKAGES_DATA } from '../data/packages.ts';

describe('WhatsApp Deep Link & Packages Contract Tests', () => {
  it('should generate valid WhatsApp URL with correct official phone number', () => {
    const url = getWhatsAppLink('Teste');
    expect(url).toContain('https://wa.me/5596991217979');
    expect(url).toContain('text=Teste');
  });

  it('should have the exact official Google Maps location link', () => {
    expect(ARENA_MAPS_URL).toBe('https://maps.app.goo.gl/RoX8LEsR1AYDRTzw7');
  });

  it('should encode Portuguese accents and emojis correctly', () => {
    const message = 'Olá! Quero agendar na Arena 🎮';
    const url = getWhatsAppLink(message);
    expect(url).toBe('https://wa.me/5596991217979?text=Ol%C3%A1!%20Quero%20agendar%20na%20Arena%20%F0%9F%8E%AE');
  });

  it('should have exact preformatted messages for all 5 required packages', () => {
    const pkg5h = PACKAGES_DATA.find((p) => p.id === 'pacote-5h');
    const pkg10h = PACKAGES_DATA.find((p) => p.id === 'pacote-10h');
    const pkg20h = PACKAGES_DATA.find((p) => p.id === 'pacote-20h');
    const pkgAvulso = PACKAGES_DATA.find((p) => p.id === 'avulso-hora');
    const pkgEventos = PACKAGES_DATA.find((p) => p.id === 'aniversarios-eventos');

    expect(pkg5h?.whatsappMessage).toBe('Salve, Arena Underground! Quero garantir o Pacote de 5h por R$ 59,90.');
    expect(pkg10h?.whatsappMessage).toBe('Salve! Quero adquirir o Pacote de 10h por R$ 99,90.');
    expect(pkg20h?.whatsappMessage).toBe('Salve! Quero o Pacote de 20h por R$ 189,90.');
    expect(pkgAvulso?.whatsappMessage).toBe('Olá! Gostaria de reservar horário avulso (R$ 20/h) na Arena.');
    expect(pkgEventos?.whatsappMessage).toBe('Olá! Gostaria de informações para realizar um evento/aniversário na Arena Underground.');
  });

  it('should have correct price numbers for calculation and simulation', () => {
    const pkg5h = PACKAGES_DATA.find((p) => p.id === 'pacote-5h');
    const pkg10h = PACKAGES_DATA.find((p) => p.id === 'pacote-10h');
    const pkg20h = PACKAGES_DATA.find((p) => p.id === 'pacote-20h');
    const pkgAvulso = PACKAGES_DATA.find((p) => p.id === 'avulso-hora');

    expect(pkg5h?.priceNumber).toBe(59.90);
    expect(pkg10h?.priceNumber).toBe(99.90);
    expect(pkg20h?.priceNumber).toBe(189.90);
    expect(pkgAvulso?.priceNumber).toBe(20.00);
  });
});
