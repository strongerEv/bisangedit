import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, B, Chip, font, img, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

// "Naruh HP di tempat servis, terus cuma bisa nunggu kabar. Biayanya berapa? Udah dikerjain belum?"
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const hp = spring({ frame: frame - 3, fps, config: { damping: 13 } });
  const clock = enterAt(frame, fps, L(M.nunggu) + 0.2, 0.35);
  const q1 = spring({ frame: frame - Math.round((L(M.biaya) - 0.1) * fps), fps, config: { damping: 9 } });
  const q2 = spring({ frame: frame - Math.round((L(M.udah) - 0.1) * fps), fps, config: { damping: 9 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Naruh HP, terus *nunggu* *kabar…*" delay={L(M.naruh) - 0.1} stagger={0.3} size={96} color={B.text} accent={B.b600} />
      </TitleArea>
      <Img src={img("hp-layar-retak.png")} style={{ position: "absolute", left: 540 - 190, top: 620, width: 380, opacity: Math.min(1, hp * 2), transform: `translateY(${(1 - hp) * 200}px) rotate(${-6 + Math.sin(t * 2) * 1.5}deg)`, filter: `drop-shadow(0 30px 50px ${B.shadow})` }} />
      {/* jam menunggu */}
      <div style={{ position: "absolute", left: 120, top: 760, width: 180, height: 180, borderRadius: 90, background: "white", border: `10px solid ${B.b600}`, boxShadow: `0 20px 50px ${B.shadow}`, opacity: clock, transform: `scale(${0.6 + 0.4 * clock})` }}>
        <div style={{ position: "absolute", left: 80, top: 30, width: 10, height: 55, borderRadius: 5, background: B.b900, transformOrigin: "5px 50px", transform: `rotate(${t * 240}deg)` }} />
        <div style={{ position: "absolute", left: 80, top: 50, width: 10, height: 35, borderRadius: 5, background: B.accent, transformOrigin: "5px 30px", transform: `rotate(${t * 40}deg)` }} />
      </div>
      <div style={{ position: "absolute", left: 600, top: 760, opacity: Math.min(1, q1 * 2), transform: `scale(${0.5 + 0.5 * q1}) rotate(6deg)` }}>
        <Chip tone="accent" style={{ fontSize: 50 }}>Biayanya berapa?</Chip>
      </div>
      <div style={{ position: "absolute", left: 120, top: 1420, opacity: Math.min(1, q2 * 2), transform: `scale(${0.5 + 0.5 * q2}) rotate(-4deg)` }}>
        <Chip tone="dark" style={{ fontSize: 50 }}>Udah dikerjain belum?</Chip>
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1650, textAlign: "center", ...font, fontWeight: 800, fontSize: 150, color: B.b200, ...rise(enterAt(frame, fps, L(M.udah) + 0.4, 0.3), 20) }}>? ? ?</div>
    </Stage>
  );
};
