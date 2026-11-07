import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, H, Phone, rupiah, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);

const PAID = 9;
const PENDING = 3;
const PRICE = 250000;

const MANIFEST = [
  [3, "Made Arsana", "Jl. Gatsu 12"],
  [6, "Putu Sari", "Jl. Gatsu 12"],
  [8, "Rina", "Jl. Teuku Umar 21"],
  [9, "Dimas", "Jl. Teuku Umar 21"],
  [10, "Hendra", "Sanur"],
  [13, "Wayan Budi", "Kuta"],
  [16, "Siti Aminah", "Renon"],
] as const;

const Stat: React.FC<{ label: string; value: string; tone?: "amber"; ring?: number }> = ({ label, value, tone, ring = 0 }) => (
  <div style={{ borderRadius: 16, background: "white", padding: 12, border: `1px solid ${H.slate100}`, boxShadow: ring > 0 ? `0 0 0 ${3 * ring}px ${H.kuning}` : "0 2px 6px rgba(15,23,42,0.04)" }}>
    <div style={{ fontSize: 11.5, color: H.muted }}>{label}</div>
    <div style={{ fontSize: 19, fontWeight: 800, marginTop: 2, color: tone === "amber" ? "#D97706" : H.text }}>{value}</div>
  </div>
);

const Check: React.FC<{ text: string; p: number; on: number }> = ({ text, p, on }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 20, ...font, fontWeight: 700, fontSize: 46, color: H.text, ...rise(p, 20) }}>
    <div style={{ width: 58, height: 58, borderRadius: 18, background: on > 0.5 ? H.b600 : H.b50, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, transform: `scale(${1 + 0.15 * Math.sin(Math.PI * on)})` }}>
      {on > 0.5 ? "✓" : ""}
    </div>
    {text}
  </div>
);

