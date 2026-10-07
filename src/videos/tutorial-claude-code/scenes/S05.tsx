import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { c, L, Node, Progress, RED, StepTitle, Window } from "../parts";
import { local, MARKERS } from "../timeline";

const SRC = { x: 0, y: 200, w: 270, h: 116 };
const OPTIONS = [
  { label: "Vercel", at: MARKERS.vercel, y: 20 },
  { label: "Netlify", at: MARKERS.netlify, y: 200 },
  { label: "Lainnya…", at: MARKERS.lainnya, y: 380 },
];
const OPT_X = 470;

// Langkah 4: GitHub disambungkan ke layanan deploy pilihan.
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={4} />
      <StepTitle dur={dur}>
        <Words text="Sambungkan ke layanan *deploy.*" delay={local("S05", MARKERS.empat) - 0.1} stagger={0.08} size={L.titleSize} accent={RED} />
      </StepTitle>

      <Window dur={dur} tab="deploy · aplikasi-saya">
        <div style={{ position: "relative", height: "100%" }}>
          <svg width={784} height={560} style={{ position: "absolute", left: 0, top: 0 }}>
            {OPTIONS.map((o, i) => {
              const t = local("S05", o.at) - 0.1;
              const p = between(frame, fps, t, t + 0.35);
              const x1 = SRC.x + SRC.w;
              const y1 = SRC.y + SRC.h / 2;
              const x2 = OPT_X;
              const y2 = o.y + SRC.h / 2;
              return (
                <line
                  key={o.label}
                  x1={x1}
                  y1={y1}
                  x2={x1 + (x2 - x1) * p}
                  y2={y1 + (y2 - y1) * p}
                  stroke={i === 0 ? RED : c.muted}
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeDasharray={i === 0 ? undefined : "14 12"}
                />
              );
            })}
          </svg>
          <Node label="GitHub" sub="aplikasi-saya" style={{ left: SRC.x, top: SRC.y, width: SRC.w, ...rise(enterAt(frame, fps, 0.3, 0.4), 14) }} />
          {OPTIONS.map((o, i) => (
            <Node
              key={o.label}
              label={o.label}
              active={i === 0}
              style={{ left: OPT_X, top: o.y, width: 314, ...rise(enterAt(frame, fps, local("S05", o.at) - 0.1, 0.4), 14) }}
            />
          ))}
        </div>
      </Window>
    </Stage>
  );
};
