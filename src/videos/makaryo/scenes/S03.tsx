import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Badge, BottomNav, Card, Chip, Icon, K, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);

/** Wajah sederhana di jendela kamera depan. */
const Selfie: React.FC = () => (
  <svg viewBox="0 0 358 400" width={358} height={400} style={{ position: "absolute", inset: 0 }}>
    <defs>
      <linearGradient id="cam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3A3F6B" />
        <stop offset="1" stopColor="#1E2145" />
      </linearGradient>
    </defs>
    <rect width="358" height="400" fill="url(#cam)" />
    {/* lampu studio */}
    <circle cx="300" cy="60" r="70" fill="#F5B23D" opacity="0.12" />
    <path d="M60 400c0-80 52-120 119-120s119 40 119 120z" fill="#7C6CF0" />
    <circle cx="179" cy="180" r="74" fill="#F2C9A8" />
    <path d="M105 170c0-50 34-82 74-82s74 32 74 82c-14-30-40-40-74-40s-60 10-74 40z" fill="#2B2340" />
    <circle cx="152" cy="185" r="6" fill="#2B2340" />
    <circle cx="206" cy="185" r="6" fill="#2B2340" />
    <path d="M155 215c10 12 38 12 48 0" stroke="#2B2340" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);

/** Halaman absen: kamera + lokasi. `shot` = 0→1 foto diambil, `loc` = 0→1 lokasi muncul. */
const CameraScreen: React.FC<{ shot: number; flash: number; loc: number }> = ({ shot, flash, loc }) => (
  <div style={{ position: "absolute", inset: 0, padding: "0 16px" }}>
    <div style={{ fontSize: 13, fontWeight: 700, padding: "14px 10px 0" }}>10.58</div>
    <div style={{ fontSize: 20, fontWeight: 800, marginTop: 18 }}>Absen</div>
    <div style={{ fontSize: 13, color: K.muted, marginTop: 2 }}>Shift Siang · 11.00 – 16.00 WIB</div>
    <div style={{ position: "relative", marginTop: 14, width: 358, height: 400, borderRadius: 24, overflow: "hidden" }}>
      <Selfie />
      {/* bingkai wajah */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 44,
            height: 44,
            left: i % 2 ? 254 : 60,
            top: i < 2 ? 84 : 270,
            borderColor: shot > 0.5 ? K.emerald : "white",
            borderStyle: "solid",
            borderWidth: 0,
            borderTopWidth: i < 2 ? 5 : 0,
            borderBottomWidth: i < 2 ? 0 : 5,
            borderLeftWidth: i % 2 ? 0 : 5,
            borderRightWidth: i % 2 ? 5 : 0,
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "white", opacity: flash }} />
      <div style={{ position: "absolute", left: 12, top: 12, opacity: shot }}>
        <Badge tone="success" size={13}>
          <Icon name="check" size={13} stroke={3} /> Foto tersimpan
        </Badge>
      </div>
    </div>
    <Card style={{ marginTop: 12, padding: 12, display: "flex", alignItems: "center", gap: 12, ...rise(loc, 20) }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: "#E4F2FD", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 22, height: 6, background: "white" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 36, width: 6, background: "white" }} />
        <div style={{ position: "absolute", left: 18, top: 10, color: K.coral }}>
          <Icon name="pin" size={28} stroke={2.4} />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Lokasi GPS tercatat</div>
        <div style={{ fontSize: 12, color: K.muted, marginTop: 2 }}>Studio Live · akurasi 12 m</div>
      </div>
    </Card>
    <div style={{ position: "absolute", left: 16, right: 16, top: 690, height: 50, borderRadius: 25, background: K.primary, color: "white", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <Icon name="camera" size={18} /> Kirim clock in
    </div>
  </div>
);

const ROWS = [
  { d: "Kamis, 8 Okt", s: "Shift Siang", tin: "11.07", late: 7, at: M.telat - 0.1 },
  { d: "Jumat, 9 Okt", s: "Shift Siang", tin: "10.56", late: 0, at: M.tepat - 0.1 },
  { d: "Sabtu, 10 Okt", s: "Shift Sore", tin: "15.52", late: 0, at: M.tercatat - 0.1 },
  { d: "Senin, 12 Okt", s: "Shift Pagi", tin: "05.58", late: 0, at: M.tercatat + 0.15 },
];

const HistoryScreen: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => (
  <div style={{ position: "absolute", inset: 0, padding: "0 16px" }}>
    <div style={{ fontSize: 13, fontWeight: 700, padding: "14px 10px 0" }}>11.01</div>
    <div style={{ fontSize: 20, fontWeight: 800, marginTop: 18 }}>Riwayat absen</div>
    <div style={{ fontSize: 13, color: K.muted, marginTop: 2 }}>Oktober 2026</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
      {ROWS.map((r) => {
        const p = enterAt(frame, fps, L(r.at), 0.35);
        return (
          <Card key={r.d} style={{ padding: 14, display: "flex", alignItems: "center", gap: 12, ...rise(p, 16) }}>
            <span style={{ width: 40, height: 40, borderRadius: 20, background: r.late ? "#FDF1DA" : "#E3F6EC", color: r.late ? "#9A6510" : "#1F8A52", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={r.late ? "clock" : "check"} size={19} stroke={2.4} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{r.d}</div>
              <div style={{ fontSize: 12, color: K.muted }}>
                {r.s} · masuk {r.tin}
              </div>
            </div>
            <Badge tone={r.late ? "warning" : "success"} size={12}>
              {r.late ? `Telat ${r.late} mnt` : "Tepat waktu"}
            </Badge>
          </Card>
        );
      })}
    </div>
    <BottomNav active={1} />
  </div>
);

// "Host absen pakai selfie dan lokasi GPS. Telat atau tepat waktu, tercatat otomatis."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const snap = L(M.selfie) + 0.05;
  const flash = interpolate(t, [snap, snap + 0.06, snap + 0.35], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shot = enterAt(frame, fps, snap + 0.1, 0.3);
  const loc = enterAt(frame, fps, L(M.lokasi) - 0.05, 0.4);
  const swap = between(frame, fps, L(M.telat) - 0.45, L(M.telat) - 0.15);
  const auto = enterAt(frame, fps, L(M.tercatat) - 0.1, 0.4);
  // tombol shutter (koordinat layar HP)
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Absen pakai *selfie* + *GPS*" delay={L(M.hostAbsen) - 0.1} stagger={0.42} size={100} color={K.text} accent={K.primary} />
      </TitleArea>
      <Phone width={470} y={1150}>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - swap }}>
          <CameraScreen shot={shot} flash={flash} loc={loc} />
          <TapRipple x={195} y={715} p={between(frame, fps, snap - 0.1, snap + 0.4)} />
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: swap }}>
          <HistoryScreen frame={frame} fps={fps} />
        </div>
      </Phone>
      <Chip tone="success" style={{ left: 300, top: 1680, ...rise(auto, 30) }}>
        <Icon name="check" size={40} color="white" stroke={3} /> Tercatat otomatis
      </Chip>
    </Stage>
  );
};
