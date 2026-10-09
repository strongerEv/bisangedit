import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { EndCard } from "./EndCard";
import { P } from "./palette";
import { Shot } from "./Shot";
import { DURATION, sec, T } from "./timeline";

// TES GERAK Mochi (tanpa VO): satu shot menerus + kartu penutup.
export const KucingJatuhTes: React.FC = () => (
  <AbsoluteFill style={{ background: P.skyBottom }}>
    <Sequence durationInFrames={sec(T.end) + sec(0.3)} name="Shot · atap → mendarat">
      <Shot />
    </Sequence>
    <Sequence from={sec(T.end)} durationInFrames={DURATION - sec(T.end)} name="Penutup">
      <EndCard />
    </Sequence>
  </AbsoluteFill>
);
