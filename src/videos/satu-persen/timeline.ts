import { pageTurn } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Atomic Habits (James Clear): 1% lebih baik tiap hari ≈ 37,78× dalam setahun (1,01^365),
// 1% lebih buruk ≈ 0,03× (0,99^365). Detik absolut.
export const MARKERS = {
  judul: 0.2, // "1% SETIAP HARI."
  hari1: 1.6, // dua stickman muncul di titik awal
  qA: 3.2, // "LEBIH BAIK 1% SETIAP HARI, / ATAU LEBIH BURUK 1%."
  baca: 3.6, // stickman kiri membaca buku, kanan rebahan main HP
  mulai: 7.0, // hari mulai berjalan
  qB: 7.2, // "AWALNYA HAMPIR TIDAK KELIHATAN..."
  hari30: 10.0,
  hari365: 15.5,
  qC: 15.8, // "SETAHUN KEMUDIAN: / 37 KALI LEBIH BAIK, / ATAU NYARIS NOL."
  qD: 20.0, // "KAMU TIDAK NAIK KE LEVEL TUJUANMU. / KAMU JATUH KE LEVEL SISTEMMU."
  pudar: 25.5,
  akhir: 26.5,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Satu persen", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.qA, lines: ["LEBIH BAIK 1% SETIAP HARI,", "ATAU LEBIH BURUK 1%."] },
  { at: M.qB, lines: ["AWALNYA HAMPIR", "TIDAK KELIHATAN..."] },
  { at: M.qC, lines: ["SETAHUN KEMUDIAN:", "37 KALI LEBIH BAIK,", "ATAU NYARIS NOL."] },
  { at: M.qD, lines: ["KAMU TIDAK NAIK KE LEVEL TUJUANMU.", "KAMU JATUH KE LEVEL SISTEMMU."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** Hari ke- pada detik t: 1→30 pelan (7–10 dtk), lalu 30→365 makin cepat (10–15,5 dtk). */
export const dayAt = (t: number) => {
  if (t < M.mulai) return 1;
  if (t < M.hari30) return 1 + ((t - M.mulai) / (M.hari30 - M.mulai)) * 29;
  const q = Math.min(1, (t - M.hari30) / (M.hari365 - M.hari30));
  return 30 + Math.pow(q, 1.6) * 335;
};

/** Jadwal SFX. `syn:` = efek sintetis (scripts/buat-sfx.py), URL = @remotion/sfx (salinan lokal). */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: M.hari1, src: "syn:pop", vol: 0.7 },
  { at: M.hari1 + 0.15, src: "syn:pop", vol: 0.6 },
  { at: M.baca, src: pageTurn, vol: 0.7 },
  { at: M.baca + 0.5, src: "syn:pesan-masuk", vol: 0.5 },
  ...[0, 2].map((d) => ({ at: M.mulai + d, src: "syn:detak-jam", vol: 0.6 })),
  { at: M.hari30 - 0.1, src: "syn:swish", vol: 0.6 },
  { at: M.hari365 - 2.0, src: "syn:riser", vol: 0.7 },
  { at: M.hari365, src: "syn:impact", vol: 0.8 },
  { at: M.hari365 + 0.15, src: "syn:sparkle", vol: 0.6 },
  { at: M.hari365 + 0.3, src: "syn:siul-turun", vol: 0.45 },
  { at: M.qD - 0.1, src: "syn:boom-sinematik", vol: 0.6 },
];

export const DURATION = sec(M.akhir);
