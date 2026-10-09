import React from "react";
import { Easing, interpolate, spring } from "remotion";
import { theme } from "../../components/theme";
import { P } from "./palette";

/** Teks di layar gaya chip putih; kata bertanda *…* diberi warna oranye. */
export const Caption: React.FC<{ text: string; frame: number; fps: number; from: number; to: number }> = ({ text, frame, fps, from, to }) => {
  const t = frame / fps;
  if (t < from - 0.05 || t > to + 0.05) return null;
  const pop = spring({ frame: frame - Math.round(from * fps), fps, config: { damping: 13, stiffness: 160 } });
  const out = interpolate(t, [to - 0.25, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <div style={{ position: "absolute", left: 0, top: 250, width: 1080, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth: 900,
          background: "white",
          borderRadius: 40,
          padding: "26px 40px",
          boxShadow: `0 20px 50px ${P.shadow}`,
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: P.ink,
          textAlign: "center",
          opacity: Math.min(1, pop * 1.5) * out,
          transform: `scale(${0.8 + 0.2 * pop}) translateY(${(1 - pop) * 30}px)`,
        }}
      >
        {parts.map((p, i) =>
          p.startsWith("*") ? (
            <span key={i} style={{ color: P.orange }}>
              {p.slice(1, -1)}
            </span>
          ) : (
            <span key={i}>{p}</span>
          ),
        )}
      </div>
    </div>
  );
};
