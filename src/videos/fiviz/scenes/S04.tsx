import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, Center, Chip, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const DAYS = ["Sab 11", "Min 12", "Sen 13", "Sel 14"];
const SLOTS = ["09.00", "10.00", "11.00", "13.00", "14.00", "15.00", "16.00", "19.00", "20.00"];
const FULL = ["10.00", "15.00"];
const PICK = 3; // 13.00

// "Mau datang? Pesan jamnya dulu, nggak perlu antre lama."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tap = L(M.pesan) + 0.25;
  const picked = enterAt(frame, fps, tap + 0.05, 0.2);
  const col = PICK % 3;
  const row = Math.floor(PICK / 3);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Pesan *jamnya* dulu" delay={L(M.mau) - 0.1} stagger={0.3} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      <Phone y={1150} width={520} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <AppHeader title="Reservasi" sub="Pilih tanggal & jam datang" />
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {DAYS.map((d, i) => (
              <div key={d} style={{ flex: 1, borderRadius: 14, padding: "10px 0", textAlign: "center", fontSize: 13, fontWeight: 700, background: i === 2 ? B.b600 : "white", color: i === 2 ? "white" : B.text, border: `1px solid ${B.border}` }}>{d}</div>
            ))}
          </div>
          <Card style={{ marginTop: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10 }}>Slot tersedia</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {SLOTS.map((s, i) => {
                const full = FULL.includes(s);
                const on = i === PICK ? picked : 0;
                return (
                  <div key={s} style={{ borderRadius: 12, padding: "12px 0", textAlign: "center", fontSize: 15, fontWeight: 800, background: on > 0.5 ? B.b600 : full ? "#F1F5F9" : "white", color: on > 0.5 ? "white" : full ? "#94A3B8" : B.text, border: `2px solid ${on > 0.5 ? B.b600 : B.border}`, textDecoration: full ? "line-through" : undefined }}>
                    {s}
                  </div>
                );
              })}
            </div>
          </Card>
          <div style={{ marginTop: 16, height: 50, borderRadius: 25, background: picked > 0.5 ? B.b600 : B.b200, color: "white", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
            Reservasi Sen 13 · 13.00
          </div>
        </div>
        <TapRipple x={82 + col * 112} y={345 + (row - 1) * 54} p={between(frame, fps, tap - 0.1, tap + 0.35)} />
      </Phone>
      <Center top={1790}>
        <Chip tone="accent" style={rise(enterAt(frame, fps, L(M.antre), 0.3), 20)}>Datang, langsung dilayani</Chip>
      </Center>
    </Stage>
  );
};
