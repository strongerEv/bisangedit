import React from "react";
import { theme } from "./theme";

/**
 * Watermark brand (lihat STYLE.md → Watermark). Default "© Youcanbuild"; `text` untuk akun lain (mis. "@yumust").
 * Teks biasa, kecil, opacity 50%, tengah-bawah (y ±1650) — bukan di pojok supaya tidak bisa dibuang dengan crop.
 * `dark` = latar gelap → teks putih.
 */
export const Watermark: React.FC<{ dark?: boolean; y?: number; text?: string }> = ({ dark, y = 1650, text = "© Youcanbuild" }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      width: 1080,
      top: y - 18,
      textAlign: "center",
      fontFamily: theme.fonts.heading,
      fontWeight: 600,
      fontSize: 29,
      letterSpacing: "0.02em",
      color: dark ? "#FFFFFF" : "#1B1F1D",
      opacity: 0.5,
      pointerEvents: "none",
      zIndex: 50,
    }}
  >
    {text}
  </div>
);
