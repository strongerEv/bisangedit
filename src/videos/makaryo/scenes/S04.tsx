import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Badge, font, Icon, K, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);

// Kalender Oktober 2026 (1 Okt = Kamis). Kanvas px.
const CARD = { x: 60, y: 520, w: 960 };
const COL = (CARD.w - 48) / 7;
const ROW = 122;
const FIRST = 3; // Kamis
const HOSTS = ["RA", "DM", "SN", "FK", "YU", "AL"];
const SHIFT_COLORS = [K.amber, K.primary, K.coral]; // Pagi, Siang, Sore
const GEN = { x: CARD.x + 24 + 210, y: CARD.y + 160 };
const PUB = { x: CARD.x + CARD.w - 24 - 150, y: CARD.y + 160 };

// "Jadwal shift sebulan? Admin tinggal tekan generate. Jadwal tersusun sendiri, lalu dipublish."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, L(M.jadwalSif) - 0.2, 0.5);
  const tapGen = L(M.generate) - 0.05;
  const fillStart = tapGen + 0.25;
  const pub = L(M.publish) - 0.1;
  const published = enterAt(frame, fps, pub + 0.15, 0.3);
  const filled = between(frame, fps, fillStart + 31 * 0.045, fillStart + 31 * 0.045 + 0.2);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Jadwal sebulan, *sekali* *tekan*" delay={L(M.jadwalSif) - 0.1} stagger={0.14} size={100} color={K.text} accent={K.primary} />
      </TitleArea>
      <div style={{ position: "absolute", left: CARD.x, top: CARD.y, width: CARD.w, background: "white", borderRadius: 40, boxShadow: `0 30px 70px ${K.shadow}`, border: `2px solid ${K.border}`, ...font, color: K.text, ...rise(card, 60) }}>
        <div style={{ padding: "34px 36px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 600, color: K.muted }}>Admin · Jadwal</div>
            <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.02em" }}>Oktober 2026</div>
          </div>
          <div style={{ position: "relative" }}>
            <Badge tone="neutral" size={26} style={{ opacity: 1 - filled }}>Belum ada jadwal</Badge>
            <Badge tone="warning" size={26} style={{ position: "absolute", right: 0, top: 0, opacity: filled * (1 - published) }}>Draft · 93 shift</Badge>
            <Badge tone="primary" size={26} style={{ position: "absolute", right: 0, top: 0, opacity: published }}>
              <Icon name="check" size={24} stroke={3} /> Terpublish
            </Badge>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, padding: "26px 36px 0" }}>
          <div style={{ height: 76, borderRadius: 38, padding: "0 34px", background: K.primarySoft, color: K.primary, fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}>
            <Icon name="sparkles" size={30} stroke={2.4} /> Generate draft
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ height: 76, borderRadius: 38, padding: "0 34px", background: K.primary, color: "white", fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", gap: 12, opacity: 0.35 + 0.65 * filled }}>
            <Icon name="send" size={28} stroke={2.4} /> Publish {filled > 0.5 ? "(93)" : ""}
          </div>
        </div>
        <div style={{ display: "flex", padding: "28px 24px 0" }}>
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
            <div key={d} style={{ width: COL, textAlign: "center", fontSize: 22, fontWeight: 700, color: K.muted }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ position: "relative", height: ROW * 5 + 24, margin: "10px 24px 0" }}>
          {Array.from({ length: 31 }).map((_, i) => {
            const cell = FIRST + i;
            const cx = (cell % 7) * COL;
            const cy = Math.floor(cell / 7) * ROW;
            const p = enterAt(frame, fps, fillStart + i * 0.045, 0.25);
            return (
              <div key={i} style={{ position: "absolute", left: cx + 3, top: cy + 3, width: COL - 6, height: ROW - 6, borderRadius: 16, background: K.surfaceMuted, border: `1px solid ${K.border}`, padding: 8, boxSizing: "border-box" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: K.muted }}>{i + 1}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                  {SHIFT_COLORS.map((c, s) => (
                    <div
                      key={s}
                      style={{
                        height: 20,
                        borderRadius: 6,
                        background: c,
                        opacity: p * (0.45 + 0.55 * published),
                        transform: `scaleX(${p})`,
                        transformOrigin: "left center",
                        color: s === 0 ? K.text : "white",
                        fontSize: 14,
                        fontWeight: 800,
                        paddingLeft: 6,
                        lineHeight: "20px",
                      }}
                    >
                      {HOSTS[(i * 2 + s * 3) % HOSTS.length]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 26, padding: "0 36px 30px", fontSize: 22, fontWeight: 600, color: K.muted }}>
          {["Pagi 06–11", "Siang 11–16", "Sore 16–21"].map((s, i) => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 18, height: 18, borderRadius: 5, background: SHIFT_COLORS[i] }} /> {s}
            </span>
          ))}
        </div>
      </div>
      <TapRipple x={GEN.x} y={GEN.y + 54 * (1 - card)} p={between(frame, fps, tapGen - 0.1, tapGen + 0.45)} r={36} />
      <TapRipple x={PUB.x} y={PUB.y} p={between(frame, fps, pub - 0.1, pub + 0.45)} r={36} />
    </Stage>
  );
};
