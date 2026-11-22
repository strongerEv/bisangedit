export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Konsep zona nyaman / zona tidak nyaman (dari halaman buku yang dikirim user; tanpa kredit sesuai permintaan).
export const MARKERS = {
  judul: 0.2, // "ZONA NYAMAN."
  q1: 1.6, // "DI SINI NYAMAN, / KARENA KAMU TIDAK TERTANTANG."
  keluar: 5.0, // berdiri & melangkah keluar
  q2: 5.4, // "DI LUAR SINI TIDAK NYAMAN..."
  gagal1: 7.4,
  q3: 8.4, // "TAPI DI SINILAH / KESEMPATAN KAMU TUMBUH."
  gagal2: 9.0,
  latihan: 11.0, // LATIHAN KE-1 → 100
  fasih: 14.6,
  meluas: 15.2, // zona nyaman membesar
  q4: 15.6, // "SAAT DITAKLUKKAN, / IA MENJADI ZONA NYAMAN BARU."
  baru: 18.4, // tantangan baru muncul di luar
  q5: 19.6, // "ZONA NYAMANMU / IKUT MEMBESAR."
  pudar: 24.0,
  akhir: 25.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Zona nyaman", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.q1, lines: ["DI SINI NYAMAN,", "KARENA KAMU TIDAK TERTANTANG."] },
  { at: M.q2, lines: ["DI LUAR SINI TIDAK NYAMAN..."] },
  { at: M.q3, lines: ["TAPI DI SINILAH", "KESEMPATAN KAMU TUMBUH."] },
  { at: M.q4, lines: ["SAAT DITAKLUKKAN,", "IA MENJADI ZONA NYAMAN BARU."] },
  { at: M.q5, lines: ["ZONA NYAMANMU", "IKUT MEMBESAR."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: M.keluar, src: "syn:siul-naik", vol: 0.45 },
  { at: M.keluar + 0.4, src: "syn:detak-jantung", vol: 0.8 },
  { at: M.keluar + 2.0, src: "syn:detak-jantung", vol: 0.7 },
  { at: M.gagal1, src: "syn:error", vol: 0.45 },
  { at: M.gagal2, src: "syn:error", vol: 0.45 },
  ...Array.from({ length: 8 }, (_, i) => ({ at: M.latihan + i * 0.45, src: "syn:swipe", vol: 0.45 })),
  { at: M.fasih, src: "syn:ding-lonceng", vol: 0.6 },
  { at: M.meluas - 1.6, src: "syn:riser", vol: 0.5 },
  { at: M.meluas, src: "syn:sparkle", vol: 0.55 },
  ...[0, 0.35, 0.7].map((d) => ({ at: M.baru + d, src: "syn:pop", vol: 0.55 })),
];

export const TYPED: [string, number][] = [
  ["ZONA NYAMAN.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];

export const DURATION = sec(M.akhir);
