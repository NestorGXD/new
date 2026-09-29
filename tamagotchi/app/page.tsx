'use client';
import { useState } from 'react';
import { useTamagotchi } from '../hooks/useTamagotchi';
import { happiness } from '../libs/game';
import NameForm from '../components/NameForm';
import Clock from '../components/Clock';
import StatBar from '../components/StatBar';
import Pet from '../components/Pet';
import Actions from '../components/Actions';
import Summary from '../components/Summary';
import FeedActivity from '../components/FeedActivity';
import PlayActivity from '../components/PlayActivity';
import BathActivity from '../components/BathActivity';

type Activity = 'feed' | 'play' | 'bath' | null;

export default function Home() {
  const { state, start, feed, play, bathroom, reset } = useTamagotchi();
  const [activity, setActivity] = useState<Activity>(null);
  const over = state.status === 'ended' || state.status === 'ghost';
  const current = state.status === 'playing' ? activity : null;
  const close = () => setActivity(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#dfe7fd] p-4">
      <div className="relative flex w-full max-w-[340px] flex-col items-center gap-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-b from-[#ff9ec4] to-[#ee5c93] px-8 pb-14 pt-20 shadow-[inset_0_-10px_0_rgba(0,0,0,.12),0_10px_0_#b73468]">
        <div className="absolute top-3 h-6 w-6 rounded-full border-4 border-[#b73468] bg-[#dfe7fd]" />

        <div className="lcd w-full rounded-xl border-[6px] border-[#3b2f5e] bg-[#cfe0a8] p-3 text-[#2d3b1f] shadow-[inset_0_0_14px_rgba(45,59,31,.4)]">
          {state.status === 'setup' ? (
            <NameForm onStart={start} />
          ) : (
            <div className="flex flex-col gap-3">
              <Clock seconds={state.seconds} />
              <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                {current === 'feed' && <FeedActivity onDone={(f) => { feed(f); close(); }} />}
                {current === 'play' && <PlayActivity onDone={(w) => { play(w); close(); }} />}
                {current === 'bath' && <BathActivity onDone={() => { bathroom(); close(); }} />}
                {!current && <Pet state={state} />}
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <StatBar label="Hambre" value={state.hunger} />
                <StatBar label="Diversión" value={state.fun} />
                <StatBar label="Higiene" value={state.hygiene} />
                <StatBar label="Felicidad" value={happiness(state)} />
              </div>
            </div>
          )}
        </div>

        {state.status !== 'setup' && !over && (
          <Actions
            state={state}
            disabled={!!current}
            onFeed={() => setActivity('feed')}
            onPlay={() => setActivity('play')}
            onBathroom={() => setActivity('bath')}
          />
        )}
      </div>

      {over && <Summary state={state} onRestart={() => { close(); reset(); }} />}
    </main>
  );
}