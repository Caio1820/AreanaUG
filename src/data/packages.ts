import { PackageItem } from '../types.ts';

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pacote-5h',
    title: 'Pacote Gamer 5 Horas',
    category: 'promo',
    badge: 'Mais Popular 🎮',
    popular: true,
    priceFormatted: 'R$ 59,90',
    priceNumber: 59.90,
    validity: 'Válido por até 7 dias',
    description: 'Perfeito para curtir a semana jogando com liberdade nas melhores plataformas.',
    buttonLabel: 'Garantir Pacote 5h 🚀',
    whatsappMessage: 'Salve, Arena Underground! Quero garantir o Pacote de 5h por R$ 59,90.',
    features: [
      'Validade de até 7 dias para usar',
      'Use fracionado em diferentes dias',
      'Válido para PCs Gamers, PS5 e Switch',
      'Apenas R$ 11,98 por hora jogada'
    ]
  },
  {
    id: 'pacote-10h',
    title: 'Pacote Gamer 10 Horas',
    category: 'promo',
    priceFormatted: 'R$ 99,90',
    priceNumber: 99.90,
    validity: 'Válido por até 15 dias',
    description: 'Mais economia e horas livres para zerar seus jogos favoritos e subir de elo.',
    buttonLabel: 'Garantir Pacote 10h ⚡',
    whatsappMessage: 'Salve! Quero adquirir o Pacote de 10h por R$ 99,90.',
    features: [
      'Economia de R$ 100 em relação ao avulso',
      'Validade ampla de até 15 dias',
      'Acesso livre a todas as estações',
      'Apenas R$ 9,99 por hora'
    ]
  },
  {
    id: 'pacote-20h',
    title: 'Pacote Gamer 20 Horas',
    category: 'promo',
    badge: 'Melhor Custo-Benefício 🏆',
    bestValue: true,
    priceFormatted: 'R$ 189,90',
    priceNumber: 189.90,
    validity: 'Válido por até 30 dias',
    description: 'Para quem é hardcore e quer aproveitar ao máximo todas as estações com o menor valor por hora.',
    buttonLabel: 'Garantir Pacote 20h 🔥',
    whatsappMessage: 'Salve! Quero o Pacote de 20h por R$ 189,90.',
    features: [
      'Menor custo por hora: apenas R$ 9,49/h',
      'Validade de 30 dias corridos',
      'Acesso a PCs Gamers, VR e Consoles',
      'Prioridade de agendamento em horário de pico'
    ]
  },
  {
    id: 'avulso-hora',
    title: 'Avulso & Plataformas Disponíveis',
    category: 'consoles_pc',
    priceFormatted: 'R$ 20,00',
    periodLabel: '/ hora',
    priceNumber: 20.00,
    validity: 'Sem fidelidade',
    description: 'Escolha entre PCs Gamers, Nintendo Switch, Realidade Virtual (VR) e PlayStation 5.',
    buttonLabel: 'Agendar Hora Avulsa 🎮',
    whatsappMessage: 'Olá! Gostaria de reservar horário avulso (R$ 20/h) na Arena.',
    features: [
      'PCs Gamers de Alta Performance (240Hz)',
      'PlayStation 5 com 4K HDR e DualSense',
      'Nintendo Switch Multiplayer (até 4 jogadores)',
      'Realidade Virtual Imersiva (VR Headset)'
    ]
  },
  {
    id: 'aniversarios-eventos',
    title: 'Eventos Particulares & Aniversários',
    category: 'events',
    priceFormatted: 'Sob Consulta',
    periodLabel: 'pacote fechado',
    priceNumber: 0,
    validity: 'Data e horário exclusivos',
    description: 'Comemore seu aniversário na melhor arena gamer do estado com exclusividade para sua galera!',
    buttonLabel: 'Orçar Aniversário 🥳',
    whatsappMessage: 'Olá! Gostaria de informações para realizar um evento/aniversário na Arena Underground.',
    features: [
      'Arena fechada exclusiva para seus convidados',
      'Todas as estações de PCs, PS5 e VR liberadas',
      'Espaço dedicado para bolo, salgados e bebidas',
      'Torneio particular organizado pela equipe da Arena'
    ]
  }
];
