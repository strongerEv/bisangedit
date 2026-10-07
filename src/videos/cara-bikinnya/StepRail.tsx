import React from "react";
import { interpolate } from "remotion";
import { theme } from "../../components/theme";
import { RAIL } from "./layout";

export const STEPS = ["Ide", "Naskah", "Storyboard", "Animasi", "Suara", "Video"] as const;

type Props = {
  /** 0 = langkah pertama aktif, 5 = langkah terakhir. Nilai pecahan = sedang berpindah. */
  progress: number;
  /** Progres muncul (0 → 1), per langkah berurutan. */
  appear?: number;
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Rel langkah vertikal di kiri: penonton selalu tahu sedang di langkah mana. */
export const StepRail: React.FC<Props> = ({ progress, appear = 1 }) => {
  const current = Math.round(progress);
  const dot = 28;
  const lineX = RAIL.x + dot / 2 - 2;
  const span = (STEPS.length - 1) * RAIL.gap;

  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      {/* Garis jalur + isi */}
      <div
        style={{
          position: "absolute",
          left: lineX,
          top: RAIL.y + dot / 2,
          width: 4,
          height: span * appear,
          background: theme.colors.line,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: lineX,
          top: RAIL.y + dot / 2,
          width: 4,
          height: Math.max(0, Math.min(progress, STEPS.length - 1)) * RAIL.gap * appear,
          background: theme.colors.accent,
          borderRadius: 2,
        }}
      />
      {STEPS.map((label, i) => {
        const show = interpolate(appear, [i / STEPS.length, (i + 1) / STEPS.length], [0, 1], clamp);
        const reached = interpolate(progress, [i - 1, i], [0, 1], clamp);
        const isCurrent = i === current;
        const done = i < current;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: RAIL.x,
              top: RAIL.y + i * RAIL.gap,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: show,
              transform: `translateX(${(1 - show) * -20}px)`,
            }}
          >
            <div
              style={{
                width: dot,
                height: dot,
                borderRadius: dot / 2,
                boxSizing: "border-box",
                border: `4px solid ${done || isCurrent ? (isCurrent ? theme.colors.accent : theme.colors.text) : theme.colors.line}`,
                background: isCurrent ? theme.colors.accent : done ? theme.colors.text : theme.colors.bg,
                transform: `scale(${isCurrent ? 1 + 0.25 * reached : 1})`,
              }}
            />
            <div
              style={{
                fontFamily: theme.fonts.mono,
                fontWeight: 500,
                fontSize: 24,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: isCurrent ? theme.colors.accent : done ? theme.colors.text : theme.colors.muted,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
