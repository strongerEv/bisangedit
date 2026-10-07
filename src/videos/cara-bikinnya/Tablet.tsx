import React from "react";
import { theme } from "../../components/theme";
import { SCREEN, TABLET } from "./layout";

type Props = {
  /** Titik tengah tablet (px). */
  x: number;
  y: number;
  s?: number;
  appear?: number;
  screenBg?: string;
  children?: React.ReactNode;
};

/** Garis bentuk tablet (bezel gelap). Isi layar = children, ukuran SCREEN. */
export const Tablet: React.FC<Props> = ({ x, y, s = 1, appear = 1, screenBg = theme.colors.card, children }) => (
  <div
    style={{
      position: "absolute",
      left: x - TABLET.w / 2,
      top: y - TABLET.h / 2,
      width: TABLET.w,
      height: TABLET.h,
      borderRadius: TABLET.radius,
      background: theme.colors.text,
      boxShadow: `0 30px 70px ${theme.colors.shadow}`,
      opacity: appear,
      transform: `scale(${s * (1.06 - 0.06 * appear)})`,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: TABLET.w / 2 - 5,
        top: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        background: theme.colors.codeMuted,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: TABLET.bezel,
        top: TABLET.bezel,
        width: SCREEN.w,
        height: SCREEN.h,
        borderRadius: 30,
        overflow: "hidden",
        background: screenBg,
      }}
    >
      {children}
    </div>
  </div>
);
