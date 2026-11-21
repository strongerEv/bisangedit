import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../components/theme";

// Latar HITAM mengikuti video referensi (referensi/bridal-shower-dreamy.mp4) — pengecualian aturan latar putih,
// disetujui user. Abu-abu + putih, aksen merah, emas hanya untuk "si kaya".
export const K = {
  bg: "#050506",
  wall: "#1B1C20",
  side: "#121316",
  floor: "#2A2B30",
  divider: "#0E0F11",
  frame: "#3A3B41",
  screen: "#111215",
  white: "#F2F2F2",
  muted: "#8A8B90",
  dim: "#55565C",
  red: "#E5262B",
  gold: "#D9A93C",
  warm: "rgba(255, 196, 120, 0.16)",
} as const;

export const mono: React.CSSProperties = { fontFamily: theme.fonts.mono, fontWeight: 500, textTransform: "uppercase" };

/** Teks yang diketik per huruf mulai `at` (detik absolut). Sisa huruf tetap memakan tempat agar posisi tidak bergeser;
 *  huruf berikutnya diberi blok kursor selama mengetik. */
export const Typed: React.FC<{ text: string; at: number; cps: number; style?: React.CSSProperties }> = ({ text, at, cps, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at) return null;
  const n = Math.max(0, Math.min(text.length, Math.floor((t - at) * cps)));
  const typing = n < text.length;
  return (
    <div style={{ ...mono, whiteSpace: "pre", ...style }}>
      {text.slice(0, n)}
      {typing ? <span style={{ background: "currentColor" }}>{text[n] === " " ? "\u00a0" : <span style={{ opacity: 0 }}>{text[n]}</span>}</span> : null}
      <span style={{ opacity: 0 }}>{text.slice(n + (typing ? 1 : 0))}</span>
    </div>
  );
};

/** Panel HP melayang (gaya referensi). `alert` = bilah atas merah. */
export const PhonePanel: React.FC<{ cx: number; top: number; alert?: number; children?: React.ReactNode }> = ({ cx, top, alert = 0, children }) => {
  const w = 196;
  const h = 330;
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top, width: w, height: h, borderRadius: 30, border: `4px solid ${K.frame}`, background: K.screen, overflow: "hidden", boxSizing: "border-box" }}>
      <div style={{ height: 34, background: alert > 0 ? `rgba(229,38,43,${alert})` : "#1A1B1F", display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, background: alert > 0.5 ? "white" : K.dim }} />
        <div style={{ width: 60, height: 6, borderRadius: 3, background: alert > 0.5 ? "rgba(255,255,255,0.8)" : K.dim }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 34, bottom: 0 }}>{children}</div>
    </div>
  );
};

/** Sorot cahaya dari panel ke kamar. */
export const Beam: React.FC<{ top: [number, number, number]; bottom: [number, number, number]; color: string; o: number }> = ({ top, bottom, color, o }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: o }}>
    <defs>
      <linearGradient id={`beam-${top[0]}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={color} stopOpacity={0.16} />
        <stop offset="1" stopColor={color} stopOpacity={0.02} />
      </linearGradient>
    </defs>
    <polygon points={`${top[0]},${top[2]} ${top[1]},${top[2]} ${bottom[1]},${bottom[2]} ${bottom[0]},${bottom[2]}`} fill={`url(#beam-${top[0]})`} />
  </svg>
);

/** Konfeti deterministik dari titik (x, y). p = waktu sejak meledak (dtk). */
export const Confetti: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => {
  if (p <= 0 || p > 2.2) return null;
  const rand = (i: number) => {
    const s = Math.sin(i * 12.9898) * 43758.5453;
    return s - Math.floor(s);
  };
  return (
    <>
      {Array.from({ length: 46 }, (_, i) => {
        const a = rand(i) * Math.PI * 2;
        const v = 260 + rand(i + 99) * 420;
        const px = x + Math.cos(a) * v * p;
        const py = y + Math.sin(a) * v * p * 0.8 + 420 * p * p;
        const c = [K.white, K.red, K.gold, K.muted][i % 4];
        return (
          <div key={i} style={{ position: "absolute", left: px, top: py, width: 9, height: 4 + (i % 3) * 3, background: c, opacity: Math.max(0, 1 - p / 2.2), transform: `rotate(${rand(i + 7) * 360 + p * 500}deg)` }} />
        );
      })}
    </>
  );
};

export const rupiah = (n: number) => "Rp" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const ribuan = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
