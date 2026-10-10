import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Warna dari aplikasi Fiviz (globals.css: --color-brand-*, --color-accent-*). Dominan putih + biru.
export const B = {
  b50: "#EEF4FF",
  b100: "#DBE7FF",
  b200: "#BFD3FF",
  b400: "#5B8CF8",
  b500: "#2F66F0",
  b600: "#1748D9",
  b700: "#1238B0",
  b900: "#0F2766",
  accent: "#F58F0A",
  accentSoft: "#FFF3E0",
  white: "#FFFFFF",
  soft: "#F5F8FF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  green: "#16A34A",
  red: "#DC2626",
  shadow: "rgba(15, 39, 102, 0.14)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };
export const img = (f: string) => staticFile(`aset/fiviz/${f}`);

/** Latar putih dengan lengkung biru lembut. */
export const Backdrop: React.FC<{ blue?: boolean }> = ({ blue }) => (
  <AbsoluteFill style={{ background: blue ? `linear-gradient(160deg, ${B.b600} 0%, ${B.b900} 100%)` : B.white, overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -320, top: -260, width: 820, height: 820, borderRadius: 410, background: blue ? "rgba(255,255,255,0.08)" : B.b50 }} />
    <div style={{ position: "absolute", left: -360, bottom: -340, width: 900, height: 900, borderRadius: 450, background: blue ? "rgba(255,255,255,0.06)" : B.b50 }} />
  </AbsoluteFill>
);

/** HP berisi layar yang digambar ulang (koordinat CSS 390×844). Titik tengah (x, y). */
export const Phone: React.FC<{ x?: number; y?: number; width?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  x = 540,
  y = 1130,
  width = 520,
  style,
  children,
}) => {
  const k = width / 390;
  const h = 844 * k;
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
        background: B.b900,
        boxShadow: `0 40px 90px ${B.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 52, overflow: "hidden", background: B.soft }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: 844, transform: `scale(${k})`, transformOrigin: "0 0", ...font, color: B.text }}>{children}</div>
      </div>
    </div>
  );
};

/** Header biru aplikasi (logo + judul halaman). */
export const AppHeader: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <div style={{ background: `linear-gradient(135deg, ${B.b600}, ${B.b700})`, color: "white", padding: "46px 20px 18px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Img src={img("logo.png")} style={{ width: 34, height: 34, borderRadius: 9 }} />
      <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.9 }}>Firman Service</div>
    </div>
    <div style={{ fontSize: 24, fontWeight: 800, marginTop: 14, letterSpacing: "-0.01em" }}>{title}</div>
    {sub ? <div style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>{sub}</div> : null}
  </div>
);

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: "white", borderRadius: 18, border: `1px solid ${B.border}`, boxShadow: "0 6px 18px rgba(15,39,102,0.06)", padding: 14, ...style }}>{children}</div>
);

/** Pil pilihan; `on` 0→1. */
export const Pill: React.FC<{ on: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ on, children, style }) => (
  <div
    style={{
      borderRadius: 999,
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 700,
      border: `2px solid ${on > 0.5 ? B.b600 : B.border}`,
      background: on > 0.5 ? B.b600 : "white",
      color: on > 0.5 ? "white" : B.text,
      transform: `scale(${1 + 0.06 * Math.sin(Math.PI * Math.min(1, on))})`,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 200, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 90, top, width: 900, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "blue" | "accent" | "light" | "green" | "dark" }> = ({ children, style, tone = "blue" }) => {
  const c = { blue: [B.b600, "white"], accent: [B.accent, "white"], light: ["white", B.text], green: [B.green, "white"], dark: [B.b900, "white"] }[tone];
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
        boxShadow: `0 16px 40px ${B.shadow}`,
        whiteSpace: "nowrap",
        border: tone === "light" ? `2px solid ${B.border}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Center: React.FC<{ top: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ top, style, children }) => (
  <div style={{ position: "absolute", left: 0, width: 1080, top, display: "flex", justifyContent: "center", gap: 20, ...style }}>{children}</div>
);

/** Riak tap (koordinat CSS layar bila di dalam Phone). */
export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 20 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(15,39,102,0.3)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 5}px solid ${B.accent}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );
