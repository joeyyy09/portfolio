import Doodle, { type DoodleName } from "./Doodle";

// themed doodles for a single section. they ride the page gutters (pushed
// past the text column) and sit behind the words. low opacity, never loud.
export default function SectionDoodles({ names }: { names: DoodleName[] }) {
  if (!names.length) return null;
  const n = names.length;
  return (
    <div className="section-doodles" aria-hidden="true">
      {names.map((name, i) => {
        const onLeft = i % 2 === 1;
        const top = 14 + (i * 70) / Math.max(n - 1, 1);
        const offset = -56 - (i % 2) * 22;
        const size = 52 + (i % 3) * 12;
        const style: React.CSSProperties = {
          top: `${top}%`,
          [onLeft ? "left" : "right"]: `${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.08,
          transform: `rotate(${i % 2 ? 8 : -8}deg)`,
        };
        return (
          <span key={i} className="doodle-spot" style={style}>
            <Doodle name={name} />
          </span>
        );
      })}
    </div>
  );
}
