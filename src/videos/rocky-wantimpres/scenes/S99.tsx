import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { local, MARKERS } from "../timeline";

// Penutup tanpa logo (permintaan user). Hanya CTA.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enterAt(frame, fps, 0.1, 0.6);
  return (
    <Scene dur={dur} align="center">
      <div
        style={{
          opacity: title,
          transform: `scale(${0.96 + 0.04 * title})`,
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 128,
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: theme.colors.text,
        }}
      >
        Kita lihat saja.
      </div>
      <div
        style={{
          ...rise(enterAt(frame, fps, local("S99", MARKERS.follow) - 0.1, 0.5), 24),
          border: `4px solid ${theme.colors.accent}`,
          borderRadius: 999,
          padding: "26px 52px",
          fontFamily: theme.fonts.heading,
          fontWeight: 600,
          fontSize: 44,
          color: theme.colors.accent,
        }}
      >
        Follow untuk part berikutnya →
      </div>
    </Scene>
  );
};
