import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, font, G, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);

// "Dan semua datanya tersimpan aman di HP kamu sendiri."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  const lock = spring({ frame: frame - Math.round((L(M.aman) - 0.15) * fps), fps, config: { damping: 9 } });
  return (
    <Stage dur={dur}>
      <Backdrop dark />
      <TitleArea dur={dur}>
        <Words text="Data *aman* di HP-mu" delay={L(M.semua) - 0.1} stagger={0.3} size={110} color="white" accent={G.mint} />
      </TitleArea>
      <div style={{ position: "absolute", left: 540 - 210, top: 560, width: 420, height: 820, borderRadius: 70, border: `16px solid ${G.mint}`, boxSizing: "border-box", opacity: Math.min(1, phone * 2), transform: `scale(${0.8 + 0.2 * phone})` }}>
        <div style={{ position: "absolute", left: "50%", top: 24, width: 120, height: 20, marginLeft: -60, borderRadius: 10, background: G.mint }} />
      </div>
      <svg viewBox="0 0 100 120" width={240} height={288} style={{ position: "absolute", left: 540 - 120, top: 820, opacity: Math.min(1, lock * 2), transform: `scale(${0.4 + 0.6 * lock})` }}>
        <path d="M25 50 V35 a25 25 0 0 1 50 0 V50" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" />
        <rect x="12" y="50" width="76" height="62" rx="12" fill={G.mint} />
        <circle cx="50" cy="76" r="8" fill={G.g900} />
        <rect x="46" y="78" width="8" height="18" rx="4" fill={G.g900} />
      </svg>
      <Center top={1480} style={{ flexDirection: "column", alignItems: "center", gap: 24 }}>
        <Chip tone="light" style={rise(enterAt(frame, fps, L(M.aman) + 0.3, 0.3), 20)}>100% di perangkatmu</Chip>
        <Chip tone="green" style={{ ...font, ...rise(enterAt(frame, fps, L(M.aman) + 0.6, 0.3), 20) }}>Tanpa server, bisa offline</Chip>
      </Center>
    </Stage>
  );
};
