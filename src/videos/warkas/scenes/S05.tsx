import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);
const W = 540;
const MODAL = { x: 245, y: 395, w: 410, h: 150 };
const KAS = { x: 656, y: 756, w: 420, h: 170 };

// "Saat tutup shift, kas di laci langsung dicocokkan. Selisih sedikit pun ketahuan."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Tutup shift, kas *dicocokkan*" delay={L(M.saat) - 0.1} stagger={0.35} size={96} color={G.text} accent={G.g600} />
      </TitleArea>
      <Phone shots={[{ src: "shift.webp", o: 1 }]} width={W} y={1125} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={MODAL} p={on(L(M.saat) + 0.3, L(M.kas) + 0.4)} width={W} />
        <HiBox b={KAS} p={enterAt(frame, fps, L(M.kas) + 0.5, 0.3)} width={W} />
      </Phone>
      <Center top={1765}>
        <Chip tone="rose" style={rise(enterAt(frame, fps, L(M.selisih) - 0.1, 0.3), 20)}>Selisih langsung ketahuan</Chip>
      </Center>
    </Stage>
  );
};
