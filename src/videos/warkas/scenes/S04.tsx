import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const W = 540;
const HPP = { x: 450, y: 636, w: 830, h: 100 };
const UNTUNG = { x: 450, y: 1012, w: 830, h: 110 };

// "Isi harga modal, dan untung per produknya langsung kelihatan."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Isi modal, *untung* kelihatan" delay={L(M.isi) - 0.1} stagger={0.4} size={96} color={G.text} accent={G.g600} />
      </TitleArea>
      <Phone shots={[{ src: "produk.webp", o: 1 }]} width={W} y={1125} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={HPP} p={on(L(M.isi) + 0.1, L(M.untungPer) + 0.5)} width={W} />
        <HiBox b={UNTUNG} p={enterAt(frame, fps, L(M.untungPer) + 0.6, 0.3)} width={W} />
      </Phone>
      <Center top={1765}>
        <Chip tone="green" style={rise(enterAt(frame, fps, L(M.untungPer) + 0.9, 0.3), 20)}>Untung Rp7.000 · margin 38,9%</Chip>
      </Center>
    </Stage>
  );
};
