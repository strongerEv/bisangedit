import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, C, font, Icon, SPAM, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const CALLS = [
  { n: SPAM[0], at: 0.35, tag: "Pinjol?", tagAt: M.pinjol },
  { n: SPAM[1], at: 1.3, tag: "Judol?", tagAt: M.judol },
  { n: SPAM[2], at: 2.2, tag: "Penipuan?", tagAt: M.penipuan },
];

// "Telepon dari nomor nggak dikenal, isinya pinjol, judol, sampai penipuan."
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Nomor nggak dikenal, *lagi?*" delay={L(M.telepon) - 0.1} stagger={0.3} size={100} color={C.text} accent={C.orangeDeep} />
      </TitleArea>
      {CALLS.map((c, i) => {
        const p = spring({ frame: frame - Math.round(L(c.at) * fps), fps, config: { damping: 13 } });
        const tag = spring({ frame: frame - Math.round((L(c.tagAt) - 0.1) * fps), fps, config: { damping: 9 } });
        const ring = Math.sin(t * 34 + i) * (t > L(c.at) ? 1 : 0);
        return (
          <div
            key={c.n}
            style={{
              position: "absolute",
              left: 90,
              top: 560 + i * 290,
              width: 900,
              height: 230,
              boxSizing: "border-box",
              background: "white",
              borderRadius: 44,
              boxShadow: `0 24px 60px ${C.shadow}`,
              border: `2px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              gap: 30,
              padding: "0 36px",
              ...font,
              color: C.text,
              opacity: Math.min(1, p * 2),
              transform: `translateX(${(1 - p) * -900}px) rotate(${ring * 0.8}deg)`,
            }}
          >
            <div style={{ width: 120, height: 120, borderRadius: 60, background: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 700, color: "#9CA3AF" }}>?</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 50, fontWeight: 800, letterSpacing: "-0.01em" }}>{c.n}</div>
              <div style={{ fontSize: 30, color: C.muted, marginTop: 6 }}>Panggilan masuk · Seluler</div>
            </div>
            <div style={{ width: 96, height: 96, borderRadius: 48, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${ring * 12}deg)` }}>
              <Icon name="phone" size={46} color="white" fill="white" />
            </div>
            <div
              style={{
                position: "absolute",
                right: -10,
                top: -34,
                background: C.red,
                color: "white",
                borderRadius: 16,
                padding: "10px 24px",
                fontSize: 40,
                fontWeight: 800,
                opacity: Math.min(1, tag * 2),
                transform: `rotate(6deg) scale(${0.4 + 0.6 * tag})`,
                boxShadow: `0 10px 26px ${C.shadow}`,
              }}
            >
              {c.tag}
            </div>
          </div>
        );
      })}
    </Stage>
  );
};
