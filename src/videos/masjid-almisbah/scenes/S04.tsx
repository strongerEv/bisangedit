import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, Center, Chip, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const ROWS = [
  { p: "Rp100.000", n: 8, sub: "800.000" },
  { p: "Rp50.000", n: 12, sub: "600.000" },
  { p: "Rp20.000", n: 15, sub: "300.000" },
  { p: "Rp10.000", n: 22, sub: "220.000" },
  { p: "Rp5.000", n: 30, sub: "150.000" },
  { p: "Rp2.000", n: 35, sub: "70.000" },
];
const SAKSI = ["Ust. Ahmad Fauzi", "Pak Dedi Kurnia"];

// "Kotak amal dihitung pecahan demi pecahan, dan baru tercatat setelah semua saksi setuju."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const done = enterAt(frame, fps, L(M.saksi) + 0.6, 0.3);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kotak amal, *disaksikan*" delay={L(M.kotak) - 0.1} stagger={0.35} size={100} color={B.text} accent={B.b600} />
      </TitleArea>
      <Phone y={1060} width={500} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <AppHeader title="Hitung Kotak Jumat" sub="Diedarkan saat khutbah · kantong Operasional" />
        <div style={{ padding: 16 }}>
          <Card style={{ padding: "8px 14px" }}>
            {ROWS.map((r, i) => {
              const p = enterAt(frame, fps, L(M.pecahan) - 0.3 + i * 0.22, 0.25);
              return (
                <div key={r.p} style={{ display: "flex", alignItems: "center", padding: "7px 0", borderBottom: i < ROWS.length - 1 ? `1px solid ${B.border}` : undefined, fontSize: 14, fontWeight: 700 }}>
                  <span style={{ width: 96 }}>{r.p}</span>
                  <span style={{ width: 70, textAlign: "center", color: B.b600, opacity: p }}>× {r.n}</span>
                  <span style={{ flex: 1, textAlign: "right", opacity: p }}>{r.sub}</span>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", fontSize: 16, fontWeight: 900, opacity: enterAt(frame, fps, L(M.pecahan) + 1.1, 0.3) }}>
              <span>Total</span>
              <span style={{ color: B.b600 }}>Rp2.140.000</span>
            </div>
          </Card>
          <Card style={{ marginTop: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>Saksi</div>
            {SAKSI.map((s, i) => {
              const ok = enterAt(frame, fps, L(M.saksi) - 0.2 + i * 0.35, 0.2);
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", fontSize: 14, fontWeight: 700 }}>
                  {s}
                  <span style={{ borderRadius: 999, padding: "4px 10px", fontSize: 12, background: ok > 0.5 ? "#E3F1EA" : B.accentSoft, color: ok > 0.5 ? B.b600 : "#7A5A1C" }}>{ok > 0.5 ? "✓ Setuju" : "Menunggu"}</span>
                </div>
              );
            })}
          </Card>
          <div style={{ marginTop: 12, borderRadius: 16, background: B.b600, color: "white", padding: "14px 16px", fontSize: 15, fontWeight: 800, ...rise(done, 16) }}>✓ Tercatat sebagai kas masuk</div>
        </div>
      </Phone>
      <Center top={1720}>
        <Chip tone="brand" style={rise(enterAt(frame, fps, L(M.baru) + 0.2, 0.3), 20)}>Baru tercatat setelah saksi setuju</Chip>
      </Center>
    </Stage>
  );
};
