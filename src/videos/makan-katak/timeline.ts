import { yippee } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Eat That Frog! (Brian Tracy): kerjakan tugas tersulit ("katak") paling awal. Versi A menunda, B katak dulu.
export const MARKERS = {
  judul: 0.2, // "MAKAN KATAKMU DULU."
  daftar: 0.8,
  katak: 1.4,
  q1: 2.6, // "KALAU KAMU MENUNDA / YANG PALING SULIT..."
  cekA: [3.0, 4.2, 5.4] as const, // tugas kecil dicentang dulu
  q2: 6.4, // "...IA AKAN MENGHANTUI / SEPANJANG HARI."
  gagal: 9.0, // 17:00 — laporan belum selesai
  rewind: 9.6, // putar ulang ke 08:00 (9,6–10,6)
  q3: 10.8, // "MAKAN KATAKMU DULU: / KERJAKAN YANG TERSULIT / DI PAGI HARI."
  lompat: 11.4, // katak melompat ke stickman
  telan: 11.9,
  laporan: 12.8, // laporan selesai (10:00)
  cekB: [13.6, 14.0, 14.4] as const,
  q4: 16.4, // "SISA HARIMU / AKAN TERASA RINGAN."
  pudar: 21.5,
  akhir: 22.5,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Makan katak", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.q1, lines: ["KALAU KAMU MENUNDA", "YANG PALING SULIT..."] },
  { at: M.q2, lines: ["...IA AKAN MENGHANTUI", "SEPANJANG HARI."] },
  { at: M.q3, lines: ["MAKAN KATAKMU DULU:", "KERJAKAN YANG TERSULIT", "DI PAGI HARI."] },
  { at: M.q4, lines: ["SISA HARIMU", "AKAN TERASA RINGAN."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...[M.katak, 4.6, 6.6, 8.4].map((at, i) => ({ at, src: "syn:katak", vol: 0.45 + i * 0.1 })),
  ...[2.6, 4.6, 6.6].map((at) => ({ at, src: "syn:detak-jam", vol: 0.45 })),
  ...M.cekA.map((at) => ({ at, src: "syn:pop-kecil", vol: 0.5 })),
  { at: M.gagal, src: "syn:error", vol: 0.5 },
  { at: M.rewind, src: "syn:rewind", vol: 0.6 },
  { at: M.lompat, src: "syn:boing", vol: 0.5 },
  { at: M.telan, src: "syn:telan", vol: 0.7 },
  { at: M.laporan, src: "syn:sukses", vol: 0.5 },
  ...M.cekB.map((at) => ({ at, src: "syn:pop-kecil", vol: 0.5 })),
  { at: M.q4, src: yippee, vol: 0.5 },
];

export const TYPED: [string, number][] = [
  ["MAKAN KATAKMU DULU.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];

export const DURATION = sec(M.akhir);
