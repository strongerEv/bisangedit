export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// TES GERAK (tanpa VO). Waktu dalam detik; satu shot kamera menerus.
export const T = {
  slip: 1.7, // mulai tergelincir dari tepi atap
  fall: 2.1, // lepas dari atap, jatuh
  flip: 4.0, // refleks membalik badan
  flipEnd: 4.8,
  spread: 4.9, // ganti ke pose kaki terentang ("parasut")
  ground: 6.4, // tanah mulai terlihat
  land: 7.3, // menyentuh tanah
  end: 8.8, // kartu penutup
  total: 10.5,
} as const;

export const CAPTIONS = [
  { from: 0.3, to: 2.0, text: "Kenapa kucing jarang *cedera* saat jatuh?" },
  { from: 2.4, to: 3.95, text: "Tubuhnya langsung *bereaksi*" },
  { from: 4.0, to: 5.4, text: "*Refleks* membalik badan" },
  { from: 5.45, to: 7.15, text: "Kaki terentang = *parasut* mini" },
  { from: 7.35, to: 8.75, text: "Kaki dulu, lalu badan *menekuk*" },
] as const;

/** Kecepatan kamera (px/dtk) saat jatuh: makin cepat, lalu sedikit melambat saat kaki terentang. */
const speed = (t: number) => {
  if (t < T.fall) return 0;
  if (t >= T.land) return 0;
  const accel = Math.min(1, (t - T.fall) / 1.2) * 2600;
  const drag = t > T.spread ? Math.min(1, (t - T.spread) / 0.7) * 800 : 0;
  const brake = t > T.land - 0.45 ? (t - (T.land - 0.45)) / 0.45 : 0;
  return Math.max(0, (accel - drag) * (1 - brake * 0.6));
};

/** Posisi kamera (px) di detik t — integrasi kecepatan per frame. */
const CAM: number[] = [];
{
  let y = 0;
  for (let f = 0; f <= sec(T.total); f++) {
    CAM.push(y);
    y += speed(f / FPS) / FPS;
  }
}
/** Posisi kamera; menerima frame pecahan (motion blur mengambil sampel di antara frame). */
export const camY = (frame: number) => {
  const f = Math.max(0, Math.min(CAM.length - 1, frame));
  const i = Math.floor(f);
  const j = Math.min(CAM.length - 1, i + 1);
  return CAM[i] + (CAM[j] - CAM[i]) * (f - i);
};
export const speedAt = speed;

/** Tanah (koordinat dunia) diletakkan supaya tiba di y layar GROUND_Y tepat saat mendarat. */
export const GROUND_Y = 1460;
export const GROUND_WORLD = camY(sec(T.land)) + GROUND_Y;

export const DURATION = sec(T.total);
