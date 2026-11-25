import { mouseClick, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-tempat-jual/vo.wav";
export const AUDIO_END = 63.3;

/**
 * Subtitle karaoke. Awal klausa = akhir jeda VO (silencedetect −30 dB); waktu kata dibagi menurut suku kata (wordsOf di parts).
 */
export const CAPTIONS: Cap[] = [
  { t0: 0.25, t1: 4.92, text: "Ini *tiga* *tempat* *jualan* produk digital yang bisa ngasilin *jutaan* *rupiah,*" },
  { t0: 5.36, t1: 6.46, text: "cukup dari *HP.*" },
  { t0: 7.57, t1: 8.09, text: "Satu," },
  { t0: 8.35, t1: 9.04, text: "*toko* *lokal.*" },
  { t0: 9.96, t1: 10.92, text: "Ada *Lynk,*" },
  { t0: 11.49, t1: 12.02, text: "*Mayar,*" },
  { t0: 12.56, t1: 13.32, text: "*KaryaKarsa,*" },
  { t0: 13.88, t1: 14.68, text: "atau *Scalev.*" },
  { t0: 15.89, t1: 18.3, text: "Pembeli bayar pakai *QRIS* atau *e-wallet,*" },
  { t0: 19.03, t1: 20.69, text: "filenya *terkirim* *otomatis.*" },
  { t0: 21.52, t1: 23.2, text: "Cocok buat pembeli *Indonesia.*" },
  { t0: 24.27, t1: 24.64, text: "Dua," },
  { t0: 25.04, t1: 25.92, text: "*platform* *global.*" },
  { t0: 26.78, t1: 27.51, text: "Ada *Gumroad,*" },
  { t0: 28.27, t1: 28.76, text: "*Etsy,*" },
  { t0: 29.46, t1: 29.86, text: "*Payhip,*" },
  { t0: 30.4, t1: 31.02, text: "dan *Ko-fi.*" },
  { t0: 32.03, t1: 33.51, text: "Pembelinya dari *seluruh* *dunia,*" },
  { t0: 34.06, t1: 34.93, text: "dibayar *dolar.*" },
  { t0: 35.77, t1: 36.42, text: "Syaratnya," },
  { t0: 36.71, t1: 38.42, text: "produkmu pakai *bahasa* *Inggris.*" },
  { t0: 39.53, t1: 39.87, text: "Tiga," },
  { t0: 40.25, t1: 41.33, text: "mau *tanpa* *potongan?*" },
  { t0: 41.84, t1: 43.1, text: "Bikin *website* *sendiri.*" },
  { t0: 43.76, t1: 45.39, text: "Sekarang bisa dibantu *AI.*" },
  { t0: 46.32, t1: 47.22, text: "Pembeli *transfer,*" },
  { t0: 47.55, t1: 48.69, text: "kamu kirim filenya." },
  { t0: 49.56, t1: 50.61, text: "*Nol* *persen* potongan," },
  { t0: 51.16, t1: 53.41, text: "dan tokomu kelihatan lebih *profesional.*" },
  { t0: 54.46, t1: 55.39, text: "Mulai dari *satu,*" },
  { t0: 55.78, t1: 57.19, text: "yang paling *cocok* buat kamu." },
  { t0: 58.13, t1: 58.47, text: "Besok:" },
  { t0: 59.17, t1: 60.89, text: "berapa *harga* yang *pas* biar laku." },
  { t0: 61.87, t1: 63.3, text: "*Follow* biar nggak ketinggalan." },
];

export const MARKERS = {
  hook: 0.25,
  jutaan: 3.3,
  hp: 5.36,
  satu: 7.57,
  lokal: 8.35,
  lokalApp: [9.96, 11.49, 12.56, 13.88] as const,
  bayar: 15.89,
  terkirim: 19.03,
  indonesia: 21.52,
  dua: 24.27,
  global: 25.04,
  globalApp: [26.78, 28.27, 29.46, 30.4] as const,
  dunia: 32.03,
  dolar: 34.06,
  syarat: 35.77,
  inggris: 36.71,
  tiga: 39.53,
  potongan: 40.25,
  website: 41.84,
  ai: 43.76,
  transfer: 46.32,
  kirim: 47.55,
  nol: 49.56,
  pro: 51.16,
  mulai: 54.46,
  cocok: 55.78,
  besok: 58.13,
  harga: 59.17,
  follow: 61.87,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Tempat jualan", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "semangat", side: "kiri" },
  { at: M.hp, pose: "kedip", side: "kiri" },
  { at: M.satu, pose: "tunjuk", side: "kanan" },
  { at: M.bayar, pose: "mikir", side: "kanan" },
  { at: M.terkirim, pose: "jempol", side: "kanan" },
  { at: M.dua, pose: "tunjuk", side: "kiri" },
  { at: M.dunia, pose: "semangat", side: "kiri" },
  { at: M.syarat, pose: "mikir", side: "kiri" },
  { at: M.tiga, pose: "tunjuk", side: "kanan" },
  { at: M.ai, pose: "kedip", side: "kanan" },
  { at: M.nol, pose: "jempol", side: "kanan" },
  { at: M.mulai, pose: "tunjuk", side: "kiri" },
  { at: M.besok, pose: "semangat", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

export const LOKAL = ["Lynk.id", "Mayar", "KaryaKarsa", "Scalev"];
export const GLOBAL = ["Gumroad", "Etsy", "Payhip", "Ko-fi"];
/** Langkah alur beli lokal: link di bio → toko → QRIS ✓ → file terkirim. */
export const ALUR = [M.bayar + 0.1, M.bayar + 1.0, M.bayar + 1.9, M.terkirim + 0.3];
/** Blok website tersusun (dibantu AI). */
export const BLOK = [0, 1, 2, 3].map((i) => M.ai + 0.2 + i * 0.3);

/** SFX — set khusus video ini (beda dari Senin–Kamis). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: 0.25, src: "syn:boom-sinematik", vol: 0.35 },
  ...[0.6, 0.85, 1.1].map((at) => ({ at, src: "syn:pop", vol: 0.4 })),
  { at: M.jutaan, src: "syn:koin-banyak", vol: 0.5 },
  { at: M.hp, src: "syn:notifikasi", vol: 0.4 },
  ...[M.satu, M.dua, M.tiga].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.55 })),
  ...[...M.lokalApp, ...M.globalApp].map((at) => ({ at, src: "syn:pop-kecil", vol: 0.45 })),
  { at: ALUR[0], src: "syn:klik", vol: 0.5 },
  { at: ALUR[1], src: "syn:swipe", vol: 0.4 },
  { at: ALUR[2], src: "syn:kasir", vol: 0.45 },
  { at: ALUR[3], src: "syn:pesan-masuk", vol: 0.5 },
  { at: M.indonesia + 0.2, src: "syn:ding-lonceng", vol: 0.4 },
  { at: M.dunia, src: "syn:whoosh-panjang", vol: 0.35 },
  { at: M.dolar + 0.2, src: "syn:8bit-koin", vol: 0.4 },
  { at: M.inggris + 0.5, src: "syn:tombol", vol: 0.4 },
  { at: M.potongan + 0.2, src: "syn:siul-turun", vol: 0.35 },
  ...BLOK.map((at) => ({ at, src: "syn:kayu-jatuh", vol: 0.3 })),
  { at: M.transfer + 0.3, src: "syn:notifikasi", vol: 0.45 },
  { at: M.kirim + 0.3, src: "syn:swish", vol: 0.45 },
  { at: M.nol + 0.3, src: "syn:pukulan", vol: 0.6 },
  { at: M.pro + 0.8, src: "syn:sparkle", vol: 0.45 },
  ...[0, 0.15, 0.3].map((d) => ({ at: M.mulai + d, src: "syn:pop", vol: 0.4 })),
  { at: M.cocok + 0.4, src: "syn:sukses", vol: 0.45 },
  { at: M.besok, src: "syn:siul-naik", vol: 0.35 },
  { at: M.harga, src: "syn:drum-roll", vol: 0.3, dur: 1.6 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  { at: M.follow + 0.4, src: "syn:tada", vol: 0.45 },
];

export const DURATION = sec(M.akhir);
