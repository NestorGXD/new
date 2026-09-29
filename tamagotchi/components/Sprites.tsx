export default function Sprite({ map, px = 6, className = '' }: { map: string[]; px?: number; className?: string }) {
  return (
    <svg
      width={map[0].length * px} height={map.length * px}
      viewBox={`0 0 ${map[0].length} ${map.length}`}
      shapeRendering="crispEdges" fill="currentColor" className={className} aria-hidden
    >
      {map.flatMap((row, y) =>
        [...row].map((c, x) => (c === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null))
      )}
    </svg>
  );
}