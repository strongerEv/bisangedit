import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { APPS, AppPhone, c, RED } from "../parts";
import { local, MARKERS as M } from "../timeline";
import { Clutter } from "./Clutter";

const L = (t: number) => local("S02", t);

// "Kalau usahamu masih begini, saatnya punya aplikasi sendiri."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const sweep = between(frame, fps, L(M.saatnya) - 0.45, L(M.saatnya) + 0.1);
  const happy = enterAt(frame, fps, L(M.saatnya), 0.4);
  const j = Math.sin(t * Math.PI * 2 * 2.2) * 20 * (1 - happy);
  const juggle = { ...POSES.juggle, armL: [POSES.juggle.armL[0] + j, POSES.juggle.armL[1]] as [number, number], armR: [POSES.juggle.armR[0] - j, POSES.juggle.armR[1]] as [number, number] };
  const pose = mixPose(juggle, POSES.cheer, happy);
  const phone = spring({ frame: frame - Math.round((L(M.aplikasi) - 0.2) * fps), fps, config: { damping: 12 } });
  const oldTitle = 1 - between(frame, fps, L(M.saatnya) - 0.4, L(M.saatnya) - 0.15);
  return (
    <Stage dur={dur} fadeOut={false}>
      <div style={{ position: "absolute", left: 96, top: 190, width: 900, opacity: oldTitle }}>
        <Words text="Kalau usahamu *masih* *begini…*" delay={L(M.kalau) - 0.1} stagger={0.2} size={92} color={c.text} accent={RED} />
      </div>
      <div style={{ position: "absolute", left: 96, top: 190, width: 900, opacity: 1 - oldTitle }}>
        <Words text="Saatnya punya *aplikasi* *sendiri.*" delay={L(M.saatnya) - 0.1} stagger={0.16} size={100} color={c.text} accent={RED} />
      </div>
      <Clutter at={{ chat: -5, excel: -5, note: -5 }} sweep={sweep} />
      <Stickman x={540 - 220 * phone} y={1560} pose={pose} face={happy > 0.5 ? "happy" : "stress"} scale={1.15} />
      <AppPhone x={680} y={1120} width={340} app={APPS[0]} style={{ opacity: Math.min(1, phone * 2), transform: `scale(${0.3 + 0.7 * phone}) rotate(${(1 - phone) * 20}deg)` }} />
    </Stage>
  );
};
