import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { POSES, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { TITLE } from "../layout";
import { BigNum, Bubble, RED, Sheet } from "../parts";
import { local, MARKERS } from "../timeline";

// Tanda 2: file dan chat beterbangan masuk, stickman panik menangkap.
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const excel = local("S03", MARKERS.excel) - 0.1;
  const wa = local("S03", MARKERS.whatsapp) - 0.1;

  // [muncul, dariX, dariY, keX, keY, rotasi]
  const fly = (at: number, fx: number, fy: number, tx: number, ty: number, rot: number) => {
    const p = enterAt(frame, fps, at, 0.6);
    return {
      left: interpolate(p, [0, 1], [fx, tx]),
      top: interpolate(p, [0, 1], [fy, ty]),
      opacity: Math.min(1, p * 3),
      transform: `rotate(${rot * p}deg)`,
    };
  };

  const juggle = Math.sin(t * Math.PI * 2 * 1.3) * 14;
  const pose = { ...POSES.juggle, armL: [POSES.juggle.armL[0] + juggle, POSES.juggle.armL[1]] as [number, number], armR: [POSES.juggle.armR[0] + juggle, POSES.juggle.armR[1]] as [number, number] };

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 8 }}>
        <BigNum n="2" pop={enterAt(frame, fps, local("S03", MARKERS.dua) - 0.1, 0.4)} />
        <Words text="Data tercecer di Excel & *chat.*" delay={local("S03", MARKERS.data) - 0.1} stagger={0.08} size={TITLE.size} accent={RED} />
      </div>

      <Sheet name="laporan_final_v3.xlsx" style={fly(excel - 1.0, -400, 700, 110, 820, -8)} />
      <Sheet name="stok_FIX_baru.xlsx" style={fly(excel - 0.3, 1200, 640, 620, 760, 7)} />
      <Bubble w={180} style={fly(wa - 0.9, 420, 1950, 420, 700, 3)} />
      <Bubble w={200} style={fly(wa - 0.5, -300, 1200, 160, 1120, -6)} />
      <Bubble w={230} dark style={fly(wa - 0.1, 1300, 1150, 700, 1060, 5)} />

      <Stickman x={540} y={1450} pose={pose} face="stress" scale={1.15} />
    </Stage>
  );
};
