import Doodle, { type DoodleName } from "./Doodle";

type Spot = {
  n: DoodleName;
  top: number; // % down the page
  left: number; // % across (can sit in the gutters)
  size: number; // px
  rot: number; // deg
  op: number; // opacity
};

// scattered across the whole scroll. edges get the bold ones,
// a few drift faintly behind the text. all hand-placed for rhythm.
const spots: Spot[] = [
  { n: "ukulele", top: 3, left: 88, size: 92, rot: 12, op: 0.12 },
  { n: "star", top: 5, left: 6, size: 46, rot: 0, op: 0.13 },
  { n: "sparkle", top: 8, left: 70, size: 34, rot: 0, op: 0.1 },
  { n: "note", top: 11, left: 3, size: 40, rot: -8, op: 0.11 },
  { n: "heart", top: 9, left: 40, size: 30, rot: 0, op: 0.05 },
  { n: "camera", top: 15, left: 90, size: 84, rot: -10, op: 0.12 },
  { n: "notes", top: 18, left: 8, size: 60, rot: 10, op: 0.11 },
  { n: "sun", top: 14, left: 55, size: 40, rot: 0, op: 0.05 },
  { n: "ferrari", top: 22, left: 80, size: 120, rot: 0, op: 0.11 },
  { n: "code", top: 24, left: 4, size: 64, rot: -6, op: 0.12 },
  { n: "coffee", top: 27, left: 92, size: 64, rot: 8, op: 0.12 },
  { n: "sparkle", top: 21, left: 35, size: 26, rot: 0, op: 0.05 },
  { n: "terminal", top: 31, left: 7, size: 78, rot: 5, op: 0.11 },
  { n: "heart", top: 30, left: 62, size: 26, rot: 12, op: 0.05 },
  { n: "barca", top: 35, left: 88, size: 96, rot: -8, op: 0.12 },
  { n: "braces", top: 38, left: 3, size: 56, rot: 0, op: 0.11 },
  { n: "star", top: 36, left: 48, size: 24, rot: 0, op: 0.05 },
  { n: "rcb", top: 42, left: 82, size: 90, rot: 10, op: 0.11 },
  { n: "bolt", top: 44, left: 6, size: 50, rot: 0, op: 0.12 },
  { n: "candles", top: 47, left: 90, size: 78, rot: 0, op: 0.12 },
  { n: "notes", top: 45, left: 38, size: 30, rot: -10, op: 0.045 },
  { n: "badge", top: 51, left: 5, size: 80, rot: -12, op: 0.12 },
  { n: "vinyl", top: 54, left: 86, size: 72, rot: 0, op: 0.11 },
  { n: "sparkle", top: 50, left: 60, size: 24, rot: 0, op: 0.05 },
  { n: "gokart", top: 58, left: 8, size: 92, rot: 0, op: 0.12 },
  { n: "headphones", top: 61, left: 90, size: 70, rot: 8, op: 0.12 },
  { n: "shell", top: 57, left: 45, size: 30, rot: 0, op: 0.06 },
  { n: "guitar", top: 65, left: 4, size: 88, rot: -10, op: 0.12 },
  { n: "sandcastle", top: 67, left: 90, size: 92, rot: 0, op: 0.12 },
  { n: "wave", top: 63, left: 55, size: 34, rot: 0, op: 0.06 },
  { n: "palm", top: 70, left: 12, size: 80, rot: -6, op: 0.12 },
  { n: "icecream", top: 73, left: 86, size: 62, rot: 8, op: 0.12 },
  { n: "wave", top: 76, left: 42, size: 30, rot: 0, op: 0.05 },
  { n: "planet", top: 68, left: 70, size: 50, rot: 0, op: 0.05 },
  { n: "biryani", top: 79, left: 5, size: 86, rot: 0, op: 0.12 },
  { n: "pizza", top: 82, left: 88, size: 70, rot: -8, op: 0.12 },
  { n: "dosa", top: 85, left: 10, size: 80, rot: 6, op: 0.11 },
  { n: "sparkle", top: 80, left: 58, size: 24, rot: 0, op: 0.05 },
  { n: "chefhat", top: 88, left: 86, size: 72, rot: 0, op: 0.12 },
  { n: "butterfly", top: 91, left: 6, size: 64, rot: -6, op: 0.12 },
  { n: "moon", top: 94, left: 80, size: 56, rot: 0, op: 0.11 },
  { n: "controller", top: 96, left: 14, size: 64, rot: 8, op: 0.1 },
  { n: "heart", top: 93, left: 50, size: 30, rot: 0, op: 0.06 },
  { n: "plane", top: 2, left: 30, size: 44, rot: 0, op: 0.06 },
  { n: "wave", top: 4, left: 52, size: 30, rot: 0, op: 0.06 },
  { n: "shell", top: 13, left: 38, size: 26, rot: 0, op: 0.045 },
  { n: "palm", top: 88, left: 50, size: 40, rot: 0, op: 0.045 },
  { n: "cloud", top: 99, left: 92, size: 56, rot: 0, op: 0.09 },
];

export default function DoodleField() {
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
