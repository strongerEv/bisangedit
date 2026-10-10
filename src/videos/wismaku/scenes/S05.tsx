import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { at, Backdrop, Center, Chip, HiBox, N, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);
const W = 520;
const TOTAL = { x: 195, y: 140, w: 358, h: 150 };
const BAYAR = { x: 195, y: 463, w: 328, h: 52 };

// "Penghuni punya portal sendiri. Cek tagihan, kirim bukti transfer, tekan 'Saya Sudah Bayar'."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const tap = L(M.sudahBayar) + 0.2;
  const tb = at(BAYAR, W);
  const steps = [
    { t: "1 · Cek tagihan", at: M.cek },
    { t: "2 · Kirim bukti transfer", at: M.kirimBukti },
    { t: "3 · Saya Sudah Bayar", at: M.sudahBayar },
  ];
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Penghuni punya *portal*" delay={L(M.penghuni) - 0.1} stagger={0.3} size={104} color={N.text} accent={N.amber} />
      </TitleArea>
      <Phone width={W} y={1150} shots={[{ src: "portal-penghuni.png", o: 1, h: 1796 }]} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={TOTAL} p={on(L(M.cek) - 0.1, L(M.kirimBukti) - 0.1)} width={W} />
        <HiBox b={BAYAR} p={enterAt(frame, fps, L(M.sudahBayar) - 0.15, 0.25)} width={W} />
        <TapRipple x={tb.x} y={tb.y} p={between(frame, fps, tap, tap + 0.45)} />
      </Phone>
      <Center top={1780}>
        {steps.map((s, i) => (
          <Chip key={s.t} tone={i === 2 ? "amber" : "night"} style={{ position: "absolute", ...rise(on(L(s.at) - 0.1, i < 2 ? L(steps[i + 1].at) - 0.15 : 99), 20) }}>
            {s.t}
          </Chip>
        ))}
      </Center>
    </Stage>
  );
};
