import React from "react";
import { theme } from "../../../components/theme";

/** Judul kecil di atas layar tablet, misal "NASKAH.md". */
export const ScreenHeader: React.FC<{ text: string; dark?: boolean }> = ({ text, dark }) => (
  <div
    style={{
      fontFamily: theme.fonts.mono,
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: "0.06em",
      color: dark ? theme.colors.codeMuted : theme.colors.muted,
      marginBottom: 28,
    }}
  >
    {text}
  </div>
);

export const screenPad: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: "44px 36px",
  boxSizing: "border-box",
};

/** Layer layar untuk crossfade antar isi layar. */
export const Layer: React.FC<{ opacity: number; shift?: number; bg?: string; children: React.ReactNode }> = ({
  opacity,
  shift = 0,
  bg = theme.colors.card,
  children,
}) => (
  <div style={{ position: "absolute", inset: 0, background: bg, opacity, transform: `translateY(${shift}px)` }}>
    {children}
  </div>
);
