# Aturan Timeline

Prinsip utama: **frame = f(t)**.
Semua yang tampil di layar dihitung dari waktu. Tidak ada angka waktu yang "nyasar" di dalam kode adegan.

---

## 1. Satu sumber kebenaran

Semua angka waktu sebuah video ada di **satu file**: `src/videos/<nama-video>/timeline.ts`.

```ts
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Waktu dalam DETIK, sama persis dengan TREATMENT.md
export const SCENES = [
  { id: "S01", label: "Hook",        start: 0.0,  end: 3.2  },
  { id: "S02", label: "Masalah",     start: 3.2,  end: 8.5  },
  { id: "S03", label: "Solusi",      start: 8.5,  end: 15.0 },
  // …
  { id: "S99", label: "Penutup",     start: 27.0, end: 30.0 },
] as const;

// Momen penting di dalam audio (kata kunci, ketukan, jeda)
export const MARKERS = {
  kataKunci1: 5.1,
  dropMusik:  8.5,
} as const;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
```

Aturan:
- Tulis waktu dalam **detik** (mudah dibaca manusia). Ubah ke frame hanya lewat `sec()`.
- **Dilarang** menulis angka frame langsung (misalnya `from={96}`) di file adegan.
- Urutan dan waktu di `timeline.ts` **harus sama** dengan `TREATMENT.md`. Kalau berbeda, `TREATMENT.md` yang benar.

## 2. Waktu adegan bersifat lokal

- Setiap adegan dibungkus `<Sequence from={sec(start)} durationInFrames={sec(end - start)}>`.
- Di dalam adegan, `useCurrentFrame()` dimulai dari **0**. Animasi ditulis relatif terhadap awal adegan.
- Akibatnya, menggeser adegan cukup dengan mengubah `timeline.ts`. Isi adegan tidak perlu disentuh.

## 3. Struktur di dalam adegan

Setiap adegan dibagi menjadi tiga fase:

| Fase   | Durasi           | Isi                                   |
|--------|------------------|---------------------------------------|
| Masuk  | 0,3 – 0,6 dtk    | elemen muncul (fade, slide, scale)    |
| Tahan  | sisa durasi      | penonton membaca / memahami           |
| Keluar | 0,2 – 0,4 dtk    | elemen hilang atau berubah ke adegan berikut |

- Elemen dalam satu adegan muncul **berurutan** (stagger 0,08 – 0,15 dtk), bukan sekaligus.
- Gunakan `spring()` atau `interpolate()` dengan easing. Jangan gerakan linear untuk elemen utama.
- Semua `interpolate()` wajib memakai `extrapolateLeft: "clamp"` dan `extrapolateRight: "clamp"`.

## 4. Durasi minimum (waktu baca)

- Teks di layar tampil minimal **0,4 dtk per kata + 0,5 dtk**, dan tidak kurang dari **1,2 dtk**.
- Judul besar (≤ 4 kata): minimal **1,5 dtk**.
- Kalau naskah terlalu padat untuk durasi yang ada, **laporkan**. Jangan percepat teks sampai tidak terbaca.

## 5. Sinkron dengan audio

- Audio adalah patokan. Setelah audio diupload, ukur durasinya dan catat waktu tiap kalimat ke `MARKERS`.
- Perubahan teks di layar terjadi **pada atau sedikit sebelum** (maks. 0,1 dtk) kata itu diucapkan.
- Pergantian adegan diletakkan di **jeda** antar kalimat, bukan di tengah kata.
- Kalau memakai musik dengan BPM tetap:
  ```ts
  export const BPM = 128;
  export const beat = (n: number) => (60 / BPM) * n;   // detik ke-n ketukan
  ```
  Pergantian adegan besar jatuh di ketukan (`beat(n)`), idealnya di awal bar (kelipatan 4).

## 6. Transisi

- Transisi antar adegan: **0,3 – 0,5 dtk**.
- Kalau memakai `@remotion/transitions`, durasi transisi ikut dihitung dan dicatat di `timeline.ts`.
- Maksimal **satu jenis transisi utama** per video, supaya konsisten.

## 7. Penutup

- Adegan terakhir selalu **logo + CTA**, minimal **2,5 dtk**.
- Durasi total = akhir audio + **ekor 1 – 2 dtk** supaya penutup tidak terpotong.

## 8. Cek timeline (wajib sebelum lapor selesai)

- [ ] Tidak ada celah atau tumpang-tindih antar adegan (kecuali transisi yang disengaja)
- [ ] `end` adegan terakhir = `DURATION`
- [ ] Semua teks memenuhi durasi minimum
- [ ] Tidak ada angka frame langsung di `scenes/`
- [ ] `timeline.ts` sama dengan `TREATMENT.md`
