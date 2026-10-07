import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { body, c, Check, L, mono, Progress, RED, StepTitle, Window } from "../parts";
import { local, MARKERS } from "../timeline";

const URL = "aplikasi-saya.vercel.app";
const ROWS = [
  { name: "Rina", time: "07.52" },
  { name: "Budi", time: "07.58" },
  { name: "Sari", time: "08.03" },
];

// Langkah 5: push → build → online, lalu aplikasi terbuka di browser.
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const push = local("S06", MARKERS.tayang) - 0.1;
  const build = between(frame, fps, push + 0.4, push + 2.0);
  const ready = enterAt(frame, fps, push + 2.05, 0.35);
  const live = local("S06", MARKERS.online) - 0.1;
  const swap = between(frame, fps, live, live + 0.4);
  const url = Math.round(between(frame, fps, live + 0.2, live + 0.9) * URL.length);

  return (
    <Stage dur={dur}>
      <Progress step={5} />
      <StepTitle dur={dur}>
        <Words text="Otomatis *online.*" delay={local("S06", MARKERS.lima) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>

      <Window tab="aplikasi-saya">
        {/* Fase 1: push → build → ready */}
        <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 34, opacity: 1 - swap }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, ...rise(enterAt(frame, fps, push, 0.4), 12) }}>
            <div style={{ ...mono, fontSize: 30, letterSpacing: 0, color: c.onDark, background: c.code, borderRadius: 14, padding: "12px 22px" }}>git push</div>
            <div style={body(36)}>kode baru masuk GitHub</div>
          </div>
          <div style={{ ...rise(enterAt(frame, fps, push + 0.35, 0.4), 12) }}>
            <div style={{ ...mono, marginBottom: 14 }}>{build < 1 ? "MEMBANGUN APLIKASI…" : "SELESAI"}</div>
            <div style={{ height: 22, borderRadius: 11, background: c.line, overflow: "hidden" }}>
              <div style={{ width: `${build * 100}%`, height: "100%", background: RED }} />
            </div>
          </div>
          <Check text="Ready — aplikasi sudah tayang" p={ready} />
        </div>

        {/* Fase 2: aplikasi terbuka lewat link */}
        <div style={{ position: "absolute", inset: 48, opacity: swap, display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ borderRadius: 999, border: `3px solid ${c.line}`, background: c.bg, padding: "16px 28px", ...mono, fontSize: 28, letterSpacing: 0, color: c.text }}>
            <span style={{ color: c.muted }}>https://</span>
            {URL.slice(0, url)}
          </div>
          <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 56, color: c.text, letterSpacing: "-0.02em" }}>Absensi</div>
          <div
            style={{
              alignSelf: "flex-start",
              background: RED,
              color: c.card,
              borderRadius: 20,
              padding: "22px 40px",
              fontFamily: theme.fonts.heading,
              fontWeight: 700,
              fontSize: 40,
            }}
          >
            Absen Masuk
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: `3px solid ${c.line}`,
                padding: "10px 0",
                ...rise(enterAt(frame, fps, live + 0.5 + i * 0.1, 0.35), 10),
              }}
            >
              <span style={body(36)}>{r.name}</span>
              <span style={{ ...mono, fontSize: 30, letterSpacing: 0, color: c.text }}>{r.time}</span>
            </div>
          ))}
        </div>
      </Window>
    </Stage>
  );
};