// "Admin pantau kursi terisi, pembayaran, sampai manifes penumpang buat sopir."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const phone = enterAt(frame, fps, 0, 0.45);
  const fill = between(frame, fps, L(M.terisi) - 0.1, L(M.terisi) + 0.7);
  const seats = Math.round((PAID + PENDING) * fill);
  const pay = between(frame, fps, L(M.pembayaran) - 0.05, L(M.pembayaran) + 0.5);
  const ring = between(frame, fps, L(M.pembayaran) - 0.05, L(M.pembayaran) + 0.2) * (1 - between(frame, fps, L(M.sampai) - 0.3, L(M.sampai) - 0.1));
  const revenue = Math.round(PAID * PRICE * pay);
  const slide = between(frame, fps, L(M.sampai) - 0.1, L(M.sampai) + 0.3);
  const tapCetak = L(M.sopir) - 0.25;
  const paper = enterAt(frame, fps, tapCetak + 0.25, 0.5);

  const c1 = enterAt(frame, fps, L(M.terisi) - 0.15, 0.35);
  const c2 = enterAt(frame, fps, L(M.pembayaran) - 0.1, 0.35);
  const c3 = enterAt(frame, fps, L(M.manifes) - 0.1, 0.35);

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 230, width: 900 }}>
        <Words text="Admin *pantau* semuanya" delay={L(M.admin) - 0.1} stagger={0.22} size={92} color={H.text} accent={H.b600} />
      </div>

      <div style={{ position: "absolute", left: 90, top: 560, display: "flex", flexDirection: "column", gap: 34 }}>
        <Check text="Kursi terisi" p={c1} on={between(frame, fps, L(M.terisi) + 0.1, L(M.terisi) + 0.35)} />
        <Check text="Pembayaran" p={c2} on={between(frame, fps, L(M.pembayaran) + 0.1, L(M.pembayaran) + 0.35)} />
        <Check text="Manifest" p={c3} on={between(frame, fps, L(M.manifes) + 0.2, L(M.manifes) + 0.45)} />
      </div>

      {/* kertas manifest tercetak untuk sopir */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 930,
          width: 400,
          borderRadius: 18,
          background: "white",
          border: `2px solid ${H.slate200}`,
          boxShadow: `0 24px 50px ${H.shadow}`,
          padding: "22px 24px",
          ...font,
          opacity: paper,
          transform: `translateY(${(1 - paper) * 60}px) rotate(${-4 * paper}deg)`,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.12em", color: H.b600 }}>MANIFEST</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>DPS → SBY · 08.00</div>
        {MANIFEST.slice(0, 5).map(([s, n]) => (
          <div key={s} style={{ display: "flex", gap: 14, fontSize: 20, marginTop: 8, color: H.slate700 }}>
            <b style={{ width: 30 }}>{s}</b>
            {n}
          </div>
        ))}
        <div style={{ fontSize: 18, color: H.muted, marginTop: 8 }}>…</div>
        <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 10, background: H.kuning, color: H.b950, borderRadius: 999, padding: "8px 18px", fontSize: 22, fontWeight: 800 }}>
          🚐 Untuk sopir
        </div>
      </div>

      <Phone x={770} y={1080} width={400} style={{ ...rise(phone, 60) }}>
        {/* Layar 1: dashboard */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-390 * slide}px)` }}>
          <div style={{ background: H.b950, color: "white", padding: "50px 18px 16px" }}>
            <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: "0.1em" }}>ADMIN HASTRANS</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Keberangkatan</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Sabtu, 14 November 2026</div>
          </div>
          <div style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Stat label="Pesanan aktif" value={String(Math.round(6 * fill))} />
            <Stat label="Kursi lunas" value={String(Math.round(PAID * fill))} ring={ring} />
            <Stat label="Kursi belum bayar" value={String(Math.round(PENDING * fill))} tone="amber" ring={ring} />
            <Stat label="Pendapatan (lunas)" value={rupiah(revenue)} ring={ring} />
          </div>
          <div style={{ margin: "4px 14px", borderRadius: 18, background: "white", padding: 16, border: `1px solid ${H.slate100}` }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Denpasar → Surabaya</div>
                <div style={{ fontSize: 13, color: H.muted }}>08.00 WITA</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: H.b700 }}>
                  {seats}
                  <span style={{ fontSize: 14, color: H.slate300 }}>/19</span>
                </div>
                <div style={{ fontSize: 11, color: H.muted }}>kursi terisi</div>
              </div>
            </div>
            <div style={{ marginTop: 10, height: 10, borderRadius: 9, background: H.slate100, display: "flex", overflow: "hidden" }}>
              <div style={{ width: `${(PAID / 19) * 100 * fill}%`, background: H.b600 }} />
              <div style={{ width: `${(PENDING / 19) * 100 * fill}%`, background: "#FBBF24" }} />
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 12, fontSize: 11.5, color: H.muted }}>
              <span>Lunas: {Math.round(PAID * fill)}</span>
              <span>Belum bayar: {Math.round(PENDING * fill)}</span>
              <span>Kosong: {19 - seats}</span>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, fontSize: 13, fontWeight: 600, color: H.b700 }}>
              <span style={{ background: H.b50, borderRadius: 8, padding: "6px 10px" }}>Pesanan (6)</span>
              <span style={{ background: H.b50, borderRadius: 8, padding: "6px 10px", boxShadow: slide > 0 || t > L(M.sampai) - 0.4 ? `0 0 0 2px ${H.kuning}` : undefined }}>Manifest</span>
              <span style={{ background: H.b50, borderRadius: 8, padding: "6px 10px" }}>+ Manual</span>
            </div>
          </div>
          <div style={{ margin: "12px 14px", borderRadius: 18, background: "white", padding: 16, border: `1px solid ${H.slate100}`, opacity: 0.85 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Denpasar → Jember</div>
            <div style={{ fontSize: 13, color: H.muted }}>09.00 WITA</div>
            <div style={{ marginTop: 10, height: 10, borderRadius: 9, background: H.slate100, overflow: "hidden" }}>
              <div style={{ width: `${(7 / 19) * 100 * fill}%`, height: "100%", background: H.b600 }} />
            </div>
          </div>
          <TapRipple x={170} y={588} p={between(frame, fps, L(M.sampai) - 0.4, L(M.sampai) + 0.05)} />
        </div>

        {/* Layar 2: manifest */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${390 * (1 - slide)}px)`, background: H.slate50 }}>
          <div style={{ background: H.b950, color: "white", padding: "50px 18px 16px" }}>
            <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: "0.1em" }}>MANIFEST PENUMPANG</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>Denpasar → Surabaya</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Sab, 14 Nov · 08.00 WITA · 12/19</div>
          </div>
          <div style={{ margin: 14, borderRadius: 16, background: "white", border: `1px solid ${H.slate100}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr", padding: "10px 12px", fontSize: 11, fontWeight: 700, color: H.muted, borderBottom: `1px solid ${H.slate200}` }}>
              <span>KURSI</span>
              <span>PENUMPANG</span>
              <span>JEMPUT</span>
            </div>
            {MANIFEST.map(([s, n, j], i) => (
              <div key={s} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr", padding: "10px 12px", fontSize: 13.5, borderBottom: `1px solid ${H.slate100}`, opacity: enterAt(frame, fps, L(M.sampai) + 0.2 + i * 0.07, 0.25) }}>
                <b>{s}</b>
                <span>{n}</span>
                <span style={{ color: H.muted }}>{j}</span>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 26, height: 52, borderRadius: 14, background: H.b600, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, transform: `scale(${1 - 0.05 * Math.sin(Math.PI * between(frame, fps, tapCetak, tapCetak + 0.25))})` }}>
            🖨 Cetak untuk sopir
          </div>
          <TapRipple x={195} y={792} p={between(frame, fps, tapCetak, tapCetak + 0.45)} />
        </div>
      </Phone>
    </Stage>
  );
};
