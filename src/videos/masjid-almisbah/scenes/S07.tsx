import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);

/** Sorot kartu di dalam layar (koordinat CSS). */
const Ring: React.FC<{ y: number; h: number; p: number }> = ({ y, h, p }) =>
  p <= 0 ? null : <div style={{ position: "absolute", left: 10, right: 10, top: y, height: h, borderRadius: 20, border: `4px solid ${B.accent}`, opacity: p }} />;

// "Jamaah pun bisa cek sendiri: saldo, pengeluaran, sampai progres renovasi atap."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.2) * (1 - enterAt(frame, fps, b, 0.15));
  const prog = enterAt(frame, fps, L(M.renovasi) + 0.2, 0.8);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Jamaah bisa *cek* *sendiri*" delay={L(M.jamaah) - 0.1} stagger={0.3} size={100} color={B.text} accent={B.b600} />
      </TitleArea>
      <Phone y={1060} width={500} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <AppHeader title="Transparansi Kas" sub="Halaman publik · tanpa akun" />
        <div style={{ padding: 16 }}>
          <Card>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Saldo per kantong</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
              {[
                ["Operasional", "Rp9,18 jt"],
                ["Pembangunan", "Rp52,7 jt"],
                ["Anak Yatim", "Rp10,25 jt"],
                ["Ramadan", "Rp1,4 jt"],
              ].map(([n, v]) => (
                <div key={n} style={{ background: B.b50, borderRadius: 12, padding: "8px 10px" }}>
                  <div style={{ fontSize: 11, color: B.muted }}>{n}</div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{ marginTop: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Pengeluaran besar</div>
            {[
              ["Perbaikan sound system", "Rp3.500.000"],
              ["Listrik & air", "Rp1.240.000"],
            ].map(([n, v]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 8 }}>
                <span>{n}</span>
                <b style={{ color: B.red }}>{v}</b>
              </div>
            ))}
          </Card>
          <Card style={{ marginTop: 12, borderColor: "#EED9A8" }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Renovasi atap masjid</div>
            <div style={{ height: 14, borderRadius: 7, background: B.accentSoft, marginTop: 10, overflow: "hidden" }}>
              <div style={{ width: `${62 * prog}%`, height: "100%", borderRadius: 7, background: B.accent }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
              <b>Rp52.700.000</b>
              <span style={{ color: B.muted }}>dari Rp85.000.000 · {Math.round(62 * prog)}%</span>
            </div>
          </Card>
        </div>
        <Ring y={170} h={168} p={on(L(M.saldo) - 0.1, L(M.keluar) - 0.1)} />
        <Ring y={350} h={104} p={on(L(M.keluar) - 0.1, L(M.renovasi) - 0.1)} />
        <Ring y={466} h={92} p={enterAt(frame, fps, L(M.renovasi) - 0.1, 0.2)} />
      </Phone>
    </Stage>
  );
};
