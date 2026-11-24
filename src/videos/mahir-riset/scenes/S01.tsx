import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
// Template akun @mahirambilpeluang (dari video Senin).
import { Backdrop, C, Caption, Card, Character, head, img, mono, rupiah, Stamp, Title } from "../../mahir-produk-digital/parts";
import { CAPTIONS, KETIK, KOMENTAR, MARKERS as M, MIRIP, MUNCUL_SARAN, POSE_AT, SARAN, STABILO } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Search: React.FC<{ s: number; c?: string }> = ({ s, c = C.blue }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round">
    <circle cx={10.5} cy={10.5} r={6.5} />
    <path d="M15.5 15.5L21 21" />
  </svg>
);

const Chip: React.FC<{ at: number; children: React.ReactNode; tone?: "blue" | "soft" | "red" }> = ({ at, children, tone = "soft" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enterAt(frame, fps, at, 0.3);
  const bg = tone === "blue" ? C.blue : tone === "red" ? C.red : C.blueSoft;
  return (
    <div style={{ display: "inline-block", opacity: p, transform: `scale(${0.6 + 0.4 * p})`, background: bg, color: tone === "soft" ? C.blue : "white", borderRadius: 999, padding: "10px 26px", ...head, fontSize: 38, margin: "0 8px" }}>{children}</div>
  );
};

/** Label kecil miring ala sticker. */
const Label: React.FC<{ x: number; y: number; at: number; until?: number; color?: string; rot?: number; children: React.ReactNode }> = ({ x, y, at, until = 99, color = C.blue, rot = -4, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > until) return null;
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${0.5 + 0.5 * p})`, opacity: p, background: color, color: "white", borderRadius: 14, padding: "10px 24px", ...head, fontWeight: 800, fontSize: 36, whiteSpace: "nowrap", boxShadow: `0 10px 24px ${C.shadow}` }}>
      {children}
    </div>
  );
};

export const S01: React.FC<{ dur: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);

  // Hook
  const prog = interpolate(t, [0.3, 1.6], [0, 1], clamp);
  const hari = Math.max(1, Math.round(prog * 14));
  const shake = t >= M.nol && t < M.nol + 0.5 ? Math.sin(t * 70) * 12 : 0;
  // Pencarian
  const typed = KETIK.slice(0, Math.max(0, Math.floor((t - M.ketik - 0.1) / 0.08) + 1));
  const top = between(frame, fps, M.dicari, M.dicari + 0.3);
  // Komentar
  const scroll = interpolate(t, [M.kolom2 + 0.2, M.kolom2 + 1.0], [80, 0], clamp);
  const hitung = Math.round(interpolate(t, [STABILO[3] + 0.3, STABILO[3] + 1.1], [4, 37], clamp));
  // Marketplace
  const terjual = Math.round(interpolate(t, [M.laku + 0.2, M.laku + 1.0], [0, 1000], clamp));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== Hook: 2 minggu bikin → penjualan 0 ===== */}
        <Card x={140} y={330} w={800} h={250} at={0.3} until={M.janji - 0.15}>
          <div style={{ position: "absolute", left: 36, top: 30, right: 36, display: "flex", ...head, fontSize: 40, color: C.ink }}>
            <span>Bikin produk…</span>
            <span style={{ marginLeft: "auto", ...mono, fontSize: 30, color: C.muted, paddingTop: 8 }}>HARI {hari}/14</span>
          </div>
          <div style={{ position: "absolute", left: 36, right: 36, top: 110, height: 44, borderRadius: 22, background: C.soft, overflow: "hidden" }}>
            <div style={{ width: `${prog * 100}%`, height: "100%", borderRadius: 22, background: C.blue }} />
          </div>
          <div style={{ position: "absolute", left: 36, top: 172, ...head, fontSize: 36, color: prog >= 1 ? C.blue : C.muted }}>{prog >= 1 ? "100% ✓ Selesai!" : `${Math.round(prog * 100)}%`}</div>
        </Card>
        <Card x={190} y={630} w={700} h={230} at={M.beli} until={M.janji - 0.15} style={{ transform: `translateX(${shake}px)` }}>
          <div style={{ position: "absolute", left: 34, top: 30, ...mono, fontSize: 26, letterSpacing: "0.15em", color: C.muted }}>PENJUALAN</div>
          <div style={{ position: "absolute", left: 34, top: 70, ...head, fontWeight: 800, fontSize: 120, lineHeight: 1, color: t >= M.nol ? C.red : "#D5D9E0" }}>{t >= M.nol ? "0" : "…"}</div>
          <div style={{ position: "absolute", right: 34, top: 90, ...head, fontSize: 34, color: C.muted, opacity: t >= M.nol ? 1 : 0 }}>yang beli</div>
        </Card>
        <Label x={800} y={600} at={M.bukan} until={M.janji - 0.15} rot={6}>
          produk ✓ oke
        </Label>
        <Stamp x={540} y={950} at={M.riset + 0.5} until={M.janji - 0.15} size={66}>
          NGGAK RISET
        </Stamp>

        {/* ===== Janji: 3 cara, 5 menit, pakai HP ===== */}
        <Title text="3 cara riset" at={M.janji} until={M.satu - 0.2} />
        {t >= M.janji && t < M.satu - 0.2 ? (
          <>
            <div style={{ position: "absolute", left: 390, top: 370, width: 300, height: 520, borderRadius: 44, border: `10px solid ${C.ink}`, background: "white", boxShadow: `0 18px 40px ${C.shadow}`, opacity: enterAt(frame, fps, M.janji, 0.35), transform: `translateY(${(1 - enterAt(frame, fps, M.janji, 0.35)) * 60}px) rotate(${Math.sin(t * 3) * 2}deg)`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 100, top: 14, width: 80, height: 14, borderRadius: 7, background: C.ink }} />
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ position: "absolute", left: 26, right: 26, top: 80 + i * 130, height: 100, borderRadius: 20, background: i === 0 ? C.blue : C.blueSoft, opacity: enterAt(frame, fps, M.janji + 0.3 + i * 0.15, 0.25), display: "flex", alignItems: "center", justifyContent: "center", ...head, fontSize: 48, color: i === 0 ? "white" : C.blue }}>
                  {["①", "②", "③"][i]}
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 930, textAlign: "center" }}>
              <Chip at={M.janji + 0.3} tone="blue">3 CARA</Chip>
              <Chip at={M.menit}>5 MENIT</Chip>
              <Chip at={M.hp}>PAKAI HP</Chip>
            </div>
          </>
        ) : null}

        {/* ===== 1. Kolom pencarian ===== */}
        <Title text="1 · Kolom pencarian" at={M.satu} until={M.dua - 0.2} />
        <Card x={110} y={380} w={860} h={560} at={M.kolom1} until={M.dua - 0.2}>
          <div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 90, borderRadius: 45, background: C.soft, border: t >= M.ketik ? `3px solid ${C.blue}` : "3px solid transparent", display: "flex", alignItems: "center", gap: 18, padding: "0 28px", ...head, fontWeight: 600, fontSize: 40, color: C.ink }}>
            <Search s={46} />
            <span>{t >= M.ketik ? typed : <span style={{ color: C.muted }}>Cari</span>}</span>
            {t >= M.ketik && Math.floor(t * 3) % 2 === 0 ? <span style={{ width: 3, height: 44, background: C.blue }} /> : null}
          </div>
          {SARAN.map((s, i) => {
            const p = enterAt(frame, fps, MUNCUL_SARAN[i], 0.25);
            const hot = i === 0 && top > 0;
            return (
              <div key={s} style={{ position: "absolute", left: 30, right: 30, top: 150 + i * 110, height: 92, borderRadius: 20, display: "flex", alignItems: "center", gap: 20, padding: "0 26px", background: hot ? C.blueSoft : "white", border: hot ? `3px solid ${C.blue}` : `2px solid ${C.soft}`, opacity: p, transform: `translateY(${(1 - p) * 20}px) scale(${hot ? 1 + 0.04 * top : 1})`, ...head, fontWeight: 600, fontSize: 38, color: C.ink }}>
                <Search s={34} c={C.muted} />
                <span>
                  <b style={{ color: C.blue }}>{KETIK}</b>
                  {s.slice(KETIK.length)}
                </span>
                {hot ? <span style={{ marginLeft: "auto", fontSize: 40 }}>🔥</span> : null}
              </div>
            );
          })}
        </Card>
        <Label x={700} y={890} at={M.dicari} until={M.dua - 0.2} color={C.red} rot={5}>
          PALING DICARI
        </Label>

        {/* ===== 2. Kolom komentar ===== */}
        <Title text="2 · Kolom komentar" at={M.dua} until={M.tiga - 0.2} />
        <Card x={110} y={360} w={860} h={560} at={M.kolom2} until={M.tiga - 0.2} style={{ overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 30, top: 22, ...head, fontSize: 30, color: C.muted }}>💬 1.284 komentar</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 78 + scroll }}>
            {KOMENTAR.map((k, i) => {
              const mi = MIRIP.indexOf(i);
              const hl = mi >= 0 ? between(frame, fps, STABILO[mi], STABILO[mi] + 0.25) : 0;
              const dim = t >= M.masalah && mi < 0;
              return (
                <div key={k.u} style={{ position: "absolute", left: 30, right: 30, top: i * 96, height: 90, display: "flex", alignItems: "center", gap: 18, opacity: dim ? 0.35 : 1 }}>
                  <div style={{ width: 62, height: 62, borderRadius: 31, background: ["#FFD6A5", "#CDEAC0", "#FFC6D9", "#C9DBFF", "#E3D1FF"][i], flexShrink: 0 }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ ...head, fontWeight: 600, fontSize: 24, color: C.muted }}>{k.u}</div>
                    <div style={{ position: "relative", ...head, fontWeight: 600, fontSize: 32, color: C.ink, whiteSpace: "nowrap" }}>
                      <div style={{ position: "absolute", left: -6, top: 6, bottom: 2, width: `calc(${hl * 100}% + 12px)`, background: "rgba(245,183,0,0.45)", borderRadius: 6 }} />
                      <span style={{ position: "relative" }}>{k.t}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        {t >= STABILO[3] + 0.3 && t < M.tiga - 0.2 ? (
          <div style={{ position: "absolute", right: 70, top: 330, width: 170, height: 170, borderRadius: 85, background: C.yellow, color: C.ink, ...head, fontWeight: 800, fontSize: 64, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 14px 30px ${C.shadow}`, transform: `scale(${enterAt(frame, fps, STABILO[3] + 0.3, 0.3)}) rotate(8deg)` }}>×{hitung}</div>
        ) : null}
        <Stamp x={540} y={975} at={M.masalah + 0.6} until={M.tiga - 0.2} size={56} color={C.blue}>
          MASALAH = PELUANG
        </Stamp>

        {/* ===== 3. Marketplace ===== */}
        <Title text="3 · Cek marketplace" at={M.tiga} until={M.cta - 0.2} />
        <Card x={170} y={370} w={740} h={520} at={M.market + 0.2} until={M.cta - 0.2}>
          <div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 250, borderRadius: 20, background: C.blueSoft, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 150, height: 190, borderRadius: 14, background: "white", boxShadow: `0 8px 18px ${C.shadow}`, transform: `rotate(${(i - 1) * 6}deg) translateY(${i === 1 ? -10 : 0}px)`, padding: 16, boxSizing: "border-box" }}>
                <div style={{ height: 16, width: "70%", borderRadius: 8, background: C.blue, marginBottom: 14 }} />
                {[0, 1, 2, 3].map((r) => (
                  <div key={r} style={{ height: 10, borderRadius: 5, background: C.soft, marginBottom: 12, width: `${90 - r * 12}%` }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 34, top: 300, ...head, fontSize: 40, color: C.ink }}>Template Atur Gaji Otomatis</div>
          <div style={{ position: "absolute", left: 34, top: 360, ...head, fontWeight: 800, fontSize: 46, color: C.red }}>{rupiah(49000)}</div>
          <div style={{ position: "absolute", left: 34, top: 430, display: "flex", gap: 30, ...head, fontWeight: 600, fontSize: 34, color: C.ink }}>
            <span>
              <span style={{ color: C.yellow }}>★</span> 4,9
            </span>
            <span style={{ color: t >= M.laku ? C.ink : C.muted }}>{terjual >= 1000 ? "1rb+" : terjual} terjual</span>
          </div>
        </Card>
        <Label x={540} y={940} at={M.pasar + 0.4} until={M.cta - 0.2} color={C.blue} rot={-3}>
          BUKAN SAINGAN = BUKTI PASAR
        </Label>

        {/* ===== CTA: besok bikin pakai AI ===== */}
        <Title text="Besok: bikin pakai AI" at={M.cta} until={99} />
        <Card x={110} y={380} w={860} h={360} at={M.cta + 0.2} until={99}>
          <div style={{ position: "absolute", left: 30, top: 26, display: "flex", alignItems: "center", gap: 12, ...head, fontSize: 32, color: C.ink }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: C.blue, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, transform: `rotate(${t * 90}deg)` }}>✦</div>
            Asisten AI
          </div>
          {["Riset ✓", "Isi produk ✓", "Desain ✓"].map((s, i) => {
            const p = enterAt(frame, fps, M.cta + 0.6 + i * 0.3, 0.3);
            return (
              <div key={s} style={{ position: "absolute", left: 30 + i * 270, top: 130, width: 250, height: 180, borderRadius: 22, background: i === 2 && t >= M.cta + 1.2 ? C.blue : C.blueSoft, color: i === 2 && t >= M.cta + 1.2 ? "white" : C.blue, opacity: p, transform: `scale(${0.7 + 0.3 * p})`, display: "flex", alignItems: "center", justifyContent: "center", ...head, fontSize: 36 }}>
                {s}
              </div>
            );
          })}
        </Card>
        <Card x={110} y={780} w={860} h={140} at={M.cta + 0.6} until={99}>
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
