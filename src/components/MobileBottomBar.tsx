import React from 'react';
import { MessageCircle, MapPin, Calculator, Sparkles } from 'lucide-react';
import { getWhatsAppLink, ARENA_MAPS_URL } from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

interface MobileBottomBarProps {
  onOpenSimulator: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenSimulator }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#121212]/95 backdrop-blur-md border-t border-[#262626] px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
      {/* Simulator Shortcut */}
      <button
        onClick={() => {
          telemetry.track('click', 'Mobile Bottom Bar: Simulator');
          onOpenSimulator();
        }}
        className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-slate-300 hover:text-white"
      >
        <Calculator className="w-5 h-5 text-[#FF6600]" />
        <span className="text-[10px] font-medium mt-0.5">Simular</span>
      </button>

      {/* Primary WhatsApp Action */}
      <a
        href={getWhatsAppLink('Salve, Arena Underground! Quero agendar um horário rápido.')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => telemetry.track('whatsapp_trigger', 'Mobile Bottom Bar: Primary WhatsApp')}
        className="flex-1 h-11 bg-[#FF6600] hover:bg-[#E65C00] active:scale-[0.98] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-xs shadow-md glow-orange-sm transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-white/20" />
        <span>Agendar no WhatsApp</span>
      </a>

      {/* Google Maps Shortcut */}
      <a
        href={ARENA_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => telemetry.track('click', 'Mobile Bottom Bar: Maps')}
        className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-slate-300 hover:text-white"
      >
        <MapPin className="w-5 h-5 text-slate-300" />
        <span className="text-[10px] font-medium mt-0.5">Rota</span>
      </a>
    </div>
  );
};
