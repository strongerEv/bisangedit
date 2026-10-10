import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppIcon, Backdrop, C, Chip, font } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);

// "Solusinya: aplikasi Call Blocker."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const icon = spring({ frame: frame - Math.round((L(M.aplikasi) - 0.15) * fps), fps, config: { damping: 10 } });
  const name = enterAt(frame, fps, L(M.callBlocker) - 0.1, 0.4);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 0, width: 1080, top: 300, textAlign: "center" }}>
        <Words text="*Solusinya:*" delay={L(M.solusinya) - 0.1} size={110} color={C.text} accent={C.orangeDeep} />
      </div>
      <div style={{ position: "absolute", left: 540 - 150, top: 620, opacity: Math.min(1, icon * 2), transform: `scale(${0.4 + 0.6 * icon}) rotate(${(1 - icon) * -20}deg)` }}>
        <AppIcon size={300} />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1000, textAlign: "center", ...font, fontWeight: 800, fontSize: 110, letterSpacing: "-0.03em", color: C.navy, ...rise(name, 30) }}>
        Call Blocker
      </div>
      <Chip tone="orange" style={{ left: 540, top: 1190, transform: "translateX(-50%)", opacity: enterAt(frame, fps, L(M.callBlocker) + 0.5, 0.4) }}>
        Blokir telepon spam otomatis
      </Chip>
    </Stage>
  );
};
