"""SFX sintetis untuk pria-di-mobil: mesin mobil (deru) dan klakson.
Jalankan: python3 src/videos/pria-di-mobil/buat-sfx.py → public/audio/pria-di-mobil/{mesin,klakson}.wav"""
import os, wave
import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "../../../public/audio/pria-di-mobil")
rng = np.random.default_rng(5)


def save(name, x, gain):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    st = np.stack([x, x], axis=1)
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())


def lp(x, k):
    return np.convolve(x, np.ones(k) / k, mode="same")


# Mesin: deru rendah 2,4 dtk, putaran naik lalu stabil, dengan denyut silinder
d = 2.4
t = np.arange(int(SR * d)) / SR
rpm = 38 + 22 * np.minimum(1, t / 0.8)
ph = 2 * np.pi * np.cumsum(rpm) / SR
x = sum(np.sin(ph * m) / m for m in range(1, 7)) * (0.7 + 0.3 * np.sin(ph * 0.5))
x += rng.normal(0, 0.25, len(t))
x = lp(x, 30)
env = np.minimum(1, t / 0.15) * np.minimum(1, (d - t) / 0.4)
save("mesin.wav", x * env, 0.6)

# Klakson: dua nada bersamaan, dua kali tiin-tiin
def honk(dur):
    tt = np.arange(int(SR * dur)) / SR
    y = sum(np.sign(np.sin(2 * np.pi * f * tt)) for f in (415, 523))
    return lp(y, 6) * np.minimum(1, tt / 0.01) * np.minimum(1, (dur - tt) / 0.02)
save("klakson.wav", np.concatenate([honk(0.16), np.zeros(int(SR * 0.08)), honk(0.32)]), 0.45)
print("ok")
