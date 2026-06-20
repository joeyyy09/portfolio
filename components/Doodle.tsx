import type { ReactNode } from "react";

export type DoodleName =
  | "ferrari"
  | "barca"
  | "rcb"
  | "ukulele"
  | "guitar"
  | "camera"
  | "chefhat"
  | "coffee"
  | "note"
  | "notes"
  | "heart"
  | "star"
  | "sun"
  | "code"
  | "braces"
  | "terminal"
  | "candles"
  | "gokart"
  | "headphones"
  | "plane"
  | "planet"
  | "badge"
  | "pizza"
  | "biryani"
  | "dosa"
  | "butterfly"
  | "vinyl"
  | "cloud"
  | "bolt"
  | "sparkle"
  | "controller"
  | "wing"
  | "moon"
  | "rocket"
  | "sandcastle"
  | "wave"
  | "shell"
  | "palm"
  | "icecream"
  | "qr"
  | "rupee"
  | "phone"
  | "lock"
  | "network"
  | "wifi"
  | "server"
  | "gauge"
  | "chat"
  | "checks"
  | "database"
  | "gear"
  | "branch"
  | "bug"
  | "warning"
  | "shield"
  | "book"
  | "bulb"
  | "compass";

const glyphs: Record<DoodleName, ReactNode> = {
  ferrari: (
    <>
      <path d="M8 60 q18 -14 58 -14 l24 0 q12 -18 42 -18 l36 0 q20 0 20 18 l0 10 q0 12 -18 12 z" />
      <path d="M122 30 l8 -14 l32 0 l-6 14" />
      <circle cx="52" cy="72" r="16" />
      <circle cx="52" cy="72" r="5" />
      <circle cx="142" cy="72" r="16" />
      <circle cx="142" cy="72" r="5" />
    </>
  ),
  barca: (
    <>
      <path d="M18 14 H82 V58 q0 30 -32 42 q-32 -12 -32 -42 Z" />
      <path d="M18 44 H82" />
      <path d="M50 14 V44" />
      <path d="M40 58 V92 M50 58 V96 M60 58 V92" />
    </>
  ),
  rcb: (
    <>
      <path d="M20 14 H80 V56 q0 28 -30 44 q-30 -16 -30 -44 Z" />
      <path d="M36 50 q14 -16 28 0" />
      <circle cx="42" cy="46" r="2.5" />
      <circle cx="58" cy="46" r="2.5" />
      <path d="M40 64 q10 12 20 0" />
    </>
  ),
  ukulele: (
    <>
      <ellipse cx="40" cy="64" rx="24" ry="28" />
      <circle cx="40" cy="62" r="7" />
      <path d="M52 44 L84 14" />
      <path d="M80 10 l10 10 l-8 8 l-10 -10 z" />
      <path d="M46 48 L78 18 M50 52 L82 22" />
    </>
  ),
  guitar: (
    <>
      <ellipse cx="38" cy="68" rx="22" ry="22" />
      <ellipse cx="44" cy="46" rx="16" ry="15" />
      <circle cx="40" cy="62" r="6" />
      <path d="M54 40 L86 12" />
      <path d="M84 8 l10 6 l-6 10 l-10 -6 z" />
    </>
  ),
  camera: (
    <>
      <rect x="14" y="34" width="72" height="48" rx="8" />
      <path d="M34 34 l6 -10 h20 l6 10" />
      <circle cx="50" cy="58" r="15" />
      <circle cx="50" cy="58" r="6" />
      <circle cx="74" cy="44" r="2.5" />
    </>
  ),
  chefhat: (
    <>
      <path d="M28 56 q-16 -2 -16 -18 q0 -16 18 -16 q4 -16 22 -16 q18 0 22 16 q18 0 18 16 q0 16 -16 18" />
      <path d="M30 56 h40 v18 q0 4 -6 4 h-28 q-6 0 -6 -4 z" />
      <path d="M40 56 v22 M50 56 v22 M60 56 v22" />
    </>
  ),
  coffee: (
    <>
      <path d="M22 44 h44 v18 q0 16 -16 16 h-12 q-16 0 -16 -16 z" />
      <path d="M66 48 h10 q8 0 8 8 q0 8 -8 8 h-8" />
      <path d="M34 30 q4 -6 0 -12 M48 30 q4 -6 0 -12 M62 30 q4 -6 0 -12" />
    </>
  ),
  note: (
    <>
      <circle cx="34" cy="74" r="12" />
      <path d="M46 74 V20 q18 4 22 22" />
    </>
  ),
  notes: (
    <>
      <circle cx="30" cy="72" r="10" />
      <circle cx="66" cy="80" r="10" />
      <path d="M40 72 V24 l36 -10 v48" />
      <path d="M40 36 l36 -10" />
    </>
  ),
  heart: (
    <path d="M50 82 C16 58 18 24 42 26 C50 27 50 36 50 40 C50 36 50 27 58 26 C82 24 84 58 50 82 Z" />
  ),
  star: (
    <path d="M50 8 L61 38 L93 38 L67 58 L77 90 L50 70 L23 90 L33 58 L7 38 L39 38 Z" />
  ),
  sun: (
    <>
      <circle cx="50" cy="50" r="20" />
      <path d="M50 8 V20 M50 80 V92 M8 50 H20 M80 50 H92 M20 20 L28 28 M80 20 L72 28 M20 80 L28 72 M80 80 L72 72" />
    </>
  ),
  code: (
    <>
      <path d="M34 28 L12 50 L34 72" />
      <path d="M66 28 L88 50 L66 72" />
      <path d="M56 22 L44 78" />
    </>
  ),
  braces: (
    <>
      <path d="M40 18 q-12 0 -12 14 q0 14 -14 18 q14 4 14 18 q0 14 12 14" />
      <path d="M60 18 q12 0 12 14 q0 14 14 18 q-14 4 -14 18 q0 14 -12 14" />
    </>
  ),
  terminal: (
    <>
      <rect x="12" y="22" width="76" height="56" rx="8" />
      <path d="M12 36 H88" />
      <path d="M26 52 L38 60 L26 68" />
      <path d="M46 68 H66" />
    </>
  ),
  candles: (
    <>
      <path d="M14 14 V86 H88" />
      <path d="M32 40 V70 M32 30 V40 M32 70 V78" />
      <rect x="26" y="40" width="12" height="22" />
      <path d="M54 28 V58 M54 20 V28 M54 58 V66" />
      <rect x="48" y="34" width="12" height="18" />
      <path d="M76 48 V74 M76 40 V48 M76 74 V82" />
      <rect x="70" y="50" width="12" height="16" />
    </>
  ),
  gokart: (
    <>
      <path d="M10 60 L30 60 L40 44 L70 44 L78 60 L90 60" />
      <path d="M40 44 L48 60 L72 60" />
      <circle cx="26" cy="68" r="12" />
      <circle cx="78" cy="68" r="12" />
      <path d="M44 44 q6 -10 16 -10" />
    </>
  ),
  headphones: (
    <>
      <path d="M18 60 V52 a32 32 0 0 1 64 0 V60" />
      <rect x="12" y="58" width="16" height="26" rx="6" />
      <rect x="72" y="58" width="16" height="26" rx="6" />
    </>
  ),
  plane: (
    <>
      <path d="M14 30 L90 18 L40 84 L34 56 Z" />
      <path d="M90 18 L34 56" />
    </>
  ),
  planet: (
    <>
      <circle cx="50" cy="48" r="22" />
      <ellipse cx="50" cy="52" rx="42" ry="14" transform="rotate(-20 50 52)" />
    </>
  ),
  badge: (
    <>
      <path d="M50 8 l10 8 l13 -2 l3 13 l10 8 l-6 12 l4 13 l-13 3 l-7 11 l-11 -7 l-11 7 l-7 -11 l-13 -3 l4 -13 l-6 -12 l10 -8 l3 -13 l13 2 z" />
      <path d="M50 30 L56 44 L70 44 L59 53 L63 68 L50 59 L37 68 L41 53 L30 44 L44 44 Z" />
    </>
  ),
  pizza: (
    <>
      <path d="M50 12 L86 80 Q50 92 14 80 Z" />
      <path d="M20 76 Q50 84 80 76" />
      <circle cx="42" cy="46" r="4" />
      <circle cx="58" cy="56" r="4" />
      <circle cx="44" cy="66" r="4" />
    </>
  ),
  biryani: (
    <>
      <path d="M14 50 h72 q-4 30 -36 30 q-32 0 -36 -30 z" />
      <path d="M14 50 q36 -12 72 0" />
      <circle cx="34" cy="44" r="2.5" />
      <circle cx="50" cy="40" r="2.5" />
      <circle cx="66" cy="44" r="2.5" />
      <path d="M38 30 q4 -6 0 -12 M54 30 q4 -6 0 -12 M70 30 q4 -6 0 -12" />
    </>
  ),
  dosa: (
    <>
      <path d="M16 70 q34 -8 68 0" />
      <path d="M22 64 L58 18 q8 -6 12 4 L74 60" />
      <path d="M30 56 L56 28" />
    </>
  ),
  butterfly: (
    <>
      <path d="M50 30 V78" />
      <path d="M50 36 q-30 -28 -38 -4 q-6 22 38 18" />
      <path d="M50 36 q30 -28 38 -4 q6 22 -38 18" />
      <path d="M50 30 l-6 -10 M50 30 l6 -10" />
    </>
  ),
  vinyl: (
    <>
      <circle cx="50" cy="50" r="38" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="50" cy="50" r="2.5" />
    </>
  ),
  cloud: (
    <path d="M28 70 q-16 0 -16 -14 q0 -14 16 -14 q4 -16 22 -16 q16 0 18 16 q14 0 14 14 q0 14 -14 14 z" />
  ),
  bolt: <path d="M56 8 L26 54 L46 54 L40 92 L72 42 L50 42 Z" />,
  sparkle: (
    <path d="M50 12 q6 26 32 38 q-26 6 -32 38 q-6 -32 -32 -38 q26 -12 32 -38 z" />
  ),
  controller: (
    <>
      <path d="M30 38 h40 q22 0 22 24 q0 18 -16 18 q-10 0 -14 -10 h-24 q-4 10 -14 10 q-16 0 -16 -18 q0 -24 22 -24 z" />
      <path d="M24 56 h14 M31 49 v14" />
      <circle cx="68" cy="52" r="3.5" />
      <circle cx="78" cy="62" r="3.5" />
    </>
  ),
  wing: (
    <path d="M14 70 q34 -8 44 -34 q2 24 28 30 q-26 8 -30 4 q-18 6 -42 0 z" />
  ),
  moon: <path d="M64 14 a40 40 0 1 0 18 64 a30 30 0 1 1 -18 -64 z" />,
  rocket: (
    <>
      <path d="M50 10 q22 18 22 44 l-12 16 h-20 l-12 -16 q0 -26 22 -44 z" />
      <circle cx="50" cy="44" r="8" />
      <path d="M38 64 l-12 14 l16 -4 M62 64 l12 14 l-16 -4" />
      <path d="M44 80 q6 12 12 0" />
    </>
  ),
  sandcastle: (
    <>
      <path d="M12 82 q38 -12 76 0" />
      <rect x="30" y="50" width="40" height="30" />
      <rect x="22" y="40" width="14" height="40" />
      <rect x="64" y="40" width="14" height="40" />
      <path d="M50 50 V26 M50 28 l12 5 l-12 5" />
      <path d="M44 80 v-12 q6 -7 12 0 v12" />
    </>
  ),
  wave: (
    <>
      <path d="M12 58 C32 36 44 58 32 70 C25 77 16 72 21 62" />
      <path d="M6 82 q22 -8 46 0 t46 0" />
    </>
  ),
  shell: (
    <>
      <path d="M50 80 C20 70 14 40 26 26 C30 22 34 28 38 26 C42 22 46 30 50 26 C54 22 58 30 62 26 C66 22 70 22 74 26 C86 40 80 70 50 80 Z" />
      <path d="M50 80 L38 32 M50 80 L50 26 M50 80 L62 32 M50 80 L28 42 M50 80 L72 42" />
    </>
  ),
  palm: (
    <>
      <path d="M48 84 q-4 -30 10 -50" />
      <path d="M58 34 q-24 -12 -38 -2 M58 34 q-12 -24 -30 -22 M58 34 q14 -24 34 -16 M58 34 q24 -8 30 8 M58 34 q-2 -24 6 -26" />
      <circle cx="52" cy="38" r="3" />
      <circle cx="62" cy="38" r="3" />
    </>
  ),
  icecream: (
    <>
      <path d="M40 50 L50 84 L60 50" />
      <circle cx="43" cy="44" r="11" />
      <circle cx="57" cy="44" r="11" />
      <circle cx="50" cy="32" r="11" />
      <circle cx="50" cy="18" r="3" />
    </>
  ),
  qr: (
    <>
      <rect x="14" y="14" width="22" height="22" />
      <rect x="21" y="21" width="8" height="8" />
      <rect x="64" y="14" width="22" height="22" />
      <rect x="71" y="21" width="8" height="8" />
      <rect x="14" y="64" width="22" height="22" />
      <rect x="21" y="71" width="8" height="8" />
      <path d="M48 16 v8 M48 32 h8 M64 48 h8 M48 64 v8 M64 72 h8 M80 56 v8 M56 48 v8" />
    </>
  ),
  rupee: (
    <>
      <path d="M36 24 H64" />
      <path d="M36 40 H64" />
      <path d="M44 24 C64 24 64 56 40 56 L62 80" />
    </>
  ),
  phone: (
    <>
      <rect x="30" y="12" width="40" height="76" rx="8" />
      <path d="M44 20 H56" />
      <circle cx="50" cy="78" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="26" y="44" width="48" height="40" rx="6" />
      <path d="M36 44 V32 a14 14 0 0 1 28 0 V44" />
      <circle cx="50" cy="60" r="5" />
      <path d="M50 60 V72" />
    </>
  ),
  network: (
    <>
      <circle cx="24" cy="28" r="8" />
      <circle cx="76" cy="28" r="8" />
      <circle cx="50" cy="76" r="8" />
      <path d="M31 32 L44 70 M69 32 L56 70 M32 28 H68" />
    </>
  ),
  wifi: (
    <>
      <path d="M16 44 a48 48 0 0 1 68 0" />
      <path d="M28 56 a30 30 0 0 1 44 0" />
      <path d="M38 68 a16 16 0 0 1 24 0" />
      <circle cx="50" cy="80" r="3" />
    </>
  ),
  server: (
    <>
      <rect x="20" y="24" width="60" height="20" rx="4" />
      <rect x="20" y="52" width="60" height="20" rx="4" />
      <circle cx="32" cy="34" r="2.5" />
      <circle cx="32" cy="62" r="2.5" />
      <path d="M58 34 H70 M58 62 H70" />
    </>
  ),
  gauge: (
    <>
      <path d="M16 70 a34 34 0 0 1 68 0" />
      <path d="M50 70 L70 44" />
      <circle cx="50" cy="70" r="4" />
      <path d="M22 60 l6 3 M50 36 v6 M78 60 l-6 3" />
    </>
  ),
  chat: (
    <>
      <path d="M16 22 H84 V60 H46 L30 78 V60 H16 Z" />
      <circle cx="38" cy="41" r="3" />
      <circle cx="50" cy="41" r="3" />
      <circle cx="62" cy="41" r="3" />
    </>
  ),
  checks: (
    <>
      <path d="M16 52 L30 66 L58 34" />
      <path d="M42 60 L48 66 L82 26" />
    </>
  ),
  database: (
    <>
      <ellipse cx="50" cy="26" rx="30" ry="10" />
      <path d="M20 26 V74 a30 10 0 0 0 60 0 V26" />
      <path d="M20 50 a30 10 0 0 0 60 0" />
    </>
  ),
  gear: (
    <>
      <circle cx="50" cy="50" r="16" />
      <circle cx="50" cy="50" r="6" />
      <path d="M50 18 V30 M50 70 V82 M18 50 H30 M70 50 H82 M27 27 l9 9 M64 64 l9 9 M73 27 l-9 9 M36 64 l-9 9" />
    </>
  ),
  branch: (
    <>
      <circle cx="30" cy="24" r="8" />
      <circle cx="30" cy="76" r="8" />
      <circle cx="70" cy="40" r="8" />
      <path d="M30 32 V68" />
      <path d="M30 50 q0 -14 32 -12" />
    </>
  ),
  bug: (
    <>
      <ellipse cx="50" cy="56" rx="18" ry="22" />
      <circle cx="50" cy="32" r="10" />
      <path d="M42 26 l-8 -8 M58 26 l8 -8" />
      <path d="M32 46 H16 M32 56 H12 M32 66 H16 M68 46 H84 M68 56 H88 M68 66 H84" />
      <path d="M50 40 V78" />
    </>
  ),
  warning: (
    <>
      <path d="M50 16 L86 80 H14 Z" />
      <path d="M50 40 V62" />
      <circle cx="50" cy="72" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M50 14 L82 26 V52 q0 26 -32 36 q-32 -10 -32 -36 V26 Z" />
      <path d="M38 50 L48 60 L66 36" />
    </>
  ),
  book: (
    <>
      <path d="M16 24 q18 -8 34 0 q16 -8 34 0 V78 q-18 -8 -34 0 q-16 -8 -34 0 Z" />
      <path d="M50 24 V78" />
    </>
  ),
  bulb: (
    <>
      <path d="M50 16 a22 22 0 0 1 14 38 q-4 4 -4 10 H40 q0 -6 -4 -10 a22 22 0 0 1 14 -38 Z" />
      <path d="M40 74 H60 M44 82 H56" />
    </>
  ),
  compass: (
    <>
      <circle cx="50" cy="50" r="34" />
      <path d="M50 30 L60 50 L50 70 L40 50 Z" />
      <circle cx="50" cy="50" r="3" />
    </>
  ),
};

export default function Doodle({
  name,
  className = "doodle",
}: {
  name: DoodleName;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[name]}
      </g>
    </svg>
  );
}
