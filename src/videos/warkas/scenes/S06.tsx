import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);
const W = 540;
// Baris "Susunan laba" di screenshot laporan.
const OMZET = { x: 450, y: 402, w: 830, h: 64 };
const HPP = { x: 450, y: 477, w: 830, h: 64 };
const PENGELUARAN = { x: 450, y: 637, w: 830, h: 64 };
const BERSIH = { x: 450, y: 778, w: 830, h: 110 };

// "Laporannya bukan cuma omzet, tapi sampai laba bersih, setelah dikurangi modal dan pengeluaran."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Bukan cuma omzet, tapi *laba* *bersih*" delay={L(M.laporan) - 0.1} stagger={0.38} size={92} color={G.text} accent={G.g600} />
      </TitleArea>
      <Phone shots={[{ src: "laporan.webp", o: 1 }]} width={W} y={1150} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={OMZET} p={on(L(M.omzet) - 0.1, L(M.labaBersih) - 0.1)} width={W} />
        <HiBox b={BERSIH} p={enterAt(frame, fps, L(M.labaBersih) - 0.1, 0.25)} width={W} color={G.g500} dim={false} />
        <HiBox b={HPP} p={enterAt(frame, fps, L(M.modal) - 0.1, 0.25)} width={W} color={G.rose} dim={false} />
        <HiBox b={PENGELUARAN} p={enterAt(frame, fps, L(M.pengeluaran) + 0.1, 0.25)} width={W} color={G.rose} dim={false} />
      </Phone>
      <Center top={1790}>
        <Chip tone="green" style={rise(enterAt(frame, fps, L(M.labaBersih) + 0.2, 0.3), 20)}>Laba bersih Rp4.223.000</Chip>
      </Center>
    </Stage>
  );
};
