export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/tutorial-claude-code/stepclaude.wav";
export const AUDIO_END = 41.17;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md.
// Pergantian adegan di jeda, ±0,2 dtk sebelum kalimat berikut diucapkan.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0.0, end: 6.3 },
  { id: "S02", label: "Langkah 1 · Langganan", start: 6.3, end: 12.4 },
  { id: "S03", label: "Langkah 2 · GitHub", start: 12.4, end: 19.1 },
  { id: "S04", label: "Langkah 3 · Cerita", start: 19.1, end: 24.45 },
  { id: "S05", label: "Langkah 4 · Deploy", start: 24.45, end: 29.85 },
  { id: "S06", label: "Langkah 5 · Online", start: 29.85, end: 36.5 },
  { id: "S99", label: "Penutup", start: 36.5, end: 42.7 }, // akhir VO 41,17 + ekor ±1,5
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Momen penting di audio (detik, absolut). Awal frasa diukur dari jeda;
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  mau: 0.25, // "Mau bikin aplikasi web sendiri,"
  nggakJago: 2.21, // "tapi nggak jago ngoding?"
  limaLangkah: 3.69, // "Ini lima langkahnya pakai Claude Code."
  satu: 6.52, // "Satu:"
  langganan: 7.25, // "langganan Claude."
  paketPro: 8.37, // "Paket Pro mulai dua puluh dolar sebulan,"
  duaPuluh: 9.13, // * "dua puluh dolar"
  termasuk: 10.71, // "sudah termasuk Claude Code."
  dua: 12.62, // "Dua: bikin akun GitHub, lalu hubungkan ke Claude Code."
  hubungkan: 14.51, // * "hubungkan ke Claude Code"
  disimpan: 16.13, // "Di sinilah semua kode aplikasimu disimpan."
  tiga: 19.31, // "Tiga: ceritakan aplikasimu pakai bahasa sehari-hari."
  menulis: 22.64, // "Claude yang menulis kodenya."
  empat: 24.67, // "Empat: sambungkan GitHub ke Vercel,"
  vercel: 26.41, // * "Vercel"
  netlify: 27.07, // "Netlify,"
  lainnya: 27.92, // * "atau layanan deploy lainnya."
  lima: 30.08, // "Lima:"
  tayang: 30.71, // "setiap kode yang masuk ke GitHub otomatis tayang."
  online: 33.54, // "Aplikasimu online, bisa dibuka lewat link."
  simpan: 36.69, // "Simpan video ini."
  dibantu: 38.07, // "Mau dibantu bikin?"
  konsultasi: 39.32, // "Konsultasi gratis di Youcanbuild."
} as const;

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
