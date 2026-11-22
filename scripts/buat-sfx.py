"""Pustaka SFX sintetis (dibuat dari nol dengan numpy — bebas hak cipta, tanpa internet).
Jalankan:  python3 scripts/buat-sfx.py   → public/audio/sfx/syn-<nama>.wav
Pakai di kode:  import { syn } from "../../components/sfx";  <Audio src={syn("pop")} />
Daftar & kegunaan: public/audio/sfx/KATALOG.md"""
import os, wave
import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "../public/audio/sfx")
rng = np.random.default_rng(11)
MADE = []


def T(d):
    return np.arange(int(SR * d)) / SR


def env(n, a=0.005, r=0.05):
    e = np.ones(n)
    na, nr = max(1, int(SR * a)), max(1, int(SR * r))
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def lp(x, k):
    return np.convolve(x, np.ones(k) / k, mode="same") if k > 1 else x


def hp(x, k):
    return x - lp(x, k)


def noise(d):
    return rng.normal(0, 1, int(SR * d))


def tone(f, d, kind="sin"):
    t = T(d)
    f = np.broadcast_to(f, t.shape) if np.ndim(f) else np.full(t.shape, f)
    ph = 2 * np.pi * np.cumsum(f) / SR
    if kind == "sin":
        return np.sin(ph)
    if kind == "sq":
        return np.sign(np.sin(ph))
    if kind == "saw":
        return 2 * ((ph / (2 * np.pi)) % 1) - 1
    if kind == "tri":
        return 2 * np.abs(2 * ((ph / (2 * np.pi)) % 1) - 1) - 1


def bell(f, d=0.9, decay=5):
    t = T(d)
    x = sum(np.sin(2 * np.pi * f * m * t) * a for m, a in [(1, 1), (2.76, 0.4), (5.4, 0.2), (8.9, 0.08)])
    return x * np.exp(-t * decay) * env(len(t), 0.002, 0.02)


def place(total, parts):
    """parts: [(detik_mulai, sinyal)] → satu sinyal."""
    y = np.zeros(int(SR * total))
    for s, x in parts:
        i = int(SR * s)
        n = min(len(x), len(y) - i)
        y[i:i + n] += x[:n]
    return y


def save(name, x, gain=0.8, desc=""):
    x = np.asarray(x, dtype=float)
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    st = np.stack([x, x], axis=1)
    path = os.path.join(OUT, f"syn-{name}.wav")
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())
    MADE.append((name, len(x) / SR, desc))


# ---------------- UI & transisi ----------------
t = T(0.12); save("pop", np.sin(2 * np.pi * (900 - 5000 * t) * t) * np.exp(-t * 40), 0.7, "Pop muncul (teks/ikon masuk)")
t = T(0.08); save("pop-kecil", np.sin(2 * np.pi * (1600 - 9000 * t) * t) * np.exp(-t * 60), 0.5, "Gelembung kecil, item list muncul")
t = T(0.05); save("klik", lp(noise(0.05) * np.exp(-t * 200), 2) + np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 120) * 0.5, 0.5, "Klik lembut / tap layar")
t = T(0.09); save("tombol", np.sin(2 * np.pi * 180 * t) * np.exp(-t * 50) + lp(noise(0.09), 3) * np.exp(-t * 90) * 0.4, 0.6, "Tombol ditekan (lebih berat)")
t = T(0.035); save("ketik", lp(noise(0.035) * np.exp(-t * 260), 3) + np.sin(2 * np.pi * 3200 * t) * np.exp(-t * 300) * 0.3, 0.35, "Satu ketukan keyboard (pakai per huruf)")


def whoosh(d, k0=40, k1=6):
    n = noise(d); t = T(d)
    shape = np.sin(np.pi * t / d) ** 2
    out = np.zeros_like(n); cs = np.cumsum(np.insert(n, 0, 0))
    k = (k0 - (k0 - k1) * shape).astype(int)
    for i in range(len(n)):
        a = max(0, i - k[i]); out[i] = (cs[i + 1] - cs[a]) / (i + 1 - a)
    return out * shape


save("whoosh-panjang", whoosh(1.0), 0.55, "Transisi besar / pindah babak")
save("swish", whoosh(0.25, 20, 3), 0.55, "Geser cepat / teks melesat")
t = T(0.3); save("swipe", hp(noise(0.3), 8) * np.sin(np.pi * t / 0.3) ** 3, 0.4, "Swipe layar HP")
t = T(2.0); save("riser", (tone(200 + 900 * (t / 2) ** 2, 2.0, "saw") * 0.4 + hp(noise(2.0), 6) * 0.6) * (t / 2) ** 2, 0.6, "Ketegangan naik sebelum reveal")
t = T(1.5); save("impact", lp(np.sin(2 * np.pi * (90 - 50 * t) * t) * np.exp(-t * 4) + noise(1.5) * np.exp(-t * 25) * 0.6, 8), 0.85, "Hantaman / angka besar muncul")
t = T(2.0); save("boom-sinematik", lp(np.sin(2 * np.pi * (60 - 25 * t) * t) * np.exp(-t * 1.6), 4) + lp(noise(2.0), 40) * np.exp(-t * 3) * 0.5, 0.9, "Bass drop sinematik (judul/twist)")
gl = np.concatenate([tone(rng.uniform(200, 2000), 0.03, rng.choice(["sq", "saw"])) * rng.uniform(0.3, 1) if rng.random() > 0.3 else np.zeros(int(SR * 0.03)) for _ in range(14)])
save("glitch", gl, 0.5, "Glitch digital / layar error")

# ---------------- notifikasi & status ----------------
save("notifikasi", place(0.6, [(0, bell(1318, 0.4, 9)), (0.11, bell(1760, 0.5, 8))]), 0.5, "Notifikasi HP dua nada")
save("pesan-masuk", place(0.35, [(0, bell(2093, 0.25, 14)), (0.07, bell(2637, 0.28, 14))]), 0.45, "Chat/pesan masuk")
save("sukses", place(1.0, [(i * 0.09, bell(f, 0.6, 6)) for i, f in enumerate([1047, 1319, 1568, 2093])]), 0.5, "Berhasil / centang hijau")
t = T(0.5); save("error", tone(150, 0.5, "sq") * env(len(t), 0.01, 0.05) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 8 * t))), 0.4, "Buzzer salah / ditolak")
save("ding-lonceng", bell(1568, 1.6, 3), 0.55, "Lonceng jernih (ide/insight)")
sp = place(1.4, [(0.07 * i, bell(f)) for i, f in enumerate([1568, 1976, 2349, 3136])])
save("sparkle", sp, 0.45, "Kilau ✨ (keren, tampan, bersinar)")

# ---------------- uang ----------------
save("koin", place(0.6, [(0, bell(2637, 0.5)), (0.08, bell(3951, 0.5))]), 0.4, "Satu koin")
save("koin-banyak", place(1.6, [(rng.uniform(0, 1.1), bell(rng.uniform(2400, 4200), 0.4, 9) * rng.uniform(0.3, 1)) for _ in range(26)]), 0.5, "Hujan koin / jackpot")
drawer = lp(noise(0.25), 6) * np.exp(-T(0.25) * 14)
save("kasir", place(1.2, [(0, drawer * 0.6), (0.12, bell(2637, 0.9, 4)), (0.16, bell(3520, 0.9, 4))]), 0.55, "Cha-ching mesin kasir (gaji, untung)")

# ---------------- waktu & tubuh ----------------
tick = lp(noise(0.03), 2) * np.exp(-T(0.03) * 300) + np.sin(2 * np.pi * 2500 * T(0.03)) * np.exp(-T(0.03) * 200)
tock = lp(noise(0.03), 4) * np.exp(-T(0.03) * 300) + np.sin(2 * np.pi * 1700 * T(0.03)) * np.exp(-T(0.03) * 200)
save("detak-jam", place(2.0, [(i * 0.5, tick if i % 2 == 0 else tock) for i in range(4)]), 0.5, "Tik-tok jam 2 dtk (waktu berjalan)")
beat = lp(np.sin(2 * np.pi * 55 * T(0.15)) * np.exp(-T(0.15) * 25), 10)
save("detak-jantung", place(1.6, [(0, beat), (0.22, beat * 0.7), (0.8, beat), (1.02, beat * 0.7)]), 0.8, "Deg-deg (tegang, gugup)")
t = T(0.12); save("langkah", lp(np.sin(2 * np.pi * 90 * t) * np.exp(-t * 40) + noise(0.12) * 0.3 * np.exp(-t * 60), 10), 0.5, "Satu langkah kaki")
t = T(0.5); save("pintu", lp(np.sin(2 * np.pi * 70 * t) * np.exp(-t * 12) + noise(0.5) * 0.4 * np.exp(-t * 30), 14), 0.7, "Pintu ditutup")
t = T(0.25); save("pukulan", lp(np.sin(2 * np.pi * (140 - 300 * t) * t) * np.exp(-t * 22) + noise(0.25) * np.exp(-t * 40) * 0.8, 5), 0.8, "Pukulan / tamparan kartun")
t = T(0.6); save("jatuh", lp(np.sin(2 * np.pi * 60 * t) * np.exp(-t * 9) + noise(0.6) * np.exp(-t * 18) * 0.7, 16), 0.8, "Badan/benda jatuh ke lantai")

