import { mouseClick, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-kesalahan/vo.wav";
export const AUDIO_END = 47.13;

/**
 * Subtitle karaoke. Awal klausa = akhir jeda VO (silencedetect −30 dB); waktu kata dibagi menurut suku kata (wordsOf di parts).
 */
export const CAPTIONS: Cap[] = [
  { t0: 0.27, t1: 3.99, text: "Ini *tiga* *kesalahan* *pemula* yang bikin produk digital *nggak* *laku.*" },
  { t0: 4.46, t1: 5.87, text: "Nomor *dua* paling *sering.*" },
  { t0: 6.71, t1: 7.15, text: "Satu," },
  { t0: 7.48, t1: 8.17, text: "*bikin* *dulu,*" },
  { t0: 8.39, t1: 9.32, text: "*riset* *belakangan.*" },
  { t0: 9.68, t1: 10.66, text: "Udah capek bikin," },
  { t0: 10.87, t1: 12.14, text: "ternyata *nggak* *ada* yang *nyari.*" },
  { t0: 12.97, t1: 13.32, text: "Dua," },
  { t0: 13.55, t1: 14.33, text: "*nunggu* *sempurna.*" },
  { t0: 14.84, t1: 15.65, text: "Revisi terus," },
  { t0: 15.9, t1: 16.82, text: "nggak pernah *dijual.*" },
  { t0: 17.22, t1: 19.3, text: "Padahal versi pertama *nggak* *harus* *sempurna,*" },
  { t0: 19.69, t1: 20.99, text: "yang penting *dirilis.*" },
  { t0: 21.87, t1: 22.22, text: "Tiga," },
  { t0: 22.44, t1: 24.06, text: "jualan *sekali* terus *nyerah.*" },
  { t0: 24.62, t1: 25.55, text: "Satu video sepi," },
  { t0: 25.74, t1: 26.51, text: "langsung *berhenti.*" },
  { t0: 27.01, t1: 28.84, text: "Padahal yang laku itu yang *konsisten.*" },
  { t0: 29.64, t1: 30.44, text: "*Rekap* *seminggu:*" },
  { t0: 30.95, t1: 32.56, text: "pahami kenapa *produk* *digital,*" },
  { t0: 32.82, t1: 33.42, text: "pilih *niche,*" },
  { t0: 33.67, t1: 34.01, text: "*riset,*" },
  { t0: 34.39, t1: 35.47, text: "bikin pakai *AI,*" },
  { t0: 35.73, t1: 36.72, text: "pilih *tempat* *jualan,*" },
  { t0: 36.94, t1: 37.54, text: "pasang *harga.*" },
  { t0: 38.31, t1: 39.31, text: "*Simpan* video ini." },
  { t0: 39.74, t1: 43.2, text: "Selanjutnya, kita bongkar cara orang-orang *beneran* *jualan* produk digital," },
  { t0: 43.54, t1: 44.89, text: "dari *nol* sampai *laku.*" },
  { t0: 45.64, t1: 47.13, text: "*Follow* biar nggak ketinggalan." },
];

export const MARKERS = {
  hook: 0.27,
  nomorDua: 4.46,
  satu: 6.71,
  bikin: 7.48,
  riset: 8.39,
  capek: 9.68,
  nyari: 10.87,
  dua: 12.97,
  sempurna: 13.55,
  revisi: 14.84,
  dijual: 15.9,
  padahal2: 17.22,
  rilis: 19.69,
  tiga: 21.87,
  nyerah: 22.44,
  sepi: 24.62,
  berhenti: 25.74,
  konsisten: 27.01,
  rekap: 29.64,
  langkah: [30.95, 32.82, 33.67, 34.39, 35.73, 36.94] as const,
  simpan: 38.31,
  studi: 39.74,
  nol: 43.54,
  follow: 45.64,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Kesalahan pemula", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "kesal", side: "kiri" },
  { at: M.satu, pose: "semangat", side: "kanan" },
  { at: M.capek, pose: "nguap", side: "kanan" },
  { at: M.nyari, pose: "sedih", side: "kanan" },
  { at: M.dua, pose: "mikir", side: "kiri" },
  { at: M.padahal2, pose: "tunjuk", side: "kiri" },
  { at: M.rilis, pose: "jempol", side: "kiri" },
  { at: M.tiga, pose: "sedih", side: "kanan" },
  { at: M.konsisten, pose: "semangat", side: "kanan" },
  { at: M.rekap, pose: "tunjuk", side: "kiri" },
  { at: M.langkah[5], pose: "jempol", side: "kiri" },
  { at: M.simpan, pose: "kedip", side: "kanan" },
  { at: M.studi, pose: "tunjuk", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

export const LANGKAH = ["Kenapa produk digital", "Pilih niche", "Riset", "Bikin pakai AI", "Tempat jualan", "Pasang harga"];
export const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/** SFX — set khusus video ini (beda dari Senin–Sabtu). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: 0.27, src: "syn:alarm", vol: 0.25, dur: 1.0 },
  ...[0.7, 0.95, 1.2].map((at) => ({ at, src: "syn:pop", vol: 0.4 })),
  { at: M.nomorDua, src: "syn:glitch", vol: 0.35 },
  ...[M.satu, M.dua, M.tiga].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.55 })),
  { at: M.bikin + 0.8, src: "syn:sukses", vol: 0.35 },
  { at: M.nyari + 0.2, src: "syn:gagal", vol: 0.35 },
  { at: M.nyari + 0.9, src: "syn:pukulan", vol: 0.55 },
  ...Array.from({ length: 8 }, (_, i) => ({ at: M.revisi + i * 0.25, src: "syn:klik", vol: 0.3 })),
  { at: M.padahal2 + 0.5, src: "syn:tombol", vol: 0.45 },
  { at: M.rilis + 0.2, src: "syn:boom-sinematik", vol: 0.3 },
  { at: M.rilis + 0.5, src: "syn:tada", vol: 0.4 },
  { at: M.berhenti + 0.1, src: "syn:siul-turun", vol: 0.4 },
  { at: M.konsisten, src: "syn:riser", vol: 0.3 },
  { at: M.konsisten + 1.0, src: "syn:pukulan", vol: 0.55 },
  ...M.langkah.map((at) => ({ at, src: "syn:8bit-lompat", vol: 0.35 })),
  { at: M.langkah[5] + 0.6, src: "syn:8bit-levelup", vol: 0.4 },
  { at: M.simpan + 0.3, src: mouseClick, vol: 0.6 },
  { at: M.studi + 0.3, src: "syn:swish", vol: 0.45 },
  { at: M.nol + 0.3, src: "syn:koin-banyak", vol: 0.4 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  { at: M.follow + 0.4, src: "syn:gong", vol: 0.35 },
];

export const DURATION = sec(M.akhir);
