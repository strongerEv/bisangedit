import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { body, c, L, mono, RED } from "../parts";
import { local, MARKERS } from "../timeline";

export const STEP_NAMES = ["Langganan Claude", "Hubungkan GitHub", "Ceritakan aplikasimu", "Sambungkan ke layanan deploy", "Aplikasi online"];

// Hook: pertanyaan + peta 5 langkah (bikin penasaran menonton sampai langkah 5).
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const list = local("S01", MARKERS.limaLangkah) - 0.1;
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: L.x, top: 250, width: L.w, display: "flex", flexDirection: "column", gap: 16 }}>
        <Words text="Mau bikin *aplikasi* web sendiri," delay={local("S01", MARKERS.mau) - 0.1} stagger={0.08} size={L.titleSize} accent={RED} />
        <Words text="tapi nggak jago ngoding?" delay={local("S01", MARKERS.nggakJago) - 0.1} stagger={0.08} size={L.titleSize} color={c.muted} />
      </div>

      <div style={{ position: "absolute", left: L.x, top: 820, width: L.w, display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            alignSelf: "flex-start",
            background: RED,
            borderRadius: 999,
            padding: "10px 26px",
            ...mono,
            color: c.card,
            ...rise(enterAt(frame, fps, list, 0.4), 12),
          }}
        >
          5 LANGKAH · CLAUDE CODE
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
