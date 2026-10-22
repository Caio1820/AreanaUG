import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Users, Clock, Gamepad2, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWhatsAppLink } from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

const STATIONS_OPTIONS = [
  { id: 'pc', name: 'PC Gamer RTX (240Hz)', icon: '🖥️', rate: 20 },
  { id: 'ps5', name: 'PlayStation 5 (4K HDR)', icon: '🎮', rate: 20 },
  { id: 'vr', name: 'Realidade Virtual (VR Quest)', icon: '🥽', rate: 20 },
  { id: 'switch', name: 'Nintendo Switch Lounge', icon: '🕹️', rate: 20 },
];

const TIME_SLOTS = [
  'Hoje (15:00 - 18:00)',
  'Hoje (18:00 - 21:00)',
  'Fim de Semana (15:00 - 18:00)',
  'Fim de Semana (18:00 - 21:00)',
  'Outro Horário (Terça a Domingo)',
];

export const BookingSimulator: React.FC = () => {
  const [stationId, setStationId] = useState('pc');
  const [hours, setHours] = useState(2);
  const [players, setPlayers] = useState(1);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [playerName, setPlayerName] = useState('');

  const selectedStation = STATIONS_OPTIONS.find((s) => s.id === stationId) || STATIONS_OPTIONS[0];

  const calculation = useMemo(() => {
    // If 1 player and 5 hours, apply promo package rate of 59.90
    if (players === 1 && hours === 5) {
      return {
        total: 59.90,
        isPromo: true,
        savings: (20 * 5) - 59.90,
      };
    }
    // If 1 player and 10 hours, apply promo package rate of 99.90
    if (players === 1 && hours === 10) {
      return {
        total: 99.90,
        isPromo: true,
        savings: (20 * 10) - 99.90,
      };
    }

    const standardTotal = players * hours * selectedStation.rate;
    return {
      total: standardTotal,
      isPromo: false,
      savings: 0,
    };
  }, [players, hours, selectedStation]);

  const handleSendToWhatsApp = () => {
    const formattedPrice = calculation.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const message = [
      'Salve, Arena Underground! Quero agendar uma jogatina na Arena 🚀',
      `🕹️ Estação: ${selectedStation.icon} ${selectedStation.name}`,
      `👥 Jogadores: ${players} pessoa(s)`,
      `⏱️ Duração: ${hours} hora(s)`,
      `📅 Turno: ${timeSlot}`,
      `💰 Total estimado: ${formattedPrice}${calculation.isPromo ? ' (Aplicado valor promocional de combo!)' : ''}`,
      playerName.trim() ? `👤 Nome: ${playerName.trim()}` : '',
      '',
      'Tem disponibilidade para nós nesse período?',
    ]
      .filter(Boolean)
      .join('\n');

    telemetry.track('booking_calc', 'Calculated & Sent to WhatsApp', {
      station: selectedStation.name,
      hours,
      players,
      total: calculation.total,
    });

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF6600', '#10B981', '#FFFFFF'],
      });
    } catch {
      // safe fallback
    }

    const url = getWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="simulador"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8"
      aria-label="Simulador de Agendamento"
    >
      <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6600]/10 blur-[80px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6600] mb-1">
              <Calculator className="w-4 h-4" />
              <span>Simulador Interativo</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Monte Sua Sessão Gamer & Agende em 1 Toque
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-[#1D1D1D] px-3 py-1 rounded-full border border-[#2B2B2B]">
            Cálculo em Tempo Real
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Escolha da Estação */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-2.5">
                1. Escolha a Plataforma / Estação:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATIONS_OPTIONS.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setStationId(st.id);
                      telemetry.track('click', `Sim Station: ${st.name}`);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-medium transition-all duration-200 ${
                      stationId === st.id
                        ? 'bg-[#1E1916] border-[#FF6600] text-white glow-orange-sm'
                        : 'bg-[#181818] border-[#2A2A2A] text-slate-400 hover:text-white hover:bg-[#202020]'
                    }`}
                  >
                    <span className="text-lg">{st.icon}</span>
                    <span className="truncate">{st.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duração em Horas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  2. Horas de Jogatina:
                </label>
                <span className="text-xs font-bold text-[#FF6600] font-mono">
                  {hours} {hours === 1 ? 'hora' : 'horas'}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 10].map((h) => (
                  <button
                    key={h}
                    onClick={() => {
                      setHours(h);
                      telemetry.track('click', `Sim Hours: ${h}h`);
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all duration-200 ${
                      hours === h
                        ? 'bg-[#FF6600] text-white glow-orange-sm'
                        : 'bg-[#181818] border border-[#2B2B2B] text-slate-300 hover:text-white hover:bg-[#222222]'
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Quantidade de Jogadores */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  3. Quantidade de Pessoas / Amigos:
                </label>
                <span className="text-xs font-bold text-white font-mono">
                  {players} {players === 1 ? 'jogador' : 'jogadores'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPlayers(p);
                      telemetry.track('click', `Sim Players: ${p}`);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 ${
                      players === p
                        ? 'bg-[#FF6600] text-white glow-orange-sm'
                        : 'bg-[#181818] border border-[#2B2B2B] text-slate-300 hover:text-white hover:bg-[#222222]'
                    }`}
                  >
                    {p}P
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Turno e Nome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-1.5">
                  Turno de Preferência:
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2B2B2B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6600]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-1.5">
                  Seu Nome ou Nick (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Lucas / @gamer96"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2B2B2B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6600] placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Result Card Right Column */}
          <div className="lg:col-span-5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Resumo da Reserva Estimada
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#FF6600] font-mono tracking-tight">
                  {calculation.total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                {calculation.isPromo && (
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Combo Promocional Ativado
                  </span>
                )}
              </div>

              {calculation.savings > 0 && (
                <p className="text-xs text-emerald-400 font-medium mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Economia de {calculation.savings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} vs avulso
                </p>
              )}

              {/* Breakdown lines */}
              <div className="space-y-2 py-3 border-y border-[#262626] text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estação:</span>
                  <span className="font-semibold text-white truncate max-w-[180px]">{selectedStation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jogadores:</span>
                  <span className="font-mono text-white">{players} jogador(es)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tempo:</span>
                  <span className="font-mono text-white">{hours} hora(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Turno:</span>
                  <span className="text-slate-300 text-[11px] truncate max-w-[180px]">{timeSlot}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar no WhatsApp da Arena</span>
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Mensagem pré-formatada sem nenhum compromisso
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
