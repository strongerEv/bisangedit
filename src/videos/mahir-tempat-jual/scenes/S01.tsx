import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
// Template akun @mahirambilpeluang (dari video Senin).
import { Backdrop, C, Caption, Card, Character, head, img, mono, rupiah, Stamp, Title } from "../../mahir-produk-digital/parts";
import { ALUR, BLOK, CAPTIONS, GLOBAL, LOKAL, MARKERS as M, POSE_AT } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const WARNA = ["#2457D6", "#E5484D", "#F5B700", "#2E8B57"];

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

/** Kartu nama platform (teks biasa + inisial berwarna, bukan logo resmi). */
const Platform: React.FC<{ name: string; i: number; at: number; x: number; y: number; w?: number; h?: number; small?: boolean; tag?: string; tagAt?: number }> = ({ name, i, at, x, y, w = 400, h = 150, small, tag, tagAt = 99 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const p = enterAt(frame, fps, at, 0.3);
  const hot = t >= at && t < at + 0.5 ? 1 + 0.06 * Math.sin(((t - at) / 0.5) * Math.PI) : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 26, background: "white", border: "2px solid #ECEEF3", boxShadow: `0 16px 34px ${C.shadow}`, opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${(0.85 + 0.15 * p) * hot})`, display: "flex", alignItems: "center", gap: small ? 14 : 22, padding: small ? "0 18px" : "0 28px", boxSizing: "border-box" }}>
      <div style={{ width: small ? 54 : 84, height: small ? 54 : 84, borderRadius: small ? 16 : 24, background: WARNA[i % 4], color: "white", ...head, fontWeight: 800, fontSize: small ? 30 : 46, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{name[0]}</div>
      <div style={{ ...head, fontWeight: 700, fontSize: small ? 32 : 46, color: C.ink, whiteSpace: "nowrap" }}>{name}</div>
      {tag && t >= tagAt ? <div style={{ position: "absolute", right: -10, top: -18, background: C.yellow, color: C.ink, borderRadius: 10, padding: "4px 12px", ...head, fontWeight: 800, fontSize: 22, transform: `rotate(6deg) scale(${enterAt(frame, fps, tagAt, 0.25)})` }}>{tag}</div> : null}
    </div>
  );
};

const GRID = [
  [100, 400],
  [580, 400],
  [100, 590],
  [580, 590],
] as const;

export const S01: React.FC<{ dur: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);

  const lokalAlur = t >= M.bayar - 0.15;
  const globalDunia = t >= M.dunia - 0.15;
  const tukar = between(frame, fps, M.dolar, M.dolar + 0.5);
  const hargaAcak = t < M.harga + 1.6 ? 10000 + (Math.floor(t * 12) % 9) * 11000 : 49000;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== Hook: 3 tempat jualan, jutaan rupiah, cukup dari HP ===== */}
        {t < M.satu - 0.15 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 300, textAlign: "center", ...head, fontWeight: 800, fontSize: 104, lineHeight: 1.0, color: C.ink, opacity: enterAt(frame, fps, 0.2, 0.3), transform: `scale(${0.8 + 0.2 * enterAt(frame, fps, 0.2, 0.3)})` }}>
              <span style={{ color: C.blue }}>3</span> TEMPAT
              <br />
              JUALAN
            </div>
            {["🇮🇩", "🌍", "🌐"].map((e, i) => {
              const p = enterAt(frame, fps, 0.6 + i * 0.25, 0.3);
              return (
                <div key={e} style={{ position: "absolute", left: 150 + i * 280, top: 560, width: 220, height: 220, borderRadius: 34, background: "white", border: "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 110, opacity: p, transform: `scale(${0.6 + 0.4 * p}) translateY(${Math.sin(t * 3 + i) * 6}px)` }}>
                  {e}
                </div>
              );
            })}
            <div style={{ position: "absolute", left: 0, width: 1080, top: 850, textAlign: "center" }}>
              <Chip at={M.jutaan} tone="blue">Rp JUTAAN</Chip>
              <Chip at={M.hp}>📱 CUKUP DARI HP</Chip>
            </div>
          </>
        ) : null}

        {/* ===== 1. Toko lokal ===== */}
        <Title text="1 · Toko lokal 🇮🇩" at={M.satu} until={M.dua - 0.2} />
        {t >= M.lokal && t < M.dua - 0.2 ? (
          !lokalAlur ? (
            LOKAL.map((n, i) => <Platform key={n} name={n} i={i} at={M.lokalApp[i]} x={GRID[i][0]} y={GRID[i][1]} />)
          ) : (
            <>
              <div style={{ position: "absolute", left: 60, right: 60, top: 350, display: "flex", justifyContent: "center", gap: 14 }}>
                {LOKAL.map((n, i) => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: "2px solid #ECEEF3", borderRadius: 999, padding: "8px 18px 8px 8px", ...head, fontSize: 28, color: C.ink, boxShadow: `0 8px 18px ${C.shadow}` }}>
                    <span style={{ width: 36, height: 36, borderRadius: 18, background: WARNA[i], color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>{n[0]}</span>
                    {n}
                  </div>
                ))}
              </div>
              {[
                { e: "🔗", s: "Klik link di bio" },
                { e: "🛍️", s: "Buka halaman toko" },
                { e: "💳", s: "Bayar QRIS / e-wallet ✓" },
                { e: "📩", s: "File terkirim otomatis" },
              ].map((st, i) => {
                const p = enterAt(frame, fps, ALUR[i], 0.3);
                const done = i === 3 ? p : t >= (ALUR[i + 1] ?? 99) ? 1 : 0;
                return (
                  <div key={st.s} style={{ position: "absolute", left: 170, width: 740, top: 450 + i * 128, height: 104, borderRadius: 24, background: done > 0.5 ? C.blueSoft : "white", border: `3px solid ${p > 0.5 ? C.blue : "#ECEEF3"}`, boxShadow: `0 12px 28px ${C.shadow}`, display: "flex", alignItems: "center", gap: 22, padding: "0 26px", boxSizing: "border-box", opacity: 0.35 + 0.65 * p, transform: `scale(${0.95 + 0.05 * p})` }}>
                    <div style={{ width: 66, height: 66, borderRadius: 18, background: p > 0.5 ? C.blue : C.soft, color: "white", fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center", ...head }}>{st.e}</div>
                    <span style={{ ...head, fontSize: 38, color: C.ink }}>{st.s}</span>
                    <span style={{ marginLeft: "auto", ...mono, fontSize: 26, color: C.muted }}>{i + 1}/4</span>
                  </div>
                );
              })}
            </>
          )
        ) : null}
        <Label x={540} y={985} at={M.indonesia + 0.2} until={M.dua - 0.2} color={C.red} rot={-3}>
          🇮🇩 COCOK BUAT PEMBELI INDONESIA
        </Label>

        {/* ===== 2. Platform global ===== */}
        <Title text="2 · Platform global 🌍" at={M.dua} until={M.tiga - 0.2} />
        {t >= M.global && t < M.tiga - 0.2 ? (
          !globalDunia ? (
            GLOBAL.map((n, i) => <Platform key={n} name={n} i={i} at={M.globalApp[i]} x={GRID[i][0]} y={GRID[i][1]} tag={n === "Etsy" ? "MARKETPLACE" : undefined} tagAt={M.globalApp[1] + 0.3} />)
          ) : (
            <>
              <div style={{ position: "absolute", left: 60, right: 60, top: 350, display: "flex", justifyContent: "center", gap: 14 }}>
                {GLOBAL.map((n, i) => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: "2px solid #ECEEF3", borderRadius: 999, padding: "8px 18px 8px 8px", ...head, fontSize: 28, color: C.ink, boxShadow: `0 8px 18px ${C.shadow}` }}>
                    <span style={{ width: 36, height: 36, borderRadius: 18, background: WARNA[i], color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>{n[0]}</span>
                    {n}
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", left: 0, width: 1080, top: 440, textAlign: "center", fontSize: 230, opacity: enterAt(frame, fps, M.dunia - 0.15, 0.35), transform: `rotate(${Math.sin(t * 1.5) * 8}deg)` }}>🌍</div>
              {[0, 1, 2, 3, 4].map((i) => {
                const a = t * 1.2 + (i * Math.PI * 2) / 5;
                return (
                  <div key={i} style={{ position: "absolute", left: 540 + Math.cos(a) * 300 - 30, top: 580 + Math.sin(a) * 120 - 30, fontSize: 52, opacity: enterAt(frame, fps, M.dunia + i * 0.12, 0.3) }}>
                    🛒
                  </div>
                );
              })}
              {t >= M.dolar ? (
                <div style={{ position: "absolute", left: 0, width: 1080, top: 790, display: "flex", justifyContent: "center", alignItems: "center", gap: 30, ...head, fontWeight: 800, fontSize: 76 }}>
                  <span style={{ color: C.muted, opacity: 1 - 0.6 * tukar, textDecoration: tukar > 0.5 ? "line-through" : undefined }}>Rp</span>
                  <span style={{ color: C.muted, fontSize: 60 }}>→</span>
                  <span style={{ color: "#2E8B57", transform: `scale(${0.5 + 0.5 * tukar})`, opacity: tukar }}>$ dolar</span>
                </div>
              ) : null}
            </>
          )
        ) : null}
        <Label x={540} y={985} at={M.inggris + 0.5} until={M.tiga - 0.2} color={C.red} rot={-3}>
          🇬🇧 SYARAT: PRODUK BAHASA INGGRIS
        </Label>

        {/* ===== 3. Website sendiri ===== */}
        <Title text="3 · Website sendiri 🌐" at={M.tiga} until={M.mulai - 0.2} />
        {t >= M.potongan && t < M.mulai - 0.2 ? (
          <div style={{ position: "absolute", left: 120, top: 360, width: 840, height: 600, borderRadius: 28, background: "white", border: "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, overflow: "hidden", opacity: enterAt(frame, fps, M.website, 0.3), transform: `translateY(${(1 - enterAt(frame, fps, M.website, 0.3)) * 40}px)` }}>
            <div style={{ height: 70, background: C.soft, display: "flex", alignItems: "center", gap: 10, padding: "0 22px" }}>
              {[C.red, C.yellow, "#2E8B57"].map((c) => (
                <span key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />
              ))}
              <div style={{ marginLeft: 16, flex: 1, height: 40, borderRadius: 20, background: "white", display: "flex", alignItems: "center", padding: "0 18px", ...mono, fontSize: 26, color: C.ink }}>🔒 tokokamu.com</div>
              {t >= M.ai ? <div style={{ ...head, fontSize: 24, color: "white", background: C.blue, borderRadius: 999, padding: "6px 14px" }}>✦ dibantu AI</div> : null}
            </div>
            <div style={{ position: "relative", padding: 28 }}>
              <div style={{ height: 70, borderRadius: 16, background: C.blue, color: "white", display: "flex", alignItems: "center", padding: "0 24px", ...head, fontWeight: 800, fontSize: 38, opacity: enterAt(frame, fps, BLOK[0], 0.25) }}>💰 Template Atur Gaji</div>
              <div style={{ display: "flex", gap: 24, marginTop: 22 }}>
                <div style={{ width: 300, height: 220, borderRadius: 18, background: `linear-gradient(160deg, ${C.blue}, #163A9C)`, opacity: enterAt(frame, fps, BLOK[1], 0.25), transform: `scale(${0.8 + 0.2 * enterAt(frame, fps, BLOK[1], 0.25)})`, display: "flex", alignItems: "flex-end", gap: 8, padding: 22, boxSizing: "border-box" }}>
                  {[C.red, C.yellow, "#2E8B57", "#9DB8FF"].map((c, i) => (
                    <div key={c} style={{ flex: 1, height: 50 + i * 26, borderRadius: 6, background: c }} />
                  ))}
                </div>
                <div style={{ flex: 1, opacity: enterAt(frame, fps, BLOK[2], 0.25) }}>
                  <div style={{ ...head, fontSize: 32, color: C.ink, lineHeight: 1.2 }}>Bagi gaji otomatis, tinggal isi.</div>
                  <div style={{ ...head, fontWeight: 800, fontSize: 52, color: C.red, marginTop: 14 }}>{rupiah(49000)}</div>
                  <div style={{ marginTop: 16, height: 74, borderRadius: 18, background: t >= M.transfer ? "#2E8B57" : C.ink, color: "white", display: "flex", alignItems: "center", justifyContent: "center", ...head, fontWeight: 800, fontSize: 36, opacity: enterAt(frame, fps, BLOK[3], 0.25) }}>{t >= M.transfer ? "Dibayar ✓" : "Beli sekarang"}</div>
                </div>
              </div>
              <div style={{ marginTop: 22, display: "flex", gap: 16, opacity: enterAt(frame, fps, BLOK[3], 0.25) }}>
                {["Transfer bank", "Kirim bukti", "File dikirim"].map((s) => (
                  <div key={s} style={{ flex: 1, height: 60, borderRadius: 14, background: C.soft, ...head, fontWeight: 600, fontSize: 26, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        {/* notifikasi transfer & file terkirim */}
        {t >= M.transfer + 0.3 && t < M.mulai - 0.2
          ? [
              { at: M.transfer + 0.3, e: "🏦", s: `Transfer masuk ${rupiah(49000)} ✓` },
              { at: M.kirim + 0.3, e: "📩", s: "File terkirim ke pembeli" },
            ].map((n, i) => {
              if (t < n.at) return null;
              const p = enterAt(frame, fps, n.at, 0.3);
              return (
                <div key={n.s} style={{ position: "absolute", left: 160, width: 760, top: 60 + i * 96, height: 84, borderRadius: 22, background: "rgba(255,255,255,0.97)", boxShadow: `0 14px 32px rgba(20,30,60,0.2)`, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", boxSizing: "border-box", ...head, fontSize: 32, color: C.ink, opacity: p, transform: `translateY(${(1 - p) * -40}px)` }}>
                  <span style={{ fontSize: 40 }}>{n.e}</span>
                  {n.s}
                </div>
              );
            })
          : null}
        <Stamp x={540} y={960} at={M.nol + 0.3} until={M.mulai - 0.2} size={64}>
          POTONGAN 0%
        </Stamp>
        <Label x={820} y={860} at={M.pro + 0.8} until={M.mulai - 0.2} color={C.blue} rot={5} size={34}>
          ✨ LEBIH PROFESIONAL
        </Label>

        {/* ===== Mulai dari satu ===== */}
        <Title text="Mulai dari satu" at={M.mulai} until={M.besok - 0.2} />
        {t >= M.mulai && t < M.besok - 0.2
          ? [
              { e: "🇮🇩", s: "Toko lokal" },
              { e: "🌍", s: "Platform global" },
              { e: "🌐", s: "Website sendiri" },
            ].map((c, i) => {
              const p = enterAt(frame, fps, M.mulai + i * 0.15, 0.3);
              const chosen = i === 0;
              const pick = between(frame, fps, M.cocok + 0.4, M.cocok + 0.7);
              return (
                <div key={c.s} style={{ position: "absolute", left: 100 + i * 300, top: 470, width: 280, height: 320, borderRadius: 30, background: "white", border: chosen && pick > 0.5 ? `4px solid ${C.blue}` : "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, opacity: p * (chosen ? 1 : 1 - 0.55 * pick), transform: `scale(${(0.8 + 0.2 * p) * (chosen ? 1 + 0.08 * pick : 1)})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <span style={{ fontSize: 110 }}>{c.e}</span>
                  <div style={{ ...head, fontSize: 32, color: C.ink, textAlign: "center" }}>{c.s}</div>
                  {chosen && pick > 0.5 ? <div style={{ position: "absolute", right: -14, top: -14, width: 56, height: 56, borderRadius: 28, background: C.blue, color: "white", ...head, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div> : null}
                </div>
              );
            })
          : null}

        {/* ===== CTA: besok pasang harga ===== */}
        <Title text="Besok: pasang harga" at={M.besok} until={99} />
        <Card x={110} y={380} w={860} h={360} at={M.besok + 0.1} until={99}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
            <div style={{ position: "relative", width: 420, height: 200, borderRadius: "30px 100px 100px 30px", background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${-6 + Math.sin(t * 3) * 3}deg)`, boxShadow: `0 16px 34px ${C.shadow}` }}>
              <div style={{ position: "absolute", right: 34, top: 82, width: 36, height: 36, borderRadius: 18, background: "white" }} />
              <span style={{ ...head, fontWeight: 800, fontSize: 70, color: C.ink, marginRight: 50 }}>{t >= M.harga ? rupiah(hargaAcak) : "Rp??"}</span>
            </div>
            <span style={{ ...head, fontWeight: 800, fontSize: 120, color: C.blue }}>?</span>
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
