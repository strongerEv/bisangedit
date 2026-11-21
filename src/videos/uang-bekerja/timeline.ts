import { mouseClick, skedaddle } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Rich Dad Poor Dad (Robert T. Kiyosaki): "The rich don't work for money." Detik absolut.
export const MARKERS = {
  judul: 0.2, // "UANG YANG BEKERJA."
  qA: 1.8, // "KEBANYAKAN ORANG / BEKERJA UNTUK UANG."
  capek: 5.4, // stickman kiri berhenti → koin berhenti
  qB: 5.8, // "BERHENTI KERJA, / BERHENTI DAPAT UANG."
  mesin: 9.4, // mesin uang kanan disorot
  qC: 9.6, // "ORANG KAYA MEMBUAT / UANG BEKERJA UNTUK MEREKA,"
  malam: 12.8,
  qC2: 13.6, // "BAHKAN SAAT MEREKA TIDUR."
  qD: 17.4, // "ORANG KAYA TIDAK / BEKERJA UNTUK UANG."
  pudar: 22.0,
  akhir: 23.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Uang bekerja", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.qA, lines: ["KEBANYAKAN ORANG", "BEKERJA UNTUK UANG."] },
  { at: M.qB, lines: ["BERHENTI KERJA,", "BERHENTI DAPAT UANG."] },
  { at: M.qC, lines: ["ORANG KAYA MEMBUAT", "UANG BEKERJA UNTUK MEREKA,"] },
  { at: M.qC2, lines: ["BAHKAN SAAT MEREKA TIDUR."] },
  { at: M.qD, lines: ["ORANG KAYA TIDAK", "BEKERJA UNTUK UANG."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** Koin dari roda hamster (hanya saat bekerja) & dari mesin uang (terus-menerus). */
export const KOIN_KIRI = Array.from({ length: 7 }, (_, i) => 0.8 + i * 0.7);
export const KOIN_KANAN = Array.from({ length: 22 }, (_, i) => 1.0 + i * 0.9);

/** Jadwal SFX — set berbeda dari video lain (8-bit & kartun). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...KOIN_KIRI.map((at) => ({ at, src: "syn:8bit-koin", vol: 0.3 })),
  ...KOIN_KANAN.map((at) => ({ at, src: "syn:pop-kecil", vol: 0.25 })),
  { at: 1.2, src: skedaddle, vol: 0.45 },
  { at: M.capek, src: "syn:8bit-kalah", vol: 0.45 },
  { at: M.mesin, src: "syn:8bit-levelup", vol: 0.45 },
  { at: M.mesin + 0.4, src: "syn:boing", vol: 0.45 },
  { at: M.malam, src: "syn:whoosh-panjang", vol: 0.55 },
  { at: M.qD, src: "syn:sukses", vol: 0.6 },
];
export const TICK = mouseClick;

export const DURATION = sec(M.akhir);
