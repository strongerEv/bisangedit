import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, B, font, img, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S08", t);

const COLS = [
  { t: "Pengecekan", cards: [["FS-007", "Budi"], ["FS-011", "Andi"]] },
  { t: "Dikerjakan", cards: [["FS-004", "Budi"], ["FS-009", "Andi"], ["FS-010", "Budi"]] },
  { t: "Siap Diambil", cards: [["FS-002", "Andi"]] },
];
const BARS = [0.42, 0.55, 0.38, 0.7, 0.62, 0.85, 0.74];

// "Di balik layar, teknisi punya papan antrean, pemilik pegang laporan pendapatan."
export const S08: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const board = enterAt(frame, fps, L(M.teknisi) - 0.15, 0.4);
  const rep = enterAt(frame, fps, L(M.pemilik) - 0.1, 0.4);
  const photo = spring({ frame: frame - 3, fps, config: { damping: 14 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Di balik *layar*" delay={L(M.balik) - 0.1} stagger={0.3} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      <Img src={img("teknisi.jpg")} style={{ position: "absolute", left: 720, top: 170, width: 280, height: 180, objectFit: "cover", borderRadius: 28, boxShadow: `0 20px 50px ${B.shadow}`, opacity: photo, transform: `rotate(3deg) scale(${0.8 + 0.2 * photo})` }} />
      {/* papan antrean */}
      <div style={{ position: "absolute", left: 60, top: 430, width: 960, ...font, ...rise(board, 40) }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: B.text, marginBottom: 16 }}>Papan antrean teknisi</div>
        <div style={{ display: "flex", gap: 18 }}>
          {COLS.map((c, ci) => (
            <div key={c.t} style={{ flex: 1, background: B.b50, borderRadius: 26, padding: 16, minHeight: 470 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: B.b700, marginBottom: 12 }}>{c.t}</div>
              {c.cards.map(([n, who], i) => {
                const p = enterAt(frame, fps, L(M.teknisi) + 0.1 + (ci * 3 + i) * 0.08, 0.3);
                return (
                  <div key={n} style={{ background: "white", borderRadius: 18, padding: "14px 16px", marginBottom: 12, boxShadow: "0 6px 16px rgba(15,39,102,0.08)", ...rise(p, 16) }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: B.text }}>{n}</div>
                    <div style={{ fontSize: 22, color: B.muted, marginTop: 4 }}>Teknisi {who}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* laporan pendapatan */}
      <div style={{ position: "absolute", left: 60, top: 1100, width: 960, height: 560, background: "white", border: `2px solid ${B.border}`, borderRadius: 36, padding: "30px 36px", boxSizing: "border-box", boxShadow: `0 24px 60px ${B.shadow}`, ...font, ...rise(rep, 40) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Laporan pendapatan</div>
          <div style={{ fontSize: 22, color: B.muted }}>data contoh</div>
        </div>
        <div style={{ fontSize: 60, fontWeight: 900, color: B.b600, marginTop: 6 }}>Rp8,4 jt</div>
        <div style={{ fontSize: 24, color: B.muted }}>7 hari terakhir</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 22, height: 250, marginTop: 20 }}>
          {BARS.map((b, i) => {
            const p = enterAt(frame, fps, L(M.laporan) - 0.2 + i * 0.07, 0.4);
            return <div key={i} style={{ flex: 1, height: `${b * 100 * p}%`, borderRadius: 12, background: i === BARS.length - 1 ? B.accent : B.b500 }} />;
          })}
        </div>
      </div>
    </Stage>
  );
};
