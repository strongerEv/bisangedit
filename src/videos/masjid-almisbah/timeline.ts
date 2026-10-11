export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/masjid-almisbah/masjid.wav";
export const AUDIO_END = 51.3;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB, 21 potongan = 21 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  uang: 0.32, // "Uang infak masjid itu amanah."
  amanah: 1.6, // * "amanah"
  tapi: 2.59, // "Tapi jamaah sering cuma tahu dari pengumuman sekilas tiap Jumat."
  pengumuman: 4.27, // * "pengumuman sekilas"
  masjid: 7.87, // "Masjid Al Misbah sekarang punya aplikasi keuangan sendiri."
  aplikasi: 9.37, // * "aplikasi keuangan"
  mauDonasi: 11.91, // "Mau donasi?"
  pilih: 13.23, // "Pilih programnya,"
  scan: 14.4, // "scan QRIS,"
  unggah: 15.53, // "unggah bukti."
  kwitansi: 16.88, // "Kwitansi digital langsung terbit."
  kotak: 20.27, // "Kotak amal dihitung pecahan demi pecahan,"
  pecahan: 21.24, // * "pecahan demi pecahan"
  baru: 22.55, // "dan baru tercatat setelah semua saksi setuju."
  saksi: 24.2, // * "saksi setuju"
  pengeluaran: 26.66, // "Pengeluaran besar wajib disetujui ketua."
  ketua: 28.1, // * "ketua"
  tidak: 29.22, // "Dan tidak ada transaksi yang bisa dihapus."
  dihapus: 30.6, // * "dihapus"
  jumat: 33.38, // "Tiap Jumat,"
  laporan: 34.3, // "laporan kas siap dibagikan ke grup WhatsApp,"
  whatsapp: 35.7, // * "grup WhatsApp"
  gambar: 36.77, // "atau ditayangkan sebagai gambar."
  jamaah: 39.93, // "Jamaah pun bisa cek sendiri:"
  saldo: 41.77, // "saldo,"
  keluar: 42.67, // "pengeluaran,"
  renovasi: 43.6, // "sampai progres renovasi atap."
  mau: 46.77, // "Mau lembaga atau usahamu setransparan ini?"
  konsultasi: 49.56, // "Konsultasi gratis di Youcanbuild."
  youcanbuild: 50.6, // * "Youcanbuild"
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Infak itu amanah", start: 0, end: M.masjid - 0.2 },
  { id: "S02", label: "Aplikasi keuangan masjid", start: M.masjid - 0.2, end: M.mauDonasi - 0.2 },
  { id: "S03", label: "Donasi QRIS & kwitansi", start: M.mauDonasi - 0.2, end: M.kotak - 0.2 },
  { id: "S04", label: "Kotak amal + saksi", start: M.kotak - 0.2, end: M.pengeluaran - 0.2 },
  { id: "S05", label: "Persetujuan & tanpa hapus", start: M.pengeluaran - 0.2, end: M.jumat - 0.2 },
  { id: "S06", label: "Laporan Jumat", start: M.jumat - 0.2, end: M.jamaah - 0.2 },
  { id: "S07", label: "Transparansi jamaah", start: M.jamaah - 0.2, end: M.mau - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.mau - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
