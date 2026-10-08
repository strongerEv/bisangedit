import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { IstanaDiagram } from "../../rocky-wantimpres/IstanaDiagram";
import { L, SatireTag, Speech, TitleBox } from "../parts";
import { local, MARKERS } from "../timeline";
import { SPEECH_IN, SPEECH_OUT } from "./S06";

// "Dulu di luar, teriak dungu. Sekarang di dalam, kasih nasihat." Titik pindah masuk.
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inAt = local("S07", MARKERS.diDalam) - 0.1;
  const move = enterAt(frame, fps, inAt, 0.8);
  return (
    <Stage dur={dur}>
      <SatireTag extra="05 · Sekarang" />
      <TitleBox dur={dur}>
        <Words text="Dulu di luar, teriak *dungu.*" delay={local("S07", MARKERS.diLuar) - 0.1} stagger={0.07} size={92} />
        <Words text="Sekarang di dalam, kasih *nasihat.*" delay={inAt} stagger={0.07} size={92} />
      </TitleBox>
      <div style={{ position: "absolute", left: L.x, top: L.diagramY }}>
        <IstanaDiagram inside={move} critique={1} sides={1} />
      </div>
      <Speech text="DUNGU!" x={SPEECH_OUT.x} y={SPEECH_OUT.y} p={1 - move} accent size={72} />
      <Speech text="nasihat…" x={SPEECH_IN.x} y={SPEECH_IN.y} p={enterAt(frame, fps, local("S07", MARKERS.nasihat) - 0.1, 0.35)} size={44} />
    </Stage>
  );
};
