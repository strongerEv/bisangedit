import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, cssToScreen, F, mono, Phone, SHOT, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const W = 500;
const STRIP_H = 6732; // public/aset/fastreng/admin_strip.png
const OMZET = { c: cssToScreen(195, 365, W), w: 470, h: 150 };

// Dashboard penjual (data contoh): omzet → menu terlaris → jam ramai (layar di-scroll).
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // posisi scroll dalam px CSS halaman dashboard
  const cssY = interpolate(
    t,
    [local("S06", M.terlaris) - 0.2, local("S06", M.terlaris) + 0.5, local("S06", M.jamRamai) - 0.2, local("S06", M.jamRamai) + 0.5],
    [0, 860, 860, 1290],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const omzet = enterAt(frame, fps, local("S06", M.omzet) - 0.1, 0.3) * (1 - enterAt(frame, fps, local("S06", M.terlaris) - 0.3, 0.2));
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Plus *dashboard* penjual" delay={local("S06", M.dashboard) - 0.1} stagger={0.1} size={88} color={F.ink} accent={F.orangeDeep} />
      </TitleArea>
      <Phone src="admin_strip.png" stripH={STRIP_H} scrollY={cssY * SHOT.css} width={W} y={1050}>
        <div style={{ position: "absolute", left: OMZET.c.x - OMZET.w / 2, top: OMZET.c.y - OMZET.h / 2, width: OMZET.w, height: OMZET.h, borderRadius: 22, border: `6px solid ${F.orange}`, opacity: omzet }} />
      </Phone>
      <Chip style={{ left: 96, top: 440, padding: "8px 20px", ...mono, fontSize: 24, color: F.muted }}>tampilan dengan data contoh</Chip>
    </Stage>
  );
};
