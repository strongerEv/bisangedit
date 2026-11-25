import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
// Template akun @mahirambilpeluang (dari video Senin).
import { Backdrop, C, Caption, Card, Character, Cross, head, img, rupiah, Stamp, Title } from "../../mahir-produk-digital/parts";
import { CAPTIONS, MARKERS as M, MUNCUL_PESAING, PAKET, PESAING, POSE_AT } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Chip: React.FC<{ at: number; children: React.ReactNode; tone?: "blue" | "soft" }> = ({ at, children, tone = "soft" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ display: "inline-block", opacity: p, transform: `scale(${0.6 + 0.4 * p})`, background: tone === "blue" ? C.blue : C.blueSoft, color: tone === "blue" ? "white" : C.blue, borderRadius: 999, padding: "10px 26px", ...head, fontSize: 38, margin: "0 8px" }}>{children}</div>
  );
};

const Label: React.FC<{ x: number; y: number; at: number; until?: number; color?: string; rot?: number; size?: number; children: React.ReactNode }> = ({ x, y, at, until = 99, color = C.blue, rot = -4, size = 38, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > until) return null;
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${0.5 + 0.5 * p})`, opacity: p, background: color, color: "white", borderRadius: 14, padding: "10px 24px", ...head, fontWeight: 800, fontSize: size, whiteSpace: "nowrap", boxShadow: `0 10px 24px ${C.shadow}` }}>
      {children}
    </div>
  );
};

/** Label harga kuning (bentuk tag). */
const Tag: React.FC<{ text: string; w?: number; h?: number; size?: number; color?: string; rot?: number }> = ({ text, w = 420, h = 180, size = 70, color = C.yellow, rot = 0 }) => (
  <div style={{ position: "relative", width: w, height: h, borderRadius: `24px ${h / 2}px ${h / 2}px 24px`, background: color, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${rot}deg)`, boxShadow: `0 16px 34px ${C.shadow}` }}>
    <div style={{ position: "absolute", right: h * 0.2, top: h / 2 - 16, width: 32, height: 32, borderRadius: 16, background: "white" }} />
    <span style={{ ...head, fontWeight: 800, fontSize: size, color: C.ink, marginRight: h * 0.3 }}>{text}</span>
  </div>
);

// garis harga: posisi x (skala log) untuk harga dalam ribu
const xOf = (k: number) => 150 + ((Math.log(k) - Math.log(15)) / (Math.log(180) - Math.log(15))) * 780;

