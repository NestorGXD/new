export const SEC_PER_HOUR = 6; // 6 s reales = 1 hora simulada
export const DAY_SECONDS = 24 * SEC_PER_HOUR;
const FOOD_EVERY = 6 * SEC_PER_HOUR; // pide comida cada 6 h simuladas
const FOOD_PATIENCE = 3 * SEC_PER_HOUR; // horas que espera antes de "ignorada"
const EVENT_PATIENCE = 10; // segundos para atender un evento

export type Status = 'setup' | 'playing' | 'ended' | 'ghost';
export type EventKind = 'play' | 'bathroom';
export type GhostReason = 'hunger' | 'overfed';

export interface Log {
  fed: number; foodIgnored: number; overfed: number;
  played: number; baths: number; eventsAttended: number; eventsIgnored: number;
}

export interface State {
  status: Status; name: string; seconds: number;
  hunger: number; fun: number; hygiene: number; // 0-100, más alto = mejor
  foodDeadline: number | null;
  event: { kind: EventKind; deadline: number } | null;
  overfeedStreak: number; ghostReason: GhostReason | null; log: Log;
}

const emptyLog: Log = { fed: 0, foodIgnored: 0, overfed: 0, played: 0, baths: 0, eventsAttended: 0, eventsIgnored: 0 };

export const initialState: State = {
  status: 'setup', name: '', seconds: 0, hunger: 70, fun: 70, hygiene: 80,
  foodDeadline: null, event: null, overfeedStreak: 0, ghostReason: null, log: emptyLog,
};

export type Action =
  | { type: 'start'; name: string }
  | { type: 'tick'; roll: number; pick: number }
  | { type: 'feed'; food: 'apple' | 'cake' } | { type: 'play'; wins: number }
  | { type: 'bathroom' } | { type: 'reset' };

const clamp = (n: number) => Math.max(0, Math.min(100, n));
export const happiness = (s: State) => Math.round((s.hunger + s.fun + s.hygiene) / 3);
const ghost = (s: State, reason: GhostReason): State => ({ ...s, status: 'ghost', ghostReason: reason });

export function reducer(s: State, a: Action): State {
  if (a.type === 'start') return { ...initialState, status: 'playing', name: a.name };
  if (a.type === 'reset') return initialState;
  if (s.status !== 'playing') return s;

  if (a.type === 'tick') {
    const seconds = s.seconds + 1;
    const n: State = {
      ...s, seconds, log: { ...s.log },
      hunger: clamp(s.hunger - 1), fun: clamp(s.fun - 0.7), hygiene: clamp(s.hygiene - 0.4),
    };
    // Comida pedida y no atendida
    if (n.foodDeadline !== null && seconds >= n.foodDeadline) {
      n.foodDeadline = null; n.log.foodIgnored++;
      if (n.log.foodIgnored >= 2) return ghost(n, 'hunger');
    }
    // Nueva petición de comida
    if (seconds % FOOD_EVERY === 0 && seconds < DAY_SECONDS && n.foodDeadline === null) {
      n.foodDeadline = seconds + FOOD_PATIENCE;
    }
    // Eventos aleatorios
    if (n.event && seconds >= n.event.deadline) {
      if (n.event.kind === 'play') n.fun = clamp(n.fun - 15); else n.hygiene = clamp(n.hygiene - 25);
      n.log.eventsIgnored++; n.event = null;
    } else if (!n.event && a.roll < 0.08 && seconds < DAY_SECONDS - 5) {
      n.event = { kind: a.pick < 0.5 ? 'play' : 'bathroom', deadline: seconds + EVENT_PATIENCE };
    }
    if (seconds >= DAY_SECONDS) n.status = 'ended';
    return n;
  }

  const n: State = { ...s, log: { ...s.log } };
  if (a.type === 'feed') {
    const cake = a.food === 'cake'; // el pastel llena más y divierte, pero ensucia
    n.hunger = clamp(n.hunger + (cake ? 45 : 30));
    if (cake) { n.fun = clamp(n.fun + 10); n.hygiene = clamp(n.hygiene - 8); }
    if (n.foodDeadline !== null) { // comida pedida: alimentación correcta
      n.foodDeadline = null; n.log.fed++; n.overfeedStreak = 0;
    } else { // comida sin que la pidiera: exceso
      n.log.overfed++; n.overfeedStreak++;
      if (n.overfeedStreak >= 3) return ghost(n, 'overfed');
    }
    return n;
  }
  // jugar o baño reinician la racha de comidas seguidas
  n.overfeedStreak = 0;
  const kind: EventKind = a.type === 'play' ? 'play' : 'bathroom';
  if (a.type === 'play') { n.fun = clamp(n.fun + 10 + a.wins * 10); n.log.played++; }
  else { n.hygiene = clamp(n.hygiene + 30); n.log.baths++; }
  if (n.event?.kind === kind) { n.event = null; n.log.eventsAttended++; }
  return n;
}