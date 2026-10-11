import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { at, Backdrop, Center, Chip, E, HiBox, Phone, TapRipple, TitleArea, WaChat } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const W = 520;
const BTN = { x: 195, y: 754, w: 306, h: 56 };
// Pesan asli dari tombol kartu DOD (emoji pembuka dihilangkan).
const MSG = ["Halo ingonentok, saya tertarik dengan *DOD Entok (Rp 12.000/ekor)*.", "Apakah stoknya masih tersedia? Mohon info harga dan ongkos kirimnya ya."];

// "Tiap produk punya tombol WhatsApp sendiri. Pesannya otomatis, lengkap dengan produk dan harganya."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tap = L(M.tombol) + 0.35;
  const chat = between(frame, fps, L(M.pesannya) - 0.3, L(M.pesannya));
  const b = at(BTN, W);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Tiap produk, *tombol* *WA*" delay={L(M.tiap) - 0.1} stagger={0.3} size={100} color={E.text} accent={E.hijau} />
      </TitleArea>
      <Phone width={W} y={1130} shots={[{ src: "kartu_0.jpg", o: 1 }]} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={BTN} p={enterAt(frame, fps, L(M.tombol) - 0.15, 0.25) * (1 - chat)} width={W} color={E.wa} />
        <TapRipple x={b.x} y={b.y} p={between(frame, fps, tap - 0.1, tap + 0.4)} />
        <WaChat lines={MSG} p={chat} />
      </Phone>
      <Center top={1750}>
        <Chip tone="wa" style={rise(enterAt(frame, fps, L(M.lengkap), 0.3), 20)}>Produk + harga terisi otomatis</Chip>
      </Center>
    </Stage>
  );
};
