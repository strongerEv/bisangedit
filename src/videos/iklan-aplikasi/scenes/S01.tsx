import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { POSES, type Pose, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { c, RED } from "../parts";
import { local, MARKERS as M } from "../timeline";
import { Clutter } from "./Clutter";

const L = (t: number) => local("S01", t);

// "Pesanan di chat. Stok di Excel. Tagihan di ingatan."
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const level = t < L(M.excel) ? 1 : t < L(M.tagihan) ? 2 : 3;
  const j = Math.sin(t * Math.PI * 2 * (1 + level * 0.4)) * (8 + level * 6);
  const pose: Pose = { ...POSES.juggle, armL: [POSES.juggle.armL[0] + j, POSES.juggle.armL[1]], armR: [POSES.juggle.armR[0] - j, POSES.juggle.armR[1]] };
  const lines = [
    { text: "Pesanan di *chat.*", at: M.chat },
    { text: "Stok di *Excel.*", at: M.excel },
    { text: "Tagihan di *ingatan.*", at: M.tagihan },
  ];
  return (
    <Stage dur={dur} fadeOut={false}>
      {lines.map((l, i) => (
        <div key={l.text} style={{ position: "absolute", left: 96, top: 190 + i * 112, width: 900 }}>
          <Words text={l.text} delay={L(l.at) - 0.1} stagger={0.12} size={92} color={c.text} accent={RED} />
        </div>
      ))}
      <Clutter at={{ chat: L(M.chat) + 0.1, excel: L(M.excel) + 0.05, note: L(M.tagihan) + 0.1 }} />
      <Stickman x={540 + Math.sin(t * 20) * level * 1.5} y={1560} pose={pose} face="stress" scale={1.15} />
    </Stage>
  );
};