# ---------------- kartun & 8-bit ----------------
t = T(0.6); save("boing", np.sin(2 * np.pi * np.cumsum(260 + 140 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 4)) / SR) * np.exp(-t * 4), 0.6, "Per/pegas memantul")
t = T(0.8); save("siul-naik", tone(500 + 1400 * (t / 0.8), 0.8, "sin") * env(len(t), 0.02, 0.08), 0.5, "Siulan naik (melesat, kaget)")
t = T(0.8); save("siul-turun", tone(1900 - 1400 * (t / 0.8), 0.8, "sin") * env(len(t), 0.02, 0.08), 0.5, "Siulan turun (jatuh, gagal)")
notes = [(392, 0.32), (370, 0.32), (349, 0.32), (330, 1.0)]
parts = []
for f, d in notes:
    tt = T(d); vib = 1 + (0.012 * np.sin(2 * np.pi * 6 * tt) if d > 0.5 else np.zeros_like(tt))
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    parts.append(lp(sum(np.sin(ph * m) / m for m in range(1, 9)), 6) * env(len(tt), 0.02, 0.06))
save("gagal", np.concatenate(parts), 0.6, "Wah-wah-wah-waaah (trombon gagal)")
save("8bit-koin", np.concatenate([tone(988, 0.07, "sq"), tone(1319, 0.25, "sq") * np.exp(-T(0.25) * 8)]), 0.35, "Koin game retro")
save("8bit-lompat", tone(300 + 900 * T(0.22) / 0.22, 0.22, "sq") * env(int(SR * 0.22), 0.005, 0.05), 0.35, "Lompat game retro")
save("8bit-levelup", np.concatenate([tone(f, 0.08, "sq") for f in [523, 659, 784, 1047, 784, 1047, 1319]]) * 0.9, 0.35, "Naik level / pencapaian")
save("8bit-kalah", np.concatenate([tone(f, 0.14, "sq") for f in [494, 466, 440, 415]] + [tone(392, 0.5, "sq") * np.exp(-T(0.5) * 3)]), 0.35, "Game over")

# ---------------- musik pendek ----------------
roll = place(2.0, [(i * 0.045, hp(noise(0.06), 3) * np.exp(-T(0.06) * 50) * (0.3 + 0.7 * i / 44)) for i in range(44)])
save("drum-roll", roll, 0.6, "Drum roll 2 dtk sebelum pengumuman")
kick = lp(np.sin(2 * np.pi * (120 - 400 * T(0.3)) * T(0.3)) * np.exp(-T(0.3) * 14), 4)
cym = hp(noise(1.4), 4) * np.exp(-T(1.4) * 3)
save("tada", place(1.6, [(0, kick), (0, cym * 0.5), (0, bell(1047, 1.2, 3) * 0.4), (0, bell(1319, 1.2, 3) * 0.3), (0, bell(1568, 1.2, 3) * 0.3)]), 0.75, "Ta-da! (reveal, selesai)")

