import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, E, font, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);
const ITEMS = [
  { t: "Ringan", sub: "HTML murni, tanpa framework", at: M.ringan + 0.2 },
  { t: "Cepat di HP", sub: "Dibuka lancar walau sinyal pas-pasan", at: M.ringan + 0.8 },
  { t: "Tanpa server mahal", sub: "Bisa di-hosting gratis", at: M.tanpa - 0.1 },
];

// "Ringan dibuka di HP, tanpa server mahal."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="*Ringan* & hemat" delay={L(M.ringan) - 0.1} stagger={0.3} size={110} color={E.text} accent={E.hijau} />
      </TitleArea>
      <Phone x={300} y={1150} width={400} shots={[{ src: "hero_f06.jpg", o: 1 }]} style={{ opacity: enterAt(frame, fps, 0, 0.3) }} />
      {ITEMS.map((it, i) => {
        const p = spring({ frame: frame - Math.round((L(it.at) - 0.1) * fps), fps, config: { damping: 12 } });
        return (
          <div key={it.t} style={{ position: "absolute", left: 560, top: 640 + i * 300, width: 470, background: i === 2 ? E.hijauTua : "white", color: i === 2 ? "white" : E.text, border: `2px solid ${E.border}`, borderRadius: 32, padding: "30px 32px", boxShadow: `0 20px 50px ${E.shadow}`, ...font, opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * 200}px)` }}>
            <div style={{ fontSize: 46, fontWeight: 800 }}>{it.t}</div>
            <div style={{ fontSize: 28, marginTop: 6, opacity: 0.75 }}>{it.sub}</div>
          </div>
        );
      })}
    </Stage>
  );
};
