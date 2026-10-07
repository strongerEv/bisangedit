import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { Words } from "../../../components/Words";
import { IstanaDiagram } from "../IstanaDiagram";
import { local, MARKERS } from "../timeline";

export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="02 · Sekarang">
      <Words text="Sekarang, kantornya *di* *istana.*" />
      <IstanaDiagram appear={enterAt(frame, fps, 0, 0.4)} inside={enterAt(frame, fps, local("S02", MARKERS.kantornya) + 0.4, 0.8)} />
    </Scene>
  );
};
