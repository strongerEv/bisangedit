import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, G, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const REPLIES = [
  { t: "Nanti ya, gajian dulu", at: 0.5 },
  { t: "Minggu depan deh", at: 1.05 },
  { t: "Lagi seret nih…", at: 1.6 },
];
const DRAFT = "Eh, soal pinjaman kemarin…";

// Hook: "Ada yang ngutang, tapi kamu sungkan nagihnya?"
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // ketik lalu dihapus lagi (sungkan)
  const typeIn = between(frame, fps, L(M.sungkan) - 0.4, L(M.sungkan) + 0.3);
  const erase = between(frame, fps, L(M.sungkan) + 0.6, L(M.sungkan) + 1.0);
  const n = Math.round(DRAFT.length * typeIn * (1 - erase));
  const blink = Math.floor((frame / fps) * 2) % 2 === 0;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Ada yang ngutang, tapi *sungkan* *nagih?*" delay={L(M.ada) - 0.1} stagger={0.45} size={100} color={G.text} accent={G.g500} />
      </TitleArea>
      <div style={{ position: "absolute", left: 90, top: 640, width: 900, height: 1000, borderRadius: 44, background: G.waBg, boxShadow: `0 30px 70px ${G.shadow}`, overflow: "hidden", ...font }}>
        <div style={{ height: 120, background: "#1F6F5C", display: "flex", alignItems: "center", gap: 20, padding: "0 30px", color: "white" }}>
          <div style={{ width: 70, height: 70, borderRadius: 35, background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 30 }}>RP</div>
          <div style={{ fontWeight: 700, fontSize: 38 }}>Rian</div>
        </div>
        {REPLIES.map((r, i) => {
          const p = spring({ frame: frame - Math.round(L(r.at) * fps), fps, config: { damping: 14 } });
          return (
            <div key={r.t} style={{ position: "absolute", left: 30, top: 170 + i * 130, background: "white", borderRadius: 26, borderTopLeftRadius: 6, padding: "22px 30px", fontSize: 42, fontWeight: 500, color: G.text, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", opacity: Math.min(1, p * 2), transform: `scale(${0.8 + 0.2 * p})`, transformOrigin: "left top" }}>
              {r.t}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 24, height: 110, borderRadius: 55, background: "white", display: "flex", alignItems: "center", padding: "0 36px", fontSize: 40, color: G.text }}>
          {DRAFT.slice(0, n)}
          <span style={{ width: 4, height: 50, marginLeft: 4, background: G.g500, opacity: blink ? 1 : 0 }} />
          {n === 0 ? <span style={{ color: G.muted, marginLeft: 8 }}>Ketik pesan</span> : null}
        </div>
      </div>
    </Stage>
  );
};
