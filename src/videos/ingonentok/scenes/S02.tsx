import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, E, img, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);
const FRAMES = [0, 2, 4, 6, 8, 10, 12, 14].map((i) => `hero_f${String(i).padStart(2, "0")}.jpg`);

// "Ini website ingonentok. Sekali dibuka, pembeli langsung kenal peternakannya."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const phone = spring({ frame: frame - Math.round((L(M.ini) - 0.2) * fps), fps, config: { damping: 14 } });
  const logo = spring({ frame: frame - Math.round((L(M.ini) + 0.6) * fps), fps, config: { damping: 10 } });
  // animasi asli rombongan entok: rangkaian screenshot diputar ulang
  const fi = Math.floor(t / 0.24) % FRAMES.length;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Website *ingonentok*" delay={L(M.ini) - 0.1} stagger={0.4} size={110} color={E.text} accent={E.hijau} />
      </TitleArea>
      <Img src={img("logo.png")} style={{ position: "absolute", left: 830, top: 360, width: 150, height: 150, opacity: Math.min(1, logo * 2), transform: `scale(${0.4 + 0.6 * logo}) rotate(${(1 - logo) * 20}deg)` }} />
      <Phone width={500} y={1130} shots={FRAMES.map((f, i) => ({ src: f, o: i === fi ? 1 : 0 }))} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 700}px)` }} />
      <Center top={1740}>
        <Chip tone="hijau" style={rise(enterAt(frame, fps, L(M.pembeli), 0.35), 20)}>Pembeli langsung kenal</Chip>
      </Center>
    </Stage>
  );
};
