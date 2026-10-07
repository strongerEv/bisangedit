import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, L, mono, Progress, RED, StepTitle, Window } from "../parts";
import { local, MARKERS } from "../timeline";

const PROMPT = "Buatkan aplikasi absensi karyawan yang bisa dibuka dari HP.";
const CODE = ["// app/absen/page.tsx", "export default function Absen() {", "  return <TombolAbsen />;", "}"];

// Langkah 3: ketik permintaan, Claude menulis kodenya.
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.round(between(frame, fps, 0.4, 2.6) * PROMPT.length);
  const write = local("S04", MARKERS.menulis) - 0.1;
  const total = CODE.join("\n").length;
  let left = Math.round(between(frame, fps, write + 0.1, write + 1.4) * total);
  const shown = CODE.map((l) => {
    const s = l.slice(0, Math.max(0, left));
    left -= l.length + 1;
    return s;
  });

  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={3} />
      <StepTitle dur={dur}>
        <Words text="Ceritakan *aplikasimu.*" delay={local("S04", MARKERS.tiga) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>

      <Window dur={dur} tab="Claude Code">
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ ...mono, fontSize: 24 }}>kamu:</div>
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: 640,
              minHeight: 60,
              background: c.text,
              color: c.onDark,
              borderRadius: 30,
              borderBottomRightRadius: 8,
              padding: "24px 30px",
              fontFamily: theme.fonts.heading,
              fontWeight: 600,
              fontSize: 38,
              lineHeight: 1.25,
              marginTop: -16,
            }}
          >
            {PROMPT.slice(0, typed)}
          </div>
          <div style={{ ...mono, fontSize: 24, color: RED, ...rise(enterAt(frame, fps, write, 0.3), 10) }}>Claude ▸ menulis kode…</div>
          <div
            style={{
              background: c.code,
              borderRadius: 24,
              padding: "26px 30px",
              minHeight: 200,
              fontFamily: theme.fonts.mono,
              fontWeight: 500,
              fontSize: 28,
              lineHeight: 1.55,
              color: c.onDark,
              whiteSpace: "pre",
              fontVariantLigatures: "none",
              ...rise(enterAt(frame, fps, write, 0.3), 14),
            }}
          >
            {shown.map((l, i) => (
              <div key={i} style={{ height: 43, color: i === 0 ? c.codeMuted : undefined }}>
                {l}
              </div>
            ))}
          </div>
        </div>
      </Window>
    </Stage>
  );
};
