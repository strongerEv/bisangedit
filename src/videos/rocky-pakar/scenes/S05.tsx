import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, mono } from "../parts";
import { local, MARKERS } from "../timeline";

const ROWS = [
  { k: "Pendidikan", v: "Filsafat, Universitas Indonesia", at: MARKERS.lulusan },
  { k: "Mengajar", v: "±15 tahun, dosen filsafat di UI", at: MARKERS.mengajar },
  { k: "Dikenal sebagai", v: "pengamat politik, kritikus", at: MARKERS.mengajar + 0.4 },
];

// Profil singkat: "Rocky itu siapa? Filsuf."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = enterAt(frame, fps, local("S05", MARKERS.filsuf) - 0.1, 0.4);
  return (
    <Scene dur={dur} tag="Satire · 03 · Siapa dia">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Words text="Rocky itu siapa?" delay={local("S05", MARKERS.siapa) - 0.1} size={92} color={c.muted} />
        <div
          style={{
            fontFamily: theme.fonts.heading,
            fontWeight: 700,
            fontSize: 180,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: c.accent,
            opacity: f,
            transform: `scale(${0.85 + 0.15 * f})`,
            transformOrigin: "left center",
          }}
        >
          Filsuf.
        </div>
      </div>
      <div style={{ background: c.card, borderRadius: 32, padding: "30px 36px", boxShadow: `0 24px 60px ${c.shadow}`, display: "flex", flexDirection: "column", gap: 22 }}>
        {ROWS.map((r) => (
          <div key={r.k} style={{ display: "flex", flexDirection: "column", gap: 4, ...rise(enterAt(frame, fps, local("S05", r.at) - 0.1, 0.4), 12) }}>
            <div style={{ ...mono, fontSize: 24 }}>{r.k}</div>
            <div style={{ fontFamily: theme.fonts.heading, fontWeight: 600, fontSize: 44, color: c.text }}>{r.v}</div>
          </div>
        ))}
      </div>
    </Scene>
  );
};
