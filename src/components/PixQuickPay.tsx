import React, { useState } from 'react';
import { Copy, Check, QrCode, MessageCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARENA_PIX_KEY, getWhatsAppLink } from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

export const PixQuickPay: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ARENA_PIX_KEY);
    setCopied(true);
    telemetry.track('click', 'Copied PIX Key from QuickPay Section');

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.75 },
        colors: ['#FF6600', '#10B981', '#FFFFFF'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendProof = () => {
    telemetry.track('whatsapp_trigger', 'Send PIX Receipt via WhatsApp');
    const msg = 'Salve, Arena Underground! Acabei de fazer um PIX para adiantar/garantir minha reserva. Segue o comprovante:';
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6" aria-label="Pagamento Rápido PIX">
      <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-white">Chave PIX Oficial da Arena</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded font-semibold">
                  CONFIRMAÇÃO INSTANTÂNEA
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Chave celular cadastrada: copie e cole no app do seu banco para garantir seu pacote ou estação.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333333] hover:border-emerald-500/50 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Chave Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>{ARENA_PIX_KEY}</span>
                </>
              )}
            </button>

            <button
              onClick={handleSendProof}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Comprovante</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
