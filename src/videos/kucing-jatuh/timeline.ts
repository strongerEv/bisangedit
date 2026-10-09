export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/kucing-jatuh/animasikucing.wav";
export const AUDIO_END = 38.58;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB).
export const MARKERS = {
  jatuh: 0.31, // "Kucing jatuh dari ketinggian…"
  mendaratKaki: 2.34, // "tapi mendarat pakai kaki."
  kokBisa: 4.49, // "Kok bisa?"
  telinga: 5.89, // "Telinga dalamnya langsung sadar badannya terbalik."
  duaTahap: 8.9, // "Lalu badannya memutar dua tahap:"
  depan: 11.22, // "depan dulu,"
  belakang: 12.19, // "baru belakang."
  punggung: 13.65, // "Bisa begitu karena tulang punggungnya lentur,"
  selangka: 16.18, // "dan tulang selangkanya tidak menyambung kaku."
  tegak: 19.2, // "Setelah tegak,"
  parasut: 20.2, // "kakinya merentang seperti parasut."
  pelan: 22.22, // "Jatuhnya jadi lebih pelan."
  mendarat: 24.37, // "Mendarat?"
  kakiDulu: 25.18, // "Kaki dulu…"
  menekuk: 26.07, // "lalu menekuk untuk meredam benturan."
  cedera: 28.79, // "Tapi kucing tetap bisa cedera."
  rendah: 31.05, // "Dari tempat rendah,"
  takSempat: 32.16, // "dia malah tak sempat berputar."
  jadi: 34.21, // "Jadi,"
  pengaman: 34.92, // "pasang pengaman di jendela."
  keren: 36.69, // "Kucing itu keren…"
  kebal: 37.83, // "bukan kebal."
} as const;

const M = MARKERS;

/** Fase gerak (detik). Semua diturunkan dari MARKERS. */
export const T = {
  slip: 1.3,
  fall: 1.75,
  freezeA: M.kokBisa - 0.2, // waktu melambat: "Kok bisa?"
  freezeB: M.telinga,
  flip1: M.depan - 0.1, // putar 90°: depan
  flip2: M.belakang - 0.1, // putar 90° lagi: belakang
  xrayA: M.punggung - 0.2, // kartu tulang
  xrayB: M.tegak - 0.15,
  spread: M.tegak - 0.1, // kaki terentang
  ground: M.mendarat - 0.4,
  land: M.kakiDulu - 0.06,
  warn: M.cedera - 0.2, // adegan peringatan
  safe: M.jadi - 0.2, // adegan jendela berpengaman
  end: M.keren - 0.2, // penutup
  total: AUDIO_END + 1.5,
} as const;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md.
export const SCENES = [
  { id: "SHOT", label: "Satu shot: atap → jatuh → mendarat", start: 0, end: T.warn },
  { id: "WARN", label: "Tetap bisa cedera", start: T.warn, end: T.safe },
  { id: "SAFE", label: "Pasang pengaman", start: T.safe, end: T.end },
  { id: "END", label: "Keren, bukan kebal", start: T.end, end: T.total },
] as const;

export const CAPTIONS = [
  { from: M.jatuh - 0.1, to: M.mendaratKaki - 0.12, text: "Kucing jatuh dari ketinggian…" },
  { from: M.mendaratKaki - 0.1, to: M.kokBisa - 0.25, text: "…tapi mendarat pakai *kaki.*" },
  { from: M.telinga - 0.1, to: M.duaTahap - 0.2, text: "*Telinga dalam* sadar badannya terbalik" },
  { from: M.duaTahap - 0.1, to: M.punggung - 0.3, text: "Memutar *dua tahap*" },
  { from: M.punggung - 0.1, to: M.selangka - 0.15, text: "Tulang punggung *lentur*" },
  { from: M.selangka - 0.1, to: M.tegak - 0.25, text: "Tulang selangka *tak menyambung*" },
  { from: M.tegak - 0.1, to: M.mendarat - 0.25, text: "Kaki terentang = *parasut*" },
  { from: M.mendarat - 0.1, to: T.warn - 0.05, text: "Kaki dulu, lalu *menekuk*" },
] as const;

/** Faktor gerak lambat: "Kok bisa?" hampir berhenti, kartu tulang melambat supaya terbaca. */
export const slowmo = (t: number) => {
  const ramp = (a: number, b: number, k: number) => {
    if (t < a - 0.2 || t > b + 0.2) return 1;
    const inR = Math.min(1, Math.max(0, (t - (a - 0.2)) / 0.2));
    const outR = Math.min(1, Math.max(0, ((b + 0.2) - t) / 0.2));
    return 1 - (1 - k) * Math.min(inR, outR);
  };
  return Math.min(ramp(T.freezeA, T.freezeB, 0.08), ramp(T.xrayA, T.xrayB, 0.4));
};

/** Kecepatan kamera (px/dtk). */
const speed = (t: number) => {
  if (t < T.fall || t >= T.land) return 0;
  const accel = Math.min(1, (t - T.fall) / 1.2) * 2400;
  const drag = t > T.spread ? Math.min(1, (t - T.spread) / 0.8) * 750 : 0;
  const brake = t > T.land - 0.45 ? (t - (T.land - 0.45)) / 0.45 : 0;
  return Math.max(0, (accel - drag) * (1 - brake * 0.6)) * slowmo(t);
};
export const speedAt = speed;

const CAM: number[] = [];
{
  let y = 0;
  for (let f = 0; f <= sec(T.total); f++) {
    CAM.push(y);
    y += speed(f / FPS) / FPS;
  }
}
/** Posisi kamera; menerima frame pecahan (motion blur). */
export const camY = (frame: number) => {
  const f = Math.max(0, Math.min(CAM.length - 1, frame));
  const i = Math.floor(f);
  const j = Math.min(CAM.length - 1, i + 1);
  return CAM[i] + (CAM[j] - CAM[i]) * (f - i);
};

export const GROUND_Y = 1460;
export const GROUND_WORLD = camY(sec(T.land)) + GROUND_Y;

export const local = (from: number, t: number) => t - from;
export const DURATION = sec(T.total);
