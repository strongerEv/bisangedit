import { mouseClick, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-harga/vo.wav";
export const AUDIO_END = 45.15;

/**
 * Subtitle karaoke. Awal klausa = akhir jeda VO (silencedetect −30 dB); waktu kata dibagi menurut suku kata (wordsOf di parts).
 */
export const CAPTIONS: Cap[] = [
  { t0: 0.28, t1: 3.73, text: "Ini *tiga* *trik* *pasang* *harga* produk digital biar *langsung* *laku.*" },
  { t0: 4.53, t1: 5.0, text: "Satu," },
  { t0: 5.48, t1: 6.48, text: "cek harga *pesaing.*" },
  { t0: 7.13, t1: 8.23, text: "Cari produk sejenis," },
  { t0: 8.59, t1: 9.43, text: "catat harganya," },
  { t0: 9.84, t1: 11.21, text: "terus ambil di *tengah-tengah.*" },
  { t0: 11.59, t1: 12.55, text: "*Jangan* paling *murah.*" },
  { t0: 13.3, t1: 15.89, text: "Kemurahan malah bikin orang mikir produkmu *jelek.*" },
  { t0: 16.91, t1: 17.27, text: "Dua," },
  { t0: 17.7, t1: 18.84, text: "pakai *angka* *sembilan.*" },
  { t0: 19.68, t1: 20.91, text: "*Rp49.000*" },
  { t0: 21.19, t1: 23.49, text: "kerasa *jauh* lebih murah dari *Rp50.000,*" },
  { t0: 23.89, t1: 25.32, text: "padahal cuma beda *seribu.*" },
  { t0: 26.27, t1: 26.64, text: "Tiga," },
  { t0: 27.02, t1: 27.98, text: "bikin *tiga* *paket.*" },
  { t0: 28.58, t1: 28.94, text: "Basic," },
  { t0: 29.33, t1: 29.67, text: "Lengkap," },
  { t0: 30.03, t1: 30.48, text: "Premium." },
  { t0: 31.21, t1: 33.1, text: "Kebanyakan orang bakal pilih yang *tengah.*" },
  { t0: 33.65, t1: 35.24, text: "Taruh produk *andalanmu* di situ." },
  { t0: 36.22, t1: 36.86, text: "Cek *pesaing,*" },
  { t0: 37.3, t1: 38.0, text: "angka *sembilan,*" },
  { t0: 38.42, t1: 38.9, text: "tiga *paket.*" },
  { t0: 39.83, t1: 40.16, text: "Besok:" },
  { t0: 40.62, t1: 43.17, text: "*tiga* *kesalahan* *pemula* yang bikin produk nggak laku." },
  { t0: 43.75, t1: 45.15, text: "*Follow* biar nggak ketinggalan." },
];

export const MARKERS = {
  hook: 0.28,
  laku: 2.9,
  satu: 4.53,
  pesaing: 5.48,
  cari: 7.13,
  catat: 8.59,
  tengah: 9.84,
  jangan: 11.59,
  kemurahan: 13.3,
  jelek: 15.2,
  dua: 16.91,
  sembilan: 17.7,
  h49: 19.68,
  h50: 21.19,
  seribu: 23.89,
  tiga: 26.27,
  paket: 27.02,
  basic: 28.58,
  lengkap: 29.33,
  premium: 30.03,
  pilih: 31.21,
  taruh: 33.65,
  rekap: [36.22, 37.3, 38.42] as const,
  besok: 39.83,
  kesalahan: 40.62,
  follow: 43.75,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Pasang harga", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "semangat", side: "kiri" },
  { at: M.satu, pose: "tunjuk", side: "kanan" },
  { at: M.cari, pose: "mikir", side: "kanan" },
  { at: M.tengah, pose: "jempol", side: "kanan" },
  { at: M.kemurahan, pose: "kesal", side: "kanan" },
  { at: M.dua, pose: "tunjuk", side: "kiri" },
  { at: M.h50, pose: "kedip", side: "kiri" },
  { at: M.tiga, pose: "tunjuk", side: "kiri" },
  { at: M.pilih, pose: "mikir", side: "kiri" },
  { at: M.taruh, pose: "jempol", side: "kiri" },
  { at: M.rekap[0], pose: "semangat", side: "kanan" },
  { at: M.besok, pose: "sedih", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

/** Harga pesaing (ribu rupiah) di garis harga. */
export const PESAING = [19, 35, 49, 79, 150];
export const MUNCUL_PESAING = PESAING.map((_, i) => M.cari + 0.1 + i * 0.2);
export const PAKET = [
  { n: "Basic", h: 29000, isi: ["Template dasar"] },
  { n: "Lengkap", h: 49000, isi: ["Template otomatis", "Panduan pakai"] },
  { n: "Premium", h: 99000, isi: ["Semua isi Lengkap", "Konsultasi 1×"] },
];

/** SFX — set khusus video ini (beda dari Senin–Jumat). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: 0.28, src: "syn:kasir", vol: 0.45 },
  { at: M.laku, src: "syn:koin-banyak", vol: 0.45 },
  ...[M.satu, M.dua, M.tiga].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.55 })),
  ...MUNCUL_PESAING.map((at) => ({ at, src: "syn:pop-kecil", vol: 0.4 })),
  { at: M.catat, src: "syn:kertas", vol: 0.45 },
  { at: M.tengah + 0.1, src: "syn:swipe", vol: 0.45 },
  { at: M.tengah + 0.9, src: "syn:ding-lonceng", vol: 0.4 },
  { at: M.jangan, src: "syn:error", vol: 0.3 },
  { at: M.kemurahan + 0.4, src: "syn:boing", vol: 0.4 },
  { at: M.jelek + 0.3, src: "syn:pukulan", vol: 0.6 },
  { at: M.sembilan, src: "syn:tombol", vol: 0.45 },
  { at: M.h50 + 0.2, src: "syn:rewind", vol: 0.35 },
  { at: M.h50 + 1.4, src: "syn:jatuh", vol: 0.35 },
  { at: M.seribu + 0.3, src: "syn:8bit-koin", vol: 0.4 },
  ...[M.basic, M.lengkap, M.premium].map((at) => ({ at, src: "syn:pop", vol: 0.45 })),
  { at: M.pilih + 1.2, src: mouseClick, vol: 0.6 },
  { at: M.pilih + 1.3, src: "syn:sparkle", vol: 0.45 },
  { at: M.taruh + 0.5, src: "syn:8bit-levelup", vol: 0.35 },
  ...M.rekap.map((at) => ({ at, src: "syn:klik", vol: 0.45 })),
  { at: M.besok, src: "syn:alarm", vol: 0.25, dur: 1.2 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  { at: M.follow + 0.4, src: "syn:akord", vol: 0.4 },
];

export const DURATION = sec(M.akhir);
