import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { APPS, AppPhone, c, font, RED } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);
const AT = [M.kasir, M.pesanAntar, M.kos, M.absensi];

// "Kasir, pesan-antar, kos, sampai absensi karyawan, sudah kami buatkan."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const grid = between(frame, fps, L(M.sudah) - 0.3, L(M.sudah) + 0.2);
  const idx = AT.reduce((acc, a, i) => (t >= L(a) - 0.15 ? i : acc), 0);
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: 96, top: 190, width: 900, display: "flex", flexWrap: "wrap", columnGap: 22, rowGap: 6, opacity: 1 - grid, ...font, fontWeight: 700, fontSize: 84, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
        {APPS.map((a, i) => (
          <span key={a.key} style={{ color: i === idx ? RED : c.text, ...rise(enterAt(frame, fps, L(AT[i]) - 0.1, 0.35), 24) }}>
            {a.label}
            {i < APPS.length - 1 ? "," : ""}
          </span>
        ))}
      </div>
      <div style={{ position: "absolute", left: 96, top: 190, width: 900, ...rise(grid, 20) }}>
        <Words text="Sudah kami *buatkan.*" delay={L(M.sudah) - 0.1} stagger={0.2} size={104} color={c.text} accent={RED} />
      </div>
      {/* fase 1: satu HP besar, layar berganti per kata */}
      {APPS.map((a, i) => {
        const inP = spring({ frame: frame - Math.round((L(AT[i]) - 0.15) * fps), fps, config: { damping: 14 } });
        const show = i === idx ? 1 : 0;
        if (inP <= 0 || (!show && grid === 0)) return null;
        // fase 2: menyusut ke barisan 4 HP
        const gx = 165 + i * 250;
        const x = interpolate(grid, [0, 1], [540, gx]);
        const y = interpolate(grid, [0, 1], [1080, 1050]);
        const w = interpolate(grid, [0, 1], [460, 210]);
        const vis = grid > 0 ? 1 : show;
        return (
          <React.Fragment key={a.key}>
            <AppPhone x={x} y={y} width={w} app={a} style={{ opacity: vis * Math.min(1, inP * 2), transform: grid > 0 ? undefined : `translateY(${(1 - inP) * 60}px) rotate(${(1 - inP) * (i % 2 ? 6 : -6)}deg)` }} />
            <div style={{ position: "absolute", left: x - 150, width: 300, top: y + w * 1.08 + 30, textAlign: "center", ...font, fontWeight: 800, fontSize: 34 + 16 * (1 - grid), color: c.text, opacity: vis }}>
              {a.label}
              <div style={{ fontSize: 26 + 6 * (1 - grid), fontWeight: 600, color: c.muted }}>{a.name}</div>
            </div>
            {grid > 0 ? (
              <div style={{ position: "absolute", left: gx + 60, top: 1050 - 245, width: 64, height: 64, borderRadius: 32, background: RED, color: "white", ...font, fontWeight: 900, fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center", opacity: enterAt(frame, fps, L(M.sudah) + 0.3 + i * 0.12, 0.25) }}>
                ✓
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </Stage>
  );
};
