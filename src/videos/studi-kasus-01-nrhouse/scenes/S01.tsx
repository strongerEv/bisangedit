import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { BoardView, Circle, Cork, HAND, HazardTape, InkStamp, Magnifier, Note, PB, Pin, Polaroid, Tape, Thread, useHandFont } from "../../../components/PapanBukti";
import { Backdrop, C, Caption, Card, Character, head, img } from "../../mahir-produk-digital/parts";
import { CAM, CAPTIONS, MARKERS as M, POSE_AT, SUMBER, TANGGA, WORLD } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const sk = (f: string) => staticFile(`aset/studi-kasus-01/${f}`);

// papan = layar penuh (karakter tidak ditampilkan di seri studi kasus); subtitle di bawah papan
const VIEW = { x: 0, y: 0, w: 1080, h: 1600 };

/** Tulisan tangan lepas (tanpa kertas). */
const Hand: React.FC<{ x: number; y: number; at: number; size?: number; rot?: number; color?: string; children: React.ReactNode }> = ({ x, y, at, size = 44, rot = 0, color = PB.ink, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at) return null;
  const w = interpolate(t, [at, at + 0.5], [0, 100], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, fontFamily: HAND, fontWeight: 700, fontSize: size, color, transform: `rotate(${rot}deg)`, whiteSpace: "nowrap", clipPath: `inset(0 ${100 - w}% 0 0)` }}>{children}</div>
  );
};

