export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/cara-bikinnya/Video_2_gass_.wav";
export const AUDIO_END = 34.57;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md.
// Pergantian adegan diletakkan di jeda, ±0,2 dtk sebelum kalimat berikut diucapkan.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0.0, end: 4.0 },
  { id: "S02", label: "Tanpa editor", start: 4.0, end: 7.5 },
  { id: "S03", label: "Kode", start: 7.5, end: 11.7 },
  { id: "S04", label: "Claude Code", start: 11.7, end: 14.45 },
  { id: "S05", label: "Tablet", start: 14.45, end: 18.85 },
  { id: "S06", label: "Langkah", start: 18.85, end: 24.1 },
  { id: "S07", label: "Suara", start: 24.1, end: 27.9 },
  { id: "S08", label: "Cloud", start: 27.9, end: 31.35 },
  { id: "S99", label: "Penutup", start: 31.35, end: 36.1 }, // akhir audio 34,57 + ekor ±1,5
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Momen penting di dalam audio (detik, absolut). Diukur dari jeda di audio.
export const MARKERS = {
  videoTadi: 0.0, // "Video tadi…"
  tidakDibuat: 1.37, // "tidak dibuat di aplikasi edit video"
  timeline: 4.19, // "Tidak ada timeline"
  drag: 5.57, // "Tidak ada drag-and-drop"
  semuanya: 7.7, // "Semuanya ditulis sebagai kode"
  remotion: 10.05, // "pakai Remotion"
  yangMenulis: 11.9, // "Yang menulis kodenya:"
  claudeCode: 13.38, // "Claude Code"
  tablet: 14.64, // "Saya cuma pegang tablet"
  samsung: 16.37, // "Samsung Galaxy Tab A11+"
  ide: 19.05, // "Saya ketik idenya"
  naskah: 20.42, // "Claude bikin naskah"
  storyboard: 21.86, // "storyboard"
  animasi: 22.66, // "lalu animasinya"
  suara: 24.3, // "Saya kasih suara"
  sinkron: 25.69, // "dia sinkronkan sampai ke kata"
  santai: 28.12, // "Tabletnya santai"
  cloud: 29.33, // "karena render-nya jalan di cloud"
  prosesnya: 31.53, // "Mau lihat prosesnya?"
  follow: 32.92, // "Follow untuk part berikutnya"
} as const;

// Perkiraan per kata di "dia sinkronkan sampai ke kata" (dibagi menurut suku kata).
export const SINKRON_WORDS = [
  { word: "dia", at: 25.69 },
  { word: "sinkronkan", at: 26.05 },
  { word: "sampai", at: 26.6 },
  { word: "ke", at: 26.96 },
  { word: "kata.", at: 27.14 },
] as const;

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
