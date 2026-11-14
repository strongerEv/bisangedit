import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { theme } from "../../components/theme";

// Dasar PUTIH (seragam antar video) + aksen dari tema The Wedding Journey (css/theme.css: --wood, --gold).
export const W = {
  white: "#FFFFFF",
  parch: "#F3E3BF",
  parchSoft: "#FBF4E4",
  wood: "#7A4A26",
  woodDark: "#47290F",
  gold: "#E9B949",
  ink: "#3B2414",
  muted: "#6A4A2C",
  navy: "#0B2340",
  sky: "#5FA8E0", // warna logo Sesandingan (CTA penutup)
  shadow: "rgba(71, 41, 15, 0.18)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };
export const img = (f: string) => staticFile(`aset/preview-sesandingan/${f}`);

/** Latar putih dengan dua bulatan krem perkamen sangat muda. */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: W.white, overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -320, top: -300, width: 820, height: 820, borderRadius: 410, background: W.parchSoft }} />
    <div style={{ position: "absolute", left: -380, bottom: -380, width: 920, height: 920, borderRadius: 460, background: W.parchSoft }} />
  </AbsoluteFill>
);

/** Ukuran layar rekaman 780×1688 → HP lebar 560. */
export const PHONE = { x: 540, y: 1090, w: 560 };
export const phoneH = (w = PHONE.w) => (w * 1688) / 780;

export const Phone: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => {
  const h = phoneH();
  const bez = 16;
  return (
    <div
      style={{
        position: "absolute",
        left: PHONE.x - PHONE.w / 2 - bez,
        top: PHONE.y - h / 2 - bez,
        width: PHONE.w + bez * 2,
        height: h + bez * 2,
        borderRadius: 70,
        background: W.woodDark,
        boxShadow: `0 40px 90px ${W.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width: PHONE.w, height: h, borderRadius: 56, overflow: "hidden", background: W.navy }}>{children}</div>
    </div>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: W.parch, color: W.woodDark, borderRadius: 999, padding: "10px 24px", ...font, fontWeight: 700, fontSize: 28, letterSpacing: "0.08em", ...style }}>
    {children}
  </div>
);
