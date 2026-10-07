import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { theme } from "../../../components/theme";
import { IstanaDiagram } from "../../rocky-wantimpres/IstanaDiagram";
import { ScreenHeader, screenPad } from "./common";

/** Langkah ANIMASI: pratinjau adegan video pertama (titik masuk istana). */
export const AnimasiScreen: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={screenPad}>
      <ScreenHeader text="preview · S02" />
      <div
        style={{
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 44,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: theme.colors.text,
          marginBottom: 30,
        }}
      >
        Sekarang, kantornya <span style={{ color: theme.colors.accent }}>di istana.</span>
      </div>
      <div style={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
        <IstanaDiagram inside={enterAt(frame, fps, start + 0.3, 0.8)} />
      </div>
    </div>
  );
};
