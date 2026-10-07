import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { local, MARKERS } from "../timeline";

export const S08: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="07 · Pertanyaan">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div
          style={{
            ...rise(enterAt(frame, fps, 0.2, 0.4), 16),
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: theme.size.label + 4,
            letterSpacing: "0.1em",
            color: theme.colors.muted,
          }}
        >
          PERTANYAANNYA SEKARANG:
        </div>
        <Words text="Yang pindah orangnya…" delay={local("S08", MARKERS.orangnya) - 0.1} size={112} />
        <Words text="atau *nadanya?*" delay={local("S08", MARKERS.nadanya) - 0.1} size={140} />
      </div>
    </Scene>
  );
};
