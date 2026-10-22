import { StationItem } from '../types.ts';

export const STATIONS_DATA: StationItem[] = [
  {
    id: 'pc-gamer',
    name: 'PCs Gamers de Alta Performance',
    subtitle: 'Competitivo & E-sports 240Hz',
    description: 'Bancadas equipadas com processadores de última geração, placas GeForce RTX, monitores gamers 240Hz/1ms e periféricos mecânicos profissionais para precisão cirúrgica.',
    image: '/src/assets/images/arena_pc_gaming_stations_1792673968217.jpg',
    hourlyRate: 'R$ 20,00 / hora',
    specs: [
      'Monitores 240Hz 1ms G-Sync',
      'GeForce RTX com Ray Tracing',
      'Teclados mecânicos switch red',
      'Headsets 7.1 surround sound'
    ],
    popularGames: ['Valorant', 'CS2', 'League of Legends', 'Fortnite', 'GTA V RP', 'Warzone']
  },
  {
    id: 'ps5-lounge',
    name: 'PlayStation 5 Lounge 4K HDR',
    subtitle: 'Consoles de Última Geração',
    description: 'Poltronas confortáveis, telas 4K HDR de alta fidelidade e controles sem fio DualSense com feedback háptico e gatilhos adaptáveis para uma experiência cinematográfica.',
    image: '/src/assets/images/arena_console_lounge_1792673968138.jpg',
    hourlyRate: 'R$ 20,00 / hora',
    specs: [
      'Telas 4K HDR ultra vibrantes',
      'Controles DualSense sem fio',
      'Carregamento ultra-rápido por SSD NVMe',
      'Opção para partidas multiplayer 1v1 ou 2v2'
    ],
    popularGames: ['EA FC 24/25', 'Mortal Kombat 1', 'Spider-Man 2', 'Street Fighter 6', 'God of War Ragnarök']
  },
  {
    id: 'vr-experience',
    name: 'Realidade Virtual Imersiva (VR)',
    subtitle: 'Meta Quest 3 & Sensores 360°',
    description: 'Espaço com demarcação de segurança, óculos de Realidade Virtual com rastreamento corporal de alta precisão e catálogo de títulos eletrizantes.',
    image: '/src/assets/images/arena_vr_experience_1792673968275.jpg',
    hourlyRate: 'R$ 20,00 / hora',
    specs: [
      'Rastreamento espacial 6DoF',
      'Resolução 4K+ estéreo cristalina',
      'Áudio espacial 3D integrado',
      'Orientação e suporte por monitor dedicado'
    ],
    popularGames: ['Beat Saber', 'Superhot VR', 'Pavlov Shack', 'Job Simulator', 'Blade & Sorcery']
  },
  {
    id: 'nintendo-switch',
    name: 'Nintendo Switch Party Lounge',
    subtitle: 'Diversão Co-op & Família',
    description: 'O melhor espaço para rir e disputar partidas em grupo de 2 a 4 jogadores simultâneos na mesma tela com Joy-Cons e controles Pro.',
    image: '/src/assets/images/arena_console_lounge_1792673968138.jpg',
    hourlyRate: 'R$ 20,00 / hora',
    specs: [
      'Até 4 jogadores na mesma tela',
      'Controles Pro & Joy-Cons originais',
      'Jogos de festa e cooperação',
      'Ideal para amigos, casais e família'
    ],
    popularGames: ['Mario Kart 8 Deluxe', 'Super Smash Bros Ultimate', 'Mario Party Superstars', 'Overcooked 2']
  }
];
