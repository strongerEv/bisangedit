import React from "react";
import { Img, staticFile } from "remotion";
import { theme } from "../../components/theme";
import { HomeScreen as MakaryoHome } from "../makaryo/scenes/S02";

export const c = theme.colors;
export const RED = c.brand;
export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };

/** Layar aplikasi portofolio (semua rasio ±390×844). Makaryo digambar ulang (komponen dari video Makaryo). */
export const APPS = [
  { key: "warkas", label: "Kasir", name: "Warkas", src: "aset/warkas/kasir.webp" },
  { key: "fastreng", label: "Pesan-antar", name: "Fastreng", src: "aset/fastreng/02_home.png" },
  { key: "wismaku", label: "Kos", name: "Wismaku", src: "aset/wismaku/denah-hp.png" },
  { key: "makaryo", label: "Absensi", name: "Makaryo", src: null },
] as const;

/** HP putih bergaris tebal (gaya iklan web app). Titik tengah (x, y). */
export const AppPhone: React.FC<{ x: number; y: number; width: number; app?: (typeof APPS)[number] | null; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  x,
  y,
  width,
  app,
  style,
  children,
}) => {
  const h = (width * 844) / 390;
  const bez = Math.max(8, width * 0.035);
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2 - bez,
        top: y - h / 2 - bez,
        width: width + bez * 2,
        height: h + bez * 2,
        borderRadius: width * 0.13,
        background: c.text,
        boxShadow: `0 30px 70px ${c.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: width * 0.1, overflow: "hidden", background: c.card }}>
        {app?.src ? <Img src={staticFile(app.src)} style={{ width, height: h, display: "block" }} /> : null}
        {app && !app.src ? (
          <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: 844, transform: `scale(${width / 390})`, transformOrigin: "0 0", background: "#F2F4FB", ...font }}>
            <MakaryoHome />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

/** Catatan tempel kuning. */
export const Sticky: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => (
  <div style={{ position: "absolute", width: 250, padding: "26px 24px", background: "#FFE27A", color: c.text, ...font, fontWeight: 700, fontSize: 34, lineHeight: 1.2, boxShadow: `0 14px 30px ${c.shadow}`, ...style }}>{text}</div>
);
