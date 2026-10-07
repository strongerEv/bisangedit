import React from "react";
import { Img, staticFile } from "remotion";
import { theme } from "../../components/theme";
import { LAPTOP, LAPTOP_W } from "./layout";

export const c = theme.colors;
export const RED = c.brand;

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: c.muted,
};

/** Angka tanda (1 · 2 · 3) besar merah. */
export const BigNum: React.FC<{ n: string; pop: number }> = ({ n, pop }) => (
  <div
    style={{
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: 200,
      lineHeight: 0.9,
      letterSpacing: "-0.04em",
      color: RED,
      opacity: Math.min(1, pop * 2),
      transform: `scale(${0.7 + 0.3 * pop})`,
      transformOrigin: "left bottom",
    }}
  >
    {n}
  </div>
);

/** Pil merah, misal "3 TANDA". */
export const RedPill: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => (
  <div
    style={{
      alignSelf: "flex-start",
      background: RED,
      borderRadius: 999,
      padding: "10px 26px",
      ...mono,
      ...style,
      color: c.card,
    }}
  >
    {text}
  </div>
);

/** Kartu putih bergaris tipis. */
export const Card: React.FC<{ style: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      position: "absolute",
      background: c.card,
      borderRadius: 24,
      boxShadow: `0 18px 44px ${c.shadow}`,
      border: `3px solid ${c.line}`,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Ikon file spreadsheet dengan nama file. */
export const Sheet: React.FC<{ name: string; style?: React.CSSProperties }> = ({ name, style }) => (
  <Card style={{ width: 300, padding: 18, ...style }}>
    <div style={{ ...mono, fontSize: 24, letterSpacing: 0, marginBottom: 10 }}>{name}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ height: 18, borderRadius: 4, background: i < 4 ? c.muted : c.line }} />
      ))}
    </div>
  </Card>
);

/** Gelembung chat kecil. */
export const Bubble: React.FC<{ w: number; dark?: boolean; style?: React.CSSProperties }> = ({ w, dark, style }) => (
  <div
    style={{
      position: "absolute",
      width: w,
      height: 64,
      borderRadius: 32,
      borderBottomLeftRadius: 8,
      background: dark ? c.text : c.card,
      border: dark ? undefined : `3px solid ${c.line}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 22px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: dark ? c.onDark : c.muted }} />
    ))}
  </div>
);

/** Laptop bergaya garis tebal. Isi layar = children (ukuran LAPTOP.screenW × screenH). */
export const Laptop: React.FC<{ appear?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  appear = 1,
  style,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: LAPTOP.x,
      top: LAPTOP.y,
      width: LAPTOP_W,
      opacity: appear,
      transform: `translateY(${(1 - appear) * 40}px) scale(${0.96 + 0.04 * appear})`,
      ...style,
    }}
  >
    <div
      style={{
        background: c.text,
        borderRadius: 30,
        padding: LAPTOP.bezel,
        boxShadow: `0 30px 70px ${c.shadow}`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: LAPTOP.screenW,
          height: LAPTOP.screenH,
          borderRadius: 10,
          overflow: "hidden",
          background: c.card,
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{
        margin: "0 -50px",
        height: 28,
        background: c.text,
        borderRadius: "4px 4px 22px 22px",
      }}
    />
  </div>
);

/** Tangkapan layar karya (memenuhi layar laptop). */
export const Shot: React.FC<{ src: string; style?: React.CSSProperties }> = ({ src, style }) => (
  <Img
    src={staticFile(`karya/${src}`)}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }}
  />
);
