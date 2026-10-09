import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, cssToScreen, F, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const W = 500;
const SEG = cssToScreen(195, 628, W); // pilihan Diantar / Ambil Sendiri (06_cart)
const ADDR = cssToScreen(195, 390, W); // kolom alamat (07_checkout)
const BTN = cssToScreen(254, 723, W); // tombol Pesan via WhatsApp

const Box: React.FC<{ c: { x: number; y: number }; w: number; h: number; p: number }> = ({ c, w, h, p }) => (
  <div style={{ position: "absolute", left: c.x - w / 2, top: c.y - h / 2, width: w, height: h, borderRadius: 18, border: `6px solid ${F.orange}`, opacity: p, transform: `scale(${1.08 - 0.08 * p})` }} />
);

// Checkout: diantar/ambil → alamat → tekan Pesan via WhatsApp.
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = local("S04", M.alamat) - 0.15;
  const swap = between(frame, fps, a, a + 0.35);
  const tap = local("S04", M.tekanWa) + 0.9;
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Isi data, lalu *kirim*" delay={local("S04", M.diantar) - 0.1} stagger={0.1} size={92} color={F.ink} accent={F.orangeDeep} />
      </TitleArea>
      <Phone src="06_cart.png" width={W} y={1050}>
        <Box c={SEG} w={440} h={78} p={enterAt(frame, fps, local("S04", M.diantar) + 0.3, 0.3) * (1 - swap)} />
      </Phone>
      <Phone src="07_checkout.png" width={W} y={1050} style={{ opacity: swap }}>
        <Box c={ADDR} w={440} h={90} p={enterAt(frame, fps, a + 0.3, 0.3) * (1 - enterAt(frame, fps, local("S04", M.tekanWa) - 0.1, 0.2))} />
        <Box c={BTN} w={310} h={86} p={enterAt(frame, fps, local("S04", M.tekanWa) - 0.1, 0.3)} />
        <TapRipple x={BTN.x} y={BTN.y} p={between(frame, fps, tap, tap + 0.5)} />
      </Phone>
    </Stage>
  );
};
