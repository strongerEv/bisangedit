import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
// Template akun @mahirambilpeluang (dari video Senin).
import { Backdrop, C, Caption, Card, Character, head, img, mono, rupiah, Stamp, Title } from "../../mahir-produk-digital/parts";
import { BALIK, BARIS_GAJI, CAPTIONS, ISI_GAJI, KARTU, MARKERS as M, POSE_AT } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- ikon ----------
const Heart: React.FC<{ s: number; c?: string }> = ({ s, c = C.red }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
    <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.3 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.7 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21z" />
  </svg>
);
const Coin: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={10} fill={C.yellow} />
    <circle cx={12} cy={12} r={7.5} fill="none" stroke="#C99400" strokeWidth={1.5} />
    <text x={12} y={16.2} textAnchor="middle" fontSize={10} fontWeight={800} fill="#8A6400" fontFamily="sans-serif">
      Rp
    </text>
  </svg>
);
const People: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={C.blue}>
    <circle cx={8} cy={8} r={3.2} />
    <circle cx={16} cy={8} r={3.2} />
    <path d="M2 20c0-3.6 2.7-6 6-6s6 2.4 6 6zM10 20c0-3.6 2.7-6 6-6s6 2.4 6 6z" opacity={0.85} />
  </svg>
);
const Tree: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <path d="M12 2l5 7h-3l4 6h-4l3 5H7l3-5H6l4-6H7z" fill="#2E8B57" />
    <rect x={11} y={20} width={2} height={3} fill="#7A5A3A" />
  </svg>
);
const Search: React.FC<{ s: number; c?: string }> = ({ s, c = C.blue }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round">
    <circle cx={10.5} cy={10.5} r={6.5} />
    <path d="M15.5 15.5L21 21" />
  </svg>
);

