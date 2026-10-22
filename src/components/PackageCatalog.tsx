import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PACKAGES_DATA } from '../data/packages.ts';
import { PackageCategory, PackageItem } from '../types.ts';
import { getWhatsAppLink } from '../utils/whatsapp.ts';
import { telemetry } from '../utils/telemetry.ts';

export const PackageCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>('all');

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  const handlePackageClick = (pkg: PackageItem) => {
    telemetry.track('whatsapp_trigger', `Package Select: ${pkg.title}`, {
      price: pkg.priceFormatted,
      category: pkg.category,
    });

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF6600', '#FF8533', '#FFFFFF'],
      });
    } catch {
      // safe fallback
    }

    const url = getWhatsAppLink(pkg.whatsappMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pacotes" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8" aria-label="Catálogo de Pacotes">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6600] mb-1">
          <Zap className="w-4 h-4" />
          <span>Preços Oficiais & Combos</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Catálogo de Pacotes & Horas Livres
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl text-balance">
          Economize adquirindo pacotes com horas acumuladas para jogar quando quiser nas melhores máquinas de Macapá.
        </p>
      </div>

      {/* Filter Tabs (Interactive Segmented Control) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 mb-8 pb-2">
        <button
          onClick={() => {
            setSelectedCategory('all');
            telemetry.track('click', 'Filter: All Packages');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-[#FF6600] text-white shadow-md glow-orange-sm'
              : 'bg-[#181818] text-slate-300 hover:text-white hover:bg-[#202020] border border-[#2B2B2B]'
          }`}
        >
          🚀 Todos os Planos
        </button>

        <button
          onClick={() => {
            setSelectedCategory('promo');
            telemetry.track('click', 'Filter: Promo Packages');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
            selectedCategory === 'promo'
              ? 'bg-[#FF6600] text-white shadow-md glow-orange-sm'
              : 'bg-[#181818] text-slate-300 hover:text-white hover:bg-[#202020] border border-[#2B2B2B]'
          }`}
        >
          ⚡ Pacotes Promocionais
        </button>

        <button
          onClick={() => {
            setSelectedCategory('consoles_pc');
            telemetry.track('click', 'Filter: Consoles & PCs');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
            selectedCategory === 'consoles_pc'
              ? 'bg-[#FF6600] text-white shadow-md glow-orange-sm'
              : 'bg-[#181818] text-slate-300 hover:text-white hover:bg-[#202020] border border-[#2B2B2B]'
          }`}
        >
          🎮 Consoles & PCs
        </button>

        <button
          onClick={() => {
            setSelectedCategory('events');
            telemetry.track('click', 'Filter: Events & Birthdays');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
            selectedCategory === 'events'
              ? 'bg-[#FF6600] text-white shadow-md glow-orange-sm'
              : 'bg-[#181818] text-slate-300 hover:text-white hover:bg-[#202020] border border-[#2B2B2B]'
          }`}
        >
          🎂 Aniversários & Eventos
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`relative bg-[#141414] rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 hover:translate-y-[-2px] ${
                pkg.popular
                  ? 'border-[#FF6600]/60 glow-orange-sm bg-gradient-to-b from-[#181412] to-[#141414]'
                  : pkg.bestValue
                  ? 'border-amber-500/50 bg-gradient-to-b from-[#181611] to-[#141414]'
                  : 'border-[#262626] hover:border-[#383838]'
              }`}
            >
              {/* Subtle top metadata / highlight bar */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {pkg.badge ? (
                    <span className="text-[11px] font-bold text-[#FF6600] font-mono tracking-wide uppercase">
                      {pkg.badge}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 font-mono">
                      ARENA UNDERGROUND
                    </span>
                  )}
                  {pkg.validity && (
                    <span className="text-[11px] text-slate-400">
                      {pkg.validity}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {pkg.title}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {pkg.priceFormatted}
                  </span>
                  {pkg.periodLabel && (
                    <span className="text-xs text-slate-400 font-medium">
                      {pkg.periodLabel}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Feature List (Clean unboxed rows with hairline tick) */}
                <ul className="space-y-2.5 mb-6 text-xs text-slate-300 pt-2 border-t border-[#222222]">
                  {pkg.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#FF6600]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#FF6600]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button formatting direct message to WhatsApp */}
              <button
                onClick={() => handlePackageClick(pkg)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
                  pkg.popular || pkg.bestValue
                    ? 'bg-[#FF6600] hover:bg-[#E65C00] text-white glow-orange-sm'
                    : 'bg-[#222222] hover:bg-[#2C2C2C] text-white border border-[#333333] hover:border-slate-500'
                }`}
              >
                <span>{pkg.buttonLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
