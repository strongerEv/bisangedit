import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, font, Icon, IconName, K, mono, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);

const Box: React.FC<{ x: number; y: number; name: string; sub: string; icon: IconName; color: string; p: number }> = ({ x, y, name, sub, icon, color, p }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 410,
      height: 210,
      boxSizing: "border-box",
      background: "white",
      borderRadius: 36,
      border: `2px solid ${K.border}`,
      boxShadow: `0 20px 50px ${K.shadow}`,
      padding: "28px 30px",
      ...font,
      color: K.text,
      ...rise(p, 30),
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ width: 60, height: 60, borderRadius: 18, background: color, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={32} stroke={2.4} />
      </span>
      <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em" }}>{name}</span>
    </div>
    <div style={{ fontSize: 28, color: K.muted, marginTop: 22, lineHeight: 1.25 }}>{sub}</div>
  </div>
);

const RULES = ["Minimal host per shift", "Jatah libur mingguan", "Izin yang sudah disetujui", "Beban kerja dibagi rata"];

/** Petak jadwal kecil (selalu sama — hasil deterministik). */
const MiniGrid: React.FC<{ p: number; label: string }> = ({ p, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...rise(p, 20) }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 22px)", gap: 4, padding: 12, background: "white", borderRadius: 18, border: `2px solid ${K.border}` }}>
      {Array.from({ length: 21 }).map((_, i) => (
        <div key={i} style={{ width: 22, height: 14, borderRadius: 4, background: [K.amber, K.primary, K.coral][(i * 5 + Math.floor(i / 7)) % 3] }} />
      ))}
    </div>
    <span style={{ ...mono, fontSize: 22, color: K.muted }}>{label}</span>
  </div>
);

// "Teknisnya: dibangun dengan Next.js dan Supabase. Penyusun jadwalnya pakai aturan, bukan AI.
//  Hasilnya konsisten, tanpa biaya tiap generate."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = enterAt(frame, fps, L(M.nextjs) - 0.15, 0.4);
  const b = enterAt(frame, fps, L(M.supabase) - 0.15, 0.4);
  const link = between(frame, fps, L(M.supabase), L(M.supabase) + 0.4);
  const eng = enterAt(frame, fps, L(M.penyusun) - 0.15, 0.45);
  const noAi = spring({ frame: frame - Math.round((L(M.bukanAi) - 0.05) * fps), fps, config: { damping: 9 } });
  const same = enterAt(frame, fps, L(M.konsisten) + 0.6, 0.3);
  const free = enterAt(frame, fps, L(M.tanpaBiaya) - 0.1, 0.4);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <div style={{ ...mono, color: K.primary, opacity: enterAt(frame, fps, L(M.teknis) - 0.2, 0.3) }}>DI BALIK LAYAR</div>
        <Words text="*Teknisnya*" delay={L(M.teknis) - 0.1} size={104} color={K.text} accent={K.primary} />
      </TitleArea>

      <Box x={60} y={440} name="Next.js" sub="Aplikasi web, bisa dipasang (PWA)" icon="home" color={K.text} p={a} />
      <Box x={610} y={440} name="Supabase" sub="Database · login · foto absen" icon="user" color={K.emerald} p={b} />
      <div style={{ position: "absolute", left: 470, top: 543, width: 140 * link, height: 6, borderRadius: 3, background: K.primary }} />

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 700,
          width: 960,
          boxSizing: "border-box",
          background: "white",
          borderRadius: 40,
          border: `2px solid ${K.border}`,
          boxShadow: `0 24px 60px ${K.shadow}`,
          padding: "32px 36px",
          ...font,
          color: K.text,
          ...rise(eng, 40),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 64, height: 64, borderRadius: 20, background: K.primarySoft, color: K.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="sparkles" size={34} stroke={2.4} />
          </span>
          <span style={{ fontSize: 46, fontWeight: 800 }}>Penyusun jadwal</span>
        </div>
        <div style={{ ...mono, fontSize: 24, marginTop: 22 }}>ATURAN</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          {RULES.map((r, i) => {
            const p = enterAt(frame, fps, L(M.aturan) - 0.15 + i * 0.12, 0.3);
            return (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600, ...rise(p, 14) }}>
                <span style={{ width: 44, height: 44, borderRadius: 22, background: "#E3F6EC", color: "#1F8A52", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={26} stroke={3} />
                </span>
                {r}
              </div>
            );
          })}
        </div>
      </div>
      <Chip style={{ left: 700, top: 730, background: "#FDE6E4", color: "#C8443B", boxShadow: "none", opacity: Math.min(1, noAi * 2), transform: `scale(${0.5 + 0.5 * noAi}) rotate(-4deg)` }}>
        bukan AI
      </Chip>

      <div style={{ position: "absolute", left: 60, top: 1200, width: 960, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {["GENERATE 1", "GENERATE 2", "GENERATE 3"].map((l, i) => (
          <MiniGrid key={l} label={l} p={enterAt(frame, fps, L(M.konsisten) - 0.15 + i * 0.15, 0.3)} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1390, textAlign: "center", ...font, fontSize: 40, fontWeight: 800, color: "#1F8A52", ...rise(same, 14) }}>
        = hasil selalu sama
      </div>
      <Chip tone="success" style={{ left: 300, top: 1500, ...rise(free, 30) }}>
        Rp0 per generate
      </Chip>
    </Stage>
  );
};
