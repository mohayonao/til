# Nフレームの平均画像を計算する

`np.average` の `axis` を指定することで画像配列からピクセルごとの平均を計算できる。

```py
import cv2
import numpy as np

def calc_avg_im(frames):
  im = np.average(frames, axis=0)
  im = np.array(im, np.uint8)
  return im

N = 5

frames = []
cap = cv2.VideoCapture(0)

while True:
    _, im = cap.read()

    frames.append(im)
    if len(frames) <= N:
        continue

    im = calc_avg_im(frames)

    frames = frames[1:]

    cv2.imshow('preview', im)

    if cv2.waitKey(10) & 0xFF == 27:
        break
```
