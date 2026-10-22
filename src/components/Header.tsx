import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Gamepad2, Clock, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { getWhatsAppLink, ARENA_MAPS_URL } from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';
import logoImg from '../assets/images/logo.jpg';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const [imgError, setImgError] = useState(false);
  const [currentHour, setCurrentHour] = useState<number>(() => new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Official Arena hours: Tuesday to Sunday from 15:00 to 21:00 (Monday closed)
  const dayOfWeek = new Date().getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const isMonday = dayOfWeek === 1;
  const isOpenNow = !isMonday && currentHour >= 15 && currentHour < 21;

  return (
    <header className="w-full relative overflow-hidden pt-6 pb-6 border-b border-[#1E1E1E]">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#FF6600]/10 blur-[100px] pointer-events-none -z-10" />

      {/* Top Bar (Single Row, 3 Zones Contract) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6 pb-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-slate-100 group shrink-0"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF6600]/60 glow-orange-sm flex items-center justify-center bg-black">
            {!imgError ? (
              <img
                src={logoImg}
                alt="AU Logo"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-[#FF6600] font-black text-xs font-mono">AU</span>
            )}
          </div>
          <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#FF6600] transition-colors whitespace-nowrap">
            Arena Underground
          </span>
        </a>

        {/* Zone 2: Navigation Links (single line, unboxed) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400">
          <button
            onClick={() => onNavigateSection('pacotes')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Pacotes de Horas
          </button>
          <button
            onClick={() => onNavigateSection('simulador')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Simulador Rápido
          </button>
          <button
            onClick={() => onNavigateSection('estacoes')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Estações & Setups
          </button>
          <button
            onClick={() => onNavigateSection('localizacao')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Como Chegar
          </button>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={getWhatsAppLink('Salve, Arena Underground! Vim pelo site e gostaria de agendar uma sessão gamer.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => telemetry.track('click', 'Header WhatsApp CTA')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#FF6600] hover:bg-[#E65C00] rounded-xl transition-all duration-200 glow-orange-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agendar Agora</span>
          </a>
        </div>
      </div>

      {/* Main Bio Hero Section */}
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center pt-4">
        {/* Circular Logo with Neon Glow */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5 group cursor-pointer"
          onClick={() => {
            telemetry.track('click', 'Hero Logo Interaction');
          }}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#FF6600] via-[#FF8533] to-[#FFA366] glow-orange-md shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
              {!imgError ? (
                <img
                  src={logoImg}
                  alt="Arena Underground Games Logo"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#FF6600]">
                  <Gamepad2 className="w-10 h-10 mb-1" />
                  <span className="text-xs font-bold tracking-widest font-mono">ARENA</span>
                </div>
              )}
            </div>
          </div>
          {/* Subtle live indicator badge on logo */}
          <div className="absolute bottom-1 right-2 bg-[#121212] border border-[#2B2B2B] rounded-full px-2 py-0.5 flex items-center gap-1.5 shadow-lg">
            <span
              className={`w-2 h-2 rounded-full ${
                isOpenNow ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500'
              }`}
            />
            <span className="text-[10px] font-semibold text-slate-300 tracking-wider">
              {isOpenNow ? 'ABERTO' : 'FECHADO'}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2"
        >
          Arena Underground Games <span className="text-[#FF6600] inline-block">⚡🎮</span>
        </motion.h1>

        {/* Slogan & Subtitle */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mb-1 text-balance"
        >
          Venha viver o futuro dos games em Macapá!
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="text-xs sm:text-sm text-slate-400 max-w-lg mb-5 text-balance"
        >
          A primeira Arena Gamer do Amapá 🎮🔥 • PCs, VR, Consoles & Arcade
        </motion.p>

        {/* Informative Badges */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl text-xs"
        >
          <a
            href={ARENA_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => telemetry.track('click', 'Address Badge Click')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#282828] text-slate-300 hover:border-[#FF6600]/50 hover:text-white transition-all duration-200"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
            <span className="truncate">Rua General Rondon, 1467 - Centro (Macapá/AP)</span>
          </a>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#282828] text-slate-300">
            <Gamepad2 className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
            <span>PCs Alta Performance, Nintendo Switch, VR & PS5</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Terça a Domingo: 15h às 21h</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
