import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, img, Phone, Pill, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);

const KELUHAN = [
  { t: "Layar retak", src: "hp-layar-retak.png" },
  { t: "Kena air", src: "hp-kena-air.png" },
  { t: "Charger", src: "hp-charger.png" },
  { t: "Mati total", src: "hp-mati-total.png" },
];

const Step: React.FC<{ n: number; t: string; active: number }> = ({ n, t, active }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 800, color: active > 0.5 ? B.b600 : B.muted, marginBottom: 8 }}>
    <span style={{ width: 22, height: 22, borderRadius: 11, background: active > 0.5 ? B.b600 : B.b100, color: active > 0.5 ? "white" : B.b600, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
    {t}
  </div>
);

// "Sebelum datang, cek estimasi sendiri. Pilih tipe HP, keluhannya, kualitas sparepart, kisaran harganya langsung keluar."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tipe = enterAt(frame, fps, L(M.pilih), 0.2);
  const kel = enterAt(frame, fps, L(M.keluhan), 0.2);
  const kua = enterAt(frame, fps, L(M.kualitas) + 0.1, 0.2);
  const res = spring({ frame: frame - Math.round((L(M.kisaran) - 0.05) * fps), fps, config: { damping: 13 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Cek *estimasi* sendiri" delay={L(M.sebelum) - 0.1} stagger={0.35} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      <Phone y={1150} width={520} style={rise(enterAt(frame, fps, 0, 0.4), 60)}>
        <AppHeader title="Estimasi Biaya" sub="Kisaran harga sebelum datang" />
        <div style={{ padding: "14px 16px" }}>
          <Card style={{ padding: 12 }}>
            <Step n={1} t="Tipe HP" active={tipe} />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill on={tipe}>Samsung</Pill>
              <Pill on={tipe} style={{ flex: 1 }}>Galaxy A15</Pill>
            </div>
          </Card>
          <Card style={{ padding: 12, marginTop: 10 }}>
            <Step n={2} t="Keluhan" active={kel} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {KELUHAN.map((k, i) => {
                const on = i === 0 ? kel : 0;
                return (
                  <div key={k.t} style={{ borderRadius: 14, border: `2px solid ${on > 0.5 ? B.b600 : B.border}`, background: on > 0.5 ? B.b50 : "white", padding: "6px 4px", textAlign: "center", fontSize: 11, fontWeight: 700 }}>
                    <Img src={img(k.src)} style={{ height: 62, objectFit: "contain" }} />
                    <div style={{ marginTop: 2 }}>{k.t}</div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card style={{ padding: 12, marginTop: 10 }}>
            <Step n={3} t="Pilih kualitas sparepart" active={kua} />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill on={kua} style={{ flex: 1 }}>Original</Pill>
              <Pill on={0} style={{ flex: 1 }}>OEM</Pill>
              <Pill on={0} style={{ flex: 1 }}>KW</Pill>
            </div>
          </Card>
          <div style={{ marginTop: 12, borderRadius: 20, background: `linear-gradient(135deg, ${B.b600}, ${B.b900})`, color: "white", padding: 16, opacity: Math.min(1, res * 2), transform: `translateY(${(1 - res) * 40}px) scale(${0.9 + 0.1 * res})` }}>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8, letterSpacing: "0.06em" }}>ESTIMASI · GANTI LCD ORIGINAL</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4 }}>Rp550.000 – Rp750.000</div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12 }}>
              <div>
                <div style={{ opacity: 0.7 }}>Lama pengerjaan</div>
                <b>1–2 jam</b>
              </div>
              <div>
                <div style={{ opacity: 0.7 }}>Masa garansi</div>
                <b>90 hari</b>
              </div>
            </div>
          </div>
        </div>
        <TapRipple x={290} y={232} p={between(frame, fps, L(M.pilih) - 0.1, L(M.pilih) + 0.35)} />
        <TapRipple x={66} y={356} p={between(frame, fps, L(M.keluhan) - 0.1, L(M.keluhan) + 0.35)} />
        <TapRipple x={80} y={484} p={between(frame, fps, L(M.kualitas), L(M.kualitas) + 0.45)} />
      </Phone>
    </Stage>
  );
};
