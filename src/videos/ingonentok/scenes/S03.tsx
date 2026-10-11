import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, E, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);
const W = 520;
const HARGA = { x: 195, y: 689, w: 304, h: 52 };
const PRICES = ["Rp12.000/ekor", "Rp35.000/ekor", "Rp55.000/ekor", "Rp90.000/ekor", "Rp150.000/ekor", "Rp5.000/butir"];
const NAMES = ["DOD", "Bakalan", "Remaja", "Siap Potong", "Indukan", "Telur Tetas"];

// "Katalognya lengkap: dari DOD dua belas ribuan, entok bakalan, sampai indukan. Harganya terpampang jelas."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // urutan kartu: DOD → Bakalan → (Remaja, Siap Potong sekilas) → Indukan → lalu berputar semua saat "harganya"
  let idx = 0;
  if (t >= L(M.bakalan) - 0.15) idx = 1;
  if (t >= L(M.indukan) - 0.55) idx = 2;
  if (t >= L(M.indukan) - 0.35) idx = 3;
  if (t >= L(M.indukan) - 0.15) idx = 4;
  if (t >= L(M.harganya) + 0.2) idx = Math.floor((t - L(M.harganya) - 0.2) / 0.32) % 6;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Katalog *lengkap*" delay={L(M.katalog) - 0.1} stagger={0.4} size={110} color={E.text} accent={E.hijau} />
      </TitleArea>
      <Phone width={W} y={1130} shots={[0, 1, 2, 3, 4, 5].map((i) => ({ src: `kartu_${i}.jpg`, o: i === idx ? 1 : 0 }))} style={rise(enterAt(frame, fps, 0, 0.4), 60)}>
        <HiBox b={HARGA} p={enterAt(frame, fps, L(M.dod) + 0.4, 0.25)} width={W} dim={false} />
      </Phone>
      <Center top={1750}>
        {NAMES.map((n, i) => {
          const p = spring({ frame: frame - Math.round((L(M.dod) - 0.2) * fps), fps, config: { damping: 12 } });
          return i === idx ? (
            <Chip key={n} tone="kuning" style={{ position: "absolute", opacity: Math.min(1, p * 2) }}>
              {n} · {PRICES[i]}
            </Chip>
          ) : null;
        })}
      </Center>
      <Center top={460}>
        <Chip tone="light" style={{ fontSize: 34, ...rise(enterAt(frame, fps, L(M.harganya), 0.3), 16) }}>Harga terpampang jelas</Chip>
      </Center>
    </Stage>
  );
};
