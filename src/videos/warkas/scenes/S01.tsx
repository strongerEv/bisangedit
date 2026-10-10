import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, G, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const Stat: React.FC<{ label: string; value: string; color: string; p: number; y: number; shake?: number }> = ({ label, value, color, p, y, shake = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: 90,
      top: y,
      width: 900,
      height: 330,
      boxSizing: "border-box",
      background: "white",
      borderRadius: 48,
      padding: "50px 60px",
      boxShadow: `0 30px 70px ${G.shadow}`,
      ...font,
      opacity: Math.min(1, p * 2),
      transform: `translateY(${(1 - p) * 120}px) rotate(${shake}deg)`,
    }}
  >
    <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "0.06em", color: G.muted }}>{label}</div>
    <div style={{ fontSize: 130, fontWeight: 800, letterSpacing: "-0.03em", color, marginTop: 10 }}>{value}</div>
  </div>
);

// Hook: "Warungnya ramai, tapi kok untungnya nggak kelihatan?"
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const a = spring({ frame: frame - Math.round((L(M.warung) + 0.2) * fps), fps, config: { damping: 13 } });
  const b = spring({ frame: frame - Math.round((L(M.untung) - 0.1) * fps), fps, config: { damping: 11 } });
  const shake = t > L(M.untung) ? Math.sin(t * 30) * 1.5 : 0;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Warung ramai, tapi *untungnya?*" delay={L(M.warung) - 0.1} stagger={0.5} size={100} color={G.text} accent={G.g600} />
      </TitleArea>
      <Stat label="OMZET BULAN INI" value="Rp18,4 jt" color={G.g600} p={a} y={620} />
      <Stat label="UNTUNG BERSIH" value="Rp ???" color={G.rose} p={b} y={1010} shake={shake} />
    </Stage>
  );
};
