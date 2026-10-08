import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { IstanaDiagram } from "../../rocky-wantimpres/IstanaDiagram";
import { L, SatireTag, Speech, TitleBox } from "../parts";
import { local, MARKERS } from "../timeline";

/** Posisi gelembung (px layar) relatif terhadap diagram di L.diagramY. */
export const SPEECH_OUT = { x: 130, y: L.diagramY + 250 };
export const SPEECH_IN = { x: 590, y: L.diagramY + 315 };

// "Pakar paling lantang… yang dulu hobi bilang: dungu." Diagram disambung S07.
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dungu = local("S06", MARKERS.dungu1) - 0.1;
  return (
    <Stage dur={dur} fadeOut={false}>
      <SatireTag extra="04 · Dulu" />
      <TitleBox dur={dur}>
        <Words text="Pakar paling lantang… yang dulu hobi bilang:" delay={local("S06", MARKERS.pakar) - 0.1} stagger={0.07} size={92} />
      </TitleBox>
      <div style={{ position: "absolute", left: L.x, top: L.diagramY }}>
        <IstanaDiagram appear={enterAt(frame, fps, 0.1, 0.5)} inside={0} critique={enterAt(frame, fps, dungu - 0.4, 0.5)} />
      </div>
      <Speech text="DUNGU!" x={SPEECH_OUT.x} y={SPEECH_OUT.y} p={enterAt(frame, fps, dungu, 0.35)} accent size={72} />
    </Stage>
  );
};
