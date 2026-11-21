import { staticFile } from "remotion";

/**
 * Efek dari @remotion/sfx dipakai lewat salinan lokal di public/audio/sfx/ (nama file sama dengan di URL), karena
 * renderer tidak bisa mengunduh remotion.media dari container. Tambah efek baru:
 *   curl -o public/audio/sfx/<nama>.wav https://remotion.media/<nama>.wav
 */
export const sfx = (url: string) => staticFile(`audio/sfx/${url.split("/").pop()}`);
