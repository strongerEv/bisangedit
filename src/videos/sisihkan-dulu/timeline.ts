import { dramaticBoomer, whip } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. The Richest Man in Babylon (George S. Clason): "A part of all you earn is yours to keep" — sisihkan 1/10.
export const MARKERS = {
  judul: 0.2, // "BAYAR DIRIMU DULU."
  gaji: 1.0, // 10 koin jatuh ke meja
  q1: 2.2, // "GAJIAN? / JANGAN LANGSUNG DIHABISKAN."
  sisih: 4.5, // 1 koin pertama → celengan
  q2: 4.9, // "SISIHKAN 1 DARI 10 KOIN / UNTUK DIRIMU SENDIRI DULU."
  bayar: 8.0, // 9 koin → SEWA / MAKAN / LAINNYA
  q3: 8.4, // "BARU SISANYA / UNTUK KEBUTUHAN."
  montase: 11.0, // tahun 1 → 10
  q4: 11.2, // "LAKUKAN TIAP BULAN..."
  peti: 15.1, // celengan berubah jadi peti harta
  q5: 15.6, // "SEBAGIAN DARI SEMUA YANG KAMU HASILKAN / ADALAH MILIKMU UNTUK DISIMPAN."
  pudar: 21.0,
  akhir: 22.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Sisihkan dulu", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.q1, lines: ["GAJIAN?", "JANGAN LANGSUNG DIHABISKAN."] },
  { at: M.q2, lines: ["SISIHKAN 1 DARI 10 KOIN", "UNTUK DIRIMU SENDIRI DULU."] },
  { at: M.q3, lines: ["BARU SISANYA", "UNTUK KEBUTUHAN."] },
  { at: M.q4, lines: ["LAKUKAN TIAP BULAN..."] },
  { at: M.q5, lines: ["SEBAGIAN DARI SEMUA YANG KAMU HASILKAN", "ADALAH MILIKMU UNTUK DISIMPAN."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** Koin "bulanan" yang disentil ke celengan selama montase. */
export const BULANAN = Array.from({ length: 12 }, (_, i) => M.montase + 0.3 + i * 0.32);

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: M.gaji - 0.2, src: "syn:notifikasi", vol: 0.5 },
  ...Array.from({ length: 10 }, (_, i) => ({ at: M.gaji + 0.15 + i * 0.1, src: "syn:koin", vol: 0.28 })),
  { at: M.sisih, src: whip, vol: 0.6 },
  ...[0, 0.5, 1.0].map((d) => ({ at: M.bayar + d, src: "syn:tombol", vol: 0.5 })),
  ...BULANAN.map((at) => ({ at, src: "syn:kertas", vol: 0.25 })),
  { at: M.peti, src: dramaticBoomer, vol: 0.6 },
];

export const TYPED: [string, number][] = [
  ["BAYAR DIRIMU DULU.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];

export const DURATION = sec(M.akhir);
