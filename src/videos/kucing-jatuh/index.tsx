import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { P } from "./palette";
import { EndScene, SafeScene, WarnScene } from "./Scenes";
import { Shot } from "./Shot";
import { AUDIO, DURATION, sec, T } from "./timeline";

const X = 0.3; // adegan berikut memudar masuk di atas adegan sebelumnya

export const KucingJatuh: React.FC = () => (
  <AbsoluteFill style={{ background: P.skyBottom }}>
    <Audio src={staticFile(AUDIO)} />
    <Sequence durationInFrames={sec(T.warn + X)} name="SHOT · atap → mendarat">
      <Shot />
    </Sequence>
    <Sequence from={sec(T.warn)} durationInFrames={sec(T.safe - T.warn + X)} name="WARN · tetap bisa cedera">
      <WarnScene />
    </Sequence>
    <Sequence from={sec(T.safe)} durationInFrames={sec(T.end - T.safe + X)} name="SAFE · pasang pengaman">
      <SafeScene />
    </Sequence>
    <Sequence from={sec(T.end)} durationInFrames={DURATION - sec(T.end)} name="END · keren, bukan kebal">
      <EndScene />
    </Sequence>
  </AbsoluteFill>
);
