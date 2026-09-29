import { State } from './game';

export function getMessage(s: State): string {
  if (s.status === 'ghost') {
    return s.ghostReason === 'hunger'
      ? `${s.name} se convirtió en fantasma: ignoraste su hambre dos veces.`
      : `${s.name} se convirtió en fantasma: comió demasiado, tres veces seguidas.`;
  }
  if (s.status === 'ended') return `¡Pasaron las 24 horas! ${s.name} sobrevivió el día.`;
  if (s.foodDeadline !== null) return '¡Tengo hambre! Dame de comer.';
  if (s.event?.kind === 'play') return '¡Quiero jugar contigo!';
  if (s.event?.kind === 'bathroom') return 'Necesito ir al baño…';
  if (s.overfeedStreak >= 2) return 'Ya comí mucho… si sigues, me siento mal.';
  if (s.hunger > 90) return 'Estoy llenísimo, no me cabe más.';
  if (s.hygiene < 25) return 'Estoy sucio, necesito un baño.';
  if (s.fun < 25) return 'Me aburro mucho…';
  if (s.hunger < 25) return 'Me ruge la barriga.';
  return '¡Todo va bien!';
}