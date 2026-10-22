import React from 'react';
import { MapPin, Navigation, Instagram, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import {
  ARENA_ADDRESS_FULL,
  ARENA_MAPS_URL,
  ARENA_INSTAGRAM_URL,
  getWhatsAppLink,
} from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

interface LocationFooterProps {
  onOpenObservability: () => void;
}

export const LocationFooter: React.FC<LocationFooterProps> = ({ onOpenObservability }) => {
  const wazeUrl = 'https://waze.com/ul?q=Rua+General+Rondon+1467+Macapa+AP';

  return (
    <footer id="localizacao" className="w-full bg-[#0D0D0D] border-t border-[#1F1F1F] pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Location Card */}
        <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Address & Hours details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6600]">
                <MapPin className="w-4 h-4" />
                <span>Localização no Centro de Macapá</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Venha nos visitar na Arena Underground
              </h3>

              <p className="text-sm text-slate-300">
                <strong className="text-white">{ARENA_ADDRESS_FULL}</strong>
                <br />
                Ponto de referência: Fácil acesso no coração de Macapá, ambiente climatizado com isolamento acústico e estações preparadas para o seu conforto.
              </p>

              {/* Operating hours */}
              <div className="bg-[#191919] border border-[#2B2B2B] rounded-2xl p-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold text-white mb-1">
                  <Clock className="w-4 h-4 text-[#FF6600]" />
                  <span>Horários de Funcionamento da Arena:</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#262626]">
                  <span className="text-slate-400">Terça a Domingo:</span>
                  <span className="font-mono font-medium text-[#FF6600]">15:00 às 21:00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Segunda-feira:</span>
                  <span className="font-mono font-medium text-slate-500">Fechado</span>
                </div>
              </div>

              {/* Direct route buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={ARENA_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => telemetry.track('click', 'Footer: Google Maps Route')}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-[#FF6600] hover:bg-[#E65C00] text-white text-xs font-bold rounded-xl transition-all duration-200 glow-orange-sm active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Traçar Rota no Google Maps</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => telemetry.track('click', 'Footer: Waze Route')}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-[#202020] hover:bg-[#282828] border border-[#333333] hover:border-slate-400 text-slate-200 text-xs font-semibold rounded-xl transition-all duration-200 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir no Waze</span>
                </a>
              </div>
            </div>

            {/* Stylized Dark Map Card Preview */}
            <div className="lg:col-span-5 bg-[#191919] border border-[#2D2D2D] rounded-2xl p-5 flex flex-col justify-between min-h-[240px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Mapa de Acesso
                  </span>
                  <span className="text-[11px] font-mono text-[#FF6600] bg-[#FF6600]/10 px-2 py-0.5 rounded border border-[#FF6600]/20">
                    MACAPÁ • AP
                  </span>
                </div>
                <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] mb-4">
                  <p className="text-xs text-white font-bold mb-1">Arena Underground Games</p>
                  <p className="text-[11px] text-slate-400">Rua General Rondon, 1467 - Centro</p>
                  <p className="text-[11px] text-[#FF6600] font-mono mt-2">CEP: 68900-082 • Amapá</p>
                </div>
              </div>

              <div className="relative z-10 pt-2">
                <a
                  href={ARENA_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#242424] hover:bg-[#2C2C2C] text-xs font-semibold text-center text-slate-200 rounded-lg border border-[#333333] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Ver Localização Satélite / 3D</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Links, Social Media & Bottom Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#1C1C1C] text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-bold text-sm">Arena Underground Games</span>
            <span>•</span>
            <span>Macapá/AP</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={ARENA_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => telemetry.track('click', 'Footer: Instagram')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@arena_underground_</span>
            </a>

            <a
              href={getWhatsAppLink('Olá! Vim pelo rodapé do site.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => telemetry.track('whatsapp_trigger', 'Footer: WhatsApp')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Oficial</span>
            </a>

            <button
              onClick={onOpenObservability}
              className="text-[11px] text-slate-500 hover:text-slate-300 font-mono underline underline-offset-4 transition-colors"
              title="Abrir telemetria e APM"
            >
              APM & Telemetria
            </button>
          </div>
        </div>

        <div className="text-center sm:text-left pt-6 text-[11px] text-slate-600">
          © {new Date().getFullYear()} Arena Underground Games. Todos os direitos reservados. Macapá, Amapá, Brasil.
        </div>
      </div>
    </footer>
  );
};
