import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { at, Backdrop, Center, Chip, E, HiBox, Phone, TapRipple, TitleArea, WaChat } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);
const W = 520;
const JENIS = { x: 195, y: 393, w: 316, h: 54 };
const JUMLAH = { x: 195, y: 503, w: 316, h: 52 };
const KOTA = { x: 195, y: 595, w: 316, h: 52 };
const KIRIM = { x: 195, y: 798, w: 316, h: 56 };
// Pesan asli hasil form (emoji dihilangkan).
const MSG = [
  "Halo ingonentok, saya mau pesan:",
  "",
  "• Nama    : Pak Darto",
  "• Produk  : Entok Bakalan",
  "• Jumlah  : 20",
  "• Kota    : Kediri",
  "• Catatan : Minta campur jantan betina",
  "",
  "Mohon info total harga dan ongkos kirimnya ya. Terima kasih",
];

// "Mau pesan banyak? Isi form pesanan cepat: jenis, jumlah, kota. Langsung terkirim rapi ke WhatsApp."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const filled = between(frame, fps, L(M.isi) + 0.4, L(M.isi) + 0.8);
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.2) * (1 - enterAt(frame, fps, b, 0.15));
  const tap = L(M.langsung) + 0.1;
  const chat = between(frame, fps, tap + 0.3, tap + 0.6);
  const k = at(KIRIM, W);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Pesan banyak? *Isi* *form*" delay={L(M.mau) - 0.1} stagger={0.3} size={100} color={E.text} accent={E.hijau} />
      </TitleArea>
      <Phone width={W} y={1130} shots={[{ src: "form_kosong.jpg", o: 1 - filled }, { src: "form_isi.jpg", o: filled }]} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <HiBox b={JENIS} p={on(L(M.jenis) - 0.1, L(M.jumlah) - 0.1)} width={W} />
        <HiBox b={JUMLAH} p={on(L(M.jumlah) - 0.1, L(M.kota) - 0.1)} width={W} />
        <HiBox b={KOTA} p={on(L(M.kota) - 0.1, tap - 0.1)} width={W} />
        <TapRipple x={k.x} y={k.y} p={between(frame, fps, tap - 0.1, tap + 0.4)} />
        <WaChat lines={MSG} p={chat} />
      </Phone>
      <Center top={1750}>
        <Chip tone="wa" style={rise(enterAt(frame, fps, tap + 0.6, 0.3), 20)}>Terkirim rapi ke WhatsApp</Chip>
      </Center>
    </Stage>
  );
};
