import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppIcon, Backdrop, C, Icon, IconName } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S99", t);

const Big: React.FC<{ icon: IconName; p: number; x: number; color: string }> = ({ icon, p, x, color }) => (
  <div style={{ position: "absolute", left: x - 150, top: 1050, width: 300, height: 300, borderRadius: 150, background: color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 30px 70px ${C.shadow}`, opacity: Math.min(1, p * 2), transform: `scale(${0.4 + 0.6 * p})` }}>
    <Icon name={icon} size={150} color="white" stroke={2.2} />
  </div>
);

// Penutup: "Simpan video ini, dan kirim ke orang tuamu."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - Math.round((L(M.simpanVideo) - 0.1) * fps), fps, config: { damping: 10 } });
  const b = spring({ frame: frame - Math.round((L(M.kirim) - 0.1) * fps), fps, config: { damping: 10 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 540 - 80, top: 230 }}>
        <AppIcon size={160} />
      </div>
      <div style={{ position: "absolute", left: 90, width: 900, top: 470, textAlign: "center" }}>
        <Words text="*Simpan* video ini," delay={L(M.simpanVideo) - 0.1} stagger={0.2} size={100} color={C.text} accent={C.orangeDeep} />
      </div>
      <div style={{ position: "absolute", left: 90, width: 900, top: 720, textAlign: "center" }}>
        <Words text="kirim ke *orang* *tuamu*" delay={L(M.kirim) - 0.1} stagger={0.2} size={100} color={C.text} accent={C.orangeDeep} />
      </div>
      <Big icon="bookmark" p={a} x={340} color={C.navy} />
      <Big icon="send" p={b} x={740} color={C.orangeDeep} />
    </Stage>
  );
};
