'use client';
import { useEffect, useRef } from 'react';
import Sprite from './Sprites';
import { sprites } from '../libs/sprites';

const LEFTS = [8, 22, 35, 48, 60, 72, 84, 15, 55];

export default function BathActivity({ onDone }: { onDone: () => void }) {
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const t = setTimeout(() => done.current(), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative flex h-[160px] w-full items-end justify-center overflow-hidden">
      {LEFTS.map((l, i) => (
        <span key={i} className="bubble absolute bottom-2 h-3 w-3 rounded-full border-2 border-[#2d3b1f]"
          style={{ left: `${l}%`, animationDelay: `${i * 0.15}s` }} />
      ))}
      <Sprite map={sprites.happy} px={6} />
      <p className="absolute top-0 text-[8px]">¡A bañarse!</p>
    </div>
  );
}