import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, X, ShieldAlert, Cpu, CheckCircle, Terminal, RefreshCw } from 'lucide-react';
import { telemetry } from '../utils/telemetry.ts';
import { TelemetryEvent, SystemHealthMetric } from '../types.ts';

interface ObservabilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ObservabilityDrawer: React.FC<ObservabilityDrawerProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [metrics, setMetrics] = useState<SystemHealthMetric[]>([]);

  useEffect(() => {
    const unsubscribe = telemetry.subscribe((newEvents) => {
      setEvents(newEvents);
      setMetrics(telemetry.getMetrics());
    });

    const interval = setInterval(() => {
      setMetrics(telemetry.getMetrics());
    }, 2000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleSimulateTrace = () => {
    telemetry.track('perf', 'Manual Trace Dispatched', {
      memoryUsedMB: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 'N/A',
      connection: (navigator as any).connection?.effectiveType || 'fast',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#121212] border-l border-[#262626] h-full overflow-y-auto p-6 z-10 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#222222] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Observabilidade & APM</h3>
                    <p className="text-[11px] text-slate-400 font-mono">OpenTelemetry / Health Console</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-[#1E1E1E] hover:bg-[#282828] text-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* APM KPI Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {metrics.map((m, idx) => (
                  <div key={idx} className="bg-[#181818] border border-[#262626] rounded-xl p-3">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      {m.name}
                    </span>
                    <span className="text-base font-extrabold text-white font-mono block">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block mt-0.5">
                      {m.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Event Log Stream */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#FF6600]" />
                    Traces & Eventos Recentes ({events.length})
                  </span>
                  <button
                    onClick={handleSimulateTrace}
                    className="text-[10px] text-[#FF6600] hover:text-[#FFA366] font-mono flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Disparar Trace
                  </button>
                </div>

                <div className="bg-[#0A0A0A] border border-[#222222] rounded-xl p-3 h-64 overflow-y-auto font-mono text-[11px] space-y-2">
                  {events.length === 0 ? (
                    <div className="text-slate-600 text-center py-8">Nenhum evento registrado ainda</div>
                  ) : (
                    events.map((ev) => (
                      <div key={ev.id} className="pb-2 border-b border-[#1A1A1A] last:border-none">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
                          <span className="text-[#FF6600] font-bold">[{ev.type.toUpperCase()}]</span>
                          <span>{ev.timestamp}</span>
                        </div>
                        <div className="text-slate-200">{ev.label}</div>
                        {ev.metadata && (
                          <div className="text-[9px] text-slate-500 truncate">
                            {JSON.stringify(ev.metadata)}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#222222] text-[11px] text-slate-500 flex justify-between items-center">
              <span>Status APM: 🟢 Operacional</span>
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-[#202020] hover:bg-[#2A2A2A] text-slate-200 rounded-lg transition-colors"
              >
                Fechar Console
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
