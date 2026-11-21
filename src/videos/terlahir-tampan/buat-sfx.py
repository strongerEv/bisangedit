"""Membuat SFX sintetis (bebas hak cipta) untuk video terlahir-tampan — hanya efek yang tidak ada di @remotion/sfx
(alarm, ketik, koin, langkah, pintu). Whoosh, klik, ding, dan "gagal" memakai @remotion/sfx.
Jalankan: python3 src/videos/terlahir-tampan/buat-sfx.py  → public/audio/terlahir-tampan/*.wav"""
import os, wave
import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "../../../public/audio/terlahir-tampan")
rng = np.random.default_rng(7)


def t(d):
    return np.arange(int(SR * d)) / SR


def env(n, a=0.005, r=0.05):
    e = np.ones(n)
    na, nr = int(SR * a), int(SR * r)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e


def lp(x, k=8):  # low-pass sederhana (rata-rata bergerak)
    return np.convolve(x, np.ones(k) / k, mode="same")


def save(name, x, gain=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    st = np.stack([x, x], axis=1)
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())


def silence(d):
    return np.zeros(int(SR * d))


# 1. Alarm digital: 4 bip cepat × 2 (≈1,1 dtk)
def bip():
    tt = t(0.07)
    sq = np.sign(np.sin(2 * np.pi * 2350 * tt)) * 0.6 + np.sin(2 * np.pi * 2350 * tt) * 0.4
    return lp(sq, 3) * env(len(tt), 0.002, 0.01)
grp = np.concatenate([np.concatenate([bip(), silence(0.05)]) for _ in range(4)])
save("alarm.wav", np.concatenate([grp, silence(0.3), grp]), 0.55)

# 2. Tap (tunda alarm): klik pendek
tt = t(0.06)
click = rng.normal(0, 1, len(tt)) * np.exp(-tt * 140) + np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 90) * 0.6
# save("tap.wav", lp(click, 2), 0.6)

# 3. Ketik: tik sangat pendek
tt = t(0.035)
save("ketik.wav", lp(rng.normal(0, 1, len(tt)) * np.exp(-tt * 260), 3) + np.sin(2 * np.pi * 3200 * tt) * np.exp(-tt * 300) * 0.3, 0.35)

# 4. Whoosh: noise naik-turun dengan sapuan filter
tt = t(0.6)
noise = rng.normal(0, 1, len(tt))
shape = np.sin(np.pi * tt / 0.6) ** 2
k = (40 - 34 * shape).astype(int)  # filter makin terbuka di tengah
out = np.zeros_like(noise)
cs = np.cumsum(np.insert(noise, 0, 0))
for i in range(len(noise)):
    a = max(0, i - k[i]); out[i] = (cs[i + 1] - cs[a]) / (i + 1 - a)
# save("whoosh.wav", out * shape, 0.5)

# 5. Sparkle: arpeggio lonceng naik
def bell(f, d=0.9):
    tt = t(d)
    x = sum(np.sin(2 * np.pi * f * m * tt) * a for m, a in [(1, 1), (2.76, 0.4), (5.4, 0.2)])
    return x * np.exp(-tt * 5) * env(len(tt), 0.002, 0.02)
sp = np.zeros(int(SR * 1.4))
for i, f in enumerate([1568, 1976, 2349, 3136]):
    b = bell(f); s = int(SR * 0.07 * i); sp[s:s + len(b)] += b
# save("sparkle.wav", sp, 0.45)

# 6. Koin: dua denting tinggi
cn = np.zeros(int(SR * 0.6))
for s, f in [(0, 2637), (0.08, 3951)]:
    b = bell(f, 0.5); i = int(SR * s); cn[i:i + len(b)] += b
save("koin.wav", cn, 0.4)

# 7. Gagal: "wah-wah-wah-waaah" trombon sintetis turun
notes = [(392, 0.32), (370, 0.32), (349, 0.32), (330, 1.0)]
parts = []
for f, d in notes:
    tt = t(d)
    vib = 1 + (0.012 * np.sin(2 * np.pi * 6 * tt) if d > 0.5 else np.zeros_like(tt))
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    saw = sum(np.sin(ph * m) / m for m in range(1, 9))
    wah = 0.55 + 0.45 * np.sin(np.pi * np.minimum(1, tt / min(d, 0.3)))
    parts.append(lp(saw, 6) * wah * env(len(tt), 0.02, 0.06))
# save("gagal.wav", np.concatenate(parts), 0.6)

# 8. Langkah kaki: hentakan rendah
tt = t(0.12)
save("langkah.wav", lp(np.sin(2 * np.pi * 90 * tt) * np.exp(-tt * 40) + rng.normal(0, 0.3, len(tt)) * np.exp(-tt * 60), 10), 0.5)

# 9. Pintu ditutup: dentum + klik kunci
tt = t(0.5)
thud = lp(np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 12) + rng.normal(0, 0.4, len(tt)) * np.exp(-tt * 30), 14)
latch = np.zeros_like(tt); i = int(SR * 0.12); c = t(0.04)
latch[i:i + len(c)] = rng.normal(0, 1, len(c)) * np.exp(-c * 200) * 0.5
save("pintu.wav", thud + latch, 0.7)
print("ok")
