export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/duitku/voduitku.wav";
export const AUDIO_END = 41.51;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB, 22 potongan = 22 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  ada: 0.28, // "Ada yang ngutang,"
  tapi: 1.49, // "tapi kamu sungkan nagihnya?"
  sungkan: 2.1, // * "sungkan"
  kenalin: 3.53, // "Kenalin"
  duitku: 4.41, // "Duitku."
  aplikasi: 5.59, // "Aplikasi catat keuangan,"
  sekaligus: 7.39, // "sekaligus penagih hutang lewat WhatsApp."
  whatsapp: 8.83, // * "lewat WhatsApp"
  catat: 10.53, // "Catat pemasukan dan pengeluaran,"
  dari: 12.61, // "dari banyak dompet sekaligus."
  dompet: 13.23, // * "dompet"
  simpan: 14.62, // "Simpan siapa yang berhutang,"
  berapa: 16.36, // "berapa sisanya,"
  kapan: 17.49, // "dan kapan jatuh temponya."
  tinggal: 19.68, // "Tinggal tekan 'Tagih via WhatsApp',"
  tagihWa: 20.3, // * "Tagih via WhatsApp"
  pilih: 21.72, // "pilih nadanya,"
  halus: 22.81, // "halus"
  tegas: 23.39, // "atau tegas."
  pesannya: 24.51, // "Pesannya sudah terisi otomatis."
  adaJuga: 26.75, // "Ada juga laporan bulanan,"
  laporan: 27.2, // * "laporan bulanan"
  anggaran: 28.46, // "anggaran,"
  asisten: 29.6, // * "sampai asisten yang bisa ditanya soal keuanganmu."
  semua: 32.66, // "Dan semua datanya tersimpan aman di HP kamu sendiri."
  aman: 34.04, // * "aman"
  buat: 36.41, // "Buat kamu yang butuh aplikasi kustom seperti ini,"
  kustom: 37.85, // * "kustom"
  langsung: 39.11, // "langsung konsultasi gratis"
  gratis: 40.3, // * "gratis"
  youcanbuild: 40.94, // "di Youcanbuild."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Hook nagih hutang", start: 0, end: M.kenalin - 0.2 },
  { id: "S02", label: "Kenalin Duitku", start: M.kenalin - 0.2, end: M.catat - 0.2 },
  { id: "S03", label: "Catat transaksi", start: M.catat - 0.2, end: M.simpan - 0.2 },
  { id: "S04", label: "Catatan hutang", start: M.simpan - 0.2, end: M.tinggal - 0.2 },
  { id: "S05", label: "Tagih via WhatsApp", start: M.tinggal - 0.2, end: M.adaJuga - 0.2 },
  { id: "S06", label: "Laporan, anggaran, asisten", start: M.adaJuga - 0.2, end: M.semua - 0.2 },
  { id: "S07", label: "Data di HP", start: M.semua - 0.2, end: M.buat - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.buat - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
