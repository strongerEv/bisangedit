import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { at, Backdrop, Center, Chip, HiBox, N, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const W = 520;
const DEWI = { x: 196, y: 464, w: 364, h: 176 };
const PENGINGAT = { x: 246, y: 520, w: 160, h: 44 };

// "Tagihan dibuat otomatis, dan pengingatnya tinggal kirim lewat WhatsApp."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const tap = L(M.whatsapp) - 0.1;
  const tp = at(PENGINGAT, W);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Tagihan *otomatis*" delay={L(M.tagihan) - 0.1} stagger={0.3} size={110} color={N.text} accent={N.amber} />
      </TitleArea>
      <Phone width={W} y={1150} shots={[{ src: "tagihan-hp.png", o: 1, h: 7036 }]} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={DEWI} p={on(L(M.tagihan) + 0.2, L(M.pengingat) - 0.1)} width={W} />
        <HiBox b={PENGINGAT} p={enterAt(frame, fps, L(M.pengingat), 0.25)} width={W} color={N.amber} />
        <TapRipple x={tp.x} y={tp.y} p={between(frame, fps, tap, tap + 0.45)} />
      </Phone>
      <Center top={1780}>
        <Chip tone="night" style={{ position: "absolute", ...rise(on(L(M.tagihan) + 0.6, L(M.whatsapp) - 0.2), 20) }}>Terlambat & denda dihitung sendiri</Chip>
        <Chip tone="wa" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.whatsapp) + 0.1, 0.3), 20) }}>Pengingat via WhatsApp</Chip>
      </Center>
    </Stage>
  );
};
