import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { local, MARKERS } from "../timeline";

export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, 0, 0.5);
  // Baris kartu muncul mengikuti kalimat: tanggal dulu, lalu nama + jabatan.
  const tanggal = local("S03", MARKERS.tanggal) - 0.1;
  const nama = local("S03", MARKERS.nama) - 0.1;
  const at = (t: number) => rise(enterAt(frame, fps, t, 0.5), 24);
  const small: React.CSSProperties = {
    fontFamily: theme.fonts.mono,
    fontWeight: 500,
    fontSize: theme.size.label,
    letterSpacing: "0.08em",
    color: theme.colors.muted,
    textTransform: "uppercase",
  };

  return (
    <Scene dur={dur} tag="03 · Fakta">
      <div
        style={{
          opacity: card,
          transform: `scale(${0.96 + 0.04 * card})`,
          background: theme.colors.card,
          borderRadius: 40,
          padding: "64px 60px",
          boxShadow: `0 24px 60px ${theme.colors.shadow}`,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div style={{ ...small, ...at(tanggal) }}>2 Oktober 2026 · Istana Negara</div>
        <div>
          <Words text="Rocky Gerung" delay={nama} stagger={0.08} size={112} />
        </div>
        <div
          style={{
            ...at(nama + 0.6),
            fontFamily: theme.fonts.heading,
            fontWeight: 600,
            fontSize: theme.size.body,
            color: theme.colors.text,
            lineHeight: 1.2,
          }}
        >
          resmi jadi anggota{" "}
          <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Wantimpres</span>
        </div>
        <div style={{ height: 3, background: theme.colors.line, ...at(nama + 1.0) }} />
        <div style={{ ...small, ...at(nama + 1.12) }}>Keppres 107/P 2026 · 26 anggota</div>
      </div>
    </Scene>
  );
};
