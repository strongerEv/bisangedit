import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, L, mono, Node, Progress, RED, StepTitle, Window } from "../../tutorial-claude-code/parts";
import { local, MARKERS } from "../timeline";

const REPOS = ["toko-online", "kafe-saya", "profil-sekolah"];
const PICK = 1;

// Langkah 2: Codex ↔ GitHub, lalu pilih repo.
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const link = local("S03", MARKERS.hubungkan) - 0.1;
  const line = between(frame, fps, link, link + 0.4);
  const done = enterAt(frame, fps, link + 0.45, 0.35);
  const repoAt = local("S03", MARKERS.pilihRepo) - 0.1;
  const picked = enterAt(frame, fps, repoAt + 0.9, 0.3);

  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={2} />
      <StepTitle dur={dur}>
        <Words text="Hubungkan *GitHub.*" delay={local("S03", MARKERS.dua) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>
      <Window dur={dur} tab="chatgpt.com/codex">
        <div style={{ position: "relative", height: "100%" }}>
          <Node label="Codex" sub="di ChatGPT" style={{ left: 0, top: 0, width: 330, ...rise(enterAt(frame, fps, local("S03", MARKERS.bukaCodex) - 0.1, 0.4), 14) }} />
          <Node label="GitHub" sub={done > 0.5 ? "✓ terhubung" : "akun kamu"} active={done > 0.5} style={{ left: 454, top: 0, width: 330, ...rise(enterAt(frame, fps, link, 0.4), 14) }} />
          <div style={{ position: "absolute", left: 330, top: 62, width: 124 * line, height: 6, background: RED, borderRadius: 3 }} />

          <div style={{ position: "absolute", left: 0, right: 0, top: 220, ...rise(enterAt(frame, fps, repoAt, 0.4), 16) }}>
            <div style={{ ...mono, marginBottom: 18 }}>Pilih repo</div>
            {REPOS.map((r, i) => {
              const on = i === PICK ? picked : 0;
              return (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "18px 24px",
                    marginBottom: 14,
                    borderRadius: 20,
                    border: `3px solid ${on > 0.5 ? RED : c.line}`,
                    background: on > 0.5 ? c.brandSoft : c.card,
                    ...rise(enterAt(frame, fps, repoAt + 0.15 + i * 0.1, 0.35), 10),
                  }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 15, border: `4px solid ${on > 0.5 ? RED : c.muted}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: RED, opacity: on }} />
                  </div>
                  <div style={{ fontFamily: theme.fonts.mono, fontWeight: 500, fontSize: 32, color: c.text }}>{r}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Window>
    </Stage>
  );
};
