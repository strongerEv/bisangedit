export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/iklan-web-app/yubucanvideo.wav";
export const AUDIO_END = 31.33;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md.
// Pergantian adegan di jeda, ±0,2 dtk sebelum kalimat berikut diucapkan.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0.0, end: 3.7 },
  { id: "S02", label: "Tanda 1", start: 3.7, end: 7.9 },
  { id: "S03", label: "Tanda 2", start: 7.9, end: 11.9 },
  { id: "S04", label: "Tanda 3", start: 11.9, end: 17.6 },
  { id: "S05", label: "Solusi", start: 17.6, end: 23.0 },
  { id: "S06", label: "Karya", start: 23.0, end: 28.4 },
  { id: "S99", label: "Penutup", start: 28.4, end: 33.0 }, // akhir VO 31,33 + ekor ±1,7
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Momen penting di audio (detik, absolut). Awal frasa diukur dari jeda;
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  tigaTanda: 0.26, // "Tiga tanda kantor Anda sudah butuh aplikasi sendiri."
  satu: 3.9, // "Satu:"
  laporan: 4.72, // "laporan masih direkap manual tiap akhir bulan."
  akhirBulan: 6.72, // * "akhir bulan"
  dua: 8.09, // "Dua:"
  data: 8.92, // "data penting tercecer di Excel dan chat WhatsApp."
  excel: 10.35, // * "Excel"
  whatsapp: 11.07, // * "WhatsApp"
  tiga: 12.11, // "Tiga,"
  diabaikan: 12.8, // "yang paling sering diabaikan:"
  timSibuk: 14.68, // "tim sibuk,"
  ituItu: 16.27, // * "itu-itu lagi."
  kalau: 17.81, // "Kalau satu saja kena,"
  saatnya: 19.17, // "saatnya pakai aplikasi web yang dibuat khusus untuk kantor Anda."
  aplikasiWeb: 19.95, // * "aplikasi web"
  seperti: 23.18, // "Seperti sistem laporan outlet"
  kos: 24.87, // * "dan aplikasi manajemen kos"
  sudahKami: 26.25, // * "yang sudah kami bangun di Youcanbuild."
  gratis: 28.6, // "Konsultasinya gratis."
  sekarang: 30.03, // "Konsultasi sekarang juga."
} as const;

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
