import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

export const c = theme.colors;

export const L = { x: 96, w: 888, tagY: 220, titleY: 300, diagramY: 860 };

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: c.muted,
  textTransform: "uppercase",
};

/** Label "SATIRE" berbingkai putus-putus di pojok, tampil di semua adegan. */
export const SatireTag: React.FC<{ extra?: string }> = ({ extra }) => (
  <div style={{ position: "absolute", left: L.x, top: L.tagY, display: "flex", gap: 16, alignItems: "center" }}>
    <div style={{ ...mono, color: c.text, border: `3px dashed ${c.text}`, borderRadius: 999, padding: "6px 20px" }}>Satire</div>
    {extra ? <div style={mono}>{extra}</div> : null}
  </div>
);

/** Area judul di posisi tetap; keluar sendiri di akhir adegan. */
export const TitleBox: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = L.titleY, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: L.x,
        top,
        width: L.w,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: exitAt(frame, fps, dur),
      }}
    >
      {children}
    </div>
  );
};

/** Logo PAN (dari user) — kecil, hanya sebagai keterangan acara. */
export const PanLogo: React.FC<{ height: number; style?: React.CSSProperties }> = ({ height, style }) => (
  <Img src={staticFile("pihak-ketiga/logo-pan.png")} style={{ height, width: (height * 1443) / 2000, ...style }} />
);

/** Gelembung ucapan sederhana. */
export const Speech: React.FC<{ text: string; x: number; y: number; p: number; accent?: boolean; size?: number }> = ({
  text,
  x,
  y,
  p,
  accent,
  size = 56,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity: Math.min(1, p * 2),
      transform: `scale(${0.7 + 0.3 * p})`,
      transformOrigin: "left bottom",
      background: accent ? c.accent : c.card,
      color: accent ? c.card : c.text,
      border: accent ? undefined : `3px solid ${c.text}`,
      borderRadius: 28,
      borderBottomLeftRadius: 6,
      padding: "14px 28px",
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "-0.01em",
      boxShadow: `0 14px 34px ${c.shadow}`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);
