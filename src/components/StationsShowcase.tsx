import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Gamepad, Glasses, Sparkles, Check, ChevronRight } from 'lucide-react';
import { STATIONS_DATA } from '../data/stations.ts';
import { StationItem } from '../types.ts';
import { getWhatsAppLink } from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

export const StationsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(STATIONS_DATA[0].id);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const activeStation = STATIONS_DATA.find((s) => s.id === activeTab) || STATIONS_DATA[0];

  const handleStationBooking = (station: StationItem) => {
    telemetry.track('whatsapp_trigger', `Station Booking: ${station.name}`);
    const message = `Olá, Arena Underground! Gostaria de reservar um horário especificamente na estação "${station.name}". Tem vaga para hoje?`;
    const url = getWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="estacoes" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10" aria-label="Estações Gamer">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6600] mb-1">
          <Monitor className="w-4 h-4" />
          <span>Equipamentos de Elite</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Estações Gamers & Setups Profissionais
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl text-balance">
          Conheça os equipamentos que fazem da Arena Underground a referência número 1 em Macapá para e-sports e diversão.
        </p>
      </div>

      {/* Segmented Station Selector Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 mb-8 pb-2">
        {STATIONS_DATA.map((st) => (
          <button
            key={st.id}
            onClick={() => {
              setActiveTab(st.id);
              telemetry.track('click', `Showcase Tab: ${st.name}`);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
              activeTab === st.id
                ? 'bg-[#FF6600] text-white glow-orange-sm'
                : 'bg-[#181818] text-slate-300 hover:text-white hover:bg-[#222222] border border-[#2B2B2B]'
            }`}
          >
            {st.name.split(' ')[0]} {st.name.split(' ')[1] || ''}
          </button>
        ))}
      </div>

      {/* Featured Station Card (2-column layout with real image) */}
      <div className="bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Image Column */}
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] bg-[#1A1A1A] overflow-hidden">
            {!imageErrors[activeStation.id] ? (
              <img
                src={activeStation.image}
                alt={activeStation.name}
                className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
                onError={() => handleImageError(activeStation.id)}
              />
            ) : (
              <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-[#141414] to-[#201815] text-[#FF6600]">
                <Gamepad className="w-16 h-16 mb-2 opacity-80" />
                <span className="font-bold text-sm text-slate-300">{activeStation.name}</span>
                <span className="text-xs text-slate-500 mt-1 font-mono">Arena Underground Games</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-[#FF6600]">
              {activeStation.subtitle}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono uppercase text-[#FF6600] font-bold">
                  {activeStation.subtitle}
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 bg-[#202020] px-2.5 py-1 rounded-lg">
                  {activeStation.hourlyRate}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                {activeStation.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                {activeStation.description}
              </p>

              {/* Technical Specs List */}
              <div className="mb-5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-2 font-mono">
                  Especificações & Destaques:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeStation.specs.map((sp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] shrink-0" />
                      <span className="truncate">{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Games list */}
              <div className="mb-6 pt-3 border-t border-[#222222]">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-2 font-mono">
                  Jogos Mais Disputados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStation.popularGames.map((game, gIdx) => (
                    <span
                      key={gIdx}
                      className="px-2 py-1 rounded-md bg-[#1F1F1F] text-slate-300 text-[11px] border border-[#2D2D2D]"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => handleStationBooking(activeStation)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FF6600] hover:bg-[#E65C00] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 glow-orange-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Quero Jogar Nesta Estação</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
