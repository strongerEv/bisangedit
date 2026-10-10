import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { at, Backdrop, Center, Chip, G, HiBox, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);
const W = 540;
const TAGIH_BTN = { x: 320, y: 757, w: 590, h: 88 };
const HALUS = { x: 140, y: 376, w: 230, h: 68 };
const TEGAS = { x: 375, y: 376, w: 230, h: 68 };
const BUBBLE = { x: 320, y: 808, w: 552, h: 566 };
const KIRIM = { x: 432, y: 1218, w: 364, h: 88 };

// "Tinggal tekan 'Tagih via WhatsApp', pilih nadanya, halus atau tegas. Pesannya sudah terisi otomatis."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tap1 = L(M.tagihWa) + 0.2;
  const toSheet = between(frame, fps, tap1 + 0.25, tap1 + 0.55);
  const tapTegas = L(M.tegas) + 0.25;
  const tapKirim = L(M.pesannya) + 1.2;
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const t1 = at(TAGIH_BTN, W);
  const tt = at(TEGAS, W);
  const tk = at(KIRIM, W);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Tagih *sekali* *tekan*" delay={L(M.tinggal) - 0.1} stagger={0.25} size={110} color={G.text} accent={G.wa} />
      </TitleArea>
      <Phone shots={[{ src: "04-detail-hutang.webp", o: 1 - toSheet }, { src: "05-tagih-whatsapp.webp", o: toSheet }]} width={W} y={1125}>
        <HiBox b={TAGIH_BTN} p={on(L(M.tinggal) + 0.1, tap1 + 0.3)} width={W} color={G.amber} />
        <TapRipple x={t1.x} y={t1.y} p={between(frame, fps, tap1 - 0.1, tap1 + 0.4)} />
        <HiBox b={HALUS} p={on(L(M.halus) - 0.1, L(M.tegas) - 0.05)} width={W} />
        <HiBox b={TEGAS} p={on(L(M.tegas) - 0.05, L(M.pesannya) - 0.1)} width={W} color={G.rose} />
        <TapRipple x={tt.x} y={tt.y} p={between(frame, fps, tapTegas - 0.1, tapTegas + 0.4)} />
        <HiBox b={BUBBLE} p={on(L(M.pesannya) - 0.05, tapKirim - 0.1)} width={W} color={G.wa} />
        <HiBox b={KIRIM} p={enterAt(frame, fps, tapKirim - 0.1, 0.2)} width={W} color={G.wa} dim={false} />
        <TapRipple x={tk.x} y={tk.y} p={between(frame, fps, tapKirim, tapKirim + 0.45)} />
      </Phone>
      <Center top={1765}>
        <Chip tone="light" style={{ position: "absolute", ...rise(on(L(M.halus) - 0.1, L(M.tegas) - 0.05), 20) }}>Halus 🙏</Chip>
        <Chip tone="rose" style={{ position: "absolute", ...rise(on(L(M.tegas) - 0.05, L(M.pesannya) - 0.1), 20) }}>Tegas</Chip>
        <Chip tone="wa" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.pesannya) + 0.1, 0.3), 20) }}>Pesan terisi otomatis ✓</Chip>
      </Center>
    </Stage>
  );
};
