import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, HiBox, N, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);
const W = 520;
const MASUK = { x: 195, y: 440, w: 362, h: 108 };
const LABA = { x: 195, y: 679, w: 362, h: 110 };
const EXCEL = { x: 58, y: 169, w: 88, h: 40 };

// "Akhir bulan, pemasukan sampai laba kotor sudah terekap, siap diekspor ke Excel."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Akhir bulan, *beres*" delay={L(M.akhir) - 0.1} stagger={0.4} size={110} color={N.text} accent={N.amber} />
      </TitleArea>
      <Phone width={W} y={1150} shots={[{ src: "laporan-hp.png", o: 1, h: 1800 }]} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={MASUK} p={on(L(M.pemasukan) - 0.1, L(M.siap) - 0.1)} width={W} dim={false} />
        <HiBox b={LABA} p={on(L(M.laba) - 0.1, L(M.siap) - 0.1)} width={W} dim={false} />
        <HiBox b={EXCEL} p={enterAt(frame, fps, L(M.excel) - 0.15, 0.25)} width={W} />
      </Phone>
      <Center top={1780}>
        <Chip tone="night" style={{ position: "absolute", ...rise(on(L(M.laba) + 0.3, L(M.excel) - 0.2), 20) }}>Pemasukan · pengeluaran · laba kotor</Chip>
        <Chip tone="amber" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.excel), 0.3), 20) }}>Ekspor Excel · PDF</Chip>
      </Center>
    </Stage>
  );
};
