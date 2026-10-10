import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Warna dari website Dealer Pak Aji (css/style.css): navy + merah logo.
export const D = {
  navy: "#0E1B33",
  navy2: "#172A4D",
  red: "#E01E26",
  red2: "#BF151C",
  bg: "#FFFFFF",
  soft: "#F3F5F8",
  text: "#121A2B",
  muted: "#5F6B7E",
  border: "#E2E6EC",
  ok: "#16825A",
  wa: "#1FAE55",
  waBg: "#EFE7DD",
  waOut: "#DCF8C6",
  shadow: "rgba(14, 27, 51, 0.18)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: D.muted,
};

/** Latar abu lembut dengan garis miring merah-navy khas hero website. */
export const Backdrop: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <AbsoluteFill style={{ background: dark ? D.navy : D.soft, overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -420, top: -260, width: 900, height: 160, background: D.red, transform: "rotate(-32deg)", opacity: dark ? 0.9 : 0.12 }} />
    <div style={{ position: "absolute", right: -460, top: -120, width: 900, height: 60, background: dark ? D.navy2 : D.navy, transform: "rotate(-32deg)", opacity: dark ? 1 : 0.08 }} />
    <div style={{ position: "absolute", left: -400, bottom: -160, width: 900, height: 120, background: D.red, transform: "rotate(-32deg)", opacity: dark ? 0.9 : 0.1 }} />
  </AbsoluteFill>
);

/** Screenshot HP asli 1170×2532 (390×844 CSS @3×). */
export const SHOT = { w: 1170, h: 2532, css: 3 };

export const img = (f: string) => staticFile(`aset/dealer-pakaji/${f}`);

/** Bingkai HP berisi screenshot. Titik tengah (x, y). `shots` = beberapa screenshot bertumpuk dengan opasitas masing-masing. */
export const Phone: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  shots?: { src: string; o: number }[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x = 540, y = 1080, width = 500, shots = [], style, children }) => {
  const screenH = (width * SHOT.h) / SHOT.w;
  const bez = 16;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2 - bez,
        top: y - screenH / 2 - bez,
        width: width + bez * 2,
        height: screenH + bez * 2,
        borderRadius: 64,
        background: D.navy,
        boxShadow: `0 40px 90px ${D.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: screenH, borderRadius: 50, overflow: "hidden", background: "white" }}>
        {shots.map((s) =>
          s.o > 0 ? <Img key={s.src} src={img(s.src)} style={{ position: "absolute", left: 0, top: 0, width, height: screenH, opacity: s.o }} /> : null,
        )}
        {children}
      </div>
    </div>
  );
};

/** Koordinat CSS screenshot (390×844) → px di dalam layar Phone selebar `width`. */
export const css = (cx: number, cy: number, width = 500) => ({ x: (cx * SHOT.css * width) / SHOT.w, y: (cy * SHOT.css * width) / SHOT.w });
export const cssLen = (v: number, width = 500) => (v * SHOT.css * width) / SHOT.w;

/** Kotak sorot merah di dalam layar HP. c = titik tengah px layar, w/h dalam CSS. */
export const HiBox: React.FC<{ c: { x: number; y: number }; w: number; h: number; p: number; width?: number; color?: string }> = ({ c, w, h, p, width = 500, color = D.red }) => {
  const W = cssLen(w, width);
  const H = cssLen(h, width);
  return p <= 0 ? null : (
    <div style={{ position: "absolute", left: c.x - W / 2, top: c.y - H / 2, width: W, height: H, borderRadius: 14, border: `5px solid ${color}`, boxShadow: `0 0 0 9999px rgba(14,27,51,${0.28 * p})`, opacity: p, transform: `scale(${1.08 - 0.08 * p})` }} />
  );
};

/** Area judul; keluar sendiri di akhir adegan. */
export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 210, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 96, top, width: 888, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

/** Chip label. */
export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "navy" | "red" | "light" | "wa" }> = ({ children, style, tone = "navy" }) => {
  const c = { navy: [D.navy, "white"], red: [D.red, "white"], light: ["white", D.text], wa: [D.wa, "white"] }[tone];
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: c[0],
        color: c[1],
        borderRadius: 999,
        padding: "16px 30px",
        ...font,
        fontWeight: 700,
        fontSize: 38,
        boxShadow: `0 16px 40px ${D.shadow}`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Riak tap jari. p = 0→1. */
export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 30 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(14,27,51,0.35)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 5}px solid ${D.red}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );
