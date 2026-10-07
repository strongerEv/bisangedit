import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { Words } from "../../../components/Words";
import { IstanaDiagram } from "../IstanaDiagram";
import { local, MARKERS } from "../timeline";

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="01 · Dulu">
      <Words text="Dulu kerjanya mengkritik *istana.*" />
      <IstanaDiagram
        appear={enterAt(frame, fps, 0.4, 0.6)}
        inside={0}
        critique={enterAt(frame, fps, local("S01", MARKERS.kritik) + 0.3, 0.9)}
      />
    </Scene>
  );
};
