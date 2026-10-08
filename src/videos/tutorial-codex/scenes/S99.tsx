import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, L, mono, RED } from "../../tutorial-claude-code/parts";
import { local, MARKERS } from "../timeline";

const Pick: React.FC<{ label: string; p: number }> = ({ label, p }) => (
  <div
    style={{
      flex: 1,
      height: 170,
      borderRadius: 28,
      border: `4px solid ${c.text}`,
      background: c.card,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: 52,
      color: c.text,
      letterSpacing: "-0.02em",
      ...rise(p, 20),
    }}
  >
    {label}
  </div>
);

// Penutup: Claude Code vs Codex → komentar → konsultasi Youcanbuild.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = enterAt(frame, fps, local("S99", MARKERS.kamuPilih) + 0.5, 0.4);
  const b = enterAt(frame, fps, local("S99", MARKERS.atauCodex) - 0.1, 0.4);
  const brand = local("S99", MARKERS.konsultasi) - 0.1;
  const logo = enterAt(frame, fps, brand, 0.5);
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: L.x, top: 250, width: L.w }}>
        <Words text="Kamu pilih yang *mana?*" delay={local("S99", MARKERS.kamuPilih) - 0.1} size={L.titleSize} accent={RED} />
      </div>
      <div style={{ position: "absolute", left: L.x, top: 470, width: L.w, display: "flex", alignItems: "center", gap: 24 }}>
        <Pick label="Claude Code" p={a} />
        <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 44, color: RED, opacity: b }}>VS</div>
        <Pick label="Codex" p={b} />
      </div>
      <div style={{ position: "absolute", left: L.x, top: 690, ...mono, color: c.text, ...rise(enterAt(frame, fps, local("S99", MARKERS.komentar) - 0.1, 0.4), 10) }}>
        Tulis di komentar ↓
      </div>

      <div style={{ position: "absolute", left: L.x, top: 880, width: L.w, display: "flex", flexDirection: "column", gap: 36 }}>
        <Words text="Mau dibantu?" delay={local("S99", MARKERS.dibantu) - 0.1} size={84} color={c.muted} />
        <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ width: 520, opacity: logo, transform: `scale(${0.96 + 0.04 * logo})`, transformOrigin: "left center" }} />
        <div
          style={{
            alignSelf: "flex-start",
            ...rise(enterAt(frame, fps, brand + 0.4, 0.5), 24),
            background: RED,
            color: c.card,
            borderRadius: 999,
            padding: "30px 56px",
            fontFamily: theme.fonts.heading,
            fontWeight: 700,
            fontSize: 50,
            boxShadow: "0 18px 40px rgba(242, 13, 13, 0.28)",
          }}
        >
          Konsultasi gratis →
        </div>
      </div>
    </Stage>
  );
};
