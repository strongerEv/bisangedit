// Posisi tetap (px) supaya elemen yang sama berada di tempat yang sama
// antar adegan → potongan adegan tidak terasa (match cut).
export const TITLE = { x: 96, y: 250, w: 888, size: 96 };

export const PANEL = { x: 190, y: 620, w: 700, h: 640, font: 34 };

export const TABLET = { w: 560, h: 840, bezel: 20, radius: 56 };
export const SCREEN = { w: TABLET.w - 2 * TABLET.bezel, h: TABLET.h - 2 * TABLET.bezel };

export const TABLET_POS = {
  center: { x: 540, y: 1030, s: 1 },
  right: { x: 610, y: 1030, s: 1 },
  render: { x: 610, y: 1186, s: 0.8 },
} as const;

/** Skala panel kode saat masuk ke layar tablet. */
export const CODE_IN_SCREEN = SCREEN.w / PANEL.w;

/** Titik kiri-atas layar tablet saat tablet di tengah. */
export const SCREEN_AT_CENTER = {
  x: TABLET_POS.center.x - TABLET.w / 2 + TABLET.bezel,
  y: TABLET_POS.center.y - TABLET.h / 2 + TABLET.bezel,
};

export const RAIL = { x: 96, y: 660, gap: 150 };

export const CLOUD = { x: 610, y: 640 };
