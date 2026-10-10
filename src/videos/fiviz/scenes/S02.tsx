import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, img } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);

// "Firman Service punya jawabannya: Fiviz."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - Math.round((L(M.firman) - 0.1) * fps), fps, config: { damping: 11 } });
  const name = spring({ frame: frame - Math.round((L(M.fiviz) - 0.12) * fps), fps, config: { damping: 9 } });
  return (
    <Stage dur={dur}>
      <Backdrop blue />
      <Img src={img("logo.png")} style={{ position: "absolute", left: 540 - 180, top: 470, width: 360, height: 360, borderRadius: 80, boxShadow: "0 30px 80px rgba(0,0,0,0.35)", opacity: Math.min(1, logo * 2), transform: `scale(${0.5 + 0.5 * logo}) rotate(${(1 - logo) * -15}deg)` }} />
      <div style={{ position: "absolute", left: 90, width: 900, top: 900, textAlign: "center" }}>
        <Words text="Firman Service punya jawabannya:" delay={L(M.firman) - 0.1} stagger={0.2} size={62} weight={600} color="rgba(255,255,255,0.85)" accent="white" />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1060, textAlign: "center", ...font, fontWeight: 900, fontSize: 260, letterSpacing: "-0.04em", color: "white", opacity: Math.min(1, name * 2), transform: `scale(${0.6 + 0.4 * name})` }}>
        Fiviz
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1400, textAlign: "center", ...font, fontWeight: 600, fontSize: 44, color: "#FFD08A", ...rise(enterAt(frame, fps, L(M.fiviz) + 0.4, 0.4), 20) }}>
        Aplikasi servis HP yang transparan
      </div>
    </Stage>
  );
};
