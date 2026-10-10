import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { at, Backdrop, Center, Chip, G, HiBox, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);
const W = 540;
// Koordinat px screenshot kasir (900 lebar).
const AYAM = { x: 662, y: 545 };
const ESTEH = { x: 662, y: 950 };
const CART = { x: 450, y: 1865, w: 860, h: 120 };
const STOK_AYAM = { x: 548, y: 692, w: 160, h: 52 };

// "Jualan tinggal tap produk, bayar tunai, QRIS, atau transfer. Stok langsung terpotong otomatis."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const pays = [
    { t: "Tunai", at: M.bayar + 0.3 },
    { t: "QRIS", at: M.qris },
    { t: "Transfer", at: M.transfer + 0.2 },
  ];
  const a = at(AYAM, W);
  const e = at(ESTEH, W);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Tinggal *tap* produk" delay={L(M.jualan) - 0.1} stagger={0.25} size={110} color={G.text} accent={G.g600} />
      </TitleArea>
      <Phone shots={[{ src: "kasir.webp", o: 1 }]} width={W} y={1125} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <TapRipple x={a.x} y={a.y} p={between(frame, fps, L(M.tap) - 0.1, L(M.tap) + 0.35)} />
        <TapRipple x={e.x} y={e.y} p={between(frame, fps, L(M.tap) + 0.3, L(M.tap) + 0.75)} />
        <TapRipple x={a.x} y={a.y} p={between(frame, fps, L(M.tap) + 0.6, L(M.tap) + 1.05)} />
        <HiBox b={CART} p={on(L(M.bayar) - 0.1, L(M.stok) - 0.15)} width={W} dim={false} />
        <HiBox b={STOK_AYAM} p={enterAt(frame, fps, L(M.stok) + 0.2, 0.25)} width={W} color={G.rose} />
      </Phone>
      <Center top={1765}>
        {pays.map((p, i) => {
          const s = spring({ frame: frame - Math.round((L(p.at) - 0.1) * fps), fps, config: { damping: 11 } });
          const out = enterAt(frame, fps, L(M.stok) - 0.2, 0.2);
          return (
            <Chip key={p.t} tone={i === 1 ? "dark" : "green"} style={{ opacity: Math.min(1, s * 2) * (1 - out), transform: `scale(${0.5 + 0.5 * s})` }}>
              {p.t}
            </Chip>
          );
        })}
      </Center>
      <Center top={1765}>
        <Chip tone="rose" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.stok) + 0.3, 0.3), 20) }}>Stok terpotong otomatis</Chip>
      </Center>
    </Stage>
  );
};
