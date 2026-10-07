export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/rocky-wantimpres/nusa-voice-ai.wav";
export const AUDIO_END = 35.8;
export const TAIL = 1.5;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md.
// Pergantian adegan diletakkan di jeda, ±0,2 dtk sebelum kalimat berikut diucapkan.
export const SCENES = [
  { id: "S01", label: "Dulu", start: 0.0, end: 3.5 },
  { id: "S02", label: "Sekarang", start: 3.5, end: 6.7 },
  { id: "S03", label: "Fakta", start: 6.7, end: 12.6 },
  { id: "S04", label: "Tugas", start: 12.6, end: 16.6 },
  { id: "S05", label: "Bayangkan", start: 16.6, end: 19.0 },
  { id: "S06", label: "Rapat", start: 19.0, end: 24.4 },
  { id: "S07", label: "Katanya", start: 24.4, end: 27.6 },
  { id: "S08", label: "Pertanyaan", start: 27.6, end: 32.5 },
  { id: "S99", label: "Penutup", start: 32.5, end: AUDIO_END + TAIL },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Momen penting di dalam audio (detik, absolut). Diukur dari jeda di audio.
export const MARKERS = {
  kritik: 1.35, // "kerjanya mengkritik istana"
  kantornya: 4.72, // "kantornya di istana"
  tanggal: 6.95, // "Dua Oktober dua ribu dua puluh enam"
  nama: 9.55, // "Rocky Gerung resmi jadi anggota Wantimpres"
  memberi: 14.01, // "memberi nasihat kepada Presiden"
  tanya: 19.23, // "Bagaimana pendapat Bung Rocky?"
  jawab: 21.55, // "Pertanyaannya…"
  dungu: 22.74, // "dungu."
  katanya: 24.61, // "Katanya, dia cuma pindah…"
  orangnya: 29.39, // "yang pindah orangnya…"
  nadanya: 30.97, // "atau nadanya?"
  follow: 33.89, // "Follow untuk part berikutnya"
} as const;

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
