import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, font, G, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);

const ROWS = ["Struk #0231 · Rp42.000", "Struk #0232 · Rp18.000", "Struk #0233 · Rp25.000"];

// "Internet putus? Transaksi tetap tersimpan, dan terkirim saat online lagi."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const off = spring({ frame: frame - Math.round((L(M.internet) - 0.05) * fps), fps, config: { damping: 10 } });
  const online = enterAt(frame, fps, L(M.terkirim) + 0.2, 0.3);
  return (
    <Stage dur={dur}>
      <Backdrop dark />
      <TitleArea dur={dur}>
        <Words text="Internet putus? *Aman*" delay={L(M.internet) - 0.1} stagger={0.3} size={110} color="white" accent={G.g400} />
      </TitleArea>
      {/* ikon sinyal: putus → tersambung */}
      <div style={{ position: "absolute", left: 540 - 110, top: 470, width: 220, height: 220, borderRadius: 110, background: online > 0.5 ? G.g500 : G.rose, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, off * 2), transform: `scale(${0.5 + 0.5 * off})` }}>
        <svg viewBox="0 0 24 24" width={130} height={130} fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.6a10 10 0 0 1 14 0M8.5 16.1a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0M12 20h.01" />
          {online < 0.5 ? <path d="M3 3l18 18" /> : null}
        </svg>
      </div>
      <div style={{ position: "absolute", left: 140, top: 780, width: 800, ...font }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: G.g400, letterSpacing: "0.06em", marginBottom: 20, opacity: enterAt(frame, fps, L(M.transaksi) - 0.1, 0.3) }}>
          {online > 0.5 ? "TERKIRIM KE SERVER" : "TERSIMPAN DI PERANGKAT"}
        </div>
        {ROWS.map((r, i) => {
          const p = enterAt(frame, fps, L(M.transaksi) + i * 0.3, 0.3);
          const done = enterAt(frame, fps, L(M.terkirim) + 0.3 + i * 0.2, 0.25);
          return (
            <div key={r} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", borderRadius: 28, padding: "30px 36px", marginBottom: 20, fontSize: 40, fontWeight: 700, color: G.text, ...rise(p, 30) }}>
              {r}
              <span style={{ fontSize: 34, color: done > 0.5 ? G.g600 : G.amber }}>{done > 0.5 ? "✓ terkirim" : "⏳ antre"}</span>
            </div>
          );
        })}
      </div>
      <Center top={1520}>
        <Chip tone="light" style={rise(online, 20)}>Sinkron otomatis saat online</Chip>
      </Center>
    </Stage>
  );
};
