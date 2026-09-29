import Sprite from './Sprites';
import { sprites } from '../libs/sprites';
import { State } from '../libs/game';
import { getMessage } from '../libs/messages';

function pick(s: State) {
  if (s.status === 'ghost') return sprites.ghost;
  if (s.status === 'ended') return sprites.happy;
  if (s.foodDeadline !== null || s.hunger < 25) return sprites.hungry;
  if (s.hygiene < 25 || s.fun < 25 || s.event) return sprites.sad;
  return sprites.happy;
}

export default function Pet({ state }: { state: State }) {
  const anim = state.status === 'ghost' ? 'float' : state.status === 'playing' ? 'bob' : '';
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px]">{state.name}</p>
      <Sprite map={pick(state)} px={6} className={anim} />
      <p className="min-h-[36px] text-[8px] leading-relaxed" aria-live="polite">{getMessage(state)}</p>
    </div>
  );
}