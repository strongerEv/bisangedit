import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
// Template akun @mahirambilpeluang (dari video Senin).
import { Backdrop, C, Caption, Card, Character, Cross, head, img, mono, rupiah, Stamp, Title } from "../../mahir-produk-digital/parts";
import { BALAS1, BARIS, CAPTIONS, ISI, MARKERS as M, POSE_AT, PROMPT1, PROMPT2, TIM } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const GAJI = 2000000;

const Person: React.FC<{ s: number; c: string }> = ({ s, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
    <circle cx={12} cy={8} r={4} />
    <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
  </svg>
);

const Chip: React.FC<{ at: number; children: React.ReactNode; tone?: "blue" | "soft" }> = ({ at, children, tone = "soft" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ display: "inline-block", opacity: p, transform: `scale(${0.6 + 0.4 * p})`, background: tone === "blue" ? C.blue : C.blueSoft, color: tone === "blue" ? "white" : C.blue, borderRadius: 999, padding: "10px 26px", ...head, fontSize: 38, margin: "0 8px" }}>{children}</div>
  );
};

const Label: React.FC<{ x: number; y: number; at: number; until?: number; color?: string; rot?: number; children: React.ReactNode }> = ({ x, y, at, until = 99, color = C.blue, rot = -4, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > until) return null;
  const p = enterAt(frame, fps, at, 0.3);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${0.5 + 0.5 * p})`, opacity: p, background: color, color: "white", borderRadius: 14, padding: "10px 24px", ...head, fontWeight: 800, fontSize: 38, whiteSpace: "nowrap", boxShadow: `0 10px 24px ${C.shadow}` }}>
      {children}
    </div>
  );
};

const AiHeader: React.FC = () => (
  <div style={{ position: "absolute", left: 30, top: 24, display: "flex", alignItems: "center", gap: 12, ...head, fontSize: 30, color: C.ink }}>
    <div style={{ width: 46, height: 46, borderRadius: 23, background: C.blue, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>✦</div>
    Asisten AI
  </div>
);

export const S01: React.FC<{ dur: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);

  // Hook
  const hari = Math.round(interpolate(t, [M.sebulan, M.sebulan + 1.0], [1, 30], clamp));
  const silang = between(frame, fps, M.sekarang, M.sekarang + 0.35);
  // Prompt
  const typed1 = PROMPT1.slice(0, Math.max(0, Math.floor((t - M.prompt1 - 0.1) * 32)));
  const typed2 = PROMPT2.slice(0, Math.max(0, Math.floor((t - M.prompt2 - 0.1) * 40)));
  // Tabel
  const warna = between(frame, fps, M.warna, M.warna + 0.35);
  const judul = enterAt(frame, fps, M.judul, 0.3);
  const cover = enterAt(frame, fps, M.cover, 0.4);
  const tabelShow = t >= M.dua && t < M.besok - 0.2;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== Hook: DULU (tim + 30 hari) vs SEKARANG (sendiri + 1 malam) ===== */}
        <Card x={60} y={360} w={460} h={500} at={M.dulu} until={M.caranya - 0.15} dim={silang}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 26, textAlign: "center", ...mono, fontSize: 30, letterSpacing: "0.2em", color: C.muted }}>DULU</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 90, display: "flex", justifyContent: "center", gap: 10 }}>
            {["#E5484D", "#F5B700", "#2E8B57"].map((c, i) => {
              const p = enterAt(frame, fps, TIM[i], 0.3);
              return (
                <div key={c} style={{ opacity: p, transform: `scale(${0.5 + 0.5 * p})`, textAlign: "center" }}>
                  <Person s={110} c={c} />
                  <div style={{ ...head, fontWeight: 600, fontSize: 22, color: C.muted }}>{["penulis", "desainer", "programmer"][i]}</div>
                </div>
              );
            })}
          </div>
          {t >= M.sebulan ? (
            <div style={{ position: "absolute", left: 90, right: 90, top: 290, height: 170, borderRadius: 20, border: `3px solid ${C.ink}`, overflow: "hidden", opacity: enterAt(frame, fps, M.sebulan, 0.3) }}>
              <div style={{ height: 44, background: C.red }} />
              <div style={{ textAlign: "center", ...head, fontWeight: 800, fontSize: 70, color: C.ink, lineHeight: "90px" }}>
                {hari} <span style={{ fontSize: 34 }}>hari</span>
              </div>
            </div>
          ) : null}
          {silang > 0 ? (
            <div style={{ position: "absolute", left: 80, top: 100, width: 300, height: 300 }}>
              <Cross size={300} p={silang} />
            </div>
          ) : null}
        </Card>
        <Card x={560} y={360} w={460} h={500} at={M.sendirian - 0.1} until={M.caranya - 0.15} style={{ border: `4px solid ${C.blue}` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 26, textAlign: "center", ...mono, fontSize: 30, letterSpacing: "0.2em", color: C.blue }}>SEKARANG</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center" }}>
            <Person s={140} c={C.blue} />
            <div style={{ ...head, fontWeight: 600, fontSize: 24, color: C.muted }}>kamu + AI ✦</div>
          </div>
          {t >= M.malam ? (
            <div style={{ position: "absolute", left: 60, right: 60, top: 300, height: 160, borderRadius: 20, background: "#1E2A4A", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: enterAt(frame, fps, M.malam, 0.3), transform: `scale(${0.8 + 0.2 * enterAt(frame, fps, M.malam, 0.3)})` }}>
              <span style={{ fontSize: 70 }}>🌙</span>
              <span style={{ ...head, fontWeight: 800, fontSize: 60, color: "white" }}>1 malam</span>
            </div>
          ) : null}
        </Card>
        <Stamp x={540} y={960} at={M.malam + 0.3} until={M.caranya - 0.15} size={64} color={C.blue}>
          SATU MALAM
        </Stamp>

        {/* ===== Janji: 3 perintah ke AI ===== */}
        <Title text="3 perintah ke AI" at={M.caranya} until={M.satu - 0.2} />
        <Card x={140} y={380} w={800} h={480} at={M.caranya + 0.1} until={M.satu - 0.2}>
          <AiHeader />
          {["Minta isinya", "Minta rumusnya", "Minta tampilannya"].map((s, i) => {
            const p = enterAt(frame, fps, M.tiga + 0.3 + i * 0.25, 0.3);
            return (
              <div key={s} style={{ position: "absolute", right: 30, top: 110 + i * 115, background: C.blue, color: "white", borderRadius: "22px 22px 6px 22px", padding: "16px 26px", ...head, fontSize: 38, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
                {["①", "②", "③"][i]} {s}
              </div>
            );
          })}
        </Card>
        {t >= M.tiga && t < M.satu - 0.2 ? (
          <div style={{ position: "absolute", left: 0, width: 1080, top: 900, textAlign: "center" }}>
            <Chip at={M.tiga + 0.4} tone="blue">3 PERINTAH</Chip>
          </div>
        ) : null}

        {/* ===== 1. Minta isinya ===== */}
        <Title text="1 · Minta isinya" at={M.satu} until={M.dua - 0.2} />
        <Card x={110} y={370} w={860} h={590} at={M.isi} until={M.dua - 0.2}>
          <AiHeader />
          <div style={{ position: "absolute", right: 30, top: 96, maxWidth: 620, background: C.blue, color: "white", borderRadius: "22px 22px 6px 22px", padding: "14px 22px", ...head, fontWeight: 600, fontSize: 32, lineHeight: 1.25, minHeight: 40 }}>
            {t >= M.prompt1 ? typed1 || "…" : "…"}
          </div>
          {t >= M.balas1 - 0.1 ? (
            <div style={{ position: "absolute", left: 30, top: 250, width: 560, background: C.soft, borderRadius: "22px 22px 22px 6px", padding: "18px 24px", opacity: enterAt(frame, fps, M.balas1 - 0.1, 0.3) }}>
              {BARIS.map((b, i) => {
                const p = enterAt(frame, fps, BALAS1[i], 0.25);
                return (
                  <div key={b.label} style={{ display: "flex", ...head, fontWeight: 600, fontSize: 36, color: C.ink, lineHeight: "62px", opacity: p, transform: `translateX(${(1 - p) * -20}px)` }}>
                    <span>• {b.label}</span>
                    <span style={{ marginLeft: "auto", color: C.blue }}>{b.pct}%</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </Card>

        {/* ===== 2 & 3. Rumus → tabel otomatis → tampilan ===== */}
        <Title text={t >= M.tigaLangkah ? "3 · Minta tampilannya" : "2 · Minta rumusnya"} at={M.dua} until={M.besok - 0.2} />
        {tabelShow ? (
          <>
            <Card x={90} y={350} w={900} h={660} at={M.rumus} until={M.besok - 0.2} style={{ overflow: "hidden" }}>
              {/* judul (muncul di langkah 3) */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96 * judul, background: C.blue, color: "white", display: "flex", alignItems: "center", paddingLeft: 30, ...head, fontWeight: 800, fontSize: 44, overflow: "hidden" }}>💰 Atur Gaji Anak Kos</div>
              {/* bilah rumus */}
              <div style={{ position: "absolute", left: 24, right: 24, top: 24 + 96 * judul, height: 66, borderRadius: 12, border: `2px solid ${t >= M.prompt2 ? C.blue : "#E1E4EA"}`, display: "flex", alignItems: "center", gap: 16, padding: "0 18px", ...mono, fontSize: 30, color: C.ink }}>
                <span style={{ color: C.muted, fontStyle: "italic" }}>fx</span>
                <span>{t >= M.isiTabel - 0.2 ? "=$B$1*B3" : t >= M.prompt2 ? "=" : ""}</span>
                {t >= M.prompt2 && t < M.tigaLangkah ? <span style={{ marginLeft: "auto", ...head, fontSize: 24, color: C.blue }}>✦ {typed2.length < PROMPT2.length ? "menulis rumus…" : "rumus siap"}</span> : null}
              </div>
              {/* tabel */}
              <div style={{ position: "absolute", left: 24, right: 24, top: 110 + 96 * judul }}>
                <div style={{ display: "flex", height: 64, alignItems: "center", background: warna > 0.5 ? C.blueSoft : C.soft, borderRadius: 10, ...head, fontSize: 32, color: C.ink, padding: "0 20px" }}>
                  <span>Gaji</span>
                  <span style={{ marginLeft: "auto", fontWeight: 800, color: warna > 0.5 ? C.blue : C.ink }}>{rupiah(GAJI)}</span>
                </div>
                {BARIS.map((b, i) => {
                  const p = between(frame, fps, ISI[i], ISI[i] + 0.3);
                  const stripe = warna > 0.5 && i % 2 === 1;
                  return (
                    <div key={b.label} style={{ display: "flex", height: 64, alignItems: "center", borderBottom: "2px solid #ECEEF3", background: stripe ? "#F7F9FE" : "transparent", padding: "0 20px", ...head, fontWeight: 600, fontSize: 34, color: C.ink }}>
                      <span style={{ width: 280, display: "flex", alignItems: "center", gap: 14 }}>
                        {warna > 0.5 ? <span style={{ width: 18, height: 18, borderRadius: 9, background: [C.red, C.yellow, "#2E8B57", C.blue][i] }} /> : null}
                        {b.label}
                      </span>
                      <span style={{ width: 120, color: C.muted }}>{b.pct}%</span>
                      <span style={{ marginLeft: "auto", color: p > 0 ? (warna > 0.5 && b.label === "Tabungan" ? C.blue : C.ink) : "#D5D9E0", background: p > 0 && p < 1 ? C.blueSoft : "transparent", borderRadius: 8, padding: "0 8px" }}>{p > 0 ? rupiah((GAJI * b.pct * p) / 100) : "—"}</span>
                    </div>
                  );
                })}
                {t >= ISI[3] + 0.35 ? (
                  <div style={{ display: "flex", height: 64, alignItems: "center", padding: "0 20px", ...head, fontWeight: 800, fontSize: 34, color: C.blue, opacity: enterAt(frame, fps, ISI[3] + 0.35, 0.3) }}>
                    <span>Sisa</span>
                    <span style={{ marginLeft: "auto" }}>Rp0 ✓ pas!</span>
                  </div>
                ) : null}
              </div>
            </Card>
            {/* prompt rumus mengambang */}
            {t >= M.prompt2 && t < M.tigaLangkah ? (
              <div style={{ position: "absolute", right: 70, top: 900, maxWidth: 700, background: C.blue, color: "white", borderRadius: "22px 22px 6px 22px", padding: "14px 22px", ...head, fontWeight: 600, fontSize: 30, lineHeight: 1.25, boxShadow: `0 14px 30px ${C.shadow}`, opacity: enterAt(frame, fps, M.prompt2, 0.25) }}>{typed2 || "…"}</div>
            ) : null}
            {/* cover produk */}
            {t >= M.cover ? (
              <div style={{ position: "absolute", left: 640, top: 600, width: 340, height: 440, borderRadius: 26, background: `linear-gradient(160deg, ${C.blue}, #163A9C)`, boxShadow: "0 24px 50px rgba(20,30,60,0.3)", transform: `rotate(${6 * cover}deg) scale(${0.6 + 0.4 * cover}) translateY(${(1 - cover) * 80}px)`, opacity: cover, padding: 30, boxSizing: "border-box", color: "white" }}>
                <div style={{ ...mono, fontSize: 20, letterSpacing: "0.2em", opacity: 0.8 }}>TEMPLATE</div>
                <div style={{ ...head, fontWeight: 800, fontSize: 48, lineHeight: 1.05, marginTop: 14 }}>Atur Gaji Anak Kos</div>
                <div style={{ display: "flex", gap: 8, marginTop: 26 }}>
                  {[C.red, C.yellow, "#2E8B57", "#9DB8FF"].map((c, i) => (
                    <div key={c} style={{ flex: 1, height: 70 + i * 20, alignSelf: "flex-end", borderRadius: 8, background: c }} />
                  ))}
                </div>
                <div style={{ position: "absolute", left: 30, bottom: 30, background: C.yellow, color: C.ink, borderRadius: 12, padding: "8px 18px", ...head, fontWeight: 800, fontSize: 30 }}>OTOMATIS ✓</div>
              </div>
            ) : null}
          </>
        ) : null}
        <Label x={810} y={575} at={M.jadi} until={M.besok - 0.2} color={C.red} rot={-5}>
          SIAP DIJUAL ✓
        </Label>

        {/* ===== CTA: besok jualnya di mana ===== */}
        <Title text="Besok: jualnya di mana?" at={M.besok} until={99} />
        <Card x={110} y={380} w={860} h={360} at={M.besok + 0.1} until={99}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
            {["🛒", "📱", "🔗"].map((e, i) => {
              const p = enterAt(frame, fps, M.mana + i * 0.15, 0.3);
              return (
                <div key={e} style={{ width: 210, height: 230, borderRadius: 28, background: C.blueSoft, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: p, transform: `scale(${0.6 + 0.4 * p}) translateY(${Math.sin(t * 4 + i) * 6}px)` }}>
                  <span style={{ fontSize: 90 }}>{e}</span>
                  <span style={{ ...head, fontWeight: 800, fontSize: 60, color: C.blue }}>?</span>
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
