import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Warna dari aplikasi Warkas (--color-brand-*).
export const G = {
  g50: "#ECFDF5",
  g100: "#D1FAE5",
  g400: "#34D399",
  g500: "#10B981",
  g600: "#059669",
  g700: "#047857",
  g900: "#064E3B",
  mint: "#1FD08A",
  wa: "#25D366",
  waBg: "#EFE7DD",
  waOut: "#DCF8C6",
  rose: "#EF4444",
  amber: "#F59E0B",
  bg: "#F3F7F5",
  text: "#0F1F18",
  muted: "#5B6B63",
  border: "#DCE8E1",
  shadow: "rgba(6, 56, 38, 0.16)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: G.muted,
};

/** Latar hijau muda dengan dua bulatan lembut. */
export const Backdrop: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <AbsoluteFill style={{ background: dark ? G.g900 : G.bg, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -260, top: -220, width: 760, height: 760, borderRadius: 380, background: dark ? G.g700 : G.g100, opacity: 0.8 }} />
    <div style={{ position: "absolute", right: -320, bottom: -280, width: 860, height: 860, borderRadius: 430, background: dark ? G.g600 : G.g50 }} />
  </AbsoluteFill>
);

/** Screenshot asli aplikasi: 900×1948 px (dari social/instagram/src). */
export const SHOT = { w: 900, h: 1948 };
export const img = (f: string) => staticFile(`aset/warkas/${f}`);

/** Bingkai HP berisi screenshot bertumpuk. Titik tengah (x, y). */
export const Phone: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  shots?: { src: string; o: number }[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x = 540, y = 1100, width = 500, shots = [], style, children }) => {
  const h = (width * SHOT.h) / SHOT.w;
  const bez = 16;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2 - bez,
        top: y - h / 2 - bez,
        width: width + bez * 2,
        height: h + bez * 2,
        borderRadius: 66,
        background: G.g900,
        boxShadow: `0 40px 90px ${G.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 52, overflow: "hidden", background: "white" }}>
        {shots.map((s) => (s.o > 0 ? <Img key={s.src} src={img(s.src)} style={{ position: "absolute", left: 0, top: 0, width, height: h, opacity: s.o }} /> : null))}
        {children}
      </div>
    </div>
  );
};

/** Kotak sorot dalam koordinat px screenshot (900 lebar). */
export type Box = { x: number; y: number; w: number; h: number };
export const HiBox: React.FC<{ b: Box; p: number; width?: number; color?: string; dim?: boolean }> = ({ b, p, width = 500, color = G.amber, dim = true }) => {
  const k = width / SHOT.w;
  return p <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: (b.x - b.w / 2) * k,
        top: (b.y - b.h / 2) * k,
        width: b.w * k,
        height: b.h * k,
        borderRadius: 16,
        border: `5px solid ${color}`,
        boxShadow: dim ? `0 0 0 9999px rgba(6,56,38,${0.3 * p})` : undefined,
        opacity: p,
        transform: `scale(${1.08 - 0.08 * p})`,
      }}
    />
  );
};
export const at = (b: { x: number; y: number }, width = 500) => ({ x: (b.x * width) / SHOT.w, y: (b.y * width) / SHOT.w });

/** Area judul; keluar sendiri di akhir adegan. */
export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 200, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 90, top, width: 900, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "green" | "dark" | "light" | "wa" | "rose" }> = ({ children, style, tone = "green" }) => {
  const c = { green: [G.g500, "white"], dark: [G.g900, "white"], light: ["white", G.text], wa: [G.wa, "white"], rose: [G.rose, "white"] }[tone];
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: c[0],
        color: c[1],
        borderRadius: 999,
        padding: "16px 30px",
        ...font,
        fontWeight: 700,
        fontSize: 40,
        boxShadow: `0 16px 40px ${G.shadow}`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Baris tengah horizontal (untuk chip di bawah HP). */
export const Center: React.FC<{ top: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ top, style, children }) => (
  <div style={{ position: "absolute", left: 0, width: 1080, top, display: "flex", justifyContent: "center", gap: 20, ...style }}>{children}</div>
);

export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 30 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(6,56,38,0.35)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 5}px solid ${G.amber}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );
