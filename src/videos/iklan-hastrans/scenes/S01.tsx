import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Elf, font, H } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const WIN = { x: 130, y: 820, w: 820, h: 600 };

// "Jasa pembuatan web app untuk bisnis travel."
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const win = enterAt(frame, fps, L(M.jasa) + 0.55, 0.5);
  const driveFrom = L(M.travel) - 0.75;
  const driveTo = L(M.travel) + 0.2;
  const ex = interpolate(t, [driveFrom, driveTo], [-620, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const moving = t > driveFrom && t < driveTo + 0.1;
  const bob = moving ? Math.sin(t * 40) * 2 : 0;
  const wheel = interpolate(t, [driveFrom, driveTo], [0, 900], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const cta = enterAt(frame, fps, driveTo + 0.05, 0.35);
  const typed = Math.floor(interpolate(t, [L(M.jasa) + 0.8, L(M.jasa) + 1.6], [0, 15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 230, ...rise(enterAt(frame, fps, 0, 0.35), 16) }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: H.b50, color: H.b700, borderRadius: 999, padding: "12px 26px", ...font, fontWeight: 700, fontSize: 32, letterSpacing: "0.06em" }}>
          JASA PEMBUATAN
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 330, width: 920 }}>
        <Words text="*Web* *app* untuk bisnis *travel.*" delay={L(M.jasa) + 0.85} stagger={0.32} size={118} color={H.text} accent={H.b600} />
      </div>

      {/* jendela browser: web app milik travel */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.h,
          borderRadius: 36,
          background: "white",
          boxShadow: `0 40px 90px ${H.shadow}`,
          border: `2px solid ${H.slate200}`,
          overflow: "hidden",
          opacity: win,
          transform: `translateY(${(1 - win) * 50}px) scale(${0.94 + 0.06 * win})`,
        }}
      >
        <div style={{ height: 70, background: H.slate100, display: "flex", alignItems: "center", gap: 12, padding: "0 26px" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />
          ))}
          <div style={{ marginLeft: 16, flex: 1, height: 40, borderRadius: 12, background: "white", display: "flex", alignItems: "center", padding: "0 18px", ...font, fontSize: 24, color: H.muted }}>
            🔒 {"travelkamu.com".slice(0, typed)}
          </div>
        </div>
        <div style={{ position: "relative", height: WIN.h - 70, background: `linear-gradient(135deg, ${H.b600} 0%, ${H.b800} 100%)`, overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -100, top: -160, width: 460, height: 460, borderRadius: 230, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", left: 40, top: 36, ...font, fontWeight: 800, fontSize: 44, color: "white" }}>Mau pergi ke mana?</div>
          <div style={{ position: "absolute", left: 40, top: 104, display: "flex", gap: 14 }}>
            {[220, 220].map((w, i) => (
              <div key={i} style={{ width: w, height: 58, borderRadius: 16, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }} />
            ))}
            <div style={{ width: 150, height: 58, borderRadius: 16, background: "white", color: H.b700, ...font, fontWeight: 700, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>Cari</div>
          </div>
          {/* jalan */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 455, height: 75, background: "rgba(10,38,77,0.45)" }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: "absolute", left: ((i * 200 - t * 300 * (moving ? 1 : 0.0)) % 1000 + 1000) % 1000 - 100, top: 488, width: 90, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
          ))}
          <Elf width={520} wheel={wheel} style={{ position: "absolute", left: ex, top: 230 + bob }} />
          <div style={{ position: "absolute", right: 36, top: 180, ...rise(cta, 16) }}>
            <div style={{ background: H.kuning, color: H.b950, borderRadius: 999, padding: "10px 22px", ...font, fontWeight: 800, fontSize: 26 }}>Pesan online</div>
          </div>
        </div>
      </div>
    </Stage>
  );
};
