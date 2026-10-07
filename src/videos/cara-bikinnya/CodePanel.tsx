import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../components/theme";
import { PANEL } from "./layout";

type Props = {
  lines: readonly string[];
  /** Jumlah karakter yang sudah "diketik". Infinity = semua. */
  chars?: number;
  /** Label kecil di samping kursor, misal "Claude Code". */
  cursorTag?: string;
  cursorTagOpacity?: number;
  style?: React.CSSProperties;
};

/** Panel kode gelap ukuran PANEL. Posisi/skala diatur lewat `style`. */
export const CodePanel: React.FC<Props> = ({ lines, chars = Infinity, cursorTag, cursorTagOpacity = 1, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = lines.reduce((n, l) => n + l.length + 1, 0);
  const typing = chars < total;
  const blink = Math.floor((frame / fps) * 2) % 2 === 0;

  // Potong tiap baris sesuai jumlah karakter yang sudah diketik.
  let left = chars;
  let cursorAt = lines.length - 1;
  const shown = lines.map((l, i) => {
    if (left >= 0 && left <= l.length) cursorAt = Math.min(cursorAt, i);
    const take = Math.max(0, Math.min(l.length, left));
    left -= l.length + 1;
    return l.slice(0, take);
  });
  const showCursor = typing ? blink : Boolean(cursorTag);

  return (
    <div
      style={{
        position: "absolute",
        width: PANEL.w,
        height: PANEL.h,
        background: theme.colors.code,
        borderRadius: 28,
        padding: "40px 40px",
        boxSizing: "border-box",
        fontFamily: theme.fonts.mono,
        fontWeight: 500,
        fontSize: PANEL.font,
        lineHeight: 1.5,
        color: theme.colors.onDark,
        whiteSpace: "pre",
        fontVariantLigatures: "none",
        boxShadow: `0 24px 60px ${theme.colors.shadow}`,
        ...style,
      }}
    >
      {shown.map((l, i) => (
        <div key={i} style={{ height: PANEL.font * 1.5, color: lines[i].trim().startsWith("//") ? theme.colors.codeMuted : undefined }}>
          {l}
          {i === cursorAt && showCursor ? (
            <span style={{ display: "inline-block", width: 18, height: PANEL.font, background: theme.colors.accent, verticalAlign: "-6px", marginLeft: 2 }} />
          ) : null}
          {cursorTag && i === cursorAt ? (
            <span
              style={{
                marginLeft: 14,
                padding: "4px 14px",
                borderRadius: 999,
                background: theme.colors.accent,
                color: theme.colors.onDark,
                fontSize: 24,
                verticalAlign: "4px",
                opacity: cursorTagOpacity,
              }}
            >
              {cursorTag}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};
