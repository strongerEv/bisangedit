import { bruh, mouseClick, recordScratch, vineBoom } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. "Man in the Car Paradox" — The Psychology of Money (Morgan Housel). Detik absolut.
export const MARKERS = {
  judul: 0.2, // "PARADOKS PRIA DI DALAM MOBIL"
  qA: 1.4, // "KAMU BELI MOBIL MEWAH / SUPAYA ORANG KAGUM."
  kuras: 1.8, // tabungan terkuras
  mobil: 3.4, // mobil muncul (vine boom)
  jalan1: 4.0, // mobil melaju masuk
  berhenti: 6.4,
  qB: 6.6, // "KAMU PIKIR SEMUA ORANG / MELIHATMU..."
  klakson: 7.2,
  khayal: 7.7, // awan pikiran si pengemudi
  scratch: 10.2, // khayalan pecah
  qC: 10.4, // "PADAHAL MEREKA MEMBAYANGKAN / DIRI MEREKA SENDIRI / DI MOBIL ITU."
  awan1: 10.8,
  awan2: 11.5,
  awan3: 12.2,
  qD: 16.0, // "TIDAK ADA YANG TERKESAN / DENGAN BARANGMU, / SEKAGUM KAMU SENDIRI."
  jalan2: 16.4, // mobil pergi
  bruh: 18.7,
  pudar: 21.0,
  akhir: 22.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Pria di dalam mobil", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.qA, lines: ["KAMU BELI MOBIL MEWAH", "SUPAYA ORANG KAGUM."] },
  { at: M.qB, lines: ["KAMU PIKIR SEMUA ORANG", "MELIHATMU..."] },
  { at: M.qC, lines: ["PADAHAL MEREKA MEMBAYANGKAN", "DIRI MEREKA SENDIRI", "DI MOBIL ITU."] },
  { at: M.qD, lines: ["TIDAK ADA YANG TERKESAN", "DENGAN BARANGMU,", "SEKAGUM KAMU SENDIRI."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

const lokal = (f: string) => `audio/pria-di-mobil/${f}`;

/** Jadwal SFX (detik absolut). URL @remotion/sfx dipetakan ke salinan lokal lewat sfx(). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...[1.9, 2.3, 2.7, 3.0].map((at) => ({ at, src: lokal("koin.wav"), vol: 0.5 })),
  { at: M.mobil, src: vineBoom, vol: 0.7 },
  { at: M.jalan1, src: lokal("mesin.wav"), vol: 0.8 },
  { at: M.klakson, src: lokal("klakson.wav"), vol: 0.8 },
  { at: M.scratch, src: recordScratch, vol: 0.6 },
  ...[M.awan1, M.awan2, M.awan3].map((at) => ({ at, src: mouseClick, vol: 0.6 })),
  { at: M.jalan2, src: lokal("mesin.wav"), vol: 0.8 },
  { at: M.bruh, src: bruh, vol: 0.8 },
];

export const DURATION = sec(M.akhir);
