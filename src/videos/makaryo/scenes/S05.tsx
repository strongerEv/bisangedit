import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Badge, font, Icon, IconName, K, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);

type Req = { icon: IconName; color: string; soft: string; title: string; sub: string; who: string; at: number; approve: boolean };

const REQS: Req[] = [
  { icon: "clipboard", color: "#9A6510", soft: "#FDF1DA", title: "Izin mendadak", sub: "Rabu, 14 Okt · Mengantar keluarga berobat", who: "Rani P.", at: M.izin, approve: true },
  { icon: "calendar", color: K.coral, soft: "#FDE6E4", title: "Libur mingguan", sub: "Senin, 19 Okt", who: "Dimas A.", at: M.libur, approve: true },
  { icon: "wallet", color: K.sky, soft: "#E4F2FD", title: "Setoran omzet · Shift Sore", sub: "Rp1.250.000 · foto bukti terlampir", who: "Sinta N.", at: M.setoran, approve: false },
];

const TOP = 620;
const H = 250;
const GAP = 30;

// "Izin, libur, sampai setoran omzet, semuanya diajukan dari aplikasi. Admin tinggal setujui."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inbox = enterAt(frame, fps, L(M.diajukan) - 0.1, 0.4);
  const ok = L(M.setujui);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Izin, libur, *omzet*" delay={L(M.izin) - 0.1} stagger={0.5} size={104} color={K.text} accent={K.primary} />
        <Words text="semuanya *diajukan* dari aplikasi" delay={L(M.diajukan) - 0.1} stagger={0.14} size={56} weight={600} color={K.muted} accent={K.primary} />
      </TitleArea>
      <div style={{ position: "absolute", left: 60, top: TOP - 100, display: "flex", alignItems: "center", gap: 16, ...font, fontSize: 34, fontWeight: 700, color: K.text, ...rise(inbox, 20) }}>
        <span style={{ position: "relative", width: 64, height: 64, borderRadius: 32, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 10px 26px ${K.shadow}` }}>
          <Icon name="bell" size={32} />
          <span style={{ position: "absolute", right: -6, top: -6, width: 32, height: 32, borderRadius: 16, background: K.coral, color: "white", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
        </span>
        Masuk ke admin · Approval
      </div>
      {REQS.map((r, i) => {
        const p = spring({ frame: frame - Math.round((L(r.at) - 0.15) * fps), fps, config: { damping: 14 } });
        const tap = ok + i * 0.4;
        const done = enterAt(frame, fps, tap + 0.15, 0.25);
        const y = TOP + i * (H + GAP);
        return (
          <div
            key={r.title}
            style={{
              position: "absolute",
              left: 60,
              top: y,
              width: 960,
              height: H,
              boxSizing: "border-box",
              background: "white",
              borderRadius: 36,
              border: `2px solid ${K.border}`,
              boxShadow: `0 20px 50px ${K.shadow}`,
              padding: "30px 34px",
              ...font,
              color: K.text,
              opacity: Math.min(1, p * 2),
              transform: `translateX(${(1 - p) * 700}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <span style={{ width: 80, height: 80, borderRadius: 40, background: r.soft, color: r.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={r.icon} size={40} stroke={2.2} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.01em" }}>{r.title}</div>
                <div style={{ fontSize: 26, color: K.muted, marginTop: 4 }}>{r.sub}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 26 }}>
              <span style={{ width: 48, height: 48, borderRadius: 24, background: K.primarySoft, color: K.primary, fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {r.who.slice(0, 1)}
              </span>
              <span style={{ fontSize: 28, fontWeight: 600 }}>{r.who}</span>
              <span style={{ flex: 1 }} />
              <span style={{ position: "relative" }}>
                <Badge tone={r.approve ? "warning" : "primary"} size={26} style={{ opacity: 1 - done }}>
                  {r.approve ? "Menunggu" : "Terkirim"}
                </Badge>
                <Badge tone="success" size={26} style={{ position: "absolute", right: 0, top: 0, opacity: done }}>
                  <Icon name="check" size={24} stroke={3} /> {r.approve ? "Disetujui" : "Tercatat"}
                </Badge>
              </span>
              {r.approve ? (
                <span style={{ height: 60, borderRadius: 30, padding: "0 28px", background: K.emerald, color: "white", fontSize: 26, fontWeight: 700, display: "flex", alignItems: "center", opacity: inbox * (1 - done * 0.6) }}>
                  Setujui
                </span>
              ) : null}
            </div>
            {r.approve ? <TapRipple x={960 - 34 - 70} y={H - 30 - 30} p={between(frame, fps, tap - 0.1, tap + 0.4)} r={30} /> : null}
          </div>
        );
      })}
    </Stage>
  );
};
