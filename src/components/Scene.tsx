import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, exitAt, rise } from "./motion";
import { theme } from "./theme";

type Props = {
  /** Durasi adegan dalam detik (dari timeline.ts). */
  dur: number;
  /** Penanda kecil di pojok, misal "01 · DULU". */
  tag?: string;
  align?: "start" | "center";
  children: React.ReactNode;
};

/** Latar, safe area, penanda tahap, dan fade keluar di akhir adegan. */
export const Scene: React.FC<Props> = ({ dur, tag, align = "start", children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = exitAt(frame, fps, dur);

  return (
    <AbsoluteFill style={{ background: theme.colors.bg }}>
      <AbsoluteFill
        style={{
          opacity: out,
          padding: `${theme.safe.top}px ${theme.safe.x}px ${theme.safe.bottom}px`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ height: 40 }}>{tag ? <Tag text={tag} /> : null}</div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: align === "center" ? "center" : "stretch",
            textAlign: align === "center" ? "center" : "left",
            gap: 64,
          }}
        >
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Tag: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        ...rise(enterAt(frame, fps, 0, 0.4), 12),
        fontFamily: theme.fonts.mono,
        fontWeight: 500,
        fontSize: theme.size.label,
        letterSpacing: "0.08em",
        color: theme.colors.muted,
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
};
