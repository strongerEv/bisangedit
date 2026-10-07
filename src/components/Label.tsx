import React from "react";
import { theme } from "./theme";

/** Label kecil berbingkai putus-putus, misal "ADEGAN IMAJINASI". */
export const Label: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => (
  <div
    style={{
      alignSelf: "flex-start",
      border: `3px dashed ${theme.colors.text}`,
      borderRadius: 999,
      padding: "12px 28px",
      fontFamily: theme.fonts.mono,
      fontWeight: 500,
      fontSize: theme.size.label,
      letterSpacing: "0.08em",
      color: theme.colors.text,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {text}
  </div>
);
