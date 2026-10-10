export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/dealer-pakaji/dealerpakaji.wav";
export const AUDIO_END = 42.06;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB, 16 potongan = 16 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  jualan: 0.26, // "Jualan mobil bekas,"
  tapi: 1.45, // * "tapi stoknya cuma dipajang"
  status: 3.2, // * "di status WA?"
  kenalin: 4.47, // "Kenalin:"
  website: 5.3, // "website Dealer Pak Aji."
  showroom: 7.3, // "Showroom mobil bekas yang buka"
  jam24: 8.9, // * "dua puluh empat jam,"
  hp: 10.2, // * "langsung dari HP."
  pembeli: 11.95, // "Pembeli bisa cari mobil berdasarkan merek,"
  merek: 13.97, // * "merek"
  tipe: 14.55, // "tipe,"
  harga: 15.4, // * "sampai batas harga."
  tiap: 16.9, // "Tiap mobil ada foto,"
  foto: 17.9, // * "foto"
  spek: 18.35, // * "spesifikasi lengkap,"
  simulasi: 19.6, // * "dan simulasi kredit."
  atur: 21.12, // "Atur DP"
  dp: 21.5, // * "DP"
  tenor: 22.0, // * "dan tenor,"
  angsuran: 22.63, // "angsurannya langsung kelihatan."
  testDrive: 24.88, // "Mau test drive,"
  kredit: 25.55, // * "ajukan kredit,"
  tukar: 26.8, // * "atau tukar tambah?"
  isi: 27.99, // "Isi formnya,"
  wa: 29.8, // * "lalu lanjut ke WhatsApp dealer."
  admin: 31.18, // "Di belakangnya, admin punya dashboard:"
  dashboard: 32.8, // * "dashboard"
  stok: 33.46, // "kelola stok,"
  terjual: 34.33, // "tandai terjual,"
  pantau: 35.5, // * "dan pantau"
  prospek: 36.3, // * "semua prospek pembeli."
  mau: 37.7, // "Mau bikin website kayak gini buat usahamu?"
  konsultasi: 40.2, // "Konsultasi gratis di Youcanbuild."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Hook status WA", start: 0, end: M.kenalin - 0.2 },
  { id: "S02", label: "Kenalin website", start: M.kenalin - 0.2, end: M.pembeli - 0.2 },
  { id: "S03", label: "Cari mobil", start: M.pembeli - 0.2, end: M.tiap - 0.2 },
  { id: "S04", label: "Detail & kredit", start: M.tiap - 0.2, end: M.testDrive - 0.2 },
  { id: "S05", label: "Form ke WhatsApp", start: M.testDrive - 0.2, end: M.admin - 0.2 },
  { id: "S06", label: "Panel admin", start: M.admin - 0.2, end: M.mau - 0.2 },
  { id: "S99", label: "Konsultasi", start: M.mau - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
