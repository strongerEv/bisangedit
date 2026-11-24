import { mouseClick, recordScratch, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-riset/vo.wav";
export const AUDIO_END = 33.57;

/**
 * Subtitle karaoke. Awal klausa = akhir jeda VO (silencedetect −30 dB); waktu kata dibagi menurut suku kata (wordsOf di parts).
 */
export const CAPTIONS: Cap[] = [
  { t0: 0.26, t1: 1.49, text: "Dua minggu bikin *produk…*" },
  { t0: 1.87, t1: 2.48, text: "yang beli:" },
  { t0: 2.76, t1: 3.09, text: "*nol.*" },
  { t0: 3.56, t1: 4.73, text: "Bukan produkmu yang *jelek.*" },
  { t0: 5.2, t1: 6.6, text: "Kamu cuma *nggak* *riset* dulu." },
  { t0: 7.2, t1: 8.21, text: "Ini *tiga* *cara* riset," },
  { t0: 8.56, t1: 9.07, text: "*lima* *menit,*" },
  { t0: 9.39, t1: 10.18, text: "cuma pakai *HP.*" },
  { t0: 10.67, t1: 11.09, text: "Satu," },
  { t0: 11.59, t1: 12.42, text: "*kolom* *pencarian.*" },
  { t0: 13.1, t1: 14.1, text: "Ketik nichemu di TikTok," },
  { t0: 14.48, t1: 15.65, text: "lihat *saran* yang muncul." },
  { t0: 16.16, t1: 17.53, text: "Itu yang *paling* *sering* *dicari.*" },
  { t0: 18.04, t1: 18.4, text: "Dua," },
  { t0: 18.76, t1: 19.48, text: "*kolom* *komentar.*" },
  { t0: 20.02, t1: 21.7, text: "Pertanyaan yang muncul *berulang-ulang,*" },
  { t0: 22.06, t1: 23.56, text: "itu *masalah* yang *belum* *kejawab.*" },
  { t0: 24.17, t1: 24.55, text: "Tiga," },
  { t0: 24.83, t1: 25.66, text: "cek *marketplace.*" },
  { t0: 26.11, t1: 27.64, text: "Kalau produk sejenis sudah *laku,*" },
  { t0: 27.92, t1: 29.2, text: "artinya *pasarnya* *ada.*" },
  { t0: 29.72, t1: 31.9, text: "Besok kita *bikin* *produknya* pakai *AI.*" },
  { t0: 32.41, t1: 33.57, text: "*Follow* biar nggak ketinggalan." },
];

export const MARKERS = {
  hook: 0.26,
  beli: 1.87,
  nol: 2.76,
  bukan: 3.56,
  riset: 5.2,
  janji: 7.2,
  menit: 8.56,
  hp: 9.39,
  satu: 10.67,
  kolom1: 11.59,
  ketik: 13.1,
  saran: 14.48,
  dicari: 16.16,
  dua: 18.04,
  kolom2: 18.76,
  ulang: 20.02,
  masalah: 22.06,
  tiga: 24.17,
  market: 24.83,
  laku: 26.11,
  pasar: 27.92,
  cta: 29.72,
  follow: 32.41,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Cara riset", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "semangat", side: "kiri" },
  { at: M.nol, pose: "sedih", side: "kiri" },
  { at: M.riset, pose: "kesal", side: "kiri" },
  { at: M.janji, pose: "tunjuk", side: "kanan" },
  { at: M.satu, pose: "tunjuk", side: "kiri" },
  { at: M.dicari, pose: "kedip", side: "kiri" },
  { at: M.dua, pose: "mikir", side: "kanan" },
  { at: M.masalah, pose: "semangat", side: "kanan" },
  { at: M.tiga, pose: "jempol", side: "kiri" },
  { at: M.cta, pose: "semangat", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

/** Saran pencarian, komentar berulang, kartu marketplace. */
export const KETIK = "atur gaji";
export const SARAN = ["atur gaji 2 juta", "atur gaji UMR", "atur gaji template"];
export const MUNCUL_SARAN = SARAN.map((_, i) => M.saran + 0.1 + i * 0.3);
export const KOMENTAR = [
  { u: "rina_22", t: "kak gaji 2,5jt gimana bagi-baginya?" },
  { u: "dodi.k", t: "ada template buat atur gaji ga?" },
  { u: "sari99", t: "gaji UMR bisa nabung ga sih 😭" },
  { u: "bayu_r", t: "cara bagi gaji 2jt gimana kak?" },
  { u: "lia.ok", t: "minta templatenya dong kak 🙏" },
];
/** Komentar yang mirip (diberi stabilo). */
export const MIRIP = [0, 1, 3, 4];
export const STABILO = MIRIP.map((_, i) => M.ulang + 0.5 + i * 0.3);

/** SFX — set khusus video ini (beda dari Senin/Selasa). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: 0.3, src: "syn:riser", vol: 0.3 },
  { at: M.beli - 0.05, src: "syn:sukses", vol: 0.4 },
  { at: M.nol - 0.05, src: recordScratch, vol: 0.6 },
  { at: M.nol + 0.15, src: "syn:gagal", vol: 0.35 },
  { at: M.riset + 0.5, src: "syn:impact", vol: 0.55 },
  { at: M.janji - 0.1, src: "syn:swipe", vol: 0.5 },
  ...[M.janji + 0.3, M.menit, M.hp].map((at) => ({ at, src: "syn:pop", vol: 0.4 })),
  { at: M.satu, src: "syn:8bit-koin", vol: 0.35 },
  ...Array.from({ length: KETIK.length }, (_, i) => ({ at: M.ketik + 0.1 + i * 0.08, src: "syn:ketik", vol: 0.4 })),
  ...MUNCUL_SARAN.map((at) => ({ at, src: "syn:pop-kecil", vol: 0.45 })),
  { at: M.dicari + 0.3, src: "syn:ding-lonceng", vol: 0.45 },
  { at: M.dua, src: "syn:8bit-koin", vol: 0.35 },
  { at: M.kolom2 + 0.3, src: "syn:whoosh-panjang", vol: 0.35 },
  ...STABILO.map((at) => ({ at, src: "syn:swish", vol: 0.35 })),
  { at: STABILO[3] + 0.4, src: "syn:notifikasi", vol: 0.45 },
  { at: M.masalah + 0.6, src: "syn:pukulan", vol: 0.6 },
  { at: M.tiga, src: "syn:8bit-koin", vol: 0.35 },
  { at: M.market + 0.2, src: whoosh, vol: 0.5 },
  { at: M.laku + 0.6, src: "syn:kasir", vol: 0.5 },
  { at: M.pasar + 0.4, src: "syn:8bit-levelup", vol: 0.4 },
  { at: M.cta - 0.1, src: "syn:siul-naik", vol: 0.4 },
  { at: M.cta + 1.2, src: "syn:sparkle", vol: 0.45 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  { at: M.follow + 0.4, src: "syn:akord", vol: 0.4 },
];

export const DURATION = sec(M.akhir);
