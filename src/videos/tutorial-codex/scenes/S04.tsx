import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Check, c, L, mono, Progress, RED, StepTitle, Window } from "../../tutorial-claude-code/parts";
import { local, MARKERS } from "../timeline";

const TASK = "Buatkan halaman pemesanan untuk kafe saya.";
const STEPS = ["Membaca repo kafe-saya", "Menulis halaman pemesanan", "Menjalankan tes"];

// Langkah 3: tulis tugas → Codex mengerjakan di cloud.
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typeAt = local("S04", MARKERS.buatkan) - 0.1;
  const typed = Math.round(between(frame, fps, typeAt, typeAt + 2.3) * TASK.length);
  const cloudAt = local("S04", MARKERS.cloud) - 0.1;
  const work = between(frame, fps, cloudAt, cloudAt + 2.0);

  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={3} />
      <StepTitle dur={dur}>
        <Words text="Tulis *tugasnya.*" delay={local("S04", MARKERS.tulis) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>
      <Window dur={dur} tab="Codex · tugas baru">
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ ...mono, ...rise(enterAt(frame, fps, local("S04", MARKERS.misalnya) - 0.1, 0.4), 10) }}>Misalnya:</div>
          <div
            style={{
              minHeight: 150,
              borderRadius: 24,
              border: `3px solid ${c.text}`,
              padding: "24px 28px",
              fontFamily: theme.fonts.heading,
              fontWeight: 600,
              fontSize: 40,
              lineHeight: 1.25,
              color: c.text,
              boxSizing: "border-box",
            }}
          >
            {TASK.slice(0, typed)}
          </div>
          <div style={{ ...rise(enterAt(frame, fps, cloudAt, 0.4), 12) }}>
            <div style={{ ...mono, color: RED, marginBottom: 14 }}>{work < 1 ? "Codex mengerjakan di cloud…" : "Selesai di cloud"}</div>
            <div style={{ height: 18, borderRadius: 9, background: c.line, overflow: "hidden" }}>
              <div style={{ width: `${work * 100}%`, height: "100%", background: RED }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {STEPS.map((s, i) => (
              <Check key={s} text={s} p={enterAt(frame, fps, cloudAt + 0.4 + i * 0.5, 0.35)} />
            ))}
          </div>
        </div>
      </Window>
    </Stage>
  );
};
