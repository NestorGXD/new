'use client';
import { useState } from 'react';
import Sprite from './Sprites';
import { sprites } from '../libs/sprites';

export default function NameForm({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState('');
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (name.trim()) onStart(name.trim()); }}
      className="flex flex-col gap-4 text-center"
    >
      <Sprite map={sprites.egg} px={6} className="bob mx-auto" />
      <h1 className="text-sm font-bold">Un huevo está por nacer</h1>
      <label htmlFor="name" className="text-[10px]">¿Cómo se llamará tu mascota?</label>
      <input
        id="name" value={name} maxLength={16} autoFocus
        onChange={(e) => setName(e.target.value)}
        className="border-2 border-[#2d3b1f] bg-[#dfeab9] px-3 py-2 text-center outline-none focus:bg-white"
      />
      <button
        disabled={!name.trim()}
        className="bg-[#2d3b1f] py-2 font-bold text-[#cfe0a8] disabled:opacity-40"
      >
        Empezar el día
      </button>
    </form>
  );
}