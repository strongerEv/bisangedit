import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, F } from "../parts";
import { local, MARKERS as M } from "../timeline";

const Icon: React.FC<{ kind: "food" | "chat" | "star" }> = ({ kind }) => (
  <div style={{ width: 120, height: 120, borderRadius: 60, background: F.peach, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
    {kind === "food" ? <Img src={staticFile("aset/fastreng/menu/original-rujak.jpg")} style={{ width: 120, height: 120, objectFit: "cover" }} /> : null}
    {kind === "chat" ? (
      <svg width={70} height={70} viewBox="0 0 70 70">
        <path d="M10 14 h50 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-30 l-14 12 v-12 h-6 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 z" fill={F.green} />
      </svg>
    ) : null}
    {kind === "star" ? (
      <svg width={70} height={70} viewBox="0 0 70 70">
        <path d="M35 6 l8.5 19 20.5 2 -15.5 13.5 4.5 20 -18 -10.5 -18 10.5 4.5 -20 -15.5 -13.5 20.5 -2 z" fill={F.orange} />
      </svg>
    ) : null}
  </div>
);

const ROWS = [
  { kind: "food" as const, title: "UMKM kuliner", sub: "warung, kedai, katering", at: M.cocok + 0.6 },
  { kind: "chat" as const, title: "Jualan lewat WhatsApp", sub: "pesanan masuk rapi, tidak tercecer", at: M.lewatWa },
  { kind: "star" as const, title: "Ingin terlihat profesional", sub: "punya aplikasi sendiri", at: M.profesional },
];

// Cocok untuk siapa.
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 96, top: 260, width: 888 }}>
        <Words text="Cocok *untuk…*" delay={local("S07", M.cocok) - 0.1} stagger={0.15} size={110} color={F.ink} accent={F.orangeDeep} />
      </div>
      <div style={{ position: "absolute", left: 96, top: 520, width: 888, display: "flex", flexDirection: "column", gap: 30 }}>
        {ROWS.map((r) => (
          <div
            key={r.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              background: "white",
              borderRadius: 36,
              padding: "28px 32px",
              boxShadow: `0 20px 50px ${F.shadow}`,
              ...rise(enterAt(frame, fps, local("S07", r.at) - 0.1, 0.45), 40),
            }}
          >
            <Icon kind={r.kind} />
            <div>
              <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 52, color: F.ink, letterSpacing: "-0.02em" }}>{r.title}</div>
              <div style={{ fontFamily: theme.fonts.heading, fontWeight: 500, fontSize: 34, color: F.muted, marginTop: 6 }}>{r.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
};
