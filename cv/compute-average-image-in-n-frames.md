# Nフレームの平均画像を計算する

`np.average` の `axis` を指定することで画像配列からピクセルごとの平均を計算できる。

```py
import cv2
import numpy as np

N = 5

frames = []
cap = cv2.VideoCapture(0)

while True:
    _, im = cap.read()

    frames.append(im)
    frames = frames[-N:]

    if len(frames) < N:
        continue

    im = np.average(frames, axis=0)
    im = cv2.convertScaleAbs(im)

    cv2.imshow('preview', im)

    if cv2.waitKey(10) & 0xFF == 27:
        break```
