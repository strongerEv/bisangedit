import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { POSES, Stickman } from "../../components/Stickman";
import { theme } from "../../components/theme";
import { Words } from "../../components/Words";

// UJI GAYA (style frame) — belum memakai timeline/VO. Hanya untuk dilihat sebelum tahap storyboard.
const c = theme.colors;
const RED = c.brand;

const Title: React.FC<{ n?: string; text: string }> = ({ n, text }) => (
  <div style={{ position: "absolute", left: 96, top: 240, width: 888, display: "flex", flexDirection: "column", gap: 8 }}>
    {n ? (
      <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 200, lineHeight: 0.9, color: RED, letterSpacing: "-0.04em" }}>
        {n}
      </div>
    ) : null}
    <Words text={text} size={92} accent={RED} delay={0} stagger={0} />
  </div>
);

const Card: React.FC<{ style: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      position: "absolute",
      background: c.card,
      borderRadius: 24,
      boxShadow: `0 18px 44px ${c.shadow}`,
      border: `3px solid ${c.line}`,
      ...style,
    }}
  >
    {children}
  </div>
);

const mono: React.CSSProperties = { fontFamily: theme.fonts.mono, fontWeight: 500, fontSize: 24, color: c.muted };

/** F1 · Hook */
const F1: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 96, top: 240, display: "flex", flexDirection: "column", gap: 28, width: 888 }}>
      <div style={{ alignSelf: "flex-start", background: RED, borderRadius: 999, padding: "10px 26px", ...mono, color: c.card }}>
        3 TANDA
      </div>
      <Words text="Kantor Anda sudah butuh *aplikasi* *sendiri?*" size={96} accent={RED} delay={0} stagger={0} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 610,
        top: 900,
        width: 120,
        height: 120,
        borderRadius: 60,
        border: `8px solid ${RED}`,
        background: c.card,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: theme.fonts.heading,
        fontWeight: 700,
        fontSize: 72,
        color: RED,
      }}
    >
      ?
    </div>
    <Stickman x={480} y={1400} pose={POSES.think} face="neutral" facing={1} scale={1.3} />
  </>
);

/** F2 · Laporan manual */
const F2: React.FC = () => (
  <>
    <Title n="1" text="Laporan masih direkap *manual.*" />
    {/* meja */}
    <div style={{ position: "absolute", left: 96, top: 1380, width: 888, height: 12, borderRadius: 6, background: c.text }} />
    {/* tumpukan kertas */}
    {Array.from({ length: 9 }).map((_, i) => (
      <Card key={i} style={{ left: 140 + (i % 2) * 14 - 7, top: 1330 - i * 52, width: 260, height: 50, borderRadius: 8 }} />
    ))}
    {/* kalender */}
    <Card style={{ left: 780, top: 760, width: 180, height: 190, overflow: "hidden" }}>
      <div style={{ height: 50, background: RED }} />
      <div style={{ textAlign: "center", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 96, color: c.text, marginTop: 4 }}>31</div>
    </Card>
    <div style={{ position: "absolute", left: 700, top: 1000, width: 22, height: 32, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: c.line }} />
    <Stickman x={620} y={1380 - 176} pose={POSES.slump} face="sad" facing={-1} scale={1} />
  </>
);

/** F3 · Data tersebar */
const Bubble: React.FC<{ x: number; y: number; w: number; dark?: boolean; rot?: number }> = ({ x, y, w, dark, rot = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: 64,
      borderRadius: 32,
      borderBottomLeftRadius: 8,
      background: dark ? c.text : c.card,
      border: dark ? undefined : `3px solid ${c.line}`,
      transform: `rotate(${rot}deg)`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 22px",
      boxSizing: "border-box",
    }}
  >
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: dark ? c.onDark : c.muted }} />
    ))}
  </div>
);

const Sheet: React.FC<{ x: number; y: number; name: string; rot?: number }> = ({ x, y, name, rot = 0 }) => (
  <Card style={{ left: x, top: y, width: 300, padding: 18, transform: `rotate(${rot}deg)` }}>
    <div style={{ ...mono, marginBottom: 10 }}>{name}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ height: 18, borderRadius: 4, background: i < 4 ? c.muted : c.line }} />
      ))}
    </div>
  </Card>
);

const F3: React.FC = () => (
  <>
    <Title n="2" text="Data tersebar di Excel & *chat.*" />
    <Sheet x={110} y={820} name="laporan_final_v3.xlsx" rot={-8} />
    <Sheet x={620} y={760} name="stok_FIX_baru.xlsx" rot={7} />
    <Bubble x={160} y={1120} w={200} rot={-6} />
    <Bubble x={700} y={1060} w={230} dark rot={5} />
    <Bubble x={420} y={700} w={180} rot={3} />
    <Stickman x={540} y={1450} pose={POSES.juggle} face="stress" scale={1.15} />
  </>
);

