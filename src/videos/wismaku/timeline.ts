export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/wismaku/wismaku.wav";
export const AUDIO_END = 44.79;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB, 21 potongan = 21 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  tanggal: 0.3, // "Tanggal satu."
  pemilik: 1.91, // "Pemilik kos keliling,"
  ketok: 3.55, // "ketok"
  pintu: 3.84, // "pintu satu-satu,"
  nanyain: 4.94, // "nanyain uang sewa."
  sekarang: 6.88, // "Sekarang"
  cukup: 7.71, // "cukup buka Wismaku."
  wismaku: 8.4, // * "Wismaku"
  lihat: 9.72, // "Lihat denahnya:"
  kamar: 11.09, // "kamar merah artinya belum bayar."
  merah: 11.45, // * "merah"
  sekali: 13.51, // "Sekali lirik,"
  langsungTahu: 14.45, // "langsung tahu siapa yang nunggak."
  tagihan: 17.11, // "Tagihan dibuat otomatis,"
  pengingat: 18.83, // "dan pengingatnya"
  tinggalKirim: 19.74, // "tinggal kirim lewat WhatsApp."
  whatsapp: 20.5, // * "WhatsApp"
  penghuni: 21.98, // "Penghuni punya portal sendiri."
  cek: 24.17, // "Cek tagihan,"
  kirimBukti: 25.23, // "kirim bukti transfer,"
  tekan: 26.49, // "tekan"
  sudahBayar: 26.85, // * "Saya Sudah Bayar"
  verifikasi: 28.73, // "Kamu tinggal verifikasi,"
  kwitansi: 30.38, // "dan kwitansi digitalnya langsung jadi."
  jadi: 31.8, // * "langsung jadi"
  akhir: 33.19, // "Akhir bulan,"
  pemasukan: 34.1, // "pemasukan"
  laba: 35.1, // * "sampai laba kotor sudah terekap,"
  siap: 36.78, // "siap diekspor ke Excel."
  excel: 37.6, // * "Excel"
  punya: 39.23, // "Punya usaha dengan alur seribet ini?"
  seribet: 40.3, // * "seribet"
  ceritain: 41.66, // "Ceritain ke Youcanbuild,"
  youcanbuild: 42.2, // * "Youcanbuild"
  konsultasi: 43.36, // "konsultasinya gratis."
  gratis: 44.2, // * "gratis"
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Lorong kos", start: 0, end: M.sekarang - 0.2 },
  { id: "S02", label: "Buka Wismaku", start: M.sekarang - 0.2, end: M.lihat - 0.2 },
  { id: "S03", label: "Denah merah", start: M.lihat - 0.2, end: M.tagihan - 0.2 },
  { id: "S04", label: "Tagihan & pengingat", start: M.tagihan - 0.2, end: M.penghuni - 0.2 },
  { id: "S05", label: "Portal penghuni", start: M.penghuni - 0.2, end: M.verifikasi - 0.2 },
  { id: "S06", label: "Verifikasi & kwitansi", start: M.verifikasi - 0.2, end: M.akhir - 0.2 },
  { id: "S07", label: "Laporan", start: M.akhir - 0.2, end: M.punya - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.punya - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
