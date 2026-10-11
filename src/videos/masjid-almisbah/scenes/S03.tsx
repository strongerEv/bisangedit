import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, Center, Chip, img, Phone, Pill, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);

/** Pola QR sederhana (bukan QR asli — hanya ilustrasi). */
const QR: React.FC<{ size: number }> = ({ size }) => {
  const n = 21;
  const c = size / n;
  const on = (x: number, y: number) => {
    const finder = (fx: number, fy: number) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7 && (x === fx || x === fx + 6 || y === fy || y === fy + 6 || (x >= fx + 2 && x <= fx + 4 && y >= fy + 2 && y <= fy + 4));
    if (finder(0, 0) || finder(14, 0) || finder(0, 14)) return true;
    if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) return false;
    return ((x * 7 + y * 13 + x * y) % 5) < 2;
  };
  return (
    <svg width={size} height={size}>
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        return on(x, y) ? <rect key={i} x={x * c} y={y * c} width={c} height={c} fill={B.text} /> : null;
      })}
    </svg>
  );
};

// "Mau donasi? Pilih programnya, scan QRIS, unggah bukti. Kwitansi digital langsung terbit."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pick = enterAt(frame, fps, L(M.pilih) + 0.2, 0.2);
  const toQr = between(frame, fps, L(M.scan) - 0.25, L(M.scan));
  const toBukti = between(frame, fps, L(M.unggah) - 0.25, L(M.unggah));
  const toKw = between(frame, fps, L(M.kwitansi) - 0.25, L(M.kwitansi));
  const layer = (o: number, children: React.ReactNode) => <div style={{ position: "absolute", inset: 0, opacity: o, background: B.soft }}>{children}</div>;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Donasi *QRIS*, kwitansi *otomatis*" delay={L(M.mauDonasi) - 0.1} stagger={0.3} size={92} color={B.text} accent={B.b600} />
      </TitleArea>
      <Phone y={1060} width={500} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        {layer(1, (
          <>
            <AppHeader title="Donasi" sub="Infak & sedekah Masjid Al Misbah" />
            <div style={{ padding: 16 }}>
              <Card>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Pilih program</div>
                <div style={{ display: "grid", gap: 8 }}>
                  <Pill on={pick} style={{ borderRadius: 14, textAlign: "left", padding: "10px 12px" }}>Renovasi atap masjid</Pill>
                  <Pill on={0} style={{ borderRadius: 14, textAlign: "left", padding: "10px 12px" }}>Santunan yatim Muharram</Pill>
                  <Pill on={0} style={{ borderRadius: 14, textAlign: "left", padding: "10px 12px" }}>Operasional masjid</Pill>
                </div>
              </Card>
              <Card style={{ marginTop: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Nominal</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Pill on={0} style={{ flex: 1 }}>50rb</Pill>
                  <Pill on={0} style={{ flex: 1 }}>100rb</Pill>
                  <Pill on={pick} style={{ flex: 1 }}>250rb</Pill>
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: B.muted }}>Nama: <b style={{ color: B.text }}>Hamba Allah</b></div>
              </Card>
            </div>
          </>
        ))}
        {layer(toQr * (1 - toKw), (
          <>
            <AppHeader title="Bayar via QRIS" sub="Renovasi atap masjid · Rp250.000" />
            <div style={{ padding: 16 }}>
              <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: B.muted, letterSpacing: "0.08em" }}>QRIS · MASJID AL MISBAH</div>
                <div style={{ marginTop: 12, padding: 12, background: "white", border: `2px solid ${B.border}`, borderRadius: 14 }}>
                  <QR size={210} />
                </div>
                <div style={{ marginTop: 10, fontSize: 22, fontWeight: 900 }}>Rp250.000</div>
              </Card>
              <div style={{ marginTop: 12, borderRadius: 16, border: `2px dashed ${toBukti > 0.5 ? B.b500 : B.border}`, background: toBukti > 0.5 ? B.b50 : "white", padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 54, height: 70, borderRadius: 8, background: toBukti > 0.5 ? "#DCEDE4" : "#F1F1EF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{toBukti > 0.5 ? "✓" : "+"}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{toBukti > 0.5 ? "bukti-transfer.jpg terunggah" : "Unggah bukti transfer"}</div>
              </div>
            </div>
          </>
        ))}
        {layer(toKw, (
          <>
            <AppHeader title="Kwitansi Digital" sub="KW-261009-014 · Terverifikasi" />
            <div style={{ padding: 16 }}>
              <Card style={{ padding: 18, borderColor: "#EED9A8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Img src={img("logo.png")} style={{ width: 44, height: 44 }} />
                  <div style={{ fontSize: 16, fontWeight: 800 }}>Masjid Al Misbah</div>
                </div>
                <div style={{ fontSize: 12, color: B.muted, marginTop: 14 }}>Telah diterima dari</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>Hamba Allah</div>
                <div style={{ fontSize: 12, color: B.muted, marginTop: 10 }}>Sejumlah</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: B.b600 }}>Rp250.000</div>
                <div style={{ fontSize: 12, fontStyle: "italic", color: B.muted }}>Dua ratus lima puluh ribu rupiah</div>
                <div style={{ fontSize: 12, color: B.muted, marginTop: 10 }}>Untuk</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Renovasi atap masjid</div>
                <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: B.accentSoft, fontSize: 12, lineHeight: 1.45, color: "#5E4718" }}>
                  Ajarakallahu fiima a'thaita, wa baaraka laka fiima abqaita, wa ja'alahu laka thahuura.
                </div>
              </Card>
            </div>
          </>
        ))}
        <TapRipple x={120} y={232} p={between(frame, fps, L(M.pilih) + 0.05, L(M.pilih) + 0.5)} />
        <TapRipple x={318} y={430} p={between(frame, fps, L(M.pilih) + 0.35, L(M.pilih) + 0.8)} />
        <TapRipple x={195} y={612} p={between(frame, fps, L(M.unggah) - 0.15, L(M.unggah) + 0.3)} />
      </Phone>
      <Center top={1720}>
        <Chip tone="accent" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.kwitansi) + 0.3, 0.3), 20) }}>Kwitansi langsung terbit</Chip>
      </Center>
    </Stage>
  );
};
