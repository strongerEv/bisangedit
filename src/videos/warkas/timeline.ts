export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/warkas/vowarkas.wav";
export const AUDIO_END = 42.37;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB, 21 potongan = 21 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  warung: 0.26, // "Warungnya ramai,"
  tapi: 1.79, // "tapi kok untungnya nggak kelihatan?"
  untung: 2.26, // * "untungnya"
  kenalin: 4.17, // "Kenalin"
  warkas: 5.03, // "Warkas."
  aplikasi: 6.09, // "Aplikasi kasir sekaligus pembukuan untuk warung dan UMKM."
  pembukuan: 7.45, // * "pembukuan"
  jualan: 10.39, // "Jualan tinggal tap produk,"
  tap: 11.2, // * "tap produk"
  bayar: 11.97, // "bayar tunai,"
  qris: 13.21, // "QRIS,"
  transfer: 13.87, // "atau transfer."
  stok: 15.16, // "Stok langsung terpotong otomatis."
  isi: 17.42, // "Isi harga modal,"
  untungPer: 18.56, // "dan untung per produknya langsung kelihatan."
  saat: 21.45, // "Saat tutup shift,"
  kas: 22.56, // "kas di laci langsung dicocokkan."
  selisih: 24.67, // "Selisih sedikit pun ketahuan."
  laporan: 26.86, // "Laporannya bukan cuma omzet,"
  omzet: 27.8, // * "omzet"
  labaBersih: 29.2, // * "tapi sampai laba bersih,"
  setelah: 30.1, // "setelah dikurangi modal dan pengeluaran."
  modal: 31.1, // * "modal"
  pengeluaran: 31.5, // * "pengeluaran"
  internet: 32.69, // "Internet putus?"
  transaksi: 33.75, // "Transaksi tetap tersimpan,"
  terkirim: 35.55, // "dan terkirim saat online lagi."
  buat: 37.86, // "Buat kamu yang butuh aplikasi kustom seperti ini,"
  langsung: 40.34, // "langsung konsultasi gratis di Youcanbuild."
  gratis: 41.2, // * "gratis"
  youcanbuild: 41.6, // * "di Youcanbuild"
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Hook untung", start: 0, end: M.kenalin - 0.2 },
  { id: "S02", label: "Kenalin Warkas", start: M.kenalin - 0.2, end: M.jualan - 0.2 },
  { id: "S03", label: "Kasir", start: M.jualan - 0.2, end: M.isi - 0.2 },
  { id: "S04", label: "Harga modal", start: M.isi - 0.2, end: M.saat - 0.2 },
  { id: "S05", label: "Tutup shift", start: M.saat - 0.2, end: M.laporan - 0.2 },
  { id: "S06", label: "Laba bersih", start: M.laporan - 0.2, end: M.internet - 0.2 },
  { id: "S07", label: "Offline", start: M.internet - 0.2, end: M.buat - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.buat - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
