import { mouseClick, whoosh } from "@remotion/sfx";
import type { Cap, PoseAt } from "../mahir-produk-digital/parts";
import type { CamKey } from "../../components/PapanBukti";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/studi-kasus-01-nrhouse/vo.wav";
export const AUDIO_END = 69.48;
export const SUMBER = "Sumber: Instagram @nrhouse_id & nrhouse.id";

/** Subtitle karaoke (akhir jeda VO, silencedetect −30 dB). */
export const CAPTIONS: Cap[] = [
  { t0: 0.26, t1: 4.5, text: "Orang ini bisa dapetin *omzet* *puluhan* *juta* cuma dalam *15* *hari.*" },
  { t0: 4.98, t1: 5.87, text: "Mari kita *bahas.*" },
  { t0: 6.64, t1: 7.85, text: "Namanya *Nurdin.*" },
  { t0: 8.39, t1: 10.17, text: "Hampir *600* *ribu* followers," },
  { t0: 10.56, t1: 13.58, text: "videonya ditonton hampir *8* *juta* kali sebulan." },
  { t0: 14.59, t1: 15.63, text: "Strategi pertama:" },
  { t0: 15.96, t1: 16.75, text: "*personal* *branding.*" },
  { t0: 17.51, t1: 18.87, text: "Dia *jarang* jualan langsung." },
  { t0: 19.42, t1: 21.2, text: "Yang dia tunjukin justru *hidupnya.*" },
  { t0: 21.73, t1: 22.34, text: "*Rumahnya,*" },
  { t0: 22.67, t1: 23.33, text: "*keluarganya,*" },
  { t0: 23.62, t1: 24.71, text: "*kegiatan* *sehari-hari.*" },
  { t0: 25.32, t1: 26.87, text: "Orang jadi *pengin* hidup kayak dia." },
  { t0: 27.63, t1: 28.22, text: "Penasaran," },
  { t0: 28.54, t1: 29.76, text: "orang klik *link* *di* *bio.*" },
  { t0: 30.26, t1: 32.33, text: "Semua produknya ada di *satu* *halaman.*" },
  { t0: 32.85, t1: 33.49, text: "Bingung pilih?" },
  { t0: 33.84, t1: 35.15, text: "Tinggal tanya lewat *WhatsApp.*" },
  { t0: 36.26, t1: 37.15, text: "Produknya *bertingkat.*" },
  { t0: 37.71, t1: 39.49, text: "E-book *Rp149rb,*" },
  { t0: 39.96, t1: 42.15, text: "tools AI mulai *Rp79rb,*" },
  { t0: 42.63, t1: 44.97, text: "kelas online *Rp649rb,*" },
  { t0: 45.36, t1: 47.46, text: "sampai kelas offline *Rp4,5* *juta.*" },
  { t0: 48.1, t1: 49.3, text: "Yang murah buat *kenalan,*" },
  { t0: 49.65, t1: 51.26, text: "yang mahal buat yang udah *percaya.*" },
  { t0: 52.25, t1: 53.16, text: "Strategi kedua:" },
  { t0: 53.48, t1: 53.92, text: "*iklan.*" },
  { t0: 54.51, t1: 57.81, text: "Dia pakai *Meta* *Ads* buat dorong produknya ke lebih banyak orang." },
  { t0: 58.58, t1: 59.25, text: "Pelajarannya:" },
  { t0: 59.59, t1: 61.32, text: "bangun *kepercayaan* lewat konten," },
  { t0: 61.71, t1: 62.88, text: "siapkan *tangga* *produk,*" },
  { t0: 63.27, t1: 64.45, text: "baru *gas* pakai *iklan.*" },
  { t0: 65.16, t1: 66.49, text: "Mau *studi* *kasus* berikutnya?" },
  { t0: 66.89, t1: 67.25, text: "*Follow,*" },
  { t0: 67.5, t1: 69.48, text: "dan komen akun siapa yang mau *dibedah.*" },
];

