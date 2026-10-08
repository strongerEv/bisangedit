import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { body, c, Check, L, mono, Node, Progress, RED, StepTitle, Window } from "../../tutorial-claude-code/parts";
import { local, MARKERS } from "../timeline";

const URL = "kafe-saya.vercel.app";
const MENU = [
  { name: "Kopi Susu", price: "18rb" },
  { name: "Caffe Latte", price: "22rb" },
  { name: "Roti Bakar", price: "15rb" },
];
const SRC = { x: 0, y: 150, w: 270, h: 116 };
const OPTS = [
  { label: "Vercel", at: MARKERS.vercel, y: 40 },
  { label: "Netlify", at: MARKERS.netlify, y: 260 },
];

// Langkah 5: repo → Vercel/Netlify, lalu aplikasi kafe online.
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const live = local("S06", MARKERS.setiap) - 0.1;
  const swap = between(frame, fps, live, live + 0.4);
  const url = Math.round(between(frame, fps, live + 0.2, live + 0.9) * URL.length);
  return (
    <Stage dur={dur}>
      <Progress step={5} />
      <StepTitle dur={dur}>
        <Words text="Sambungkan, lalu *online.*" delay={local("S06", MARKERS.sambungkan) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>
      <Window tab="kafe-saya">
        {/* Fase 1: GitHub → layanan deploy */}
        <div style={{ position: "absolute", inset: 48, opacity: 1 - swap }}>
          <svg width={784} height={420} style={{ position: "absolute", left: 0, top: 0 }}>
            {OPTS.map((o, i) => {
              const t = local("S06", o.at) - 0.1;
              const p = between(frame, fps, t, t + 0.35);
              const x1 = SRC.x + SRC.w;
              const y1 = SRC.y + SRC.h / 2;
              const x2 = 470;
              const y2 = o.y + SRC.h / 2;
              return (
                <line key={o.label} x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={i === 0 ? RED : c.muted} strokeWidth={6} strokeLinecap="round" strokeDasharray={i === 0 ? undefined : "14 12"} />
              );
            })}
          </svg>
          <Node label="GitHub" sub="kafe-saya" style={{ left: SRC.x, top: SRC.y, width: SRC.w, ...rise(enterAt(frame, fps, local("S06", MARKERS.sambungkan) - 0.1, 0.4), 14) }} />
          {OPTS.map((o, i) => (
            <Node key={o.label} label={o.label} active={i === 0} style={{ left: 470, top: o.y, width: 314, ...rise(enterAt(frame, fps, local("S06", o.at) - 0.1, 0.4), 14) }} />
          ))}
        </div>

        {/* Fase 2: aplikasi kafe terbuka lewat link */}
        <div style={{ position: "absolute", inset: 48, opacity: swap, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ borderRadius: 999, border: `3px solid ${c.line}`, background: c.bg, padding: "16px 28px", ...mono, fontSize: 28, letterSpacing: 0, color: c.text }}>
            <span style={{ color: c.muted }}>https://</span>
            {URL.slice(0, url)}
          </div>
          <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 56, color: c.text, letterSpacing: "-0.02em" }}>Kafe Saya · Pesan</div>
          {MENU.map((m, i) => (
            <div
              key={m.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `3px solid ${c.line}`,
                padding: "10px 0",
                ...rise(enterAt(frame, fps, live + 0.5 + i * 0.1, 0.35), 10),
              }}
            >
              <span style={body(36)}>{m.name}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span style={{ ...mono, fontSize: 28, letterSpacing: 0, color: c.text }}>{m.price}</span>
                <span style={{ background: RED, color: c.card, borderRadius: 14, padding: "8px 18px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 28 }}>+ Pesan</span>
              </span>
            </div>
          ))}
          <Check text="Online — bisa dibuka lewat link" p={enterAt(frame, fps, local("S06", MARKERS.online) - 0.1, 0.35)} />
        </div>
      </Window>
    </Stage>
  );
};
