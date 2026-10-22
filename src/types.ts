export type PackageCategory = 'all' | 'promo' | 'consoles_pc' | 'events';

export interface PackageItem {
  id: string;
  title: string;
  category: 'promo' | 'consoles_pc' | 'events';
  badge?: string;
  priceFormatted: string;
  priceNumber: number;
  periodLabel?: string;
  validity?: string;
  description: string;
  buttonLabel: string;
  whatsappMessage: string;
  popular?: boolean;
  bestValue?: boolean;
  features: string[];
}

export interface StationItem {
  id: string;
  name: string;
  subtitle: string;
  specs: string[];
  description: string;
  image: string;
  popularGames: string[];
  hourlyRate: string;
}

export interface BookingSimulatorState {
  station: string;
  hours: number;
  players: number;
  timeSlot: string;
  customerName: string;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: 'click' | 'route' | 'booking_calc' | 'whatsapp_trigger' | 'error' | 'perf';
  label: string;
  metadata?: Record<string, unknown>;
}

export interface SystemHealthMetric {
  name: string;
  value: string | number;
  status: 'optimal' | 'good' | 'warning';
  detail: string;
}
