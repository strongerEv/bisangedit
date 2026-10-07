// Potongan kode asli dari video pertama (disederhanakan), ≤ 30 karakter per baris.
export const CODE = [
  "export const S02 = () => {",
  "  const f = useCurrentFrame();",
  "  const masuk = spring({",
  "    frame: f, fps: 30,",
  "  });",
  "  return (",
  "    <Istana inside={masuk} />",
  "  );",
  "};",
];

export const CODE_EXTRA = ["", "// siap preview ✓"];

export const countChars = (lines: readonly string[]) => lines.reduce((n, l) => n + l.length + 1, 0);
