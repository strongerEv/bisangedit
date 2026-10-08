import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { body, c, L, mono, RED } from "../../tutorial-claude-code/parts";
import { local, MARKERS } from "../timeline";

export const STEP_NAMES = ["Langganan ChatGPT Plus", "Hubungkan GitHub & pilih repo", "Tulis tugasnya", "Cek, pull request, gabungkan", "Sambungkan & online"];

// Hook langsung: judul + peta 5 langkah. Seri part 2.
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const list = local("S01", MARKERS.limaLangkah) - 0.1;
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: L.x, top: 230, ...mono, ...rise(enterAt(frame, fps, 0, 0.4), 10) }}>Part 2 · Seri bikin aplikasi</div>
      <div style={{ position: "absolute", left: L.x, top: 300, width: L.w, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Satu kalimat; jarak antar-kata dihitung supaya "pakai" muncul tepat di MARKERS.pakaiCodex. */}
        <Words
          text="Cara bikin aplikasi web pakai *Codex* dari ChatGPT."
          delay={local("S01", MARKERS.cara) - 0.1}
          stagger={(MARKERS.pakaiCodex - MARKERS.cara) / 4}
          size={L.titleSize}
          accent={RED}
        />
      </div>

      <div style={{ position: "absolute", left: L.x, top: 820, width: L.w, display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ alignSelf: "flex-start", background: RED, borderRadius: 999, padding: "10px 26px", ...mono, color: c.card, ...rise(enterAt(frame, fps, list, 0.4), 12) }}>
          5 LANGKAH · CODEX
        </div>
        {STEP_NAMES.map((name, i) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 24, ...rise(enterAt(frame, fps, list + 0.15 + i * 0.12, 0.4), 18) }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                border: `4px solid ${c.text}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: theme.fonts.heading,
                fontWeight: 700,
                fontSize: 36,
                color: c.text,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div style={body(44)}>{name}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
};
