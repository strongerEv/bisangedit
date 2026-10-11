import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, E, font, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);
const PARTS = [
  { src: "06_cara.jpg", label: "Cara pesan", at: M.cara },
  { src: "07_galeri.jpg", label: "Galeri kandang", at: M.galeri },
  { src: "08_testimoni.jpg", label: "Testimoni", at: M.testimoni },
  { src: "11_faq.jpg", label: "FAQ", at: M.faq },
];

// "Ada cara pesan, galeri kandang, testimoni, sampai FAQ. Pembeli makin yakin sebelum transfer."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const grid = between(frame, fps, L(M.yakin) - 0.3, L(M.yakin) + 0.2);
  const idx = PARTS.reduce((acc, p, i) => (t >= L(p.at) - 0.15 ? i : acc), 0);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Bikin pembeli *yakin*" delay={L(M.cara) - 0.1} stagger={0.3} size={104} color={E.text} accent={E.hijau} />
      </TitleArea>
      {PARTS.map((p, i) => {
        const inP = spring({ frame: frame - Math.round((L(p.at) - 0.15) * fps), fps, config: { damping: 14 } });
        const show = i === idx ? 1 : 0;
        if (inP <= 0 || (!show && grid === 0)) return null;
        const gx = 165 + i * 250;
        const x = interpolate(grid, [0, 1], [540, gx]);
        const y = interpolate(grid, [0, 1], [1130, 1080]);
        const w = interpolate(grid, [0, 1], [480, 210]);
        return (
          <React.Fragment key={p.src}>
            <Phone x={x} y={y} width={w} shots={[{ src: p.src, o: 1 }]} style={{ opacity: Math.min(1, inP * 2), transform: grid > 0 ? undefined : `translateY(${(1 - inP) * 60}px)` }} />
            <div style={{ position: "absolute", left: x - 150, width: 300, top: y + w * 1.08 + 40, textAlign: "center", ...font, fontWeight: 800, fontSize: 32 + 18 * (1 - grid), color: E.hijauTua }}>{p.label}</div>
          </React.Fragment>
        );
      })}
      <Center top={1700}>
        <Chip tone="kuning" style={rise(enterAt(frame, fps, L(M.yakin) + 0.6, 0.3), 20)}>Yakin sebelum transfer ✓</Chip>
      </Center>
    </Stage>
  );
};
