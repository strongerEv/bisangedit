export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. The 7 Habits of Highly Effective People (Stephen R. Covey), kebiasaan ke-7 "Sharpen the Saw".
export const MARKERS = {
  judul: 0.2, // "ASAH GERGAJIMU."
  mulai: 1.0,
  q1: 3.0, // "DIA TERLALU SIBUK / MENGGERGAJI..."
  asah: 4.2, // stickman kanan berhenti & mengasah (4,2–8,0)
  q2: 6.2, // "...SAMPAI TIDAK SEMPAT / MENGASAH GERGAJINYA."
  tumpul: 6.6,
  tajam: 8.0,
  lanjut: 8.4,
  q3: 11.4, // "BERHENTI SEBENTAR / BUKAN BERARTI KALAH."
  q4: 17.0, // "ASAH DIRIMU: / BELAJAR, ISTIRAHAT, / JAGA KESEHATAN."
  pudar: 22.0,
  akhir: 23.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Asah gergaji", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.q1, lines: ["DIA TERLALU SIBUK", "MENGGERGAJI..."] },
  { at: M.q2, lines: ["...SAMPAI TIDAK SEMPAT", "MENGASAH GERGAJINYA."] },
  { at: M.q3, lines: ["BERHENTI SEBENTAR", "BUKAN BERARTI KALAH."] },
  { at: M.q4, lines: ["ASAH DIRIMU:", "BELAJAR, ISTIRAHAT,", "JAGA KESEHATAN."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** Saat potongan kayu jatuh. Kiri makin lambat (gergaji tumpul), kanan cepat setelah diasah. */
export const POTONG_KIRI = [1.6, 2.6, 3.8, 5.4, 7.4, 9.8, 12.6, 15.8, 19.4];
export const POTONG_KANAN = [1.6, 2.6, 3.6, ...Array.from({ length: 17 }, (_, i) => M.lanjut + 0.2 + i * 0.7)];
const count = (arr: number[], t: number) => arr.filter((a) => t >= a).length;
/** Detik ketika jumlah kayu kanan pertama kali menyalip kiri. */
export const SALIP = POTONG_KANAN.find((a) => a > M.lanjut && count(POTONG_KANAN, a) > count(POTONG_KIRI, a)) ?? M.q3;

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...Array.from({ length: 34 }, (_, i) => ({ at: M.mulai + i * 0.58, src: "syn:gergaji", vol: 0.18 })),
  ...[...Array.from({ length: 5 }, (_, i) => M.mulai + i * 0.58), ...Array.from({ length: 36 }, (_, i) => M.lanjut + i * 0.36)].map((at) => ({ at, src: "syn:gergaji", vol: 0.18 })),
  ...[...POTONG_KIRI, ...POTONG_KANAN].map((at) => ({ at, src: "syn:kayu-jatuh", vol: 0.35 })),
  ...Array.from({ length: 6 }, (_, i) => ({ at: M.asah + 0.2 + i * 0.6, src: "syn:asah", vol: 0.45 })),
  { at: M.tajam, src: "syn:sparkle", vol: 0.55 },
  { at: SALIP, src: "syn:impact", vol: 0.6 },
  ...[0, 0.4, 0.8].map((d) => ({ at: M.q4 + 0.6 + d, src: "syn:tombol", vol: 0.45 })),
];

export const TYPED: [string, number][] = [
  ["ASAH GERGAJIMU.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];

export const DURATION = sec(M.akhir);
