import { bruh, ding, mouseClick, recordScratch, uiSwitch, whoosh } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Patokan waktu = urutan cerita + SFX. Semua dalam detik.
export const MARKERS = {
  judul: 0.2, // "WAKTU YANG SAMA." diketik
  kemas: 0.6, // stickman mengemas paket di toko sendiri
  q1: 1.8, // "MEMBANGUN BISNIS 3 TAHUN,"
  tahun2: 3.0,
  tahun3: 4.2,
  pusing: 4.4,
  q2: 4.8, // "KAMU TIDAK SABAR."
  tutup: 5.7, // papan BUKA → TUTUP
  hantu: 6.4, // garis grafik "padahal mau naik"
  jalan: 7.0, // pindah ke kamar kanan
  duduk: 8.4,
  q3: 8.6, // "TAPI BEKERJA UNTUK ORANG LAIN"
  tahunKanan: 9.0, // tahun 1 → 40 mulai berputar
  q4: 10.0, // "40 TAHUN, KAMU SABAR."
  tahun40: 15.2,
  pensiun: 15.4,
  berdiri: 15.8,
  judul2: 16.2, // "KESABARAN BERBEDA."
  pudar: 19.0,
  akhir: 20.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Waktu yang sama", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

const lokal = (f: string) => `audio/kesabaran-bisnis/${f}`; // sintetis (dari buat-sfx.py video terlahir-tampan)

/** Jadwal SFX (detik absolut). URL @remotion/sfx dipetakan ke salinan lokal lewat sfx(). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...[0.6, 1.3, 2.0, 2.7].map((at) => ({ at, src: lokal("langkah.wav"), vol: 0.35 })), // kardus ditaruh
  ...[M.tahun2, M.tahun3, M.tahunKanan].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.7 })),
  { at: M.tutup, src: uiSwitch, vol: 0.9 },
  { at: M.tutup + 0.05, src: recordScratch, vol: 0.55 },
  { at: M.hantu + 0.3, src: bruh, vol: 0.8 },
  ...[0, 0.42, 0.84].map((d) => ({ at: M.jalan + 0.2 + d, src: lokal("langkah.wav"), vol: 0.8 })),
  // absen tiap "tahun" berganti — makin cepat
  ...Array.from({ length: 22 }, (_, i) => ({ at: M.tahunKanan + 0.2 + 6 * Math.pow(i / 22, 1.6), src: mouseClick, vol: 0.35 })),
  { at: M.pensiun, src: ding, vol: 0.8 },
  ...[0, 0.12].map((d) => ({ at: M.pensiun + 0.1 + d, src: lokal("koin.wav"), vol: 0.5 })),
];

export const TYPE_CPS = 26;

export const DURATION = sec(M.akhir);