/** F4 · Kerjaan berulang */
const F4: React.FC = () => (
  <>
    <Title n="3" text="Tim sibuk, kerjaannya *itu-itu* *lagi.*" />
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <circle cx={540} cy={1180} r={300} fill="none" stroke={c.line} strokeWidth={14} />
      <path d="M 540 880 A 300 300 0 0 1 840 1180" fill="none" stroke={RED} strokeWidth={14} strokeLinecap="round" />
      <path d="M 840 1180 l -26 -40 M 840 1180 l 32 -34" stroke={RED} strokeWidth={14} strokeLinecap="round" />
      <path d="M 540 1480 A 300 300 0 0 1 240 1180" fill="none" stroke={RED} strokeWidth={14} strokeLinecap="round" />
      <path d="M 240 1180 l 26 40 M 240 1180 l -32 34" stroke={RED} strokeWidth={14} strokeLinecap="round" />
    </svg>
    <div style={{ position: "absolute", left: 0, width: 1080, top: 1500, textAlign: "center", ...mono }}>input → rekap → kirim → ulang</div>
    <Stickman x={540} y={1305} pose={POSES.run} face="stress" facing={1} scale={1} />
  </>
);

/** F5 · Solusi: satu dashboard */
const Tile: React.FC<{ label: string; value: string; note: string }> = ({ label, value, note }) => (
  <div style={{ background: c.bg, borderRadius: 20, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 6 }}>
    <div style={mono}>{label}</div>
    <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 52, color: c.text, letterSpacing: "-0.02em" }}>{value}</div>
    <div style={{ ...mono, color: RED }}>✓ {note}</div>
  </div>
);

const F5: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 96, top: 240, width: 888 }}>
      <Words text="Satu aplikasi. *Semua* *rapi.*" size={100} accent={RED} delay={0} stagger={0} />
    </div>
    <Card style={{ left: 96, top: 560, width: 888, height: 560, padding: 0, overflow: "hidden" }}>
      <div style={{ height: 76, background: c.text, display: "flex", alignItems: "center", gap: 14, padding: "0 28px" }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: RED }} />
        <div style={{ ...mono, color: c.onDark }}>dashboard kantor</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 28 }}>
        <Tile label="ABSENSI" value="42/45" note="hari ini" />
        <Tile label="STOK" value="1.204" note="update otomatis" />
        <Tile label="APPROVAL" value="3" note="menunggu" />
        <Tile label="LAPORAN" value="Siap" note="tanpa rekap" />
      </div>
    </Card>
    <Stickman x={540} y={1400} pose={POSES.cheer} face="happy" scale={1.05} />
  </>
);

/** F6 · CTA */
const F6: React.FC = () => (
  <>
    <Img
      src={staticFile("brand/logo.png")}
      style={{ position: "absolute", left: 96, top: 230, width: 230, mixBlendMode: "multiply" }}
    />
    <div style={{ position: "absolute", left: 96, top: 480, width: 888, display: "flex", flexDirection: "column", gap: 40 }}>
      <Words text="Bingung mulai dari mana?" size={84} delay={0} stagger={0} />
      <Words text="Konsultasi pertama *gratis.*" size={112} accent={RED} delay={0} stagger={0} />
      <div
        style={{
          alignSelf: "flex-start",
          background: RED,
          color: c.card,
          borderRadius: 999,
          padding: "30px 56px",
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 50,
          boxShadow: `0 18px 40px rgba(242, 13, 13, 0.25)`,
        }}
      >
        Chat kami sekarang →
      </div>
    </div>
    <Stickman x={720} y={1420} pose={{ ...POSES.point, armR: [-120, 20] }} face="happy" facing={-1} scale={1.1} />
  </>
);

const FRAMES = [F1, F2, F3, F4, F5, F6];
export const STYLE_TEST_FRAMES = FRAMES.length;

export const IklanStyleTest: React.FC = () => (
  <AbsoluteFill style={{ background: c.bg }}>
    {FRAMES.map((F, i) => (
      <Sequence key={i} from={i * 60} durationInFrames={60} name={`F${i + 1}`}>
        <AbsoluteFill style={{ background: c.bg }}>
          <F />
        </AbsoluteFill>
      </Sequence>
    ))}
  </AbsoluteFill>
);
