import "@fontsource/inter-tight/500.css";
import "@fontsource/inter-tight/600.css";
import "@fontsource/inter-tight/700.css";
import "@fontsource/jetbrains-mono/500.css";
import { continueRender, delayRender } from "remotion";

// Tahan render sampai font selesai dimuat, supaya frame pertama tidak memakai font cadangan.
const handle = delayRender("Memuat font");
Promise.all([
  document.fonts.load("500 40px 'Inter Tight'"),
  document.fonts.load("600 40px 'Inter Tight'"),
  document.fonts.load("700 40px 'Inter Tight'"),
  document.fonts.load("500 40px 'JetBrains Mono'"),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
