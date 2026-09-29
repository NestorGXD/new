import { DAY_SECONDS, SEC_PER_HOUR } from '../libs/game';

export default function Clock({ seconds }: { seconds: number }) {
  const hour = Math.floor(seconds / SEC_PER_HOUR);
  const minute = Math.floor(((seconds % SEC_PER_HOUR) / SEC_PER_HOUR) * 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs">Hora simulada</span>
        <span className="text-2xl font-bold tabular-nums">{pad(hour)}:{pad(minute)}</span>
      </div>
      <div className="mt-1 h-1.5 bg-[#b9cc90]">
        <div className="h-full bg-[#2d3b1f]" style={{ width: `${(seconds / DAY_SECONDS) * 100}%` }} />
      </div>
    </div>
  );
}