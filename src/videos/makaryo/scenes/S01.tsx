import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, K } from "../parts";
import { local, MARKERS as M } from "../timeline";

// File Excel yang menumpuk; `t` = detik absolut saat muncul.
const FILES = [
  { n: "absen_final.xlsx", t: M.absenX, x: 90, y: 560, r: -5 },
  { n: "absen_final_REVISI.xlsx", t: M.absenX + 0.3, x: 430, y: 690, r: 4 },
  { n: "jadwal_juni (2).xlsx", t: M.jadwalX, x: 130, y: 840, r: 3 },
  { n: "jadwal_FIX.xlsx", t: M.jadwalX + 0.28, x: 520, y: 960, r: -6 },
  { n: "rekap_absen_copy.xlsx", t: M.jadwalX + 0.55, x: 70, y: 1100, r: -2 },
  { n: "omzet_host.xlsx", t: M.omzetX, x: 470, y: 1230, r: 6 },
  { n: "omzet_host_fix_bgt.xlsx", t: M.omzetX + 0.3, x: 110, y: 1370, r: 4 },
  { n: "jadwal_baru_JANGAN_DIHAPUS.xlsx", t: M.omzetX + 0.6, x: 300, y: 1510, r: -4 },
  { n: "omzet okt (final).xlsx", t: M.excel - 0.5, x: 500, y: 600, r: 8 },
  { n: "absen_new.xlsx", t: M.excel - 0.25, x: 60, y: 980, r: -9 },
  { n: "Book1.xlsx", t: M.excel, x: 600, y: 1400, r: 7 },
  { n: "rekap (3).xlsx", t: M.excel + 0.2, x: 380, y: 1120, r: -7 },
];

const XlsCard: React.FC<{ name: string }> = ({ name }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 20, background: "white", borderRadius: 24, padding: "18px 28px 18px 18px", boxShadow: `0 16px 40px ${K.shadow}`, border: `2px solid ${K.border}`, ...font, whiteSpace: "nowrap" }}>
    <div style={{ width: 74, height: 84, borderRadius: 12, background: K.excel, color: "white", fontWeight: 900, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>X</div>
    <div>
      <div style={{ fontSize: 36, fontWeight: 700, color: K.text }}>{name}</div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ width: 34, height: 12, borderRadius: 3, background: i < 2 ? "#BFE3CC" : K.border }} />
        ))}
      </div>
    </div>
  </div>
);

// Hook: "Punya tim host live streaming? Absen, jadwal, omzet masih numpuk di file Excel?"
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const swap = between(frame, fps, local("S01", M.absenX) - 0.3, local("S01", M.absenX));
  const shake = t > local("S01", M.excel) ? Math.sin(t * 40) * 3 * (1 - between(frame, fps, local("S01", M.excel) + 0.3, local("S01", M.excel) + 1)) : 0;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 96, top: 230, width: 888, opacity: 1 - swap }}>
        <Words text="Punya tim host *live* *streaming?*" delay={local("S01", M.punya) - 0.1} stagger={0.12} size={96} color={K.text} accent={K.primary} />
      </div>
      <div style={{ position: "absolute", left: 96, top: 230, width: 888, opacity: swap }}>
        <Words text="Absen, jadwal, omzet… numpuk di *Excel?*" delay={local("S01", M.absenX) - 0.1} stagger={0.55} size={96} color={K.text} accent={K.excel} />
      </div>
      {FILES.map((f, i) => {
        const p = spring({ frame: frame - Math.round((local("S01", f.t) - 0.1) * fps), fps, config: { damping: 11 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: f.x + (i % 2 ? shake : -shake),
              top: f.y,
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * -120}px) rotate(${f.r * p}deg) scale(${0.7 + 0.3 * p})`,
            }}
          >
            <XlsCard name={f.n} />
          </div>
        );
      })}
    </Stage>
  );
};
