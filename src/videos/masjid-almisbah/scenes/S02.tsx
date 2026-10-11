import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, img, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);
const KANTONG = [
  { n: "Operasional", v: "Rp9.180.000", w: 0.3 },
  { n: "Pembangunan", v: "Rp52.700.000", w: 0.95 },
  { n: "Anak Yatim", v: "Rp10.250.000", w: 0.34 },
  { n: "Ramadan", v: "Rp1.400.000", w: 0.08 },
];

/** Beranda pengurus (data contoh). */
const Beranda: React.FC<{ p: number }> = ({ p }) => (
  <>
    <AppHeader title="Assalamu'alaikum, Pak Hasan" sub="Bendahara · Jumat, 9 Oktober" />
    <div style={{ padding: 16 }}>
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg, ${B.b500}, ${B.b900})`, color: "white", padding: 18 }}>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Total saldo semua kantong</div>
        <div style={{ fontSize: 30, fontWeight: 900, marginTop: 4 }}>Rp73.530.000</div>
        <div style={{ fontSize: 12, color: "#F3DFAE", marginTop: 6 }}>Infak Jumat ini: Rp2.140.000</div>
      </div>
      <Card style={{ marginTop: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Saldo per kantong</div>
        {KANTONG.map((k, i) => (
          <div key={k.n} style={{ marginTop: i ? 10 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
              <span>{k.n}</span>
              <span>{k.v}</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: B.b50, marginTop: 4 }}>
              <div style={{ width: `${k.w * 100 * p}%`, height: "100%", borderRadius: 4, background: i === 1 ? B.accent : B.b500 }} />
            </div>
          </div>
        ))}
      </Card>
      <Card style={{ marginTop: 12, background: B.accentSoft, borderColor: "#EED9A8" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#7A5A1C" }}>Perlu tindakan · 3</div>
        <div style={{ fontSize: 12, color: B.muted, marginTop: 4 }}>2 donasi menunggu verifikasi · 1 saksi kotak amal</div>
      </Card>
    </div>
  </>
);

// "Masjid Al Misbah sekarang punya aplikasi keuangan sendiri."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - Math.round((L(M.masjid) - 0.1) * fps), fps, config: { damping: 11 } });
  const phone = spring({ frame: frame - Math.round((L(M.aplikasi) - 0.3) * fps), fps, config: { damping: 14 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Masjid Al Misbah punya *aplikasi*" delay={L(M.masjid) - 0.1} stagger={0.3} size={96} color={B.text} accent={B.b600} />
      </TitleArea>
      <Img src={img("logo.png")} style={{ position: "absolute", left: 540 - 220, top: 640, width: 440, height: 440, opacity: Math.min(1, logo * 2) * (1 - phone), transform: `scale(${0.6 + 0.4 * logo - 0.3 * phone})` }} />
      <Phone y={1060} width={500} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 700}px)` }}>
        <Beranda p={enterAt(frame, fps, L(M.aplikasi) + 0.2, 0.8)} />
      </Phone>
      <div style={{ position: "absolute", left: 830, top: 1560, ...rise(enterAt(frame, fps, L(M.aplikasi) + 0.5, 0.3), 10), fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: B.muted }}>data contoh</div>
    </Stage>
  );
};