/** Isi catatan tangga harga. */
const Tangga: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <div style={{ position: "relative", height: 330 }}>
      {TANGGA.map((s, i) => {
        const p = enterAt(frame, fps, s.at, 0.3);
        return (
          <div key={s.label} style={{ position: "absolute", left: 30 + i * 235, bottom: 0, width: 240, height: 80 + i * 70, borderTop: `5px solid ${PB.ink}`, borderLeft: `5px solid ${PB.ink}`, background: p > 0.5 ? (i === 3 ? "rgba(245,196,0,0.55)" : "rgba(36,87,214,0.14)") : "transparent" }}>
            {p > 0 ? (
              <div style={{ position: "absolute", left: 8, top: 4, opacity: p, transform: `scale(${0.6 + 0.4 * p})`, transformOrigin: "0 0", textAlign: "left" }}>
                <div style={{ fontSize: 34, lineHeight: 1 }}>{s.label}</div>
                <div style={{ fontSize: 52, lineHeight: 1, color: i === 3 ? PB.red : "#2457D6" }}>
                  {s.harga}
                  {i === 3 ? " ★" : ""}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
      {t >= M.kenalan ? <div style={{ position: "absolute", left: 10, top: 0, fontSize: 44, color: PB.red, clipPath: `inset(0 ${100 - interpolate(t, [M.kenalan, M.kenalan + 0.5], [0, 100], clamp)}% 0 0)` }}>↓ murah = kenalan 👋</div> : null}
      {t >= M.percaya ? <div style={{ position: "absolute", right: 0, top: 50, fontSize: 44, color: PB.red, transform: "rotate(-6deg)", clipPath: `inset(0 ${100 - interpolate(t, [M.percaya, M.percaya + 0.5], [0, 100], clamp)}% 0 0)` }}>mahal = percaya 🤝 ↑</div> : null}
    </div>
  );
};

export const S01: React.FC<{ dur: number }> = () => {
  useHandFont();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fade = interpolate(t, [M.akhir - 0.5, M.akhir], [1, 0], clamp);
  const lesson = enterAt(frame, fps, M.l1 - 0.3, 0.4);
  const cta = enterAt(frame, fps, M.cta - 0.1, 0.4);
  const komen = "bedah akun @…".slice(0, Math.max(0, Math.floor((t - M.komen - 0.3) * 10)));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Backdrop />
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        <BoardView keys={CAM} {...VIEW} worldW={WORLD.w} worldH={WORLD.h} style={{ opacity: 1 - 0.85 * cta, borderRadius: 0 }}>
          <Cork w={WORLD.w} h={WORLD.h} />

          {/* ===== Kepala papan ===== */}
          <Tape x={40} y={50} at={0.1} size={84} rot={-2}>
            STUDI KASUS 1
          </Tape>
          <Hand x={50} y={170} at={0.9} size={64} rot={-1}>
            @nrhouse_id
          </Hand>
          <div style={{ position: "absolute", right: 40, top: 196, width: 470, textAlign: "right", ...head, fontWeight: 600, fontSize: 24, color: "rgba(35,32,27,0.8)", background: "rgba(255,255,255,0.65)", padding: "6px 12px", borderRadius: 8 }}>{SUMBER}</div>

          {/* ===== Baris 1: profil ===== */}
          <Polaroid x={40} y={290} w={560} h={420} src={sk("p1-profil.jpg")} at={1.0} rot={-3} caption="@nrhouse_id" />
          <InkStamp x={330} y={600} at={M.omzet + 0.9} until={M.nama} size={60} rot={-9} sub="sumber: @nrhouse_id">
            OMZET PULUHAN JUTA
            <br />/ 15 HARI
          </InkStamp>
          <Magnifier x={402} y={434} r={90} at={M.followers - 0.1} until={M.views + 0.3} />
          <Note x={660} y={580} w={300} at={M.nama + 0.2} rot={6} size={56}>
            Nurdin N
          </Note>
          <Note x={640} y={300} w={410} at={M.views} rot={2} size={44}>
            <div>598RB followers</div>
            <div style={{ color: PB.red }}>7,9JT views / 30 hari</div>
          </Note>
          <Circle x={380} y={380} w={150} h={90} at={M.followers + 0.2} until={M.strategi1 - 0.2} />
          <Thread pts={[[334, 296], [845, 308]]} at={M.views + 0.3} w={WORLD.w} h={WORLD.h} />

          {/* ===== Baris 2: personal branding ===== */}
          <Tape x={40} y={830} at={M.strategi1 + 0.2} size={50} rot={-1}>
            STRATEGI 1
          </Tape>
          <Hand x={360} y={826} at={M.branding} size={64} rot={-2} color={PB.red}>
            personal branding
          </Hand>
          <Polaroid x={30} y={940} w={290} h={320} src={sk("p2-rumah.jpg")} at={M.hidupnya + 0.1} rot={-4} caption="rumah" pos="50% 40%" />
          <Polaroid x={380} y={950} w={290} h={320} src={sk("p3-keluarga.jpg")} at={M.hidupnya + 0.5} rot={3} caption="keluarga" pos="50% 30%" />
          <Polaroid x={730} y={940} w={290} h={320} src={sk("p4-konten.jpg")} at={M.hidupnya + 0.9} rot={-2} caption="daily" pos="50% 10%" />
          {t >= M.kegiatan + 0.3 ? (
            <div style={{ position: "absolute", left: 930, top: 1250, width: 130, textAlign: "center", opacity: enterAt(frame, fps, M.kegiatan + 0.3, 0.3), transform: `rotate(8deg) scale(${enterAt(frame, fps, M.kegiatan + 0.3, 0.3)})`, zIndex: 45 }}>
              <Img src={sk("testimoni.jpg")} style={{ width: 120, height: 120, borderRadius: 60, border: "6px solid white", boxShadow: "2px 6px 10px rgba(0,0,0,0.3)", objectFit: "cover" }} />
              <div style={{ fontFamily: HAND, fontWeight: 700, fontSize: 34, color: PB.ink }}>Testimoni</div>
            </div>
          ) : null}
          <Circle x={10} y={920} w={340} h={420} at={M.rumah} until={M.keluarga} />
          <Circle x={360} y={930} w={340} h={420} at={M.keluarga} until={M.kegiatan} />
          <Circle x={710} y={920} w={340} h={420} at={M.kegiatan} until={M.pengin} />
          <Note x={600} y={1360} w={330} at={M.jarang + 0.2} rot={-3} size={40}>
            <div style={{ position: "relative" }}>
              🛒 jualan langsung
              {t >= M.jarang + 0.5 ? <div style={{ position: "absolute", left: 10, right: 10, top: "50%", height: 6, background: PB.red, transform: `rotate(-6deg) scaleX(${interpolate(t, [M.jarang + 0.5, M.jarang + 0.8], [0, 1], clamp)})`, transformOrigin: "0 50%" }} /> : null}
            </div>
          </Note>
          <Note x={50} y={1350} w={520} at={M.pengin + 0.3} rot={2} size={54} color="#FFF6B8">
            JUAL GAYA HIDUP,
            <br />
            BUKAN PRODUK
          </Note>
          <Thread pts={[[189, 946], [539, 956], [889, 946], [310, 1358]]} at={M.pengin} dur={0.8} w={WORLD.w} h={WORLD.h} />

          {/* ===== Baris 3: alur jualan ===== */}
          <Hand x={50} y={1530} at={M.bio} size={56} rot={-2} color={PB.red}>
            link di bio 👆
          </Hand>
          <Polaroid x={40} y={1620} w={300} h={400} src={sk("p5-landing.jpg")} at={M.bio + 0.4} rot={-2} caption="nrhouse.id" scrollAt={M.halaman} scrollDur={2.2} />
          <Polaroid x={400} y={1630} w={300} h={300} src={sk("p6-produk.jpg")} at={M.halaman + 0.8} rot={3} caption="semua produk" pos="50% 25%" />
          <Polaroid x={740} y={1650} w={290} h={150} src={sk("p7-wa.jpg")} at={M.wa} rot={-3} caption="tanya WA" pos="50% 60%" />
          {t >= M.wa + 0.4 ? (
            <div style={{ position: "absolute", left: 730, top: 1900, width: 320, background: "#DCF8C6", borderRadius: "22px 22px 22px 6px", padding: "16px 20px", boxShadow: "2px 6px 12px rgba(0,0,0,0.2)", ...head, fontWeight: 600, fontSize: 30, color: "#1F2C20", opacity: enterAt(frame, fps, M.wa + 0.4, 0.3), transform: `scale(${enterAt(frame, fps, M.wa + 0.4, 0.3)})`, transformOrigin: "0 100%" }}>
              💬 Kak, cocoknya produk yang mana ya?
            </div>
          ) : null}
          <Circle x={20} y={1600} w={350} h={500} at={M.bio + 0.5} until={M.halaman + 0.7} />
          <Circle x={380} y={1610} w={350} h={400} at={M.halaman + 0.8} until={M.bingung} />
          <Circle x={720} y={1630} w={340} h={250} at={M.wa} until={M.bertingkat} />
          <Thread pts={[[204, 1626], [564, 1636], [899, 1656]]} at={M.wa + 0.2} dur={0.6} w={WORLD.w} h={WORLD.h} />

          {/* ===== Baris 4: tangga produk ===== */}
          <Note x={30} y={2110} w={1020} at={M.bertingkat} rot={-1} size={40}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>TANGGA PRODUK</div>
            <Tangga />
          </Note>

          {/* ===== Baris 5: iklan ===== */}
          <Tape x={40} y={2580} at={M.strategi2 + 0.1} size={50} rot={1}>
            STRATEGI 2 · IKLAN
          </Tape>
          <Polaroid x={40} y={2680} w={500} h={340} src={sk("p8-metaads.jpg")} at={M.strategi2 + 0.5} rot={3} caption="kelas Meta Ads" pos="50% 20%" />
          {t >= M.meta ? (
            <div style={{ position: "absolute", left: 620, top: 2660, width: 420, height: 220 }}>
              <div style={{ position: "absolute", left: 0, top: 30, fontSize: 110, transform: `rotate(-12deg) scale(${enterAt(frame, fps, M.meta, 0.3)})` }}>📣</div>
              {Array.from({ length: 14 }, (_, i) => {
                const a = -0.9 + (i % 7) * 0.28;
                const d = interpolate(t, [M.meta + 0.2 + (i % 3) * 0.2, M.meta + 1.6 + (i % 3) * 0.2], [0, 1], clamp) * (120 + (i % 4) * 45);
                return <div key={i} style={{ position: "absolute", left: 120 + Math.cos(a) * d, top: 100 + Math.sin(a) * d, width: 28, height: 28, borderRadius: 14, background: i % 2 ? "#2457D6" : PB.red, opacity: d > 0 ? 1 : 0 }} />;
              })}
            </div>
          ) : null}
          <Note x={640} y={2900} w={380} at={M.meta + 2.0} rot={-4} size={56} color="#FFF6B8">
            ORGANIK
            <br />+ IKLAN
          </Note>
          <Circle x={20} y={2660} w={560} h={440} at={M.strategi2 + 0.6} until={M.meta} />
          <Thread pts={[[830, 2908], [310, 1358]]} at={M.meta + 2.3} dur={0.6} w={WORLD.w} h={WORLD.h} />
          <Thread pts={[[830, 2908], [304, 2686]]} at={M.meta + 2.5} dur={0.4} w={WORLD.w} h={WORLD.h} />

          <HazardTape x={-30} y={3110} w={1140} rot={-1.2} text="STUDI KASUS" drift={t * 40} />
        </BoardView>

        {/* ===== Pelajaran (di atas papan) ===== */}
        {t >= M.l1 - 0.3 && t < M.cta + 0.2 ? (
          <div style={{ position: "absolute", left: VIEW.x, top: VIEW.y, width: VIEW.w, height: VIEW.h, background: `rgba(255,255,255,${0.8 * lesson})`, borderRadius: 0 }}>
            {["Konten → kepercayaan", "Siapkan tangga produk", "Baru gas iklan"].map((s, i) => (
              <Note key={s} x={110 + (i % 2) * 40} y={330 + i * 300} w={820} at={[M.l1, M.l2, M.l3][i]} rot={[-3, 2, -1][i]} size={76}>
                ✓ {s}
              </Note>
            ))}
          </div>
        ) : null}

        {/* ===== CTA ===== */}
        {t >= M.cta - 0.1 ? (
          <>
            <div style={{ position: "absolute", left: 300, top: 360, opacity: cta }}>
              <div style={{ position: "relative", width: 480, height: 420, background: "white", boxShadow: "4px 12px 24px rgba(0,0,0,0.25)", transform: `rotate(-3deg) translateY(${(1 - cta) * -60}px)` }}>
                <div style={{ position: "absolute", left: 18, top: 18, right: 18, height: 320, background: "#E9EBF0", display: "flex", alignItems: "center", justifyContent: "center", ...head, fontWeight: 900, fontSize: 180, color: "#B5BAC4" }}>?</div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 14, textAlign: "center", fontFamily: HAND, fontWeight: 700, fontSize: 48, color: PB.ink }}>STUDI KASUS 2</div>
                <Pin x={240} y={8} at={M.cta + 0.1} />
              </div>
            </div>
            <Card x={110} y={900} w={860} h={140} at={M.follow - 0.2} until={99}>
              <div style={{ position: "absolute", left: 28, top: 26, width: 86, height: 86, borderRadius: 43, overflow: "hidden", background: C.blueSoft }}>
                <Img src={img("pose-halo.png")} style={{ width: 150, marginLeft: -26, marginTop: -6 }} />
              </div>
              <div style={{ position: "absolute", left: 140, top: 44, ...head, fontSize: 38, color: C.ink }}>@mahirambilpeluang</div>
              <div style={{ position: "absolute", right: 28, top: 34, borderRadius: 16, padding: "14px 26px", ...head, fontSize: 32, background: t >= M.follow + 0.2 ? C.soft : C.blue, color: t >= M.follow + 0.2 ? C.muted : "white" }}>{t >= M.follow + 0.2 ? "Mengikuti ✓" : "Ikuti"}</div>
            </Card>
            <Card x={110} y={1070} w={860} h={110} at={M.komen} until={99}>
              <div style={{ position: "absolute", left: 28, top: 30, ...head, fontWeight: 600, fontSize: 36, color: komen ? C.ink : C.muted }}>💬 {komen || "Tambahkan komentar…"}</div>
            </Card>
          </>
        ) : null}

        {t < M.nama + 0.4 ? (
          <div style={{ position: "absolute", inset: 0, transform: "translateY(-250px)", opacity: interpolate(t, [M.nama - 0.1, M.nama + 0.4], [1, 0], clamp) }}>
            <Character poses={POSE_AT} />
          </div>
        ) : null}
        <Caption captions={CAPTIONS} top={1650} />
      </div>
    </div>
  );
};
