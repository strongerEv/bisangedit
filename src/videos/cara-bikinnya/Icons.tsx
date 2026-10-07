import React from "react";
import { theme } from "../../components/theme";

const c = theme.colors;

/** Ikon editor dengan timeline: bingkai + tiga jalur klip. */
export const TimelineIcon: React.FC = () => (
  <svg width={220} height={150} viewBox="0 0 220 150">
    <rect x={4} y={4} width={212} height={142} rx={18} fill={c.card} stroke={c.text} strokeWidth={6} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={24} y={30 + i * 34} width={60 + i * 24} height={20} rx={6} fill={i === 1 ? c.muted : c.line} />
        <rect x={96 + i * 24} y={30 + i * 34} width={96 - i * 24} height={20} rx={6} fill={c.line} />
      </g>
    ))}
    <line x1={128} y1={18} x2={128} y2={132} stroke={c.text} strokeWidth={4} />
  </svg>
);

/** Ikon drag-and-drop: klip + kursor. */
export const DragIcon: React.FC = () => (
  <svg width={220} height={150} viewBox="0 0 220 150">
    <rect x={20} y={30} width={120} height={60} rx={14} fill={c.line} stroke={c.text} strokeWidth={5} strokeDasharray="12 10" />
    <path
      d="M 120 70 L 120 136 L 136 120 L 148 146 L 160 140 L 148 114 L 170 114 Z"
      fill={c.text}
      stroke={c.card}
      strokeWidth={4}
      strokeLinejoin="round"
    />
  </svg>
);

/** Awan dengan label. */
export const CloudIcon: React.FC<{ label?: string }> = ({ label = "CLOUD" }) => (
  <svg width={300} height={170} viewBox="0 0 300 170">
    <path
      d="M 70 150 C 30 150 14 120 22 96 C 30 72 56 64 74 70 C 80 36 110 16 146 18 C 186 20 210 48 214 74 C 248 68 280 90 280 120 C 280 140 264 150 244 150 Z"
      fill={c.card}
      stroke={c.text}
      strokeWidth={6}
      strokeLinejoin="round"
    />
    <text
      x={150}
      y={116}
      textAnchor="middle"
      fontFamily={theme.fonts.mono}
      fontWeight={500}
      fontSize={26}
      letterSpacing="0.12em"
      fill={c.text}
    >
      {label}
    </text>
  </svg>
);
