import { staticFile } from "remotion";

/**
 * Pustaka SFX — daftar lengkap di public/audio/sfx/KATALOG.md.
 *
 * sfx(url): efek dari @remotion/sfx lewat salinan lokal di public/audio/sfx/ (nama file sama dengan di URL), karena
 *           renderer tidak bisa mengunduh remotion.media dari container. Contoh: sfx(whoosh) dengan
 *           `import { whoosh } from "@remotion/sfx"`.
 * syn(nama): efek sintetis buatan sendiri (scripts/buat-sfx.py), contoh: syn("pop"), syn("kasir"), syn("riser").
 */
export const sfx = (url: string) => staticFile(`audio/sfx/${url.split("/").pop()}`);

export const syn = (nama: string) => staticFile(`audio/sfx/syn-${nama}.wav`);
