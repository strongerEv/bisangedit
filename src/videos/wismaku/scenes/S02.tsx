import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { Backdrop, img, N, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);

// "Sekarang cukup buka Wismaku."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = enterAt(frame, fps, L(M.cukup) - 0.2, 0.4);
  const phone = spring({ frame: frame - Math.round((L(M.wismaku) - 0.35) * fps), fps, config: { damping: 14 } });
  const logo = spring({ frame: frame - Math.round((L(M.wismaku) - 0.1) * fps), fps, config: { damping: 10 } });
  const pose = mixPose(POSES.slump, POSES.point, lift);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Sekarang cukup buka *Wismaku*" delay={L(M.sekarang) - 0.1} stagger={0.22} size={100} color={N.text} accent={N.amber} />
      </TitleArea>
      <Stickman x={230} y={1500} pose={pose} face={lift > 0.5 ? "happy" : "stress"} facing={1} scale={1.2} color={N.cream} />
      <Phone
        x={230 + (690 - 230) * phone}
        y={1340 + (1150 - 1340) * phone}
        width={140 + 400 * phone}
        shots={[{ src: "denah-hp.png", o: 1 }]}
        style={{ opacity: Math.min(1, lift * 3), transform: `rotate(${(1 - phone) * -14}deg)` }}
      />
      <Img src={img("logo.png")} style={{ position: "absolute", left: 840, top: 430, width: 130, height: 130, borderRadius: 32, background: "white", opacity: Math.min(1, logo * 2), transform: `scale(${0.4 + 0.6 * logo})` }} />
    </Stage>
  );
};
