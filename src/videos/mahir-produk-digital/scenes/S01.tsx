import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Backdrop, C, Caption, Card, Character, Cross, head, IconBell, IconBox, IconClock, IconFile, IconTruck, img, mono, rupiah, Stamp, Title } from "../parts";
import { MARKERS as M } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Angka yang "menghitung" naik dari 0 ke `to` mulai `at`. */
const useCount = (to: number, at: number, dur = 0.6) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame / fps, [at, at + dur], [0, to], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
};

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // ---------- A. Hook ----------
  const strike = between(frame, fps, M.seminggu - 0.05, M.seminggu + 0.25);
  const minggu = spring({ frame: frame - Math.round((M.seminggu + 0.15) * fps), fps, config: { damping: 9, mass: 0.5 } });

  // ---------- B. Hitungan ----------
  const hasil = useCount(2500000, M.hasil, 0.7);
  const row = (at: number) => enterAt(frame, fps, at, 0.35);

  // ---------- D. Alasan ----------
  const kali = Math.round(interpolate(t, [M.alasan1 + 0.3, M.alasan1 + 1.6], [1, 50], { ...clamp, easing: (x) => x * x }));
  const notif2 = enterAt(frame, fps, M.tidur, 0.35);

  // ---------- E. Realita ----------
  const glow = between(frame, fps, M.keduamu, M.keduamu + 0.4);

  // ---------- F. CTA ----------
  const followed = t >= M.follow;
  const typed = "MAU".slice(0, Math.max(0, Math.min(3, Math.floor((t - M.komen - 0.05) / 0.12))));
  const sent = t >= M.komen + 0.7;

  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0.0], clamp);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* ===== A. Hook: Rp2.500.000 / BULAN → / MINGGU ===== */}
        <Card x={130} y={420} w={820} h={420} at={M.hook} until={M.hitung - 0.2}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 46, textAlign: "center", ...mono, fontSize: 26, letterSpacing: "0.2em", color: C.muted }}>GAJI SEBULAN</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 100, textAlign: "center", ...head, fontWeight: 800, fontSize: 124, letterSpacing: "-0.02em", color: C.ink }}>{rupiah(2500000)}</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 268, display: "flex", justifyContent: "center", gap: 24, alignItems: "center" }}>
            <div style={{ position: "relative", ...head, fontSize: 54, color: C.muted, background: C.soft, borderRadius: 999, padding: "8px 30px" }}>
              / BULAN
              <div style={{ position: "absolute", left: 18, top: "50%", height: 7, width: `${(100 - 12) * strike}%`, background: C.red, borderRadius: 4 }} />
            </div>
            {minggu > 0.01 ? <div style={{ ...head, fontSize: 60, color: "white", background: C.blue, borderRadius: 999, padding: "8px 30px", transform: `scale(${minggu})`, boxShadow: "0 12px 26px rgba(36,87,214,0.35)" }}>/ MINGGU?</div> : null}
          </div>
        </Card>
        <Stamp x={820} y={430} at={M.ituKamu} until={M.hitung - 0.2} size={54}>
          ITU KAMU?
        </Stamp>

        {/* ===== B. Hitungan ===== */}
        <Title text="Hitungannya" at={M.hitung} until={M.kenapaBisa - 0.2} />
        <Card x={150} y={380} w={780} h={520} at={M.hitung} until={M.kenapaBisa - 0.2}>
          <div style={{ position: "absolute", left: 50, right: 50, top: 50, display: "flex", alignItems: "center", gap: 20, ...head, fontSize: 48, color: C.ink, opacity: row(M.hitung) }}>
            <IconFile size={70} />
            <span>1 file</span>
            <span style={{ marginLeft: "auto" }}>{rupiah(50000)}</span>
          </div>
          <div style={{ position: "absolute", left: 50, right: 50, top: 170, display: "flex", alignItems: "center", gap: 20, ...head, fontSize: 48, color: C.ink, opacity: row(M.kali) }}>
            <span style={{ width: 70, textAlign: "center", color: C.blue }}>×</span>
            <span>laku / minggu</span>
            <span style={{ marginLeft: "auto", color: C.blue }}>50</span>
          </div>
          <div style={{ position: "absolute", left: 50, right: 50, top: 280, height: 5, borderRadius: 3, background: C.ink, opacity: row(M.hasil - 0.2) }} />
          <div style={{ position: "absolute", left: 50, right: 50, top: 310, display: "flex", alignItems: "center", gap: 20, opacity: row(M.hasil - 0.2) }}>
            <span style={{ width: 70, textAlign: "center", ...head, fontSize: 56, color: C.blue }}>=</span>
            <span style={{ marginLeft: "auto", ...head, fontWeight: 800, fontSize: 92, color: C.blue }}>{rupiah(hasil)}</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 438, display: "flex", justifyContent: "center", opacity: row(M.sehari), transform: `scale(${0.8 + 0.2 * row(M.sehari)})` }}>
            <div style={{ background: "#FFF6D6", color: "#8A6400", borderRadius: 999, padding: "6px 22px", ...head, fontSize: 32 }}>≈ 7 pembeli / hari</div>
          </div>
        </Card>
        {t >= M.hitung && t < M.kenapaBisa - 0.2 ? <div style={{ position: "absolute", left: 0, width: 1080, top: 920, textAlign: "center", ...mono, fontSize: 22, color: C.muted, opacity: row(M.hitung + 0.4) }}>*contoh hitungan, bukan janji penghasilan</div> : null}

        {/* ===== C. Kenapa bisa ===== */}
        <Title text="Kenapa bisa?" at={M.kenapaBisa} until={M.alasan1 - 0.2} />
        <Card x={90} y={400} w={430} h={480} at={M.gaji} until={M.alasan1 - 0.2}>
          <div style={{ textAlign: "center", paddingTop: 44 }}>
            <IconClock size={110} />
            <div style={{ ...head, fontSize: 46, color: C.ink, marginTop: 16 }}>GAJI</div>
            <div style={{ ...head, fontWeight: 500, fontSize: 32, color: C.muted, marginTop: 8 }}>dibayar pakai</div>
            <div style={{ ...head, fontSize: 52, color: C.red, marginTop: 4 }}>WAKTU</div>
            <div style={{ display: "inline-block", marginTop: 22, background: "#FDECEC", color: C.red, borderRadius: 999, padding: "6px 18px", ...mono, fontSize: 22 }}>maks. 24 jam</div>
          </div>
        </Card>
        <Card x={560} y={400} w={430} h={480} at={M.produk} until={M.alasan1 - 0.2} style={{ border: `3px solid ${C.blue}` }}>
          <div style={{ textAlign: "center", paddingTop: 44 }}>
            <IconFile size={110} />
            <div style={{ ...head, fontSize: 46, color: C.ink, marginTop: 16 }}>PRODUK DIGITAL</div>
            <div style={{ ...head, fontWeight: 500, fontSize: 32, color: C.muted, marginTop: 8 }}>dibayar per</div>
            <div style={{ ...head, fontSize: 52, color: C.blue, marginTop: 4 }}>PENJUALAN</div>
            <div style={{ display: "inline-block", marginTop: 22, background: C.blueSoft, color: C.blue, borderRadius: 999, padding: "6px 18px", ...mono, fontSize: 22 }}>tanpa batas ✓</div>
          </div>
        </Card>
        {t >= M.kenapaBisa && t < M.gaji ? (
          <div style={{ position: "absolute", left: 0, width: 1080, top: 520, textAlign: "center", ...head, fontWeight: 800, fontSize: 260, color: C.blue, opacity: enterAt(frame, fps, M.kenapaBisa, 0.3), transform: `rotate(${Math.sin(t * 6) * 6}deg)` }}>?</div>
        ) : null}

        {/* ===== D. Tiga alasan ===== */}
        <Title text="3 alasannya" at={M.alasan1} until={M.realita - 0.2} />
        {[
          { at: M.alasan1, no: "1", title: "Buat sekali,", sub: "jual berkali-kali" },
          { at: M.alasan2, no: "2", title: "Tanpa stok", sub: "& tanpa ongkir" },
          { at: M.alasan3, no: "3", title: "Toko buka 24 jam", sub: "laku saat kamu tidur" },
        ].map((r, i) => {
          const next = [M.alasan2, M.alasan3, 99][i];
          return (
            <Card key={r.no} x={90} y={360 + i * 200} w={900} h={176} at={r.at} until={M.realita - 0.2} dim={t >= next ? 1 : 0}>
              <div style={{ position: "absolute", left: 30, top: 44, width: 86, height: 86, borderRadius: 43, background: C.blue, color: "white", ...head, fontSize: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.no}</div>
              <div style={{ position: "absolute", left: 140, top: 34, ...head, fontSize: 46, color: C.ink }}>{r.title}</div>
              <div style={{ position: "absolute", left: 140, top: 96, ...head, fontWeight: 500, fontSize: 36, color: C.muted }}>{r.sub}</div>
              {i === 0 ? (
                <div style={{ position: "absolute", right: 30, top: 30, width: 250, height: 116 }}>
                  {[2, 1, 0].map((k) => (
                    <div key={k} style={{ position: "absolute", left: k * 18, top: 14 - k * 6, opacity: kali > 1 || k === 0 ? 1 : 0 }}>
                      <IconFile size={86} />
                    </div>
                  ))}
                  <div style={{ position: "absolute", right: 0, top: 34, ...head, fontWeight: 800, fontSize: 52, color: C.blue }}>×{kali}</div>
                </div>
              ) : null}
              {i === 1
                ? [IconBox, IconTruck].map((Ic, k) => (
                    <div key={k} style={{ position: "absolute", right: 40 + (1 - k) * 120, top: 44, width: 86, height: 86 }}>
                      <Ic size={86} color={C.muted} />
                      <Cross size={86} p={between(frame, fps, M.alasan2 + 0.25 + k * 1.1, M.alasan2 + 0.5 + k * 1.1)} />
                    </div>
                  ))
                : null}
              {i === 2 ? (
                <div style={{ position: "absolute", right: 26, top: 34, width: 290, height: 108, display: "flex", alignItems: "center", gap: 14, background: C.soft, borderRadius: 18, padding: "0 18px", boxSizing: "border-box", opacity: enterAt(frame, fps, M.alasan3 + 0.5, 0.3), transform: `scale(${t >= M.tidur && t < M.tidur + 0.25 ? 1.06 : 1})` }}>
                  <div style={{ position: "relative" }}>
                    <IconBell size={46} />
                    <div style={{ position: "absolute", right: -10, top: -10, minWidth: 28, height: 28, borderRadius: 14, background: C.red, color: "white", ...head, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.6 + 0.4 * enterAt(frame, fps, M.alasan3 + 0.5, 0.3)})` }}>{notif2 > 0.5 ? 2 : 1}</div>
                  </div>
                  <div>
                    <div style={{ ...head, fontSize: 28, color: C.ink, whiteSpace: "nowrap" }}>Pesanan masuk</div>
                    <div style={{ ...mono, fontSize: 24, color: C.muted, marginTop: 2, whiteSpace: "nowrap" }}>☾ jam {notif2 > 0.5 ? "03.40" : "02.13"}</div>
                  </div>
                </div>
              ) : null}
            </Card>
          );
        })}

        {/* ===== E. Realita ===== */}
        <Stamp x={540} y={500} at={M.realita} until={M.cta - 0.2} rot={-6} size={70}>
          BUKAN CEPAT KAYA
        </Stamp>
        {[
          { x: 90, label: "GAJI 1", sub: "Kantor", at: M.gajiKedua, hi: false },
          { x: 560, label: "GAJI 2", sub: "Produk digital", at: M.gajiKedua + 0.5, hi: true },
        ].map((s) => (
          <Card key={s.label} x={s.x} y={640} w={430} h={260} at={s.at} until={M.cta - 0.2} style={s.hi ? { border: `3px solid ${C.blue}`, boxShadow: `0 18px 40px ${C.shadow}, 0 0 ${40 * glow}px rgba(36,87,214,${0.5 * glow})` } : undefined}>
            <div style={{ textAlign: "center", paddingTop: 50 }}>
              <div style={{ ...mono, fontSize: 24, letterSpacing: "0.2em", color: C.muted }}>{s.label}</div>
              <div style={{ ...head, fontSize: 50, color: s.hi ? C.blue : C.ink, marginTop: 14 }}>{s.sub}</div>
              {s.hi ? <div style={{ ...head, fontSize: 30, color: C.blue, marginTop: 14, opacity: glow }}>+ terus bertambah ✦</div> : <div style={{ ...head, fontSize: 30, color: C.muted, marginTop: 14 }}>tetap jalan</div>}
            </div>
          </Card>
        ))}

        {/* ===== F. CTA ===== */}
        <Title text="Mau tahu?" at={M.cta} until={99} />
        <Card x={110} y={400} w={860} h={150} at={M.cta + 0.3}>
          <div style={{ position: "absolute", left: 28, top: 32, width: 86, height: 86, borderRadius: 43, overflow: "hidden", background: C.blueSoft }}>
            <Img src={img("pose-halo.png")} style={{ width: 150, marginLeft: -26, marginTop: -6 }} />
          </div>
          <div style={{ position: "absolute", left: 140, top: 30, ...head, fontSize: 38, color: C.ink }}>@mahirambilpeluang</div>
          <div style={{ position: "absolute", left: 140, top: 82, ...mono, fontSize: 22, color: C.muted }}>① follow dulu</div>
          <div style={{ position: "absolute", right: 28, top: 40, borderRadius: 16, padding: "14px 26px", ...head, fontSize: 32, background: followed ? C.soft : C.blue, color: followed ? C.muted : "white", transform: `scale(${t >= M.follow && t < M.follow + 0.2 ? 0.92 : 1})` }}>{followed ? "Mengikuti ✓" : "Ikuti"}</div>
        </Card>
        <Card x={110} y={590} w={860} h={150} at={M.cta + 0.6}>
          <div style={{ position: "absolute", left: 28, top: 32, width: 86, height: 86, borderRadius: 43, background: C.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth={2} strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" fill={C.blueSoft} /></svg>
          </div>
          <div style={{ position: "absolute", left: 140, top: 82, ...mono, fontSize: 22, color: C.muted }}>② komen di bawah</div>
          <div style={{ position: "absolute", left: 140, top: 26, ...head, fontSize: 40, color: typed ? C.ink : C.muted }}>
            {typed || "Tambahkan komentar…"}
            {t >= M.komen && !sent ? <span style={{ color: C.blue }}>|</span> : null}
          </div>
          <div style={{ position: "absolute", right: 28, top: 36, width: 78, height: 78, borderRadius: 39, background: sent ? C.blue : C.soft, color: sent ? "white" : C.muted, ...head, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sent && t < M.komen + 0.95 ? 1.15 : 1})` }}>{sent ? "✓" : "➤"}</div>
        </Card>
        <Stamp x={760} y={830} at={M.komen + 0.75} rot={-8} size={46} color={C.blue}>
          PART 2 BESOK!
        </Stamp>

        <Caption />
        <Character />
      </div>
    </div>
  );
};
