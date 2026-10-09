import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, exitAt } from "../../components/motion";
import { theme } from "../../components/theme";
import { P } from "../kucing-jatuh/palette";

export { P };

/** Ukuran asli aset (px) di public/aset/cara-remotion. */
export const ASSET = {
  mochi_melambai: [289, 446],
  mochi_kaget: [242, 439],
  mochi_mengetik: [420, 342],
  mochi_menunjuk: [313, 453],
  mochi_berpikir: [273, 435],
  mochi_menonton: [311, 426],
  mochi_selebrasi: [282, 436],
  mochi_jempol: [282, 438],
  laptop_kosong: [407, 334],
  ikon_kode: [330, 261],
  roda_gigi: [309, 305],
  tombol_play: [286, 290],
  roket: [302, 338],
  file_video: [259, 326],
  papan_klap: [303, 341],
  percikan: [270, 286],
} as const;
export type AssetName = keyof typeof ASSET;

/** Gambar aset; posisi = titik tengah (x, y), ukuran = skala × ukuran asli. */
export const Asset: React.FC<{ name: AssetName; x: number; y: number; s?: number; style?: React.CSSProperties }> = ({ name, x, y, s = 1, style }) => {
  const [w, h] = ASSET[name];
  return (
    <Img
      src={staticFile(`aset/cara-remotion/${name}.png`)}
      style={{ position: "absolute", left: x - (w * s) / 2, top: y - (h * s) / 2, width: w * s, height: h * s, ...style }}
    />
  );
};

/** Latar foto + lapisan krem supaya teks terbaca. */
export const Bg: React.FC<{ name: "latar_studio" | "latar_gradasi" | "latar_bioskop"; veil?: number; children?: React.ReactNode }> = ({ name, veil = 0, children }) => (
  <AbsoluteFill>
    <Img src={staticFile(`aset/cara-remotion/${name}.png`)} style={{ position: "absolute", inset: 0, width: 1080, height: 1920, objectFit: "cover" }} />
    {veil ? <AbsoluteFill style={{ background: P.cream, opacity: veil }} /> : null}
    {children}
  </AbsoluteFill>
);

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: P.brown,
};

/** "LANGKAH n / 5" + lima segmen; segmen aktif terisi oranye. */
export const StepHeader: React.FC<{ step: number; dark?: boolean }> = ({ step, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fill = between(frame, fps, 0.05, 0.5);
  return (
    <div style={{ position: "absolute", left: 96, top: 230, width: 888 }}>
      <div style={{ ...mono, color: dark ? "white" : P.ink, marginBottom: 16 }}>
        LANGKAH <span style={{ color: P.orangeDark }}>{step}</span> / 5
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} style={{ flex: 1, height: 12, borderRadius: 6, background: dark ? "rgba(255,255,255,0.18)" : "rgba(122,74,46,0.18)", overflow: "hidden" }}>
            <div style={{ width: `${(n < step ? 1 : n === step ? fill : 0) * 100}%`, height: "100%", background: n === step ? P.orange : dark ? P.cream : P.brown }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Area judul; keluar sendiri di akhir adegan. */
export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 320, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 96, top, width: 888, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

/** Gelembung chat. me = pesan saya (kanan, gelap); selain itu balasan Claude (kiri, putih). */
export const Bubble: React.FC<{ me?: boolean; who?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ me, who, children, style }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: me ? "flex-end" : "flex-start", gap: 8, ...style }}>
    {who ? <div style={{ ...mono, fontSize: 24 }}>{who}</div> : null}
    <div
      style={{
        maxWidth: 720,
        background: me ? P.ink : "white",
        color: me ? "white" : P.ink,
        borderRadius: 32,
        borderBottomRightRadius: me ? 8 : 32,
        borderBottomLeftRadius: me ? 32 : 8,
        padding: "22px 30px",
        fontFamily: theme.fonts.heading,
        fontWeight: 600,
        fontSize: 40,
        lineHeight: 1.25,
        boxShadow: `0 14px 34px ${P.shadow}`,
      }}
    >
      {children}
    </div>
  </div>
);

/** Kartu putih standar. */
export const card: React.CSSProperties = {
  background: "white",
  borderRadius: 36,
  boxShadow: `0 24px 60px ${P.shadow}`,
};

/** Isi adegan yang keluar sendiri di akhir adegan (latar & header tetap → potongan mulus). */
export const Out: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return <AbsoluteFill style={{ opacity: exitAt(frame, fps, dur) }}>{children}</AbsoluteFill>;
};
