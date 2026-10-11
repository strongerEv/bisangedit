export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/ingonentok/entokbos.wav";
export const AUDIO_END = 51.35;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB, 26 potongan = 26 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  peternak: 0.23, // "Peternak entok,"
  jualan: 1.47, // "jualannya masih nunggu orang nanya harga satu-satu di chat?"
  satuSatu: 3.6, // * "satu-satu di chat"
  ini: 6.04, // "Ini website ingonentok."
  sekali: 8.07, // "Sekali dibuka,"
  pembeli: 9.39, // "pembeli langsung kenal peternakannya."
  katalog: 11.95, // "Katalognya lengkap:"
  dod: 13.31, // "dari DOD dua belas ribuan,"
  bakalan: 15.79, // "entok bakalan,"
  indukan: 16.95, // "sampai indukan."
  harganya: 18.43, // "Harganya terpampang jelas."
  tiap: 20.77, // "Tiap produk punya tombol WhatsApp sendiri."
  tombol: 21.9, // * "tombol WhatsApp"
  pesannya: 23.32, // "Pesannya otomatis,"
  lengkap: 24.94, // "lengkap dengan produk dan harganya."
  mau: 27.47, // "Mau pesan banyak?"
  isi: 28.82, // "Isi form pesanan cepat:"
  jenis: 30.54, // "jenis,"
  jumlah: 31.3, // "jumlah,"
  kota: 32.1, // "kota."
  langsung: 32.83, // "Langsung terkirim rapi ke WhatsApp."
  cara: 35.23, // "Ada cara pesan,"
  galeri: 36.44, // "galeri kandang,"
  testimoni: 37.61, // "testimoni,"
  faq: 38.46, // "sampai FAQ."
  yakin: 39.81, // "Pembeli makin yakin sebelum transfer."
  ringan: 42.58, // "Ringan dibuka di HP,"
  tanpa: 44.2, // "tanpa server mahal."
  usahamu: 45.82, // "Usahamu belum punya etalase online?"
  biar: 48.12, // "Biar Youcanbuild yang bikinin."
  youcanbuild: 48.5, // * "Youcanbuild"
  konsultasi: 50.32, // "Konsultasi gratis."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Nanya harga di chat", start: 0, end: M.ini - 0.2 },
  { id: "S02", label: "Beranda website", start: M.ini - 0.2, end: M.katalog - 0.2 },
  { id: "S03", label: "Katalog harga", start: M.katalog - 0.2, end: M.tiap - 0.2 },
  { id: "S04", label: "Tombol WhatsApp", start: M.tiap - 0.2, end: M.mau - 0.2 },
  { id: "S05", label: "Form pesanan cepat", start: M.mau - 0.2, end: M.cara - 0.2 },
  { id: "S06", label: "Bagian pendukung", start: M.cara - 0.2, end: M.ringan - 0.2 },
  { id: "S07", label: "Ringan", start: M.ringan - 0.2, end: M.usahamu - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.usahamu - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
