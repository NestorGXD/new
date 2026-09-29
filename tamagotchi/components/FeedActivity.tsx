'use client';
import { useEffect, useRef, useState } from 'react';
import Sprite from './Sprites';
import { sprites } from '../libs/sprites';

export type Food = 'apple' | 'cake';
const BITES = 6;

export default function FeedActivity({ onDone }: { onDone: (food: Food) => void }) {
  const [food, setFood] = useState<Food | null>(null);
  const [bites, setBites] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (!food) return;
    const t = setTimeout(
      () => (bites >= BITES ? done.current(food) : setBites((b) => b + 1)),
      bites >= BITES ? 500 : 400
    );
    return () => clearTimeout(t);
  }, [food, bites]);

  if (!food) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-[8px]">¿Qué quiere comer?</p>
        <div className="flex gap-4">
          {(['apple', 'cake'] as const).map((f) => (
            <button key={f} onClick={() => setFood(f)}
              className="flex flex-col items-center gap-2 border-2 border-[#2d3b1f] p-3 text-[8px] hover:bg-[#b9cc90]">
              <Sprite map={sprites[f]} px={5} />
              {f === 'apple' ? 'Manzana' : 'Pastel'}
            </button>
          ))}
        </div>
      </div>
    );
  }
  const open = bites % 2 === 0 && bites < BITES;
  return (
    <div className="flex items-center gap-3">
      {bites < BITES && (
        <div style={{ transform: `scale(${1 - bites / 8})` }}><Sprite map={sprites[food]} px={5} /></div>
      )}
      <Sprite map={open ? sprites.eatOpen : sprites.eatClosed} px={6} />
    </div>
  );
}