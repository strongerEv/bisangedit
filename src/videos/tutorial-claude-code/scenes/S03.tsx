import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, L, mono, Node, Progress, RED, StepTitle, Window } from "../parts";
import { local, MARKERS } from "../timeline";

const FILES = ["src/", "app/page.tsx", "package.json", "README.md"];

// Langkah 2: hubungkan Claude Code ↔ GitHub, lalu repo tempat kode disimpan.
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const link = local("S03", MARKERS.hubungkan) - 0.1;
  const line = between(frame, fps, link, link + 0.4);
  const done = enterAt(frame, fps, link + 0.45, 0.35);
  const repo = local("S03", MARKERS.disimpan) - 0.1;

  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={2} />
      <StepTitle dur={dur}>
        <Words text="Hubungkan *GitHub.*" delay={local("S03", MARKERS.dua) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>

      <Window dur={dur} tab="claude.ai/code">
        <div style={{ position: "relative", height: "100%" }}>
          <Node label="Claude Code" sub="tempat kamu ngobrol" style={{ left: 0, top: 0, width: 330, ...rise(enterAt(frame, fps, 0.3, 0.4), 14) }} />
          <Node label="GitHub" sub={done > 0.5 ? "✓ terhubung" : "akun kamu"} active={done > 0.5} style={{ left: 454, top: 0, width: 330, ...rise(enterAt(frame, fps, 0.5, 0.4), 14) }} />
          <div style={{ position: "absolute", left: 330, top: 62, width: 124 * line, height: 6, background: RED, borderRadius: 3 }} />

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 230,
              borderRadius: 24,
              border: `3px solid ${c.line}`,
              background: c.bg,
              padding: "26px 30px",
              ...rise(enterAt(frame, fps, repo, 0.4), 18),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <div style={{ width: 44, height: 34, borderRadius: 6, background: c.text }} />
              <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 40, color: c.text }}>aplikasi-saya</div>
            </div>
            {FILES.map((f, i) => (
              <div key={f} style={{ ...mono, fontSize: 28, letterSpacing: 0, color: c.text, padding: "8px 0", ...rise(enterAt(frame, fps, repo + 0.2 + i * 0.1, 0.35), 10) }}>
                {f}
              </div>
            ))}
          </div>
        </div>
      </Window>
    </Stage>
  );
};
