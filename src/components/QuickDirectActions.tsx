import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, MapPin, Instagram, Copy, Check, Calculator, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ARENA_WHATSAPP_NUMBER,
  ARENA_INSTAGRAM_URL,
  ARENA_MAPS_URL,
  ARENA_PIX_KEY,
  getWhatsAppLink
} from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

interface QuickActionsProps {
  onOpenSimulator: () => void;
  onOpenPixModal: () => void;
}

export const QuickDirectActions: React.FC<QuickActionsProps> = ({
  onOpenSimulator,
  onOpenPixModal
}) => {
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ARENA_PIX_KEY);
    setCopiedPix(true);
    telemetry.track('click', 'Quick Action: Copied PIX Key');

    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#FF6600', '#FFA366', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => setCopiedPix(false), 2200);
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-5" aria-label="Ações Rápidas">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Acesso Direto & Agendamento
        </h2>
        <span className="text-[11px] text-slate-500 font-mono">1 Toque</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* 1. WhatsApp Oficial Direct */}
        <motion.a
          href={getWhatsAppLink('Salve, Arena Underground! Gostaria de tirar dúvidas e agendar meu horário.')}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => telemetry.track('whatsapp_trigger', 'Direct Action: WhatsApp Official')}
          className="group relative flex items-center justify-between p-4 bg-gradient-to-r from-[#172B1A] via-[#152418] to-[#121B13] border border-emerald-500/40 hover:border-emerald-400 rounded-2xl shadow-lg transition-all duration-200 min-h-[58px]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform duration-200">
              <MessageCircle className="w-6 h-6 fill-emerald-500/20" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Falar no WhatsApp Oficial
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium font-mono">
                  RESPOSTA RÁPIDA
                </span>
              </div>
              <span className="text-xs text-slate-300">
                (96) 99121-7979 • Dúvidas, reservas & PIX
              </span>
            </div>
          </div>
          <span className="text-emerald-400 text-lg font-bold">→</span>
        </motion.a>

        {/* 2. Como Chegar na Arena (Google Maps) */}
        <motion.a
          href={ARENA_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => telemetry.track('click', 'Direct Action: Google Maps Route')}
          className="group relative flex items-center justify-between p-4 bg-[#141414] hover:bg-[#1A1A1A] border border-[#2B2B2B] hover:border-[#FF6600]/50 rounded-2xl shadow-sm transition-all duration-200 min-h-[58px]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-center text-[#FF6600] group-hover:scale-105 transition-transform duration-200">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold text-white group-hover:text-[#FF6600] transition-colors block">
                Como Chegar na Arena (Google Maps)
              </span>
              <span className="text-xs text-slate-400">
                Rua General Rondon, n.° 1467 - Centro (Macapá/AP)
              </span>
            </div>
          </div>
          <span className="text-slate-400 group-hover:text-[#FF6600] text-lg font-bold transition-colors">
            ↗
          </span>
        </motion.a>

        {/* 3. Ver Jogadores e Campeonatos no Instagram */}
        <motion.a
          href={ARENA_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => telemetry.track('click', 'Direct Action: Instagram Page')}
          className="group relative flex items-center justify-between p-4 bg-[#141414] hover:bg-[#1A1A1A] border border-[#2B2B2B] hover:border-pink-500/40 rounded-2xl shadow-sm transition-all duration-200 min-h-[58px]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform duration-200">
              <Instagram className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                  Ver Jogadores e Campeonatos no Instagram
                </span>
              </div>
              <span className="text-xs text-slate-400">
                @arena_underground_ • Torneios, fotos da galera e novidades
              </span>
            </div>
          </div>
          <span className="text-slate-400 group-hover:text-pink-400 text-lg font-bold transition-colors">
            ↗
          </span>
        </motion.a>

        {/* Secondary Action Grid: Simulador Interativo + Chave PIX Rápida */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              telemetry.track('click', 'Direct Action: Open Simulator Button');
              onOpenSimulator();
            }}
            className="flex items-center gap-2.5 p-3 bg-[#191919] hover:bg-[#202020] border border-[#2F2F2F] hover:border-[#FF6600]/40 rounded-xl text-left transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FF6600]/15 flex items-center justify-center text-[#FF6600] shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                Simular Sessão
              </span>
              <span className="text-[11px] text-slate-400 block truncate">
                Calcule horas & amigos
              </span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyPix}
            className="flex items-center gap-2.5 p-3 bg-[#191919] hover:bg-[#202020] border border-[#2F2F2F] hover:border-[#FF6600]/40 rounded-xl text-left transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#242424] flex items-center justify-center text-slate-200 shrink-0">
              {copiedPix ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {copiedPix ? 'Copiado! ✅' : 'Chave PIX Rápida'}
              </span>
              <span className="text-[11px] text-slate-400 block truncate font-mono">
                {ARENA_PIX_KEY}
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
