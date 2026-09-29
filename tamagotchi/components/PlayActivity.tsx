'use client';
import { useRef, useState } from 'react';
import Sprite from './Sprites';
import { sprites } from '../libs/sprites';

type Dir = 'L' | 'R';
const ROUNDS = 3;

export default function PlayActivity({ onDone }: { onDone: (wins: number) => void }) {
  const [round, setRound] = useState(0);
  const [wins, setWins] = useState(0);
  const [shown, setShown] = useState<{ dir: Dir; win: boolean } | null>(null);
  const done = useRef(onDone);
  done.current = onDone;

  const guess = (g: Dir) => {
    if (shown) return;
    const dir: Dir = Math.random() < 0.5 ? 'L' : 'R';
    const win = g === dir;
    setShown({ dir, win });
    setTimeout(() => {
      const total = wins + (win ? 1 : 0);
      setWins(total);
      if (round + 1 >= ROUNDS) return done.current(total);
      setRound(round + 1);
      setShown(null);
    }, 900);
  };

  const face = shown ? (shown.win ? sprites.happy : sprites.sad) : sprites.happy;
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[8px]">Ronda {round + 1} de {ROUNDS}</p>
      <div className="flex gap-1">
        {Array.from({ length: ROUNDS }, (_, i) => (
          <span key={i} className={i < wins ? '' : 'opacity-20'}><Sprite map={sprites.heart} px={3} /></span>
        ))}
      </div>
      <div style={{ transform: shown ? `translateX(${shown.dir === 'L' ? -28 : 28}px)` : undefined, transition: 'transform .25s steps(3)' }}>
        <Sprite map={face} px={6} />
      </div>
      <p className="min-h-3 text-[8px]">
        {shown ? (shown.win ? '¡Acertaste!' : '¡Fallaste!') : '¿Hacia dónde irá?'}
      </p>
      <div className="flex gap-4">
        {(['L', 'R'] as const).map((d) => (
          <button key={d} disabled={!!shown} onClick={() => guess(d)}
            className="border-2 border-[#2d3b1f] px-4 py-2 text-xs hover:bg-[#b9cc90] disabled:opacity-40">
            {d === 'L' ? '◀' : '▶'}
          </button>
        ))}
      </div>
    </div>
  );
}