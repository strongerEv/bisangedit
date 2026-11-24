import { mouseClick, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-bikin-ai/vo.wav";
export const AUDIO_END = 34.02;

/**
 * Subtitle karaoke. Awal klausa = akhir jeda VO (silencedetect −30 dB); waktu kata dibagi menurut suku kata (wordsOf di parts).
 */
export const CAPTIONS: Cap[] = [
  { t0: 0.34, t1: 0.73, text: "Dulu" },
  { t0: 1.12, t1: 2.71, text: "bikin produk digital butuh *tim…*" },
  { t0: 3.13, t1: 3.86, text: "dan *sebulan.*" },
  { t0: 4.54, t1: 4.98, text: "Sekarang?" },
  { t0: 5.47, t1: 6.02, text: "*Sendirian,*" },
  { t0: 6.46, t1: 7.06, text: "*satu* *malam.*" },
  { t0: 8.19, t1: 8.68, text: "Caranya:" },
  { t0: 9.07, t1: 10.27, text: "*tiga* *perintah* ke AI." },
  { t0: 11.15, t1: 11.5, text: "Satu," },
  { t0: 11.93, t1: 12.63, text: "minta *isinya.*" },
  { t0: 13.44, t1: 16.38, text: "\"Buatkan kategori atur gaji dua juta untuk anak kos.\"" },
  { t0: 17.48, t1: 17.76, text: "Dua," },
  { t0: 18.22, t1: 18.93, text: "minta *rumusnya.*" },
  { t0: 19.88, t1: 22.2, text: "\"Buatkan rumus Google Sheets yang ngitung *otomatis.*\"" },
  { t0: 23.25, t1: 23.53, text: "Tiga," },
  { t0: 23.99, t1: 24.82, text: "minta *tampilannya.*" },
  { t0: 25.67, t1: 26.06, text: "*Warna,*" },
  { t0: 26.37, t1: 26.72, text: "*judul,*" },
  { t0: 27.02, t1: 28.09, text: "sampai *cover* jualannya." },
  { t0: 29.22, t1: 29.9, text: "Produknya *jadi.*" },
  { t0: 30.46, t1: 30.75, text: "Besok:" },
  { t0: 31.27, t1: 32.0, text: "*jualnya* *di* *mana.*" },
  { t0: 32.86, t1: 34.02, text: "*Follow* biar nggak ketinggalan." },
];

export const MARKERS = {
  dulu: 0.34,
  tim: 1.12,
  sebulan: 3.13,
  sekarang: 4.54,
  sendirian: 5.47,
  malam: 6.46,
  caranya: 8.19,
  tiga: 9.07,
  satu: 11.15,
  isi: 11.93,
  prompt1: 13.44,
  balas1: 16.4,
  dua: 17.48,
  rumus: 18.22,
  prompt2: 19.88,
  isiTabel: 21.4,
  tigaLangkah: 23.25,
  tampil: 23.99,
  warna: 25.67,
  judul: 26.37,
  cover: 27.02,
  jadi: 29.22,
  besok: 30.46,
  mana: 31.27,
  follow: 32.86,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Bikin pakai AI", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "mikir", side: "kiri" },
  { at: M.sebulan, pose: "nguap", side: "kiri" },
  { at: M.sendirian, pose: "semangat", side: "kanan" },
  { at: M.caranya, pose: "tunjuk", side: "kanan" },
  { at: M.satu, pose: "mikir", side: "kiri" },
  { at: M.balas1, pose: "jempol", side: "kiri" },
  { at: M.dua, pose: "tunjuk", side: "kanan" },
  { at: M.isiTabel, pose: "kedip", side: "kanan" },
  { at: M.tigaLangkah, pose: "mikir", side: "kiri" },
  { at: M.cover, pose: "semangat", side: "kiri" },
  { at: M.jadi, pose: "jempol", side: "kanan" },
  { at: M.besok, pose: "tunjuk", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

export const PROMPT1 = "Buatkan kategori atur gaji 2 juta untuk anak kos";
export const PROMPT2 = "Buatkan rumus Google Sheets yang ngitung otomatis";
export const BARIS = [
  { label: "Makan", pct: 40 },
  { label: "Kos", pct: 30 },
  { label: "Transport", pct: 10 },
  { label: "Tabungan", pct: 20 },
];
export const BALAS1 = BARIS.map((_, i) => M.balas1 + 0.1 + i * 0.22);
export const ISI = BARIS.map((_, i) => M.isiTabel + i * 0.3);
export const TIM = [0, 1, 2].map((i) => M.tim + 0.2 + i * 0.35);

/** SFX — set khusus video ini (beda dari Senin–Rabu). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...TIM.map((at) => ({ at, src: "syn:langkah", vol: 0.45 })),
  { at: M.sebulan, src: "syn:kertas", vol: 0.45 },
  { at: M.sebulan + 0.4, src: "syn:detak-jam", vol: 0.35 },
  { at: M.sekarang - 0.2, src: "syn:rewind", vol: 0.4 },
  { at: M.sendirian - 0.1, src: whoosh, vol: 0.6 },
  { at: M.malam + 0.3, src: "syn:gong", vol: 0.4 },
  { at: M.caranya, src: "syn:tombol", vol: 0.45 },
  { at: M.tiga + 0.4, src: "syn:pop", vol: 0.45 },
  ...[M.satu, M.dua, M.tigaLangkah].map((at) => ({ at, src: "syn:boing", vol: 0.35 })),
  ...Array.from({ length: 14 }, (_, i) => ({ at: M.prompt1 + 0.1 + i * 0.18, src: "syn:ketik", vol: 0.35 })),
  { at: M.balas1 - 0.1, src: "syn:pesan-masuk", vol: 0.5 },
  ...BALAS1.map((at) => ({ at, src: "syn:pop-kecil", vol: 0.4 })),
  ...Array.from({ length: 10 }, (_, i) => ({ at: M.prompt2 + 0.1 + i * 0.13, src: "syn:ketik", vol: 0.35 })),
  ...ISI.map((at) => ({ at, src: "syn:klik", vol: 0.45 })),
  { at: ISI[3] + 0.35, src: "syn:kasir", vol: 0.45 },
  { at: M.warna, src: "syn:swish", vol: 0.45 },
  { at: M.judul, src: "syn:swish", vol: 0.45 },
  { at: M.cover, src: "syn:kamera", vol: 0.45 },
  { at: M.jadi, src: "syn:tada", vol: 0.5 },
  { at: M.besok, src: "syn:siul-naik", vol: 0.35 },
  { at: M.mana + 0.2, src: "syn:ding-lonceng", vol: 0.4 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  { at: M.follow + 0.4, src: "syn:sukses", vol: 0.4 },
];

export const DURATION = sec(M.akhir);
