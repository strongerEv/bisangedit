import { mouseClick, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-niche/vo.wav";
export const AUDIO_END = 57.93;

/**
 * Subtitle karaoke. 19 kalimat VO cocok dengan 15 jeda panjang (+ jeda sedang antarkalimat), koma = jeda pendek
 * (silencedetect −30 dB). Waktu kata di dalam klausa dibagi menurut suku kata (wordsOf di parts).
 */
export const CAPTIONS: Cap[] = [
  { t0: 0.25, t1: 2.36, text: "Ada *tiga* *hal* yang orang selalu mau bayar…" },
  { t0: 2.79, t1: 4.03, text: "bahkan pas lagi *bokek.*" },
  { t0: 5.09, t1: 6.63, text: "Sebelum bikin produk digital," },
  { t0: 7.09, t1: 7.98, text: "pilih dulu *nichenya.*" },
  { t0: 8.58, t1: 10.52, text: "Dan tiga ini *nggak* *pernah* *mati.*" },
  { t0: 11.64, t1: 11.99, text: "Satu," },
  { t0: 12.44, t1: 12.94, text: "*kesehatan.*" },
  { t0: 14.08, t1: 15.28, text: "Orang selalu pengin *sehat,*" },
  { t0: 15.75, t1: 16.24, text: "*langsing,*" },
  { t0: 16.54, t1: 17.08, text: "*tidur* *nyenyak.*" },
  { t0: 18.21, t1: 20.94, text: "Misalnya program olahraga *30* *hari* di rumah." },
  { t0: 22.09, t1: 22.45, text: "Dua," },
  { t0: 22.82, t1: 23.34, text: "*kekayaan.*" },
  { t0: 24.27, t1: 25.75, text: "Semua orang pengin uangnya *cukup.*" },
  { t0: 26.81, t1: 29.52, text: "Misalnya template atur gaji yang ngitung *otomatis.*" },
  { t0: 30.63, t1: 30.97, text: "Tiga," },
  { t0: 31.36, t1: 31.77, text: "*hubungan.*" },
  { t0: 32.76, t1: 33.3, text: "Pasangan," },
  { t0: 33.72, t1: 34.23, text: "keluarga," },
  { t0: 34.54, t1: 34.77, text: "anak." },
  { t0: 35.78, t1: 37.84, text: "Misalnya kartu obrolan buat *pasangan.*" },
  { t0: 39.05, t1: 39.57, text: "Bikinnya?" },
  { t0: 39.95, t1: 41.09, text: "Sekarang ada *AI.*" },
  { t0: 41.96, t1: 42.29, text: "*Riset,*" },
  { t0: 42.79, t1: 43.17, text: "*isi,*" },
  { t0: 43.42, t1: 44.99, text: "sampai *desain* bisa dibantu." },
  { t0: 46.18, t1: 48.33, text: "Pilih *satu* yang paling dekat sama hidupmu." },
  { t0: 49.45, t1: 50.24, text: "Udah pilih nichenya?" },
  { t0: 50.76, t1: 52.38, text: "Besok kita belajar *cara* *riset,*" },
  { t0: 52.82, t1: 55.25, text: "biar tahu produk apa yang *beneran* *dicari* orang." },
  { t0: 56.31, t1: 57.64, text: "*Follow* biar nggak ketinggalan." },
];

export const MARKERS = {
  hook: 0.25,
  bokek: 3.2,
  kunci: 5.09,
  nicheNya: 7.09,
  abadi: 8.58,
  sehat: 11.64,
  chip1: [14.6, 15.75, 16.54] as const,
  produk1: 18.21,
  kaya: 22.09,
  cukup: 24.27,
  produk2: 26.81,
  hubungan: 30.63,
  chip3: [32.76, 33.72, 34.54] as const,
  produk3: 35.78,
  bikin: 39.05,
  ai: 39.95,
  riset: 41.96,
  isi: 42.79,
  desain: 43.42,
  pilih: 46.18,
  cta: 49.45,
  besok: 50.76,
  follow: 56.31,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Niche abadi", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "mikir", side: "kiri" },
  { at: M.bokek, pose: "sedih", side: "kiri" },
  { at: M.kunci, pose: "tunjuk", side: "kanan" },
  { at: M.sehat, pose: "jempol", side: "kiri" },
  { at: M.kaya, pose: "tunjuk", side: "kanan" },
  { at: M.produk2, pose: "semangat", side: "kanan" },
  { at: M.hubungan, pose: "kedip", side: "kiri" },
  { at: M.bikin, pose: "mikir", side: "kanan" },
  { at: M.ai, pose: "jempol", side: "kanan" },
  { at: M.pilih, pose: "tunjuk", side: "kiri" },
  { at: M.cta, pose: "mikir", side: "kanan" },
  { at: M.besok, pose: "semangat", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

/** Kalender 30 hari terisi; tabel gaji terisi; kartu obrolan terbalik. */
export const BARIS_GAJI = [
  { label: "Makan", v: 1000000 },
  { label: "Kos", v: 700000 },
  { label: "Transport", v: 300000 },
  { label: "Tabungan", v: 500000 },
];
export const ISI_GAJI = BARIS_GAJI.map((_, i) => M.produk2 + 0.6 + i * 0.45);
export const KARTU = ["Apa mimpimu 5 tahun lagi?", "Kapan kamu paling bahagia?", "Apa yang mau kita coba bareng?"];
export const BALIK = KARTU.map((_, i) => M.produk3 + 0.3 + i * 0.6);

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  ...[0.5, 0.75, 1.0].map((at) => ({ at, src: "syn:pop-kecil", vol: 0.5 })),
  { at: M.bokek, src: "syn:siul-turun", vol: 0.45 },
  { at: M.kunci - 0.1, src: whoosh, vol: 0.6 },
  { at: M.abadi, src: "syn:pukulan", vol: 0.6 },
  ...[M.sehat, M.kaya, M.hubungan].map((at) => ({ at, src: "syn:ding-lonceng", vol: 0.45 })),
  ...[...M.chip1, ...M.chip3, M.cukup].map((at) => ({ at, src: "syn:pop", vol: 0.4 })),
  ...Array.from({ length: 10 }, (_, i) => ({ at: M.produk1 + 0.5 + i * 0.2, src: "syn:klik", vol: 0.35 })),
  ...ISI_GAJI.map((at) => ({ at, src: "syn:koin", vol: 0.35 })),
  ...BALIK.map((at) => ({ at, src: "syn:kertas", vol: 0.4 })),
  { at: M.bikin, src: "syn:tombol", vol: 0.45 },
  ...Array.from({ length: 12 }, (_, i) => ({ at: M.ai + 0.15 + i * 0.1, src: "syn:ketik", vol: 0.4 })),
  { at: M.ai + 1.5, src: "syn:pesan-masuk", vol: 0.5 },
  ...[M.riset, M.isi, M.desain].map((at) => ({ at, src: "syn:pop-kecil", vol: 0.5 })),
  { at: M.pilih + 0.8, src: "syn:sparkle", vol: 0.5 },
  { at: M.cta, src: "syn:swish", vol: 0.5 },
  { at: M.besok + 0.3, src: "syn:klik", vol: 0.5 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  { at: M.follow + 0.4, src: "syn:tada", vol: 0.45 },
];

export const DURATION = sec(M.akhir);
