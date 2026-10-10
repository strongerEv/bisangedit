import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { POSES, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { AppPhone, c, font, RED } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);

// "Sekarang giliran usahamu."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const phone = spring({ frame: frame - 2, fps, config: { damping: 13 } });
  const turn = spring({ frame: frame - Math.round((L(M.giliran) + 0.2) * fps), fps, config: { damping: 10 } });
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: 96, top: 190, width: 900 }}>
        <Words text="Sekarang giliran *usahamu.*" delay={L(M.sekarang) - 0.1} stagger={0.25} size={104} color={c.text} accent={RED} />
      </div>
      <AppPhone x={640} y={1080} width={400} style={{ opacity: Math.min(1, phone * 2), transform: `scale(${0.8 + 0.2 * phone})` }}>
        <div style={{ position: "absolute", inset: 18, borderRadius: 30, border: `6px dashed ${c.line}` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...font, fontWeight: 900, fontSize: 240, color: c.line, opacity: 1 - turn, transform: `scale(${1 + Math.sin(t * 6) * 0.04})` }}>?</div>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, opacity: turn, transform: `scale(${0.6 + 0.4 * turn})` }}>
          <div style={{ width: 150, height: 150, borderRadius: 40, background: RED, boxShadow: "0 18px 40px rgba(242,13,13,0.3)" }} />
          <div style={{ ...font, fontWeight: 800, fontSize: 58, color: c.text }}>Usahamu</div>
        </div>
      </AppPhone>
      <Stickman x={230} y={1560} pose={POSES.point} face="happy" facing={1} scale={1.1} />
    </Stage>
  );
};
