import { ding, snapchatNotification, whoosh, yippee } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Isi 4 tahap dari buku "Nak, Belajar Soal Uang adalah Bekal Kehidupan" (Jeong Seon Yong). Detik absolut.
export const MARKERS = {
  judul: 0.2, // "4 TAHAP MEMBANGUN KEKAYAAN"
  masuk: 1.2, // stickman kecil masuk dari kiri
  t1: 2.2, // naik ke anak tangga 1
  t1teks: 2.5,
  t2: 7.2,
  t2teks: 7.5,
  gaji: 8.3,
  t3: 13.2,
  t3teks: 13.5,
  t4: 18.4,
  t4teks: 18.7,
  putus: 20.8, // rantai putus
  akhir1: 23.0, // "DI TAHAP MANA KAMU SEKARANG?" + judul buku
  pudar: 26.0,
  akhir: 27.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Tangga kekayaan", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Isi tiap tahap (teks persis mengikuti ringkasan buku). */
export const TAHAP = [
  { at: M.t1, teks: M.t1teks, usia: "0–25", nama: "ANAK-ANAK", lines: ["MASA ANAK-ANAK EKONOMI.", "BELAJAR MENGGUNAKAN UANG."] },
  { at: M.t2, teks: M.t2teks, usia: "25–45", nama: "MUDA", lines: ["MASA MUDA EKONOMI.", "BELAJAR MENGHASILKAN UANG.", "KANTOR ADALAH SEKOLAH YANG MENGGAJIMU."] },
  { at: M.t3, teks: M.t3teks, usia: "45–65", nama: "DEWASA", lines: ["MASA DEWASA EKONOMI.", "MULAI BISNIS,", "PRODUKSI BARANG ATAU JASA."] },
  { at: M.t4, teks: M.t4teks, usia: "65+", nama: "TUA", lines: ["MASA TUA EKONOMI.", "LEPAS DARI BELENGGU UANG,", "RASAKAN MAKNA HIDUP SEJATI."] },
] as const;

export const TYPE_CPS = 30;
/** Detik mulai baris ke-i dari sebuah tahap (baris diketik berurutan). */
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

const lokal = (f: string) => `audio/tangga-kekayaan/${f}`;

/** Jadwal SFX (detik absolut). URL @remotion/sfx dipetakan ke salinan lokal lewat sfx(). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...[M.t1, M.t2, M.t3, M.t4].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.7 })),
  ...[M.t1, M.t2, M.t3, M.t4].flatMap((at) => [0.05, 0.3].map((d) => ({ at: at + d, src: lokal("langkah.wav"), vol: 0.8 }))),
  ...[3.6, 4.4, 5.2].map((at) => ({ at, src: lokal("koin.wav"), vol: 0.5 })),
  { at: M.gaji, src: snapchatNotification, vol: 0.6 },
  ...[14.4, 15.4, 16.4].map((at) => ({ at, src: ding, vol: 0.45 })),
  { at: M.putus, src: lokal("rantai.wav"), vol: 0.9 },
  { at: M.putus + 0.35, src: yippee, vol: 0.6 },
];

export const DURATION = sec(M.akhir);
