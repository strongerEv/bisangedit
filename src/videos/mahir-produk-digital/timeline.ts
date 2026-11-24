import { mouseClick, whoosh } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/mahir-produk-digital/vo.wav";
export const AUDIO_END = 38.69;

/**
 * Subtitle karaoke. Awal tiap klausa diukur dari jeda VO (silencedetect −30 dB: 15 kalimat = 15 jeda panjang,
 * koma = jeda pendek). Waktu tiap kata di dalam klausa dibagi menurut jumlah suku kata (lihat wordsOf()).
 */
export const CAPTIONS: { t0: number; t1: number; text: string }[] = [
  { t0: 0.2, t1: 1.57, text: "Dua setengah juta *sebulan…*" },
  { t0: 1.95, t1: 2.66, text: "itu *kamu,* kan?" },
  { t0: 3.73, t1: 4.98, text: "Kenapa nggak dua setengah juta…" },
  { t0: 4.98, t1: 5.45, text: "*seminggu?*" },
  { t0: 6.42, t1: 7.41, text: "Jual *satu* *file*" },
  { t0: 7.51, t1: 8.25, text: "lima puluh ribu." },
  { t0: 9.19, t1: 10.78, text: "Cukup laku *lima* *puluh* *kali* seminggu." },
  { t0: 11.47, t1: 11.92, text: "Sehari," },
  { t0: 12.05, t1: 12.5, text: "*tujuh* *orang.*" },
  { t0: 13.38, t1: 13.99, text: "Kenapa *bisa?*" },
  { t0: 14.91, t1: 16.27, text: "Gaji dibayar pakai *waktu.*" },
  { t0: 16.98, t1: 17.95, text: "Produk digital *nggak.*" },
  { t0: 18.85, t1: 19.68, text: "Dibuat *sekali,*" },
  { t0: 19.98, t1: 20.95, text: "dijual *berkali-kali.*" },
  { t0: 21.75, t1: 22.27, text: "Nggak ada *stok,*" },
  { t0: 22.86, t1: 23.48, text: "nggak ada *ongkir.*" },
  { t0: 24.27, t1: 25.93, text: "Dan tokonya buka *24* *jam,*" },
  { t0: 26.46, t1: 27.55, text: "laku waktu kamu *tidur.*" },
  { t0: 28.39, t1: 29.29, text: "Bukan *cepat* *kaya.*" },
  { t0: 30.11, t1: 31.55, text: "Tapi satu produk yang laku terus," },
  { t0: 31.82, t1: 32.94, text: "bisa jadi *gaji* *keduamu.*" },
  { t0: 33.95, t1: 36.33, text: "Mau tahu produk digital apa yang paling *gampang* *dibikin?*" },
  { t0: 37.14, t1: 37.48, text: "*Follow,*" },
  { t0: 37.73, t1: 38.52, text: "dan komen *MAU.*" },
];

// Babak & momen penting (detik).
export const MARKERS = {
  hook: 0.2,
  ituKamu: 1.95,
  kenapaNggak: 3.73,
  seminggu: 4.98,
  hitung: 6.42, // "Jual satu file…"
  kali: 9.19,
  hasil: 10.2, // = Rp2.500.000
  sehari: 11.47,
  kenapaBisa: 13.38,
  gaji: 14.91,
  produk: 16.98,
  alasan1: 18.85,
  alasan2: 21.75,
  alasan3: 24.27,
  tidur: 26.46,
  realita: 28.39,
  gajiKedua: 30.11,
  keduamu: 31.82,
  cta: 33.95,
  follow: 37.14,
  komen: 37.73,
  akhir: AUDIO_END + 0.8,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Produk digital", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

/** Pose karakter per detik (berganti dengan efek "pop"). */
export const POSE_AT: { at: number; pose: string }[] = [
  { at: 0, pose: "makan" },
  { at: M.kenapaNggak, pose: "mikir" },
  { at: M.seminggu, pose: "kedip" },
  { at: M.hitung, pose: "tunjuk" },
  { at: M.sehari, pose: "jempol" },
  { at: M.kenapaBisa, pose: "mikir" },
  { at: M.gaji, pose: "nguap" },
  { at: M.produk, pose: "kedip" },
  { at: M.alasan1, pose: "tunjuk" },
  { at: M.alasan3, pose: "jempol" },
  { at: M.realita, pose: "sedih" },
  { at: M.keduamu, pose: "jempol" },
  { at: M.cta, pose: "semangat" },
  { at: M.follow, pose: "halo" },
];

/** SFX — set khusus video ini (akun @mahirambilpeluang). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: M.hook, src: "syn:pop", vol: 0.55 },
  { at: M.ituKamu, src: "syn:pukulan", vol: 0.6 }, // stempel
  { at: M.seminggu - 0.15, src: whoosh, vol: 0.7 },
  { at: M.seminggu + 0.1, src: "syn:sparkle", vol: 0.5 },
  { at: M.hitung, src: "syn:pop", vol: 0.5 },
  { at: M.kali, src: "syn:klik", vol: 0.6 },
  { at: M.hasil, src: "syn:kasir", vol: 0.55 },
  { at: M.sehari, src: "syn:pop-kecil", vol: 0.5 },
  { at: M.kenapaBisa, src: "syn:tombol", vol: 0.5 },
  { at: M.gaji, src: "syn:detak-jam", vol: 0.45 },
  { at: M.produk, src: "syn:ding-lonceng", vol: 0.4 },
  ...[M.alasan1, M.alasan2, M.alasan3].map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.55 })),
  { at: M.alasan1 + 1.2, src: "syn:koin-banyak", vol: 0.45 },
  ...[M.alasan2 + 0.25, M.alasan2 + 1.35].map((at) => ({ at, src: "syn:error", vol: 0.25 })),
  { at: M.tidur, src: "syn:notifikasi", vol: 0.55 },
  { at: M.tidur + 0.6, src: "syn:pesan-masuk", vol: 0.45 },
  { at: M.realita, src: "syn:pukulan", vol: 0.6 },
  { at: M.gajiKedua - 1.0, src: "syn:riser", vol: 0.35 },
  { at: M.keduamu, src: "syn:sukses", vol: 0.5 },
  { at: M.cta, src: "syn:swish", vol: 0.5 },
  { at: M.follow, src: mouseClick, vol: 0.7 },
  ...[0, 0.12, 0.24].map((d) => ({ at: M.komen + 0.1 + d, src: "syn:ketik", vol: 0.5 })),
  { at: M.komen + 0.7, src: "syn:tada", vol: 0.5 },
];

export const DURATION = sec(M.akhir);
