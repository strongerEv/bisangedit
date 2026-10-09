import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Asset, Bg, card, mono, P } from "../parts";
import { local, MARKERS as M } from "../timeline";

// React → Video, lalu "kodenya saya serahkan ke Claude Code".
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flow = enterAt(frame, fps, local("S02", M.react) - 0.1, 0.5);
  const cc = spring({ frame: frame - Math.round((local("S02", M.claudeCode) - 0.1) * fps), fps, config: { damping: 9, stiffness: 170 } });
  return (
    <Stage dur={dur}>
      <Bg name="latar_studio" veil={0.6} />
      <div style={{ position: "absolute", left: 96, top: 300, width: 888 }}>
        <Words text="Bikin video pakai *React*" delay={local("S02", M.pakaiReact) - 0.1} stagger={0.1} size={96} color={P.ink} accent={P.orangeDark} />
        <div style={{ ...mono, marginTop: 16, ...rise(enterAt(frame, fps, local("S02", M.website) - 0.1, 0.4), 10) }}>bahasa untuk bikin website</div>
      </div>
      <div style={{ position: "absolute", left: 96, top: 560, width: 888, height: 320, ...card, display: "flex", alignItems: "center", justifyContent: "space-around", ...rise(flow, 30) }}>
        {[
          { name: "ikon_kode" as const, label: "React" },
          { name: "tombol_play" as const, label: "Video" },
        ].map((it, i) => (
          <div key={it.label} style={{ position: "relative", width: 260, height: 280 }}>
            <Asset name={it.name} x={130} y={115} s={0.65} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 40, color: P.ink }}>{it.label}</div>
            {i === 0 ? <div style={{ position: "absolute", left: 300, top: 85, fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 90, color: P.orange }}>→</div> : null}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 96, top: 950, width: 888 }}>
        <Words text="Tapi kodenya… saya serahkan ke" delay={local("S02", M.tapi) - 0.1} stagger={0.12} size={72} color={P.ink} />
      </div>
      <Asset name="percikan" x={900} y={1100} s={0.55} style={{ opacity: Math.min(1, cc * 2) * 0.9, transform: `scale(${cc})` }} />
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 1170,
          background: P.orange,
          color: "white",
          borderRadius: 999,
          padding: "26px 48px",
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 64,
          boxShadow: "0 20px 50px rgba(255,138,61,0.45)",
          opacity: Math.min(1, cc * 2),
          transform: `scale(${0.6 + 0.4 * cc})`,
        }}
      >
        Claude Code
      </div>
      <Asset name="mochi_menunjuk" x={250} y={1420} s={0.85} style={{ ...rise(enterAt(frame, fps, 0.2, 0.5), 40) }} />
    </Stage>
  );
};
