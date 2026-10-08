import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, mono } from "../parts";
import { local, MARKERS } from "../timeline";

const Point: React.FC<{ date: string; text: string; p: number; accent?: boolean }> = ({ date, text, p, accent }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 300, ...rise(p, 16) }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: accent ? c.accent : c.text }} />
    <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 52, color: accent ? c.accent : c.text, letterSpacing: "-0.02em" }}>{date}</div>
    <div style={{ ...mono, textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line" }}>{text}</div>
  </div>
);

// Garis waktu: 18 Sep (pidato) → 2 Okt (dilantik), 14 hari.
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = local("S04", MARKERS.duaMinggu) - 0.1;
  const line = between(frame, fps, t0 + 0.3, t0 + 1.1);
  const t1 = local("S04", MARKERS.dilantik) - 0.1;
  return (
    <Scene dur={dur} tag="Satire · 02 · Dua minggu kemudian">
      <Words text="Dua minggu kemudian, Rocky Gerung jadi anggota *Wantimpres.*" delay={t0} stagger={0.07} size={92} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ position: "absolute", left: 170, right: 170, top: 18, height: 6, background: c.line, borderRadius: 3 }} />
        <div style={{ position: "absolute", left: 170, top: 18, width: `calc((100% - 340px) * ${line})`, height: 6, background: c.text, borderRadius: 3 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: -50, textAlign: "center", ...mono, color: c.text, opacity: line }}>14 hari</div>
        <Point date="18 Sep" text={"pidato\n“pakar…”"} p={enterAt(frame, fps, t0, 0.4)} />
        <Point date="2 Okt" text={"Rocky dilantik\nWantimpres"} p={enterAt(frame, fps, t1, 0.4)} accent />
      </div>
    </Scene>
  );
};