/** Kotak misteri "?" yang terbuka menjadi ikon. */
const Mystery: React.FC<{ x: number; y: number; at: number; openAt?: number; children?: React.ReactNode }> = ({ x, y, at, openAt = 99, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const p = enterAt(frame, fps, at, 0.35);
  const o = between(frame, fps, openAt, openAt + 0.3);
  if (p <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x - 110, top: y - 110, width: 220, height: 220, borderRadius: 34, background: o > 0.5 ? "white" : C.blue, border: o > 0.5 ? "3px solid #ECEEF3" : "none", boxShadow: `0 18px 40px ${C.shadow}`, transform: `scale(${(0.6 + 0.4 * p) * (1 + 0.08 * Math.sin(Math.PI * o))}) rotate(${o > 0.5 ? 0 : Math.sin(t * 5 + x) * 3}deg)`, opacity: p, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {o > 0.5 ? children : <span style={{ ...head, fontWeight: 800, fontSize: 130, color: "white" }}>?</span>}
    </div>
  );
};

const Chip: React.FC<{ at: number; children: React.ReactNode; tone?: "blue" | "soft" }> = ({ at, children, tone = "soft" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ display: "inline-block", opacity: p, transform: `scale(${0.6 + 0.4 * p})`, background: tone === "blue" ? C.blue : C.blueSoft, color: tone === "blue" ? "white" : C.blue, borderRadius: 999, padding: "10px 26px", ...head, fontSize: 38, margin: "0 8px" }}>{children}</div>
  );
};

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const shake = t >= M.bokek && t < M.bokek + 0.6 ? Math.sin(t * 60) * 10 : 0;
  const days = Math.round(interpolate(t, [M.produk1 + 0.5, M.produk1 + 2.5], [0, 30], clamp));
  const prompt = "Buatkan program olahraga 30 hari untuk pemula di rumah";
  const typed = prompt.slice(0, Math.max(0, Math.floor((t - M.ai - 0.1) * 40)));
  const reply = enterAt(frame, fps, M.ai + 1.5, 0.4);
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== Hook: 3 kotak misteri + dompet bokek ===== */}
        {t < M.kunci - 0.15 ? (
          <>
            <Mystery x={220} y={520} at={0.5} />
            <Mystery x={540} y={520} at={0.75} />
            <Mystery x={860} y={520} at={1.0} />
            <Card x={290} y={720} w={500} h={190} at={M.bokek - 0.2} until={M.kunci - 0.15} style={{ transform: `translateX(${shake}px)` }}>
              <div style={{ position: "absolute", left: 34, top: 40, width: 110, height: 110, borderRadius: 22, background: "#8A5A3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 70, height: 46, borderRadius: 8, border: "5px solid #F0D9B5" }} />
              </div>
              <div style={{ position: "absolute", left: 170, top: 36, ...mono, fontSize: 24, letterSpacing: "0.15em", color: C.muted }}>DOMPET</div>
              <div style={{ position: "absolute", left: 170, top: 72, ...head, fontWeight: 800, fontSize: 80, color: C.red }}>Rp0</div>
            </Card>
          </>
        ) : null}

        {/* ===== Kunci: NICHE → PRODUK, nggak pernah mati ===== */}
        <Title text="Kuncinya" at={M.kunci} until={M.sehat - 0.2} />
        <Card x={110} y={400} w={860} h={240} at={M.kunci} until={M.sehat - 0.2}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 34 }}>
            <div style={{ ...head, fontSize: 56, color: "white", background: t >= M.nicheNya ? C.blue : C.muted, borderRadius: 20, padding: "18px 34px", transform: `scale(${t >= M.nicheNya && t < M.nicheNya + 0.3 ? 1.1 : 1})` }}>① NICHE</div>
            <div style={{ ...head, fontSize: 70, color: C.muted }}>→</div>
            <div style={{ ...head, fontSize: 56, color: C.ink, background: C.soft, borderRadius: 20, padding: "18px 34px" }}>② PRODUK</div>
          </div>
        </Card>
        {t >= M.abadi && t < M.sehat - 0.2 ? (
          <div style={{ position: "absolute", left: 140, top: 700, opacity: enterAt(frame, fps, M.abadi, 0.3) }}>
            <Tree s={150} />
          </div>
        ) : null}
        <Stamp x={600} y={790} at={M.abadi} until={M.sehat - 0.2} size={58}>
          NGGAK PERNAH MATI
        </Stamp>

        {/* ===== 1. Kesehatan ===== */}
        <Title text="1 · Kesehatan" at={M.sehat} until={M.kaya - 0.2} />
        {t >= M.sehat && t < M.kaya - 0.2 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 350, textAlign: "center", opacity: enterAt(frame, fps, M.sehat, 0.3), transform: `scale(${1 + 0.06 * Math.sin(t * 7)})` }}>
              <Heart s={130} />
            </div>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 510, textAlign: "center" }}>
              <Chip at={M.chip1[0]}>sehat</Chip>
              <Chip at={M.chip1[1]}>langsing</Chip>
              <Chip at={M.chip1[2]}>tidur nyenyak</Chip>
            </div>
          </>
        ) : null}
        <Card x={170} y={610} w={740} h={330} at={M.produk1} until={M.kaya - 0.2}>
          <div style={{ position: "absolute", left: 34, top: 26, ...head, fontSize: 38, color: C.ink }}>Program Olahraga 30 Hari</div>
          <div style={{ position: "absolute", left: 34, top: 84, display: "grid", gridTemplateColumns: "repeat(10, 58px)", gap: 8 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} style={{ width: 58, height: 58, borderRadius: 12, background: i < days ? C.blue : C.soft, color: i < days ? "white" : C.muted, ...head, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i < days ? "✓" : i + 1}
              </div>
            ))}
          </div>
        </Card>

        {/* ===== 2. Kekayaan ===== */}
        <Title text="2 · Kekayaan" at={M.kaya} until={M.hubungan - 0.2} />
        {t >= M.kaya && t < M.hubungan - 0.2 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 350, textAlign: "center", opacity: enterAt(frame, fps, M.kaya, 0.3), transform: `translateY(${-Math.abs(Math.sin(t * 4)) * 18}px)` }}>
              <Coin s={130} />
            </div>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 510, textAlign: "center" }}>
              <Chip at={M.cukup}>uang yang cukup</Chip>
            </div>
          </>
        ) : null}
        <Card x={170} y={610} w={740} h={340} at={M.produk2} until={M.hubungan - 0.2}>
          <div style={{ position: "absolute", left: 34, top: 24, right: 34, display: "flex", ...head, fontSize: 36, color: C.ink }}>
            <span>Template Atur Gaji</span>
            <span style={{ marginLeft: "auto", color: C.blue }}>{rupiah(2500000)}</span>
          </div>
          {BARIS_GAJI.map((r, i) => {
            const p = enterAt(frame, fps, ISI_GAJI[i], 0.3);
            return (
              <div key={r.label} style={{ position: "absolute", left: 34, right: 34, top: 90 + i * 60, display: "flex", alignItems: "center", borderBottom: `2px solid ${C.soft}`, paddingBottom: 8, ...head, fontWeight: 600, fontSize: 32, color: C.ink }}>
                <span>{r.label}</span>
                <span style={{ marginLeft: "auto", opacity: p, color: r.label === "Tabungan" ? C.blue : C.ink }}>{rupiah(r.v * p)}</span>
                <span style={{ width: 50, textAlign: "right", color: C.blue, opacity: p }}>✓</span>
              </div>
            );
          })}
        </Card>

        {/* ===== 3. Hubungan ===== */}
        <Title text="3 · Hubungan" at={M.hubungan} until={M.bikin - 0.2} />
        {t >= M.hubungan && t < M.bikin - 0.2 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 350, textAlign: "center", opacity: enterAt(frame, fps, M.hubungan, 0.3) }}>
              <People s={130} />
            </div>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 510, textAlign: "center" }}>
              <Chip at={M.chip3[0]}>pasangan</Chip>
              <Chip at={M.chip3[1]}>keluarga</Chip>
              <Chip at={M.chip3[2]}>anak</Chip>
            </div>
            {KARTU.map((k, i) => {
              const f = between(frame, fps, BALIK[i], BALIK[i] + 0.35);
              const show = enterAt(frame, fps, M.produk3, 0.35);
              return (
                <div key={k} style={{ position: "absolute", left: 120 + i * 290, top: 640, width: 260, height: 300, perspective: 800, opacity: show, transform: `translateY(${(1 - show) * 40}px) rotate(${(i - 1) * 4}deg)` }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 24, boxShadow: `0 18px 40px ${C.shadow}`, background: f > 0.5 ? "white" : C.blue, border: f > 0.5 ? `3px solid ${C.blue}` : "none", transform: `rotateY(${180 - 180 * f}deg)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box", textAlign: "center" }}>
                    {f > 0.5 ? <span style={{ ...head, fontSize: 32, color: C.ink, transform: "rotateY(0deg)" }}>{k}</span> : <span style={{ ...head, fontSize: 70, color: "white" }}>♥</span>}
                  </div>
                </div>
              );
            })}
          </>
        ) : null}

        {/* ===== AI ===== */}
        <Title text={t >= M.ai ? "Pakai AI" : "Bikinnya?"} at={M.bikin} until={M.pilih - 0.2} />
        <Card x={110} y={380} w={860} h={430} at={M.ai} until={M.pilih - 0.2}>
          <div style={{ position: "absolute", left: 30, top: 24, display: "flex", alignItems: "center", gap: 12, ...head, fontSize: 30, color: C.ink }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, background: C.blue, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>✦</div>
            Asisten AI
          </div>
          <div style={{ position: "absolute", right: 30, top: 90, maxWidth: 600, background: C.blue, color: "white", borderRadius: "22px 22px 6px 22px", padding: "14px 20px", ...head, fontWeight: 600, fontSize: 30, lineHeight: 1.25 }}>
            {typed || "…"}
          </div>
          <div style={{ position: "absolute", left: 30, top: 230, maxWidth: 640, background: C.soft, borderRadius: "22px 22px 22px 6px", padding: "14px 20px", ...head, fontWeight: 600, fontSize: 28, color: C.ink, lineHeight: 1.35, opacity: reply, transform: `translateY(${(1 - reply) * 20}px)` }}>
            Minggu 1: pemanasan 10 menit…
            <br />
            Minggu 2: latihan inti 15 menit…
          </div>
        </Card>
        {t >= M.riset && t < M.pilih - 0.2 ? (
          <div style={{ position: "absolute", left: 0, width: 1080, top: 860, textAlign: "center" }}>
            <Chip at={M.riset} tone="blue">riset ✓</Chip>
            <Chip at={M.isi} tone="blue">isi ✓</Chip>
            <Chip at={M.desain} tone="blue">desain ✓</Chip>
          </div>
        ) : null}

        {/* ===== Pilih satu ===== */}
        <Title text="Pilih satu" at={M.pilih} until={M.cta - 0.2} />
        {t >= M.pilih && t < M.cta - 0.2
          ? [<Heart key="h" s={120} />, <Coin key="c" s={120} />, <People key="p" s={120} />].map((ic, i) => {
              const p = enterAt(frame, fps, M.pilih + i * 0.15, 0.3);
              const chosen = i === 1;
              const pick = between(frame, fps, M.pilih + 0.8, M.pilih + 1.1);
              return (
                <div key={i} style={{ position: "absolute", left: 100 + i * 300, top: 470, width: 280, height: 300, borderRadius: 30, background: "white", border: chosen && pick > 0.5 ? `4px solid ${C.blue}` : "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, opacity: p * (chosen ? 1 : 1 - 0.6 * pick), transform: `scale(${(0.8 + 0.2 * p) * (chosen ? 1 + 0.08 * pick : 1)})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                  {ic}
                  <div style={{ ...head, fontSize: 32, color: C.ink }}>{["Kesehatan", "Kekayaan", "Hubungan"][i]}</div>
                  {chosen && pick > 0.5 ? <div style={{ position: "absolute", right: -14, top: -14, width: 56, height: 56, borderRadius: 28, background: C.blue, color: "white", ...head, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div> : null}
                </div>
              );
            })
          : null}

        {/* ===== CTA: besok cara riset ===== */}
        <Title text={t >= M.besok ? "Besok: cara riset" : "Udah pilih?"} at={M.cta} until={99} />
        <Card x={110} y={380} w={860} h={360} at={M.besok} until={99}>
          <div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 80, borderRadius: 40, background: C.soft, display: "flex", alignItems: "center", gap: 16, padding: "0 26px", ...head, fontWeight: 600, fontSize: 34, color: C.ink }}>
            <Search s={44} />
            {"template atur gaji".slice(0, Math.max(0, Math.floor((t - M.besok - 0.2) * 24)))}
          </div>
          <div style={{ position: "absolute", left: 60, right: 60, bottom: 40, height: 180, display: "flex", alignItems: "flex-end", gap: 24 }}>
            {[30, 45, 40, 62, 75, 92].map((h, i) => {
              const p = between(frame, fps, M.besok + 1 + i * 0.12, M.besok + 1.4 + i * 0.12);
              return <div key={i} style={{ flex: 1, height: `${h * p}%`, borderRadius: 10, background: i === 5 ? C.blue : C.blueSoft }} />;
            })}
          </div>
        </Card>
        <Card x={110} y={780} w={860} h={140} at={M.besok + 0.6} until={99}>
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
