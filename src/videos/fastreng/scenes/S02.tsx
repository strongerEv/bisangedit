import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, F, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

// Apa itu Fastreng: aplikasi pesan-antar cireng di HP, bisa dipasang (PWA).
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ins = enterAt(frame, fps, local("S02", M.install) - 0.1, 0.4);
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Aplikasi pesan-antar *cireng*" delay={local("S02", M.aplikasi) - 0.1} stagger={0.1} size={88} color={F.ink} accent={F.orangeDeep} />
      </TitleArea>
      <Phone src="02_home.png" width={500} y={1050} style={rise(enterAt(frame, fps, 0, 0.5), 60)} />
      <Chip dark style={{ left: 600, top: 1380, display: "flex", alignItems: "center", gap: 14, opacity: ins, transform: `scale(${0.7 + 0.3 * ins})` }}>
        <svg width={34} height={34} viewBox="0 0 34 34">
          <path d="M17 4 V22 M9 15 L17 23 L25 15 M6 29 H28" stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Bisa dipasang di HP
      </Chip>
    </Stage>
  );
};
