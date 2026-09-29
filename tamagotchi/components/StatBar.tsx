import Sprite from './Sprites';
import { sprites } from '../libs/sprites';

export default function StatBar({ label, value }: { label: string; value: number }) {
  const full = Math.ceil(value / 20); // 5 corazones
  return (
    <div>
      <p className="mb-1 text-[8px]">{label}</p>
      <div className={`flex gap-0.5 ${full <= 1 ? 'animate-pulse' : ''}`} role="meter" aria-label={label} aria-valuenow={Math.round(value)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={i < full ? '' : 'opacity-20'}><Sprite map={sprites.heart} px={2} /></span>
        ))}
      </div>
    </div>
  );
}