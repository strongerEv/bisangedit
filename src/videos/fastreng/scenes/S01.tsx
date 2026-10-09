import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, F, Phone } from "../parts";
import { local, MARKERS as M } from "../timeline";

const CHATS = [
  { t: "kak cireng ori 2 ya", x: 120, y: 520, r: -4 },
  { t: "yg pedes ada?", x: 520, y: 640, r: 5 },
  { t: "alamatnya di sms aja", x: 160, y: 780, r: 3 },
  { t: "totalnya brp kak??", x: 470, y: 900, r: -6 },
  { t: "masih buka?", x: 200, y: 1030, r: 4 },
  { t: "jadi 3 aja deh", x: 520, y: 1150, r: -3 },
];

// Hook: chat pesanan berantakan → disapu → "Kenalin: Fastreng".
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const sweep = interpolate(t, [local("S01", M.kenalin) - 0.2, local("S01", M.kenalin) + 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phone = spring({ frame: frame - Math.round((local("S01", M.fastreng) - 0.15) * fps), fps, config: { damping: 13 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 96, top: 250, width: 888, opacity: 1 - sweep }}>
        <Words text="Pesanan masih dicatat *manual?*" delay={local("S01", M.manual) - 0.1} stagger={0.1} size={88} color={F.ink} accent={F.orangeDeep} />
      </div>
      {CHATS.map((c, i) => {
        const p = spring({ frame: frame - Math.round((0.15 + i * 0.32) * fps), fps, config: { damping: 12 } });
        const dir = i % 2 === 0 ? -1 : 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.x + dir * sweep * 900,
              top: c.y,
              transform: `rotate(${c.r + dir * sweep * 25}deg) scale(${0.6 + 0.4 * p})`,
              opacity: Math.min(1, p * 2) * (1 - sweep),
              background: i % 2 ? "white" : F.waOut,
              borderRadius: 26,
              padding: "18px 26px",
              fontFamily: theme.fonts.heading,
              fontWeight: 600,
              fontSize: 40,
              color: F.ink,
              boxShadow: `0 12px 30px ${F.shadow}`,
              whiteSpace: "nowrap",
            }}
          >
            {c.t}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 96, top: 250, width: 888, opacity: sweep }}>
        <Words text="Kenalin: *Fastreng*" delay={local("S01", M.kenalin) - 0.1} stagger={0.25} size={110} color={F.ink} accent={F.orangeDeep} />
      </div>
      <Phone src="01_splash.png" width={480} y={1060} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 500}px) rotate(${(1 - phone) * -6}deg)` }} />
    </Stage>
  );
};
