import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, C, font, Icon, IconName, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);

const ITEMS: { icon: IconName; t: string; sub: string; at: number }[] = [
  { icon: "wifiOff", t: "Tanpa internet", sub: "Blokir tetap jalan walau offline", at: M.internet },
  { icon: "userX", t: "Tanpa daftar akun", sub: "Data tetap di HP kamu", at: M.nggakPerlu },
];

// "Aplikasinya jalan tanpa internet, dan nggak perlu daftar akun."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage dur={dur}>
      <Backdrop dark />
      <TitleArea dur={dur}>
        <Words text="Ringan & *simpel*" delay={L(M.aplikasiJalan) - 0.1} stagger={0.25} size={110} color="white" accent={C.orange} />
      </TitleArea>
      {ITEMS.map((it, i) => {
        const p = spring({ frame: frame - Math.round((L(it.at) - 0.15) * fps), fps, config: { damping: 13 } });
        return (
          <div
            key={it.t}
            style={{
              position: "absolute",
              left: 90,
              top: 560 + i * 400,
              width: 900,
              height: 340,
              boxSizing: "border-box",
              borderRadius: 48,
              background: i === 0 ? C.orange : "white",
              color: C.navy,
              padding: "0 50px",
              display: "flex",
              alignItems: "center",
              gap: 40,
              ...font,
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * 120}px) scale(${0.9 + 0.1 * p})`,
            }}
          >
            <div style={{ width: 170, height: 170, borderRadius: 85, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={it.icon} size={96} color={C.orange} stroke={2.2} />
            </div>
            <div>
              <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{it.t}</div>
              <div style={{ fontSize: 34, fontWeight: 500, marginTop: 12, opacity: 0.75 }}>{it.sub}</div>
            </div>
          </div>
        );
      })}
    </Stage>
  );
};
