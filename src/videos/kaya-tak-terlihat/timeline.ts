import { animeWow, shutterModern, windowsXpError } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. The Psychology of Money (Morgan Housel): "Wealth is what you don't see." Detik absolut.
export const MARKERS = {
  judul: 0.2, // "KEKAYAAN YANG TIDAK TERLIHAT."
  beli: [0.9, 1.5, 2.1] as const, // mobil, jam, tas muncul di sisi kiri
  qA: 2.6, // "YANG KAMU LIHAT: / MOBIL, JAM, TAS MEWAH."
  selfie: [3.6, 4.1, 4.6] as const,
  qB: 6.6, // "YANG TIDAK KAMU LIHAT..."
  pindai: 8.4, // sinar-X menyapu dari kiri ke kanan
  pindaiSelesai: 9.6,
  qC: 9.8, // "CICILAN. SALDO NOL. / DAN ASET YANG TERUS TUMBUH."
  utang: 9.9, // label cicilan di sisi kiri
  brankas: 11.2, // brankas emas di bawah rumah kanan
  qD: 14.6, // "KEKAYAAN ADALAH / APA YANG TIDAK KAMU LIHAT."
  pudar: 20.0,
  akhir: 21.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Kaya tak terlihat", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.qA, lines: ["YANG KAMU LIHAT:", "MOBIL, JAM, TAS MEWAH."] },
  { at: M.qB, lines: ["YANG TIDAK KAMU LIHAT..."] },
  { at: M.qC, lines: ["CICILAN. SALDO NOL.", "DAN ASET YANG TERUS TUMBUH."] },
  { at: M.qD, lines: ["KEKAYAAN ADALAH", "APA YANG TIDAK KAMU LIHAT."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** Jadwal SFX — set berbeda dari video lain. `syn:` = sintetis, URL = @remotion/sfx (salinan lokal). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...M.beli.map((at) => ({ at, src: "syn:kasir", vol: 0.55 })),
  ...M.selfie.map((at) => ({ at, src: shutterModern, vol: 0.7 })),
  { at: M.pindai - 1.9, src: "syn:riser", vol: 0.6 },
  { at: M.pindai, src: "syn:glitch", vol: 0.6 },
  { at: M.pindai + 0.5, src: "syn:glitch", vol: 0.45 },
  { at: M.utang, src: windowsXpError, vol: 0.7 },
  { at: M.brankas, src: "syn:koin-banyak", vol: 0.6 },
  { at: M.brankas + 0.2, src: animeWow, vol: 0.45, dur: 4.2 },
  { at: M.qD - 2.0, src: "syn:drum-roll", vol: 0.55 },
  { at: M.qD, src: "syn:tada", vol: 0.7 },
];

export const DURATION = sec(M.akhir);