export const S01: React.FC<{ dur: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);

  const geser = between(frame, fps, M.tengah + 0.1, M.tengah + 0.8);
  const markerK = Math.exp(Math.log(15) + (Math.log(49) - Math.log(15)) * geser);
  const pilih = between(frame, fps, M.pilih + 1.0, M.pilih + 1.3);
  const cursor = between(frame, fps, M.pilih + 0.2, M.pilih + 1.1);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== Hook: 3 trik harga ===== */}
        {t < M.satu - 0.15 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 300, textAlign: "center", ...head, fontWeight: 800, fontSize: 104, lineHeight: 1.0, color: C.ink, opacity: enterAt(frame, fps, 0.2, 0.3), transform: `scale(${0.8 + 0.2 * enterAt(frame, fps, 0.2, 0.3)})` }}>
              <span style={{ color: C.blue }}>3</span> TRIK
              <br />
              PASANG HARGA
            </div>
            <div style={{ position: "absolute", left: 330, top: 580, opacity: enterAt(frame, fps, 0.5, 0.3), transformOrigin: "0% 50%", transform: `rotate(${Math.sin(t * 4) * 6}deg)` }}>
              <Tag text={t >= M.laku ? rupiah(49000) : "Rp??"} />
            </div>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 850, textAlign: "center" }}>
              <Chip at={M.laku} tone="blue">✓ LANGSUNG LAKU</Chip>
            </div>
          </>
        ) : null}

        {/* ===== 1. Cek harga pesaing ===== */}
        <Title text="1 · Cek harga pesaing" at={M.satu} until={M.dua - 0.2} />
        <Card x={60} y={380} w={960} h={520} at={M.pesaing} until={M.kemurahan - 0.15}>
          <div style={{ position: "absolute", left: 40, top: 28, ...head, fontSize: 32, color: C.muted }}>🔍 template atur gaji — harga di pasaran</div>
          {/* garis */}
          <div style={{ position: "absolute", left: 110, right: 110, top: 380, height: 8, borderRadius: 4, background: C.soft }} />
          <div style={{ position: "absolute", left: 90, top: 410, ...head, fontSize: 26, color: C.muted }}>murah</div>
          <div style={{ position: "absolute", right: 90, top: 410, ...head, fontSize: 26, color: C.muted }}>mahal</div>
          {PESAING.map((k, i) => {
            const p = enterAt(frame, fps, MUNCUL_PESAING[i], 0.3);
            const mid = k === 49 && geser > 0.9;
            const coret = k === 19 ? between(frame, fps, M.jangan, M.jangan + 0.3) : 0;
            const x = xOf(k) - 60;
            return (
              <div key={k} style={{ position: "absolute", left: x - 30, top: 120 + (i % 2) * 110, width: 120, opacity: p, transform: `translateY(${(1 - p) * -30}px) scale(${mid ? 1.12 : 1})` }}>
                <div style={{ position: "relative", height: 90, borderRadius: 18, background: mid ? C.blue : "white", border: `3px solid ${mid ? C.blue : "#E1E4EA"}`, display: "flex", alignItems: "center", justifyContent: "center", ...head, fontWeight: 800, fontSize: 30, color: mid ? "white" : C.ink }}>
                  {k}rb
                  {coret > 0 ? (
                    <div style={{ position: "absolute", left: 15, top: 0, width: 90, height: 90 }}>
                      <Cross size={90} p={coret} />
                    </div>
                  ) : null}
                </div>
                <div style={{ width: 4, height: 260 - 120 - (i % 2) * 110 + 40, margin: "0 auto", background: mid ? C.blue : "#E1E4EA" }} />
              </div>
            );
          })}
          {/* penanda */}
          {t >= M.tengah ? (
            <div style={{ position: "absolute", left: xOf(markerK) - 30 - 60 + 30, top: 400, fontSize: 60, transform: "translateX(-20px)" }}>📍</div>
          ) : null}
        </Card>
        <Label x={540} y={960} at={M.tengah + 0.9} until={M.kemurahan - 0.15} color={C.blue} rot={-3}>
          AMBIL TENGAH ✓
        </Label>
        <Label x={300} y={820} at={M.jangan} until={M.kemurahan - 0.15} color={C.red} rot={-6} size={30}>
          ✗ jangan paling murah
        </Label>
        {/* kemurahan → dikira jelek */}
        {t >= M.kemurahan && t < M.dua - 0.2 ? (
          <>
            <div style={{ position: "absolute", left: 160, top: 470, opacity: enterAt(frame, fps, M.kemurahan, 0.3), transform: `scale(${0.7 + 0.3 * enterAt(frame, fps, M.kemurahan, 0.3)})` }}>
              <Tag text={rupiah(5000)} w={400} h={170} size={64} rot={-8} />
            </div>
            <div style={{ position: "absolute", left: 560, top: 380, width: 400, background: "white", borderRadius: "30px 30px 30px 6px", padding: "24px 28px", boxShadow: `0 16px 34px ${C.shadow}`, ...head, fontSize: 36, color: C.ink, lineHeight: 1.25, opacity: enterAt(frame, fps, M.kemurahan + 0.4, 0.3), transform: `translateY(${(1 - enterAt(frame, fps, M.kemurahan + 0.4, 0.3)) * 20}px)` }}>
              🤨 “Kok murah banget? <span style={{ color: C.red }}>Jelek kali ya…</span>”
            </div>
          </>
        ) : null}
        <Stamp x={540} y={900} at={M.jelek + 0.3} until={M.dua - 0.2} size={70}>
          MURAH ≠ LAKU
        </Stamp>

        {/* ===== 2. Angka sembilan ===== */}
        <Title text="2 · Angka sembilan" at={M.dua} until={M.tiga - 0.2} />
        {t >= M.h49 - 0.1 && t < M.tiga - 0.2 ? (
          <>
            {[
              { h: 49000, at: M.h49, x: 80, kesan: "kerasa 40-an 😌", c: C.blue },
              { h: 50000, at: M.h50 + 0.2, x: 580, kesan: "kerasa 50-an 😬", c: C.muted },
            ].map((v) => {
              const p = enterAt(frame, fps, v.at, 0.3);
              const k = enterAt(frame, fps, M.h50 + 1.3, 0.3);
              return (
                <div key={v.h} style={{ position: "absolute", left: v.x, top: 400, width: 420, height: 400, borderRadius: 30, background: "white", border: v.h === 49000 ? `4px solid ${C.blue}` : "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, opacity: p, transform: `scale(${(0.8 + 0.2 * p) * (v.h === 49000 ? 1 + 0.05 * k : 1)}) translateY(${v.h === 50000 ? 30 * k : 0}px)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
                  <div style={{ ...head, fontWeight: 800, fontSize: 74, color: v.h === 49000 ? C.blue : C.ink }}>{rupiah(v.h)}</div>
                  <div style={{ ...head, fontSize: 36, color: v.c, opacity: k }}>{v.kesan}</div>
                </div>
              );
            })}
            {t >= M.h50 + 0.2 ? <div style={{ position: "absolute", left: 540, top: 565, ...head, fontWeight: 800, fontSize: 50, color: C.muted, transform: "translateX(-50%)" }}>vs</div> : null}
          </>
        ) : null}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 880, textAlign: "center" }}>{t >= M.seribu && t < M.tiga - 0.2 ? <Chip at={M.seribu} tone="blue">padahal beda cuma Rp1.000</Chip> : null}</div>

        {/* ===== 3. Tiga paket ===== */}
        <Title text="3 · Bikin tiga paket" at={M.tiga} until={M.rekap[0] - 0.2} />
        {t >= M.basic - 0.1 && t < M.rekap[0] - 0.2
          ? PAKET.map((pk, i) => {
              const at = [M.basic, M.lengkap, M.premium][i];
              const p = enterAt(frame, fps, at, 0.3);
              const mid = i === 1;
              return (
                <div key={pk.n} style={{ position: "absolute", left: 60 + i * 330, top: mid ? 380 : 420, width: 300, height: mid ? 480 : 420, borderRadius: 30, background: mid && pilih > 0.5 ? C.blue : "white", border: mid ? `4px solid ${C.blue}` : "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, opacity: p * (mid ? 1 : 1 - 0.45 * pilih), transform: `translateY(${(1 - p) * 40}px) scale(${mid ? 1 + 0.05 * pilih : 1})`, padding: "34px 26px", boxSizing: "border-box", color: mid && pilih > 0.5 ? "white" : C.ink }}>
                  <div style={{ ...head, fontSize: 40 }}>{pk.n}</div>
                  <div style={{ ...head, fontWeight: 800, fontSize: 52, marginTop: 12, color: mid && pilih > 0.5 ? "white" : mid ? C.blue : C.ink }}>{rupiah(pk.h).replace(".000", "rb")}</div>
                  <div style={{ marginTop: 20 }}>
                    {pk.isi.map((s) => (
                      <div key={s} style={{ ...head, fontWeight: 600, fontSize: 26, lineHeight: "40px", opacity: 0.85 }}>✓ {s}</div>
                    ))}
                  </div>
                  {mid && pilih > 0.5 ? <div style={{ position: "absolute", left: "50%", top: -26, transform: `translateX(-50%) scale(${pilih})`, background: C.yellow, color: C.ink, borderRadius: 999, padding: "8px 22px", ...head, fontWeight: 800, fontSize: 26, whiteSpace: "nowrap" }}>⭐ PALING LARIS</div> : null}
                </div>
              );
            })
          : null}
        {t >= M.pilih + 0.2 && t < M.taruh ? (
          <div style={{ position: "absolute", left: interpolate(cursor, [0, 1], [860, 560]), top: interpolate(cursor, [0, 1], [930, 720]), fontSize: 70, transform: `scale(${t >= M.pilih + 1.1 && t < M.pilih + 1.3 ? 0.85 : 1})` }}>👆</div>
        ) : null}
        <Label x={540} y={950} at={M.taruh + 0.5} until={M.rekap[0] - 0.2} color={C.red} rot={-3}>
          PRODUK ANDALAN DI SINI
        </Label>

        {/* ===== Rangkuman ===== */}
        <Title text="Rangkuman" at={M.rekap[0]} until={M.besok - 0.2} />
        {t >= M.rekap[0] && t < M.besok - 0.2
          ? ["Cek harga pesaing", "Pakai angka 9", "Bikin 3 paket"].map((s, i) => {
              const p = enterAt(frame, fps, M.rekap[i], 0.3);
              return (
                <div key={s} style={{ position: "absolute", left: 170, width: 740, top: 420 + i * 150, height: 120, borderRadius: 26, background: "white", border: `3px solid ${C.blue}`, boxShadow: `0 14px 30px ${C.shadow}`, display: "flex", alignItems: "center", gap: 24, padding: "0 30px", boxSizing: "border-box", opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
                  <div style={{ width: 70, height: 70, borderRadius: 35, background: C.blue, color: "white", ...head, fontWeight: 800, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
                  <span style={{ ...head, fontSize: 46, color: C.ink }}>{s}</span>
                </div>
              );
            })
          : null}

        {/* ===== CTA: besok 3 kesalahan pemula ===== */}
        <Title text="Besok: 3 kesalahan pemula" at={M.besok} until={99} />
        <Card x={110} y={380} w={860} h={360} at={M.besok + 0.1} until={99}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 36 }}>
            {[0, 1, 2].map((i) => {
              const p = enterAt(frame, fps, M.kesalahan + i * 0.2, 0.3);
              return (
                <div key={i} style={{ width: 220, height: 240, borderRadius: 28, background: "#FFF1F1", border: `3px solid ${C.red}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, opacity: p, transform: `scale(${0.6 + 0.4 * p}) rotate(${Math.sin(t * 6 + i) * 3}deg)` }}>
                  <span style={{ fontSize: 100 }}>⚠️</span>
                  <span style={{ ...head, fontWeight: 800, fontSize: 44, color: C.red }}>#{i + 1}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card x={110} y={780} w={860} h={140} at={M.besok + 0.5} until={99}>
          <div style={{ position: "absolute", left: 28, top: 26, width: 86, height: 86, borderRadius: 43, overflow: "hidden", background: C.blueSoft }}>
            <Img src={img("pose-halo.png")} style={{ width: 150, marginLeft: -26, marginTop: -6 }} />
          </div>
          <div style={{ position: "absolute", left: 140, top: 44, ...head, fontSize: 38, color: C.ink }}>@mahirambilpeluang</div>
          <div style={{ position: "absolute", right: 28, top: 34, borderRadius: 16, padding: "14px 26px", ...head, fontSize: 32, background: t >= M.follow ? C.soft : C.blue, color: t >= M.follow ? C.muted : "white" }}>{t >= M.follow ? "Mengikuti ✓" : "Ikuti"}</div>
        </Card>

        <Caption captions={CAPTIONS} />
        <Character poses={POSE_AT} />
      </div>
    </div>
  );
};
