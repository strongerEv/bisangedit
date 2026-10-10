import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const W = 540;
// Koordinat px screenshot (640 lebar), diukur dari gambar asli.
const RIAN_CARD = { x: 320, y: 910, w: 584, h: 390 };
const SISA = { x: 171, y: 357, w: 260, h: 90 };
const TEMPO = { x: 277, y: 474, w: 470, h: 104 };

// "Simpan siapa yang berhutang, berapa sisanya, dan kapan jatuh temponya."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const toDetail = between(frame, fps, L(M.berapa) - 0.35, L(M.berapa) - 0.1);
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Siapa, berapa, *kapan*" delay={L(M.simpan) - 0.1} stagger={1.62} size={110} color={G.text} accent={G.rose} />
      </TitleArea>
      <Phone shots={[{ src: "03-hutang.webp", o: 1 - toDetail }, { src: "04-detail-hutang.webp", o: toDetail }]} width={W} y={1125} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={RIAN_CARD} p={on(L(M.simpan) + 0.3, L(M.berapa) - 0.4)} width={W} />
        <HiBox b={SISA} p={on(L(M.berapa) - 0.05, L(M.kapan) - 0.1)} width={W} />
        <HiBox b={TEMPO} p={enterAt(frame, fps, L(M.kapan) + 0.1, 0.25)} width={W} color={G.rose} />
      </Phone>
      <Center top={1765}>
        <Chip tone="rose" style={rise(enterAt(frame, fps, L(M.kapan) + 0.35, 0.3), 20)}>Lewat tempo? Kartunya jadi merah</Chip>
      </Center>
    </Stage>
  );
};