# ---------------- benda ----------------
t = T(1.26)
bp = lambda: lp(np.sign(np.sin(2 * np.pi * 2350 * T(0.07))) * 0.6 + np.sin(2 * np.pi * 2350 * T(0.07)) * 0.4, 3) * env(int(SR * 0.07), 0.002, 0.01)
save("alarm", place(1.26, [(g * 0.73 + i * 0.12, bp()) for g in range(2) for i in range(4)]), 0.55, "Alarm HP bip-bip")
ch = place(1.2, [(0, sum(a * np.sin(2 * np.pi * f * T(1.2)) for f, a in [(820, 1), (1370, 0.6), (2240, 0.4)]) * np.exp(-T(1.2) * 7))] + [(0.12 + 0.08 * i, np.sin(2 * np.pi * rng.uniform(2500, 4200) * T(0.08)) * np.exp(-T(0.08) * 60) * 0.5) for i in range(9)])
save("rantai", ch, 0.7, "Rantai putus / logam")
d = 2.4; tt = T(d); rpm = 38 + 22 * np.minimum(1, tt / 0.8); ph = 2 * np.pi * np.cumsum(rpm) / SR
save("mesin-mobil", lp(sum(np.sin(ph * m) / m for m in range(1, 7)) * (0.7 + 0.3 * np.sin(ph * 0.5)) + noise(d) * 0.25, 30) * np.minimum(1, tt / 0.15) * np.minimum(1, (d - tt) / 0.4), 0.6, "Deru mesin mobil 2,4 dtk")
hk = lambda dd: lp(sum(np.sign(np.sin(2 * np.pi * f * T(dd))) for f in (415, 523)), 6) * env(int(SR * dd), 0.01, 0.02)
save("klakson", np.concatenate([hk(0.16), np.zeros(int(SR * 0.08)), hk(0.32)]), 0.45, "Klakson tiin-tiin")
t = T(0.4); save("kamera", place(0.4, [(0, hp(noise(0.04), 2) * np.exp(-T(0.04) * 120)), (0.09, hp(noise(0.06), 3) * np.exp(-T(0.06) * 80))]), 0.6, "Jepret kamera")
t = T(0.7); save("kertas", hp(noise(0.7), 5) * (0.4 + 0.6 * np.abs(np.sin(2 * np.pi * 7 * t))) * np.sin(np.pi * t / 0.7), 0.4, "Kertas dibalik / diremas")

# ---------------- tambahan (gergaji, katak, ikigai) ----------------
t = T(0.45); save("gergaji", hp(noise(0.45), 3) * (0.35 + 0.65 * np.abs(np.sin(2 * np.pi * 2.2 * t))) * lp(np.abs(np.sin(2 * np.pi * 90 * t)), 4) * env(len(t), 0.02, 0.05), 0.55, "Satu tarikan gergaji kayu")
t = T(0.7); save("asah", hp(noise(0.7), 2) * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t) ** 2) * env(len(t), 0.05, 0.1) * 0.7 + np.sin(2 * np.pi * 3400 * t) * 0.05, 0.4, "Mengasah logam / gergaji")
t = T(0.35); save("kayu-jatuh", lp(np.sin(2 * np.pi * (180 - 200 * t) * t) * np.exp(-t * 18) + noise(0.35) * np.exp(-t * 30) * 0.5, 6), 0.7, "Potongan kayu jatuh (tok)")
rib = lambda: tone(np.full(int(SR * 0.09), 1.0) * 0 + 300 + 120 * np.sign(np.sin(2 * np.pi * 45 * T(0.09))), 0.09, "saw") * env(int(SR * 0.09), 0.005, 0.02)
save("katak", place(0.5, [(0, lp(rib(), 8)), (0.16, lp(rib(), 8))]), 0.55, "Katak ribbit-ribbit")
t = T(0.35); save("telan", np.sin(2 * np.pi * np.cumsum(500 - 900 * t) / SR) * np.exp(-t * 8) * env(len(t), 0.01, 0.05), 0.55, "Gluk! menelan")
rw = whoosh(0.9, 30, 4)[::-1] * 0.6 + tone(1800 - 1500 * (T(0.9) / 0.9) ** 0.5, 0.9, "saw") * 0.15 * np.sin(np.pi * T(0.9) / 0.9)
save("rewind", rw, 0.55, "Putar ulang / mundurkan waktu")
t = T(3.0); save("gong", sum(np.sin(2 * np.pi * f * t) * a for f, a in [(110, 1), (164, 0.5), (233, 0.35), (311, 0.2)]) * np.exp(-t * 1.3) * env(len(t), 0.01, 0.3), 0.7, "Gong lembut (Asia, pembuka)")
save("akord", place(2.2, [(0, bell(f, 2.0, 2.2) * 0.6) for f in [523, 659, 784, 1047]]), 0.5, "Akord harmonis (semua bertemu)")

# Daftar untuk dilengkapi ke KATALOG.md (nama, durasi, kegunaan)
for name, dur, desc in MADE:
    print(f"syn-{name}.wav\t{dur:.2f}\t{desc}")
print(len(MADE), "efek dibuat")
