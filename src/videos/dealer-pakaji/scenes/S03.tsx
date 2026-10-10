import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, css, D, HiBox, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);
const W = 500;
// Diukur dari elemen website (CSS px, layar 390×844).
const BRAND = css(195, 193, W);
const TYPE = css(195, 355, W);
const MAX = css(195, 436, W);
const BTN = css(195, 492, W);

// "Pembeli bisa cari mobil berdasarkan merek, tipe, sampai batas harga."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const tapAt = L(M.harga) + 0.55;
  const swap = between(frame, fps, tapAt + 0.25, tapAt + 0.55);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Cari berdasarkan *merek,* *tipe,* *harga*" delay={L(M.pembeli) - 0.1} stagger={0.98} size={92} color={D.text} accent={D.red} />
      </TitleArea>
      <Phone shots={[{ src: "11_finder.png", o: 1 - swap }, { src: "12_katalog.png", o: swap }]} width={W} y={1150}>
        <div style={{ opacity: 1 - swap }}>
          <HiBox c={BRAND} w={330} h={50} p={on(L(M.merek) - 0.15, L(M.tipe) - 0.15)} width={W} />
          <HiBox c={TYPE} w={330} h={50} p={on(L(M.tipe) - 0.15, L(M.harga) - 0.15)} width={W} />
          <HiBox c={MAX} w={330} h={50} p={on(L(M.harga) - 0.15, tapAt)} width={W} />
          <TapRipple x={BTN.x} y={BTN.y} p={between(frame, fps, tapAt - 0.1, tapAt + 0.4)} />
        </div>
      </Phone>
    </Stage>
  );
};
