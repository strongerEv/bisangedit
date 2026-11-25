import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
// Template akun @mahirambilpeluang (dari video Senin).
import { Backdrop, C, Caption, Card, Character, head, img, mono, Stamp, Title } from "../../mahir-produk-digital/parts";
import { CAPTIONS, HARI, LANGKAH, MARKERS as M, POSE_AT } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Chip: React.FC<{ at: number; children: React.ReactNode; tone?: "blue" | "soft" }> = ({ at, children, tone = "soft" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ display: "inline-block", opacity: p, transform: `scale(${0.6 + 0.4 * p})`, background: tone === "blue" ? C.blue : C.blueSoft, color: tone === "blue" ? "white" : C.blue, borderRadius: 999, padding: "10px 26px", ...head, fontSize: 36, margin: "0 8px" }}>{children}</div>
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

export const S01: React.FC<{ dur: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);

  const prog = interpolate(t, [M.bikin, M.bikin + 0.8], [0, 1], clamp);
  const revisi = Math.round(interpolate(t, [M.revisi, M.revisi + 2.0], [1, 12], clamp));
  const tekan = t >= M.padahal2 + 0.5 && t < M.padahal2 + 0.65;
  const rilis = enterAt(frame, fps, M.rilis + 0.2, 0.3);
  const hariIsi = Math.round(interpolate(t, [M.konsisten, M.konsisten + 1.4], [0, 30], clamp));
  const naik = interpolate(t, [M.konsisten + 0.2, M.konsisten + 1.6], [0, 1], clamp);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== Hook: 3 kesalahan pemula ===== */}
        {t < M.satu - 0.15 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 300, textAlign: "center", ...head, fontWeight: 800, fontSize: 100, lineHeight: 1.0, color: C.ink, opacity: enterAt(frame, fps, 0.2, 0.3), transform: `scale(${0.8 + 0.2 * enterAt(frame, fps, 0.2, 0.3)})` }}>
              <span style={{ color: C.red }}>3</span> KESALAHAN
              <br />
              PEMULA
            </div>
            {[0, 1, 2].map((i) => {
              const p = enterAt(frame, fps, 0.7 + i * 0.25, 0.3);
              const hot = i === 1 && t >= M.nomorDua;
              const shake = hot ? Math.sin(t * 40) * 5 : 0;
              return (
                <div key={i} style={{ position: "absolute", left: 120 + i * 300, top: 560, width: 240, height: 260, borderRadius: 30, background: hot ? C.red : "#FFF1F1", border: `3px solid ${C.red}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, opacity: p, transform: `scale(${(0.6 + 0.4 * p) * (hot ? 1.1 : 1)}) translateX(${shake}px)`, boxShadow: `0 16px 34px ${C.shadow}` }}>
                  <span style={{ fontSize: 100 }}>⚠️</span>
                  <span style={{ ...head, fontWeight: 800, fontSize: 48, color: hot ? "white" : C.red }}>#{i + 1}</span>
                </div>
              );
            })}
            <Label x={540} y={880} at={M.nomorDua} until={M.satu - 0.15} color={C.red} rot={-4}>
              🔥 #2 PALING SERING
            </Label>
          </>
        ) : null}

        {/* ===== 1. Bikin dulu, riset belakangan ===== */}
        <Title text="1 · Bikin dulu, riset belakangan" at={M.satu} until={M.dua - 0.2} />
        <Card x={140} y={380} w={800} h={220} at={M.bikin} until={M.dua - 0.2}>
          <div style={{ position: "absolute", left: 36, top: 28, right: 36, display: "flex", ...head, fontSize: 38, color: C.ink }}>
            <span>Bikin produk…</span>
            <span style={{ marginLeft: "auto", color: prog >= 1 ? C.blue : C.muted }}>{prog >= 1 ? "100% ✓" : `${Math.round(prog * 100)}%`}</span>
          </div>
          <div style={{ position: "absolute", left: 36, right: 36, top: 104, height: 40, borderRadius: 20, background: C.soft, overflow: "hidden" }}>
            <div style={{ width: `${prog * 100}%`, height: "100%", background: C.blue, borderRadius: 20 }} />
          </div>
          <div style={{ position: "absolute", left: 36, top: 160, ...head, fontWeight: 600, fontSize: 28, color: C.muted, opacity: t >= M.capek ? 1 : 0 }}>😮‍💨 2 minggu lembur…</div>
        </Card>
        <Card x={140} y={620} w={800} h={220} at={M.nyari} until={M.dua - 0.2}>
          <div style={{ position: "absolute", left: 30, right: 30, top: 28, height: 80, borderRadius: 40, background: C.soft, display: "flex", alignItems: "center", gap: 16, padding: "0 26px", ...head, fontWeight: 600, fontSize: 34, color: C.ink }}>🔍 produk kamu</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 130, textAlign: "center", ...head, fontWeight: 800, fontSize: 52, color: C.red }}>0 yang nyari</div>
        </Card>
        <Stamp x={540} y={965} at={M.nyari + 0.9} until={M.dua - 0.2} size={44}>
          NGGAK ADA YANG NYARI
        </Stamp>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 852, textAlign: "center" }}>{t >= M.nyari + 1.0 && t < M.dua - 0.2 ? <Chip at={M.nyari + 1.0}>→ riset dulu (video Rabu)</Chip> : null}</div>

        {/* ===== 2. Nunggu sempurna ===== */}
        <Title text="2 · Nunggu sempurna" at={M.dua} until={M.tiga - 0.2} />
        <Card x={110} y={380} w={860} h={260} at={M.sempurna} until={M.tiga - 0.2}>
          <div style={{ position: "absolute", left: 34, top: 40, width: 120, height: 150, borderRadius: 16, background: "#E8F5EC", border: "3px solid #2E8B57", display: "flex", alignItems: "center", justifyContent: "center", ...head, fontWeight: 800, fontSize: 30, color: "#2E8B57" }}>XLS</div>
          <div style={{ position: "absolute", left: 180, top: 50, right: 30, ...mono, fontSize: 30, color: C.ink, lineHeight: 1.3, wordBreak: "break-all" }}>produk_final_v{revisi}{revisi >= 8 ? "_FIX" : ""}{revisi >= 11 ? "_banget" : ""}.xlsx</div>
          <div style={{ position: "absolute", left: 180, top: 150, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ background: t >= M.dijual ? C.red : C.soft, color: t >= M.dijual ? "white" : C.muted, borderRadius: 999, padding: "8px 20px", ...head, fontSize: 28 }}>revisi ×{revisi}</div>
            <div style={{ ...head, fontSize: 28, color: C.muted }}>{t >= M.dijual ? "dijual: belum pernah 😩" : "masih kurang…"}</div>
          </div>
        </Card>
        {t >= M.padahal2 && t < M.tiga - 0.2 ? (
          <div style={{ position: "absolute", left: 240, top: 690, width: 600, height: 140, borderRadius: 70, background: t >= M.rilis ? "#2E8B57" : C.blue, color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, ...head, fontWeight: 800, fontSize: 52, boxShadow: tekan ? "0 4px 10px rgba(20,30,60,0.2)" : `0 18px 40px ${C.shadow}`, opacity: enterAt(frame, fps, M.padahal2, 0.3), transform: `scale(${tekan ? 0.94 : 0.9 + 0.1 * enterAt(frame, fps, M.padahal2, 0.3)})` }}>
            {t >= M.rilis ? "✓ DIRILIS!" : "🚀 RILIS SEKARANG"}
          </div>
        ) : null}
        {t >= M.rilis + 0.2 && t < M.tiga - 0.2
          ? [0, 1, 2, 3, 4, 5].map((i) => {
              const a = (i / 6) * Math.PI * 2;
              return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(a) * 340 * rilis - 20, top: 760 + Math.sin(a) * 110 * rilis - 20, fontSize: 40, opacity: 1 - 0.7 * rilis }}>✨</div>;
            })
          : null}
        <Label x={540} y={935} at={M.rilis + 0.4} until={M.tiga - 0.2} color={C.red} rot={-3}>
          RILIS &gt; SEMPURNA
        </Label>

        {/* ===== 3. Jualan sekali terus nyerah ===== */}
        <Title text="3 · Jualan sekali, terus nyerah" at={M.tiga} until={M.rekap - 0.2} />
        <Card x={110} y={380} w={860} h={210} at={M.nyerah} until={M.rekap - 0.2} dim={t >= M.konsisten ? 1 : 0}>
          <div style={{ position: "absolute", left: 34, top: 26, ...mono, fontSize: 26, letterSpacing: "0.12em", color: C.muted }}>KAMU YANG NYERAH</div>
          <div style={{ position: "absolute", left: 34, top: 76, display: "flex", gap: 12 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ width: 66, height: 66, borderRadius: 14, background: i === 0 ? C.blueSoft : C.soft, border: i === 0 ? `3px solid ${C.blue}` : "none", display: "flex", alignItems: "center", justifyContent: "center", ...head, fontSize: 28, color: i === 0 ? C.blue : "#C9CDD5" }}>
                {i === 0 ? "▶" : t >= M.berhenti ? "✗" : ""}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 34, top: 158, ...head, fontSize: 28, color: t >= M.berhenti ? C.red : C.muted, opacity: t >= M.sepi ? 1 : 0 }}>👁 12 views… {t >= M.berhenti ? "→ berhenti." : ""}</div>
        </Card>
        <Card x={110} y={620} w={860} h={300} at={M.konsisten} until={M.rekap - 0.2} style={{ border: `4px solid ${C.blue}` }}>
          <div style={{ position: "absolute", left: 34, top: 24, ...mono, fontSize: 26, letterSpacing: "0.12em", color: C.blue }}>YANG LAKU: 30 HARI KONSISTEN</div>
          <div style={{ position: "absolute", left: 34, top: 70, display: "grid", gridTemplateColumns: "repeat(15, 30px)", gap: 8 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: 8, background: i < hariIsi ? C.blue : C.soft }} />
            ))}
          </div>
          <svg width={790} height={130} style={{ position: "absolute", left: 34, top: 150 }}>
            <path d="M0 120 C 200 115, 350 100, 480 70 S 700 10, 790 4" fill="none" stroke="#2E8B57" strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - naik} />
          </svg>
        </Card>
        <Stamp x={760} y={600} at={M.konsisten + 1.0} until={M.rekap - 0.2} size={56} color={C.blue} rot={6}>
          KONSISTEN
        </Stamp>

        {/* ===== Rekap seminggu: tangga 6 langkah ===== */}
        <Title text="Rekap seminggu" at={M.rekap} until={M.simpan - 0.2} />
        {t >= M.rekap && t < M.simpan - 0.2 ? (
          <>
            {LANGKAH.map((s, i) => {
              const p = enterAt(frame, fps, M.rekap + 0.2 + i * 0.08, 0.3);
              const done = t >= M.langkah[i];
              const pop = between(frame, fps, M.langkah[i], M.langkah[i] + 0.25);
              return (
                <div key={s} style={{ position: "absolute", left: 60 + i * 92, top: 870 - i * 90, width: 470, height: 76, borderRadius: 20, background: done ? C.blue : "white", border: `2px solid ${done ? C.blue : "#E1E4EA"}`, boxShadow: `0 10px 24px ${C.shadow}`, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", boxSizing: "border-box", opacity: p, transform: `scale(${1 + 0.06 * Math.sin(Math.PI * pop)})`, color: done ? "white" : C.ink }}>
                  <span style={{ ...mono, fontSize: 22, opacity: 0.75, width: 50 }}>{HARI[i]}</span>
                  <span style={{ ...head, fontSize: 32, whiteSpace: "nowrap" }}>{s}</span>
                  <span style={{ marginLeft: "auto", ...head, fontSize: 32 }}>{done ? "✓" : ""}</span>
                </div>
              );
            })}
            {t >= M.langkah[5] + 0.6 ? (
              <div style={{ position: "absolute", left: 50, top: 440, textAlign: "center", opacity: enterAt(frame, fps, M.langkah[5] + 0.6, 0.3), transform: `scale(${0.5 + 0.5 * enterAt(frame, fps, M.langkah[5] + 0.6, 0.3)})` }}>
                <div style={{ fontSize: 110 }}>🏆</div>
                <div style={{ ...head, fontWeight: 800, fontSize: 32, color: C.ink, background: C.yellow, borderRadius: 12, padding: "6px 16px" }}>PRODUK PERTAMAMU</div>
              </div>
            ) : null}
          </>
        ) : null}

        {/* ===== CTA: simpan + studi kasus ===== */}
        <Title text={t >= M.studi ? "Selanjutnya: studi kasus" : "Simpan video ini"} at={M.simpan} until={99} />
        {t >= M.simpan && t < M.studi ? (
          <div style={{ position: "absolute", left: 390, top: 440, width: 300, height: 300, borderRadius: 60, background: t >= M.simpan + 0.3 ? C.yellow : "white", border: "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transform: `scale(${t >= M.simpan + 0.3 && t < M.simpan + 0.45 ? 0.92 : enterAt(frame, fps, M.simpan, 0.3)})` }}>
            <span style={{ fontSize: 130 }}>🔖</span>
            <span style={{ ...head, fontWeight: 800, fontSize: 40, color: C.ink }}>{t >= M.simpan + 0.3 ? "Tersimpan ✓" : "Simpan"}</span>
          </div>
        ) : null}
        <Card x={110} y={380} w={860} h={360} at={M.studi} until={99}>
          <div style={{ position: "absolute", left: 30, top: 24, ...mono, fontSize: 26, letterSpacing: "0.15em", color: C.red }}>STUDI KASUS</div>
          {[0, 1, 2].map((i) => {
            const p = enterAt(frame, fps, M.studi + 0.3 + i * 0.2, 0.3);
            return (
              <div key={i} style={{ position: "absolute", left: 30 + i * 140, top: 80, width: 120, height: 120, borderRadius: 60, background: ["#FFD6A5", "#C9DBFF", "#CDEAC0"][i], filter: "blur(1.5px)", opacity: p, transform: `scale(${0.6 + 0.4 * p})`, display: "flex", alignItems: "center", justifyContent: "center", ...head, fontWeight: 800, fontSize: 60, color: "rgba(20,23,28,0.55)" }}>
                ?
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 30, top: 230, ...head, fontSize: 34, color: C.ink }}>Cara mereka jualan produk digital</div>
          <svg width={330} height={180} style={{ position: "absolute", right: 30, top: 40 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const p = between(frame, fps, M.studi + 0.6 + i * 0.12, M.studi + 1.0 + i * 0.12);
              const h = [30, 50, 75, 110, 160][i] * p;
              return <rect key={i} x={i * 66} y={180 - h} width={50} height={h} rx={8} fill={i === 4 ? C.blue : C.blueSoft} />;
            })}
          </svg>
          {t >= M.nol ? <div style={{ position: "absolute", left: 30, top: 288, background: C.blueSoft, color: C.blue, borderRadius: 999, padding: "6px 20px", ...head, fontSize: 30, transform: `scale(${enterAt(frame, fps, M.nol, 0.3)})`, transformOrigin: "0% 50%" }}>dari nol sampai laku 📈</div> : null}
        </Card>
        <Card x={110} y={780} w={860} h={140} at={M.studi + 0.6} until={99}>
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
