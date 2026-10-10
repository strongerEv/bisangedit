import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, HiBox, N, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);
const W = 520;
const MERAH = { x: 134, y: 361, w: 122, h: 60 };
const LEGEND = { x: 168, y: 440, w: 150, h: 26 };

// "Lihat denahnya: kamar merah artinya belum bayar. Sekali lirik, langsung tahu siapa yang nunggak."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pulse = t > L(M.merah) ? 0.75 + 0.25 * Math.sin(t * 8) : 1;
  const who = [
    { t: "102 · Rina", at: M.langsungTahu + 0.4 },
    { t: "103 · Dewi", at: M.langsungTahu + 0.75 },
  ];
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kamar *merah* = belum bayar" delay={L(M.lihat) - 0.1} stagger={0.32} size={96} color={N.text} accent={N.coral} />
      </TitleArea>
      <Phone width={W} y={1150} shots={[{ src: "denah-hp.png", o: 1 }]}>
        <HiBox b={MERAH} p={enterAt(frame, fps, L(M.merah) - 0.1, 0.3) * pulse} width={W} color={N.coral} />
        <HiBox b={LEGEND} p={enterAt(frame, fps, L(M.kamar) + 1.2, 0.3) * (1 - enterAt(frame, fps, L(M.sekali), 0.2))} width={W} color={N.coral} dim={false} />
      </Phone>
      <Center top={1780}>
        {who.map((w) => {
          const p = spring({ frame: frame - Math.round((L(w.at) - 0.1) * fps), fps, config: { damping: 11 } });
          return (
            <Chip key={w.t} tone="coral" style={{ opacity: Math.min(1, p * 2), transform: `scale(${0.5 + 0.5 * p})` }}>
              {w.t}
            </Chip>
          );
        })}
      </Center>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 520, display: "flex", justifyContent: "center", ...rise(enterAt(frame, fps, L(M.sekali) - 0.1, 0.3), 16) }}>
        <Chip tone="night">Sekali lirik, langsung ketahuan</Chip>
      </div>
    </Stage>
  );
};
