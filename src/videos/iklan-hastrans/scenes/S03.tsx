import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { BlueBand, H, Phone, rupiah, SeatMap, seatGeom, type SeatState, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);

export const TAKEN = [1, 2, 3, 6, 10, 13, 16];
const MAP_W = 300;
const MAP = { x: 45, y: 230 }; // posisi denah di layar HP (CSS)

const Field: React.FC<{ children: React.ReactNode; glow: number; style?: React.CSSProperties }> = ({ children, glow, style }) => (
  <div
    style={{
      height: 48,
      borderRadius: 12,
      background: `rgba(255,255,255,${0.15 + 0.15 * glow})`,
      border: `1px solid rgba(255,255,255,${0.2 + 0.6 * glow})`,
      boxShadow: glow > 0 ? `0 0 0 ${3 * glow}px rgba(255,211,77,${0.9 * glow})` : undefined,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 14px",
      fontSize: 15,
      fontWeight: 600,
      ...style,
    }}
  >
    {children}
  </div>
);

// "Pelanggan pilih rute dan tanggal, lalu pilih kursi langsung dari denah."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phone = enterAt(frame, fps, 0, 0.45);
  const glowRoute = between(frame, fps, L(M.pelanggan) + 0.35, L(M.pelanggan) + 0.6) * (1 - between(frame, fps, L(M.tanggal) - 0.2, L(M.tanggal)));
  const glowDate = between(frame, fps, L(M.tanggal) - 0.1, L(M.tanggal) + 0.1) * (1 - between(frame, fps, L(M.lalu) - 0.45, L(M.lalu) - 0.25));
  const tapCari = L(M.lalu) - 0.45;
  const slide = between(frame, fps, L(M.lalu) - 0.15, L(M.lalu) + 0.25);

  const pick8 = L(M.kursi) + 0.35;
  const pick9 = L(M.denah) - 0.15;
  const g = seatGeom(MAP_W);
  const c8 = g.center(8);
  const c9 = g.center(9);
  const sel = (n: number, at: number) => (frame / fps >= at ? 1 : 0);
  const state = (n: number): SeatState => (TAKEN.includes(n) ? "taken" : (n === 8 && sel(8, pick8)) || (n === 9 && sel(9, pick9)) ? "selected" : "free");
  const pop = (n: number) => (n === 8 ? between(frame, fps, pick8, pick8 + 0.3) : n === 9 ? between(frame, fps, pick9, pick9 + 0.3) : 0);
  const count = sel(8, pick8) + sel(9, pick9);

  const title1 = 1 - between(frame, fps, L(M.lalu) - 0.2, L(M.lalu) + 0.05);
  const title2 = enterAt(frame, fps, L(M.lalu) - 0.05, 0.4);

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", inset: 0, background: H.white }}>
        <div style={{ position: "absolute", right: -320, top: -280, width: 820, height: 820, borderRadius: 410, background: H.b50 }} />
      </div>
      <div style={{ position: "absolute", left: 90, top: 250, width: 900, opacity: title1 }}>
        <Words text="Pilih *rute* & *tanggal*" delay={L(M.pelanggan) - 0.1} stagger={0.22} size={92} color={H.text} accent={H.b600} />
      </div>
      <div style={{ position: "absolute", left: 90, top: 250, width: 900, opacity: title2 > 0.01 ? 1 : 0 }}>
        <Words text="Pilih *kursi* dari denah" delay={L(M.lalu) - 0.05} stagger={0.22} size={92} color={H.text} accent={H.b600} />
      </div>

      <Phone y={1085} width={440} style={{ ...rise(phone, 60) }}>
        {/* Layar 1: beranda + form cari */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-390 * slide}px)` }}>
          <BlueBand height={470}>
            <div style={{ position: "absolute", left: 18, top: 108, width: 354 }}>
              <div style={{ fontSize: 25, fontWeight: 800 }}>Mau pergi ke mana hari ini?</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>Travel ELF antar kota · pilih kursi sendiri · dijemput & diantar sampai alamat.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 34px 1fr", gap: 8, alignItems: "center", marginTop: 18 }}>
                <Field glow={glowRoute}>🚌 Denpasar</Field>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "white", color: H.b600, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>⇄</div>
                <Field glow={glowRoute}>🚌 Surabaya</Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 8, marginTop: 10 }}>
                <Field glow={glowDate}>📅 Sab, 14 Nov 2026</Field>
                <Field glow={0} style={{ justifyContent: "center" }}>
                  👤 − <b>2</b> +
                </Field>
              </div>
              <div style={{ marginTop: 10, height: 50, borderRadius: 12, background: "white", color: H.b700, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - 0.05 * Math.sin(Math.PI * between(frame, fps, tapCari, tapCari + 0.25))})` }}>
                🔍 Cari
              </div>
            </div>
          </BlueBand>
          <div style={{ padding: "22px 18px" }}>
            <div style={{ fontSize: 19, fontWeight: 800 }}>Rute & Harga</div>
            {[
              ["Denpasar → Surabaya", 250000, "±10 jam"],
              ["Denpasar → Jember", 200000, "±7 jam"],
            ].map(([r, p, d]) => (
              <div key={r as string} style={{ marginTop: 12, borderRadius: 16, background: "white", border: `1px solid ${H.slate100}`, padding: 14, boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{r}</div>
                <div style={{ fontSize: 12, color: H.muted }}>{d}</div>
                <div style={{ marginTop: 6, fontWeight: 800, fontSize: 18, color: H.b700 }}>{rupiah(p as number)}</div>
              </div>
            ))}
          </div>
          <TapRipple x={195} y={425} p={between(frame, fps, tapCari, tapCari + 0.45)} />
        </div>

        {/* Layar 2: pilih kursi */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${390 * (1 - slide)}px)`, background: H.slate50 }}>
          <div style={{ background: `linear-gradient(135deg, ${H.b600}, ${H.b800})`, color: "white", padding: "50px 18px 18px" }}>
            <div style={{ fontSize: 13, opacity: 0.85 }}>Sab, 14 Nov · 08.00 WITA</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Denpasar → Surabaya</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Pilih 2 kursi · 12 kursi tersedia</div>
          </div>
          <div style={{ position: "absolute", left: MAP.x, top: MAP.y }}>
            <SeatMap w={MAP_W} state={state} pop={pop} />
            <TapRipple x={c8.x} y={c8.y} p={between(frame, fps, pick8, pick8 + 0.45)} />
            <TapRipple x={c9.x} y={c9.y} p={between(frame, fps, pick9, pick9 + 0.45)} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 92, background: "white", borderTop: `1px solid ${H.slate200}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
            <div>
              <div style={{ fontSize: 12, color: H.muted }}>Kursi {count === 0 ? "-" : count === 1 ? "8" : "8, 9"}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: H.b700 }}>{rupiah(250000 * count)}</div>
            </div>
            <div style={{ borderRadius: 12, background: count === 2 ? H.b600 : H.slate300, color: "white", padding: "12px 22px", fontWeight: 700, fontSize: 15 }}>Lanjut</div>
          </div>
        </div>
      </Phone>
    </Stage>
  );
};