export const MARKERS = {
  hook: 0.26,
  omzet: 2.2,
  bahas: 4.98,
  nama: 6.64,
  followers: 8.39,
  views: 10.56,
  strategi1: 14.59,
  branding: 15.96,
  jarang: 17.51,
  hidupnya: 19.42,
  rumah: 21.73,
  keluarga: 22.67,
  kegiatan: 23.62,
  pengin: 25.32,
  penasaran: 27.63,
  bio: 28.54,
  halaman: 30.26,
  bingung: 32.85,
  wa: 33.84,
  bertingkat: 36.26,
  ebook: 37.71,
  tools: 39.96,
  online: 42.63,
  offline: 45.36,
  kenalan: 48.1,
  percaya: 49.65,
  strategi2: 52.25,
  meta: 54.51,
  pelajaran: 58.58,
  l1: 59.59,
  l2: 61.71,
  l3: 63.27,
  cta: 65.16,
  follow: 66.89,
  komen: 67.5,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Studi kasus 1", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Kamera papan (dunia papan tegak 1080×3400; jendela 1080×1600). Skala ≤ 1 → lebar papan selalu muat di layar,
 *  kamera bergerak naik-turun + zoom halus (0,94–1) mengikuti bukti yang sedang dibahas — tidak ada yang terpotong. */
export const WORLD = { w: 1080, h: 3400 };
const FULL = { cx: 540, cy: 1700, s: 0.47 };
export const CAM: CamKey[] = [
  { t: 0, ...FULL },
  { t: 0.7, cx: 540, cy: 760, s: 0.94 },
  { t: 2.6, cx: 540, cy: 720, s: 0.98 },
  { t: M.bahas, ...FULL },
  { t: M.nama, cx: 540, cy: 760, s: 0.95 },
  { t: M.followers, cx: 540, cy: 700, s: 1 },
  { t: M.views, cx: 540, cy: 760, s: 0.96 },
  { t: M.strategi1, cx: 540, cy: 1130, s: 0.94 },
  { t: M.hidupnya, cx: 540, cy: 1180, s: 0.97 },
  { t: M.rumah, cx: 540, cy: 1150, s: 1 },
  { t: M.keluarga, cx: 540, cy: 1175, s: 0.98 },
  { t: M.kegiatan, cx: 540, cy: 1200, s: 1 },
  { t: M.pengin, cx: 540, cy: 1250, s: 0.95 },
  { t: M.penasaran, cx: 540, cy: 1760, s: 0.94 },
  { t: M.halaman, cx: 540, cy: 1790, s: 0.98 },
  { t: M.bingung, cx: 540, cy: 1830, s: 1 },
  { t: M.bertingkat, cx: 540, cy: 2280, s: 0.95 },
  { t: M.offline, cx: 540, cy: 2300, s: 1 },
  { t: M.kenalan, cx: 540, cy: 2320, s: 0.97 },
  { t: M.strategi2, cx: 540, cy: 2560, s: 0.95 },
  { t: M.meta, cx: 540, cy: 2600, s: 1 },
  { t: M.meta + 2.0, cx: 540, cy: 2580, s: 0.96 },
  { t: M.pelajaran, ...FULL },
];

/** Pose & posisi karakter (bergantian kiri/kanan per babak). */
export const POSE_AT: PoseAt[] = [
  { at: 0, pose: "semangat", side: "kiri" },
  { at: M.bahas, pose: "tunjuk", side: "kiri" },
  { at: M.nama, pose: "kedip", side: "kiri" },
  { at: M.strategi1, pose: "tunjuk", side: "kanan" },
  { at: M.hidupnya, pose: "mikir", side: "kanan" },
  { at: M.pengin, pose: "jempol", side: "kanan" },
  { at: M.penasaran, pose: "tunjuk", side: "kiri" },
  { at: M.bingung, pose: "kedip", side: "kiri" },
  { at: M.bertingkat, pose: "tunjuk", side: "kanan" },
  { at: M.offline, pose: "semangat", side: "kanan" },
  { at: M.kenalan, pose: "jempol", side: "kanan" },
  { at: M.strategi2, pose: "tunjuk", side: "kiri" },
  { at: M.meta, pose: "semangat", side: "kiri" },
  { at: M.pelajaran, pose: "mikir", side: "kanan" },
  { at: M.l3, pose: "jempol", side: "kanan" },
  { at: M.cta, pose: "tunjuk", side: "kanan" },
  { at: M.follow, pose: "halo", side: "kanan" },
];

export const TANGGA = [
  { at: M.tools, label: "Tools AI", harga: "Rp79rb" },
  { at: M.ebook, label: "E-book", harga: "Rp149rb" },
  { at: M.online, label: "Kelas online", harga: "Rp649rb" },
  { at: M.offline, label: "Kelas offline", harga: "Rp4,5jt" },
];

/** SFX — set papan bukti. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: 0.1, src: "syn:kertas", vol: 0.5 },
  { at: 1.0, src: "syn:pop", vol: 0.5 },
  { at: 1.3, src: "syn:kamera", vol: 0.4 },
  { at: M.omzet + 0.9, src: "syn:pukulan", vol: 0.6 },
  { at: M.bahas, src: whoosh, vol: 0.5 },
  { at: M.nama + 0.3, src: "syn:kertas", vol: 0.4 },
  { at: M.followers, src: "syn:swish", vol: 0.45 },
  { at: M.views, src: "syn:pop", vol: 0.45 },
  { at: M.views + 0.4, src: "syn:swish", vol: 0.4 },
  { at: M.strategi1, src: whoosh, vol: 0.5 },
  { at: M.strategi1 + 0.3, src: "syn:pukulan", vol: 0.5 },
  { at: M.jarang + 0.3, src: "syn:error", vol: 0.25 },
  ...[0, 0.4, 0.8].map((d) => ({ at: M.hidupnya + 0.1 + d, src: "syn:pop", vol: 0.4 })),
  ...[M.rumah, M.keluarga, M.kegiatan].map((at) => ({ at, src: "syn:kamera", vol: 0.4 })),
  { at: M.pengin, src: "syn:swish", vol: 0.4 },
  { at: M.pengin + 0.5, src: "syn:sparkle", vol: 0.45 },
  { at: M.bio, src: mouseClick, vol: 0.6 },
  { at: M.bio + 0.4, src: "syn:pop", vol: 0.45 },
  { at: M.halaman, src: "syn:swipe", vol: 0.4 },
  { at: M.halaman + 0.8, src: "syn:pop", vol: 0.4 },
  { at: M.wa + 0.4, src: "syn:pesan-masuk", vol: 0.5 },
  { at: M.bertingkat, src: "syn:kertas", vol: 0.45 },
  ...TANGGA.map((s, i) => ({ at: s.at + 0.1, src: i === 3 ? "syn:koin-banyak" : "syn:koin", vol: 0.45 })),
  { at: M.kenalan, src: "syn:swish", vol: 0.4 },
  { at: M.percaya, src: "syn:swish", vol: 0.4 },
  { at: M.strategi2, src: whoosh, vol: 0.5 },
  { at: M.strategi2 + 0.5, src: "syn:pop", vol: 0.45 },
  { at: M.meta, src: "syn:riser", vol: 0.3 },
  { at: M.meta + 2.0, src: "syn:pukulan", vol: 0.55 },
  { at: M.pelajaran, src: "syn:whoosh-panjang", vol: 0.35 },
  ...[M.l1, M.l2, M.l3].map((at) => ({ at, src: "syn:kertas", vol: 0.45 })),
  { at: M.l3 + 0.6, src: "syn:sukses", vol: 0.45 },
  { at: M.cta, src: "syn:pop", vol: 0.45 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  ...Array.from({ length: 8 }, (_, i) => ({ at: M.komen + 0.3 + i * 0.1, src: "syn:ketik", vol: 0.35 })),
  { at: M.komen + 1.4, src: "syn:tada", vol: 0.45 },
];

export const DURATION = sec(M.akhir);
