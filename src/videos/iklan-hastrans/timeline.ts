export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/iklan-hastrans/vo.wav";
export const AUDIO_END = 30.01;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB, 17 potongan = 17 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  jasa: 0.26, // "Jasa pembuatan web app untuk bisnis travel."
  travel: 2.3, // * "bisnis travel"
  ini: 3.29, // "Ini contohnya:"
  hastrans: 4.41, // "HasTrans,"
  denpasar: 5.33, // "travel Denpasar,"
  surabaya: 6.55, // "Surabaya,"
  jember: 7.43, // "dan Jember."
  pelanggan: 8.79, // "Pelanggan pilih rute dan tanggal,"
  tanggal: 9.9, // * "tanggal"
  lalu: 10.69, // "lalu pilih kursi langsung dari denah."
  kursi: 11.2, // * "kursi"
  denah: 12.2, // * "denah"
  kunci: 13.36, // "Kursi dikunci sampai dibayar,"
  dibayar: 14.25, // * "dibayar"
  jadi: 15.07, // "jadi nggak ada kursi dobel."
  dobel: 15.95, // * "dobel"
  pesanan: 17.0, // "Pesanan langsung masuk WhatsApp admin,"
  whatsapp: 17.95, // * "WhatsApp"
  lengkap: 19.0, // "sudah lengkap."
  admin: 20.46, // "Admin pantau kursi terisi,"
  terisi: 21.2, // * "kursi terisi"
  pembayaran: 22.27, // "pembayaran,"
  sampai: 23.18, // "sampai manifes penumpang buat sopir."
  manifes: 23.53, // * "manifes"
  sopir: 24.65, // * "buat sopir"
  mau: 25.72, // "Mau punya sistem kayak gini buat travelmu?"
  travelmu: 27.0, // * "travelmu"
  konsultasi: 28.07, // "Konsultasi gratis di Youcanbuild."
  youcanbuild: 29.24, // * "Youcanbuild"
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Total ±30,6 dtk (iklan).
export const SCENES = [
  { id: "S01", label: "Jasa web app travel", start: 0, end: M.ini - 0.2 },
  { id: "S02", label: "Contoh: HasTrans", start: M.ini - 0.2, end: M.pelanggan - 0.2 },
  { id: "S03", label: "Pilih rute & kursi", start: M.pelanggan - 0.2, end: M.kunci - 0.2 },
  { id: "S04", label: "Kursi dikunci", start: M.kunci - 0.2, end: M.pesanan - 0.2 },
  { id: "S05", label: "Masuk WhatsApp admin", start: M.pesanan - 0.2, end: M.admin - 0.2 },
  { id: "S06", label: "Dashboard & manifest", start: M.admin - 0.2, end: M.mau - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.mau - 0.2, end: AUDIO_END + 0.55 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
