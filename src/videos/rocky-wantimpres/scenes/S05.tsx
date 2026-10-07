import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Label } from "../../../components/Label";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { Words } from "../../../components/Words";

export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="05 · Imajinasi">
      <Label text="Adegan imajinasi" style={rise(enterAt(frame, fps, 0, 0.4), 16)} />
      <Words text="Bayangkan rapat *pertamanya.*" delay={0.2} size={120} />
    </Scene>
  );
};
