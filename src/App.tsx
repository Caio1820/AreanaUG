import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Header } from './components/Header.tsx';
import { QuickDirectActions } from './components/QuickDirectActions.tsx';
import { PackageCatalog } from './components/PackageCatalog.tsx';
import { BookingSimulator } from './components/BookingSimulator.tsx';
import { StationsShowcase } from './components/StationsShowcase.tsx';
import { PixQuickPay } from './components/PixQuickPay.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { LocationFooter } from './components/LocationFooter.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { ObservabilityDrawer } from './components/ObservabilityDrawer.tsx';
import {
  BioHeaderSkeleton,
  QuickActionsSkeleton,
  CardsGridSkeleton,
} from './components/SkeletonLoader.tsx';
import { telemetry } from './utils/telemetry.ts';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isObservabilityOpen, setIsObservabilityOpen] = useState(false);

  // Smooth initial fluid skeleton transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      telemetry.track('perf', 'Initial Page Rendered from Skeleton');
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    telemetry.track('route', `Navigated to #${sectionId}`);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulator = () => {
    handleNavigateSection('simulador');
  };

  const handleOpenPixSection = () => {
    const el = document.getElementById('pix-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] relative pb-20 sm:pb-0 selection:bg-[#FF6600] selection:text-white">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <BioHeaderSkeleton />
              <QuickActionsSkeleton />
              <CardsGridSkeleton />
            </motion.div>
          ) : (
            <motion.main
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              {/* A. Header & Marca */}
              <Header onNavigateSection={handleNavigateSection} />

              {/* B. Navegação de Ação Rápida (Botões Direct) */}
              <QuickDirectActions
                onOpenSimulator={handleOpenSimulator}
                onOpenPixModal={handleOpenPixSection}
              />

              {/* C. Catálogo de Pacotes de Horas e Jogos (Cards Interativos) */}
              <PackageCatalog />

              {/* D. Portal de Agendamento Rápido & Simulador de Horas */}
              <BookingSimulator />

              {/* E. Estações Gamers & Setups Profissionais (VR, PCs, Consoles) */}
              <StationsShowcase />

              {/* F. Chave PIX Rápida */}
              <div id="pix-section" className="w-full">
                <PixQuickPay />
              </div>

              {/* G. FAQ & Perguntas Frequentes */}
              <FaqSection />

              {/* H. Footer & Localização Completa */}
              <LocationFooter
                onOpenObservability={() => setIsObservabilityOpen(true)}
              />

              {/* Mobile Bottom Bar (Thumb-zone optimized, <15% height) */}
              <MobileBottomBar onOpenSimulator={handleOpenSimulator} />
            </motion.main>
          )}
        </AnimatePresence>

        {/* APM & Observability Drawer */}
        <ObservabilityDrawer
          isOpen={isObservabilityOpen}
          onClose={() => setIsObservabilityOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
