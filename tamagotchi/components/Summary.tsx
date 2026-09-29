import { State, happiness } from '../libs/game';

export default function Summary({ state, onRestart }: { state: State; onRestart: () => void }) {
  const { log } = state;
  const rows: [string, number][] = [
    ['Comidas pedidas y atendidas', log.fed],
    ['Comidas pedidas e ignoradas', log.foodIgnored],
    ['Comidas de más', log.overfed],
    ['Veces que jugaron', log.played],
    ['Veces que fue al baño', log.baths],
    ['Eventos atendidos', log.eventsAttended],
    ['Eventos ignorados', log.eventsIgnored],
  ];
  return (
    <section className="flex w-full max-w-[340px] flex-col gap-3 rounded-xl bg-white/90 p-4 text-[#2a1f5c]">
      <h2 className="text-lg font-bold">
        {state.status === 'ghost' ? `${state.name} ya no está con nosotros` : `Resumen del día de ${state.name}`}
      </h2>
      <dl className="text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-[#e9e4ff] py-1">
            <dt>{k}</dt><dd className="font-bold tabular-nums">{v}</dd>
          </div>
        ))}
        <div className="flex justify-between py-1">
          <dt>Felicidad final</dt><dd className="font-bold">{happiness(state)}%</dd>
        </div>
      </dl>
      <button onClick={onRestart} className="rounded-lg bg-[#5b4fc7] py-2 font-bold text-white">
        Adoptar otra mascota
      </button>
    </section>
  );
}