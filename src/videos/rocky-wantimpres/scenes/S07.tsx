import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { IstanaDiagram } from "../IstanaDiagram";
import { local, MARKERS } from "../timeline";

export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="06 · Katanya">
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Words text="“Cuma pindah dari *luar* ke *dalam.*”" delay={local("S07", MARKERS.katanya) - 0.1} size={96} stagger={0.08} />
        <div
          style={{
            ...rise(enterAt(frame, fps, 0.8, 0.4), 12),
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: theme.size.label,
            letterSpacing: "0.04em",
            color: theme.colors.muted,
          }}
        >
          — Rocky Gerung, usai dilantik
        </div>
      </div>
      <IstanaDiagram
        appear={enterAt(frame, fps, 0.3, 0.5)}
        sides={enterAt(frame, fps, 0.6, 0.4)}
        inside={enterAt(frame, fps, 1.6, 0.8)}
      />
    </Scene>
  );
};
