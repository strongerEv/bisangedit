import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { local, MARKERS } from "../timeline";

export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="04 · Tugas">
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            ...rise(enterAt(frame, fps, 0.1, 0.4), 16),
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: theme.size.label + 4,
            letterSpacing: "0.1em",
            color: theme.colors.muted,
          }}
        >
          TUGASNYA:
        </div>
        <Words text="Memberi *nasihat* kepada Presiden." delay={local("S04", MARKERS.memberi) - 0.1} size={112} />
      </div>
    </Scene>
  );
};
