// Semua warna, font, dan ukuran diambil dari sini (lihat STYLE.md).
// Nilai sementara = contoh di STYLE.md; ganti setelah brand diisi.
export const theme = {
  width: 1080,
  height: 1920,
  colors: {
    bg: "#F7F8FA",
    text: "#111111",
    accent: "#3B6FF6",
    muted: "#6B7079",
    line: "#D5D9E0",
    card: "#FFFFFF",
    onDark: "#F7F8FA",
    shadow: "rgba(17, 17, 17, 0.08)",
  },
  fonts: {
    heading: "'Inter Tight', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  size: {
    title: 104,
    body: 46,
    label: 26,
  },
  safe: {
    x: 96,
    top: 220,
    bottom: 320,
  },
} as const;
