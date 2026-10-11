import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, E, font, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const ASK = [
  { t: "Harganya berapa kak?", who: "Rudi" },
  { t: "DOD masih ada?", who: "Bu Sri" },
  { t: "Bisa kirim ke Blitar?", who: "Pak Darto" },
  { t: "Indukan berapaan?", who: "Wahyu" },
  { t: "Kak, harga entok?", who: "Ani" },
];

// "Peternak entok, jualannya masih nunggu orang nanya harga satu-satu di chat?"
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const start = L(M.jualan) + 0.2;
  const count = ASK.filter((_, i) => t > start + i * 0.6).length;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Ditanya harga *satu-satu?*" delay={L(M.peternak) - 0.1} stagger={0.35} size={100} color={E.text} accent={E.hijau} />
      </TitleArea>
      <div style={{ position: "absolute", left: 90, top: 600, width: 900, height: 900, borderRadius: 44, background: "white", border: `2px solid ${E.border}`, boxShadow: `0 30px 70px ${E.shadow}`, overflow: "hidden", ...font }}>
        <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px", borderBottom: `2px solid ${E.border}` }}>
          <div style={{ fontWeight: 800, fontSize: 40, color: E.text }}>Chat</div>
          <div style={{ minWidth: 64, height: 64, borderRadius: 32, background: E.wa, color: "white", fontWeight: 800, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.15 * Math.max(0, Math.sin((t - start) * 10)) * (count > 0 ? 1 : 0)})` }}>{count}</div>
        </div>
        {ASK.map((a, i) => {
          const p = spring({ frame: frame - Math.round((start + i * 0.6) * fps), fps, config: { damping: 13 } });
          return (
            <div key={a.t} style={{ display: "flex", alignItems: "center", gap: 22, padding: "22px 34px", borderBottom: `1px solid ${E.border}`, opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * -200}px)` }}>
              <div style={{ width: 84, height: 84, borderRadius: 42, background: E.muda, color: E.hijauTua, fontWeight: 800, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.who.split(" ").map((w) => w[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 34, color: E.text }}>{a.who}</div>
                <div style={{ fontSize: 32, color: E.muted, marginTop: 4 }}>{a.t}</div>
              </div>
              <div style={{ width: 26, height: 26, borderRadius: 13, background: E.wa }} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
