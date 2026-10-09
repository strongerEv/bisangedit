import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Warna diambil dari aplikasi Fastreng (splash & tombol).
export const F = {
  orange: "#FF9229",
  orangeDeep: "#F26B1D",
  cream: "#FFF7F2",
  peach: "#FFE3CC",
  brown: "#4A2A14",
  ink: "#23180F",
  muted: "#8A6F5C",
  green: "#22C55E",
  waBg: "#EFE7DD",
  waOut: "#DCF8C6",
  shadow: "rgba(74, 42, 20, 0.18)",
} as const;

/** Latar krem-peach lembut. */
export const Backdrop: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${F.cream} 0%, ${F.peach} 100%)` }}>{children}</AbsoluteFill>
);

/** Screenshot HP asli 1170×2532 (390×844 CSS @3×). */
export const SHOT = { w: 1170, h: 2532, css: 3 };

/** Bingkai HP. Isi layar = screenshot (src) atau children; posisi titik tengah (x, y). */
export const Phone: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  src?: string;
  scrollY?: number; // px screenshot yang digeser (untuk strip panjang)
  stripH?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x = 540, y = 1040, width = 520, src, scrollY = 0, stripH, style, children }) => {
  const screenH = (width * SHOT.h) / SHOT.w;
  const bez = 16;
  const k = width / SHOT.w;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2 - bez,
        top: y - screenH / 2 - bez,
        width: width + bez * 2,
        height: screenH + bez * 2,
        borderRadius: 64,
        background: F.ink,
        boxShadow: `0 40px 90px ${F.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: screenH, borderRadius: 50, overflow: "hidden", background: "white" }}>
        {src ? (
          <Img
            src={staticFile(`aset/fastreng/${src}`)}
            style={{ position: "absolute", left: 0, top: -scrollY * k, width, height: (stripH ?? SHOT.h) * k }}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
};

/** Ubah koordinat CSS screenshot (390×844) ke px layar di dalam Phone selebar `width`. */
export const cssToScreen = (cx: number, cy: number, width = 520) => ({ x: (cx * SHOT.css * width) / SHOT.w, y: (cy * SHOT.css * width) / SHOT.w });

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.06em",
  color: F.muted,
};

/** Area judul; keluar sendiri di akhir adegan. */
export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 230, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 96, top, width: 888, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

/** Chip label kecil. */
export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; dark?: boolean }> = ({ children, style, dark }) => (
  <div
    style={{
      position: "absolute",
      background: dark ? F.ink : "white",
      color: dark ? "white" : F.ink,
      borderRadius: 999,
      padding: "14px 28px",
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: 38,
      boxShadow: `0 16px 40px ${F.shadow}`,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Riak tap jari di posisi (x, y) relatif layar HP. p = 0→1. */
export const TapRipple: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - 34, top: y - 34, width: 68, height: 68, borderRadius: 34, background: "rgba(35,24,15,0.35)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - 70, top: y - 70, width: 140, height: 140, borderRadius: 70, border: `6px solid ${F.orange}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );
