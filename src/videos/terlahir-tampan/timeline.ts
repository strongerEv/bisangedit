import { ding, mouseClick, priceIsRightFail, whoosh } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Patokan waktu = urutan cerita + SFX. Semua dalam detik.
export const MARKERS = {
  judul: 0.2, // "PAGI YANG SAMA." mulai diketik
  alarm1: 0.8,
  tunda1: 1.9,
  jam0605: 2.3,
  alarm2: 2.5,
  tunda2: 3.4,
  jam0610: 3.8,
  alarm3: 4.0,
  tunda3: 4.9,
  q1: 5.2, // "TERKADANG AKU MERASA / TIDAK INGIN PERGI BEKERJA,"
  duduk: 5.3,
  saldoMulai: 5.4,
  q2: 8.0, // "TAPI KEMUDIAN AKU INGAT..."
  berdiri: 8.2,
  keCermin: 8.6,
  q3: 9.8, // "AKU TERLAHIR TAMPAN,"
  tampan: 9.9,
  q4: 11.4, // "BUKAN KAYA."
  bukanKaya: 11.5,
  sepuluhM: 12.2, // saldo kiri tembus 10 M + konfeti
  judul2: 12.6, // "NASIB BERBEDA."
  jam0645: 13.6,
  jalan: 13.9,
  diPintu: 15.4,
  pintu: 15.6,
  jam0700: 16.1,
  hari: 16.2, // HARI KERJA 1 → 1.825
  pudar: 18.0,
  akhir: 19.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Pagi yang sama", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

const lokal = (f: string) => `audio/terlahir-tampan/${f}`; // SFX sintetis (buat-sfx.py) untuk yang tidak ada di @remotion/sfx

/** Jadwal SFX (detik absolut). `src` = URL @remotion/sfx atau berkas lokal di public/. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...[M.alarm1, M.alarm2, M.alarm3].map((at) => ({ at, src: lokal("alarm.wav"), vol: 0.7 })),
  ...[M.tunda1, M.tunda2, M.tunda3].map((at) => ({ at, src: mouseClick, vol: 0.8 })),
  ...[M.jam0605, M.jam0610, M.jam0645, M.jam0700].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.7 })),
  { at: M.tampan, src: ding, vol: 0.7 },
  { at: M.bukanKaya, src: priceIsRightFail, vol: 0.6, dur: 4.6 },
  ...[0, 0.12, 0.3].map((d) => ({ at: M.sepuluhM + d, src: lokal("koin.wav"), vol: 0.6 })),
  ...[0, 0.42, 0.84, 1.26].map((d) => ({ at: M.jalan + 0.15 + d, src: lokal("langkah.wav"), vol: 0.8 })),
  { at: M.pintu, src: lokal("pintu.wav") },
];

/** Teks atas & kutipan yang diketik (detik mulai, kecepatan huruf/dtk). */
export const TYPE_CPS = 26;

export const DURATION = sec(M.akhir);
