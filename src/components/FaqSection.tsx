import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { telemetry } from '../utils/telemetry.ts';

const FAQS = [
  {
    q: 'Preciso agendar com antecedência ou posso chegar direto?',
    a: 'Você pode ir diretamente na Arena Underground! No entanto, para garantir que sua estação preferida (PC gamer 240Hz, PS5 ou VR) esteja livre sem filas nos horários de pico (noites e finais de semana), recomendamos fortemente mandar uma mensagem rápida no WhatsApp antes de sair de casa.',
  },
  {
    q: 'Como funciona o pacote de horas? Preciso gastar tudo no mesmo dia?',
    a: 'Não precisa! Os pacotes (5h, 10h e 20h) são registrados no seu cadastro e têm prazos flexíveis de 7 a 30 dias. Você pode jogar 1 hora na terça, 2 horas na sexta e o restante no final de semana, com total liberdade.',
  },
  {
    q: 'Posso jogar meus próprios jogos e contas da Steam, Riot e Epic Games?',
    a: 'Sim, com total segurança! Nossas máquinas possuem sistema limpo e seguro. Ao encerrar sua sessão, você pode deslogar e todos os dados temporários são reinicializados. Os principais jogos competitivos (Valorant, CS2, LOL, Fortnite, GTA V RP, EA FC) já ficam baixados e atualizados.',
  },
  {
    q: 'Como funciona a comemoração de aniversário e eventos?',
    a: 'Oferecemos o fechamento exclusivo da Arena Underground para seu grupo. Todos os convidados têm acesso livre a todas as máquinas, consoles e óculos de Realidade Virtual, com espaço para bolo, salgados e bebidas. Chame no WhatsApp para escolher data e quantidade de convidados.',
  },
  {
    q: 'Quais são as formas de pagamento aceitas?',
    a: 'Aceitamos PIX instantâneo, cartões de crédito e débito das principais bandeiras e dinheiro em espécie.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) {
      telemetry.track('click', `FAQ Open: ${FAQS[index].q}`);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10" aria-label="Perguntas Frequentes">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6600] mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>Dúvidas Comuns</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Perguntas Frequentes sobre a Arena
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-[#FF6600] transition-colors"
              >
                <span className="text-xs sm:text-sm font-semibold">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#FF6600]' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed border-t border-[#1F1F1F] pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
