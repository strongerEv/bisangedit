"""SFX sintetis tambahan untuk tangga-kekayaan: rantai putus (dentang logam + gemerincing).
Jalankan: python3 src/videos/tangga-kekayaan/buat-sfx.py → public/audio/tangga-kekayaan/rantai.wav"""
import os, wave
import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "../../../public/audio/tangga-kekayaan")
rng = np.random.default_rng(3)
t = np.arange(int(SR * 1.2)) / SR
x = np.zeros_like(t)
# dentang logam (parsial tak harmonis)
for f, a in [(820, 1), (1370, 0.6), (2240, 0.4), (3510, 0.25)]:
    x += a * np.sin(2 * np.pi * f * t) * np.exp(-t * 7)
x += rng.normal(0, 1, len(t)) * np.exp(-t * 60) * 0.8  # benturan
# gemerincing mata rantai jatuh
for i in range(9):
    s = int(SR * (0.12 + 0.08 * i + rng.uniform(0, 0.04)))
    d = np.arange(int(SR * 0.08)) / SR
    f = rng.uniform(2500, 4200)
    seg = np.sin(2 * np.pi * f * d) * np.exp(-d * 60) * (0.5 - 0.04 * i)
    x[s:s + len(seg)] += seg
x = x / np.max(np.abs(x)) * 0.7
st = np.stack([x, x], axis=1)
with wave.open(os.path.join(OUT, "rantai.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype(np.int16).tobytes())
print("ok")
