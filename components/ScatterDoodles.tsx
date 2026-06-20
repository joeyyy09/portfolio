import Doodle, { type DoodleName } from "./Doodle";

const DECOR: DoodleName[] = ["sparkle", "star", "heart", "note", "bolt"];

// deterministic scatter for any topic-doodle list — topic glyphs ride the
// gutters, little decoratives drift faintly behind the text. fills the page.
export default function ScatterDoodles({ names }: { names: DoodleName[] }) {
  const topics = names.length ? names : ["sparkle" as DoodleName];
  const target = Math.max(topics.length * 2 + 4, 16);

  const spots = Array.from({ length: target }, (_, i) => {
    const topicTurn = i % 2 === 0;
    const onLeft = i % 4 < 2;
    if (topicTurn) {
      const n = topics[(i / 2) % topics.length];
      return {
        n,
        top: 4 + (i * 92) / (target - 1),
        left: onLeft ? 5 + (i % 3) : 91 - (i % 3),
        size: 62 + (i % 3) * 12,
        rot: i % 2 ? 9 : -9,
        op: 0.11,
      };
    }
    return {
      n: DECOR[i % DECOR.length],
      top: 6 + (i * 92) / (target - 1),
      left: 32 + ((i * 13) % 36),
      size: 22 + (i % 3) * 6,
      rot: 0,
      op: 0.05,
    };
  });

  return (
    <div className="doodle-field" aria-hidden="true">
      {spots.map((s, i) => (
        <span
          key={i}
          className="doodle-spot"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
          }}
        >
          <Doodle name={s.n} />
        </span>
      ))}
    </div>
  );
}
