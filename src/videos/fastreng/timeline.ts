export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/fastreng/cireng.wav";
export const AUDIO_END = 42.05;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  jualan: 0.0, // "Jualan cireng,"
  manual: 1.51, // "tapi pesanan masih dicatat manual dari chat?"
  kenalin: 4.33, // "Kenalin:"
  fastreng: 5.34, // "Fastreng."
  aplikasi: 6.74, // "Aplikasi pesan-antar cireng yang bisa dibuka di HP,"
  install: 9.65, // "bahkan dipasang kayak aplikasi biasa."
  tapFoto: 12.04, // "Pembeli tinggal tap foto menu."
  sekaliTap: 13.99, // "Sekali tap,"
  satuPorsi: 14.95, // "satu porsi masuk keranjang."
  diantar: 16.98, // "Pilih diantar atau ambil sendiri,"
  alamat: 19.11, // "isi alamat,"
  tekanWa: 20.03, // "lalu tekan Pesan via WhatsApp."
  masukWa: 22.24, // "Pesanan langsung masuk ke WhatsApp penjual."
  rapi: 24.48, // "Rapi,"
  total: 25.22, // "lengkap dengan total bayarnya."
  dashboard: 27.25, // "Penjual juga punya dashboard:"
  omzet: 28.87, // "omzet,"
  terlaris: 29.8, // "menu terlaris, sampai jam paling ramai."
  jamRamai: 31.16, // * "jam paling ramai"
  cocok: 32.5, // "Cocok untuk UMKM kuliner yang jualan lewat WhatsApp,"
  lewatWa: 34.4, // * "jualan lewat WhatsApp"
  profesional: 35.83, // "dan mau terlihat lebih profesional."
  mau: 38.09, // "Mau dibikinin aplikasi kayak gini buat usahamu?"
  komen: 40.92, // "Komen"
  kataMau: 41.63, // ""mau"."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0, end: M.aplikasi - 0.2 },
  { id: "S02", label: "Apa itu Fastreng", start: M.aplikasi - 0.2, end: M.tapFoto - 0.2 },
  { id: "S03", label: "Tap foto = +1", start: M.tapFoto - 0.2, end: M.diantar - 0.2 },
  { id: "S04", label: "Checkout", start: M.diantar - 0.2, end: M.masukWa - 0.2 },
  { id: "S05", label: "Masuk WhatsApp", start: M.masukWa - 0.2, end: M.dashboard - 0.2 },
  { id: "S06", label: "Dashboard", start: M.dashboard - 0.2, end: M.cocok - 0.2 },
  { id: "S07", label: "Cocok untuk", start: M.cocok - 0.2, end: M.mau - 0.2 },
  { id: "S99", label: "Komen mau", start: M.mau - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
