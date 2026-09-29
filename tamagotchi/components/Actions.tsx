import Sprite from './Sprites';
import { sprites } from '../libs/sprites';
import { State } from '../libs/game';

interface Props { state: State; disabled: boolean; onFeed: () => void; onPlay: () => void; onBathroom: () => void }

export default function Actions({ state, disabled, onFeed, onPlay, onBathroom }: Props) {
  const items = [
    { label: 'Comer', icon: sprites.apple, onClick: onFeed, alert: state.foodDeadline !== null, lift: '' },
    { label: 'Jugar', icon: sprites.ball, onClick: onPlay, alert: state.event?.kind === 'play', lift: 'mt-5' },
    { label: 'Baño', icon: sprites.drop, onClick: onBathroom, alert: state.event?.kind === 'bathroom', lift: '' },
  ];
  return (
    <div className="flex items-start gap-5">
      {items.map((it) => (
        <button key={it.label} disabled={disabled} onClick={it.onClick}
          className={`${it.lift} flex flex-col items-center gap-2 disabled:opacity-50`}>
          <span className={`grid h-14 w-14 place-items-center rounded-full bg-[#ffe066] text-[#3b2f5e] shadow-[0_5px_0_#b8962a] active:translate-y-1 active:shadow-none ${it.alert ? 'animate-pulse ring-4 ring-white' : ''}`}>
            <Sprite map={it.icon} px={4} />
          </span>
          <span className="lcd text-[8px] text-white">{it.label}</span>
        </button>
      ))}
    </div>
  );
}