import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { body, c, Check, L, mono, Progress, RED, StepTitle, Window } from "../../tutorial-claude-code/parts";
import { local, MARKERS } from "../timeline";

const DIFF = [
  { sign: "+", text: "app/pesan/page.tsx" },
  { sign: "+", text: "components/MenuKafe.tsx" },
  { sign: "~", text: "app/layout.tsx" },
];

const Button: React.FC<{ text: string; press: number; solid?: boolean; style?: React.CSSProperties }> = ({ text, press, solid, style }) => (
  <div
    style={{
      alignSelf: "flex-start",
      borderRadius: 18,
      padding: "18px 32px",
      background: solid ? RED : c.card,
      color: solid ? c.card : c.text,
      border: solid ? undefined : `3px solid ${c.text}`,
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: 36,
      transform: `scale(${1 - 0.06 * Math.sin(Math.PI * press)})`,
      ...style,
    }}
  >
    {text}
  </div>
);

// Langkah 4: cek diff → buat pull request → gabungkan.
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prAt = local("S05", MARKERS.pullRequest) - 0.1;
  const mergeAt = local("S05", MARKERS.gabungkan) - 0.1;
  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={4} />
      <StepTitle dur={dur}>
        <Words text="Cek, lalu *gabungkan.*" delay={local("S05", MARKERS.cek) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>
      <Window dur={dur} tab="Codex · hasil kerja">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ ...rise(enterAt(frame, fps, local("S05", MARKERS.cek) - 0.1, 0.4), 12) }}>
            <div style={{ ...mono, marginBottom: 12 }}>Perubahan · 3 file</div>
            {DIFF.map((d, i) => (
              <div key={d.text} style={{ display: "flex", gap: 18, fontFamily: theme.fonts.mono, fontWeight: 500, fontSize: 30, color: c.text, padding: "6px 0", ...rise(enterAt(frame, fps, local("S05", MARKERS.cek) + 0.1 + i * 0.1, 0.35), 8) }}>
                <span style={{ color: d.sign === "+" ? RED : c.muted, width: 20 }}>{d.sign}</span>
                {d.text}
              </div>
            ))}
          </div>
          <Button text="Buat pull request" press={between(frame, fps, prAt + 0.3, prAt + 0.6)} style={{ ...rise(enterAt(frame, fps, prAt, 0.35), 12) }} />
          <div
            style={{
              borderRadius: 22,
              border: `3px solid ${c.line}`,
              background: c.bg,
              padding: "22px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              ...rise(enterAt(frame, fps, prAt + 0.65, 0.4), 14),
            }}
          >
            <div style={body(36)}>PR #1 · Halaman pemesanan kafe</div>
            <Button text="Gabungkan" solid press={between(frame, fps, mergeAt + 0.2, mergeAt + 0.5)} />
            <Check text="Digabung ke main" p={enterAt(frame, fps, mergeAt + 0.55, 0.35)} />
          </div>
        </div>
      </Window>
    </Stage>
  );
};
