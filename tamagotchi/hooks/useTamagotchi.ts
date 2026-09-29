'use client';
import { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../libs/game';

export function useTamagotchi() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 1 tick por segundo real = 1/6 de hora simulada
  useEffect(() => {
    if (state.status !== 'playing') return;
    const id = setInterval(
      () => dispatch({ type: 'tick', roll: Math.random(), pick: Math.random() }),
      1000
    );
    return () => clearInterval(id);
  }, [state.status]);

  return {
    state,
    start: (name: string) => dispatch({ type: 'start', name }),
    feed: (food: 'apple' | 'cake') => dispatch({ type: 'feed', food }),
    play: (wins: number) => dispatch({ type: 'play', wins }),
    bathroom: () => dispatch({ type: 'bathroom' }),
    reset: () => dispatch({ type: 'reset' }),
  };
}