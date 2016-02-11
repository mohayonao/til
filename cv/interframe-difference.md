# フレーム間差分法による動体検出

連続する画像の差分から動体を検出する。背景画像を用いずに動体を検出するシンプルな方法。

以下の例では、現在のフレームと過去 N フレームの輝度値の差の最大値を動きの大きさとして検出している。

- N を大きくすれば遅延と検出範囲が大きくなる
- THRESH を大きくすれば検出範囲が小さくなる
- ノイズを軽減するためにメディアンフィルタを用いた平滑化を行っている
- 検出されるのは動体のエッジ部分

```py
import cv2
import numpy as np

def calc_max_diff(frames):
    frames, im0 = frames[:-1], frames[-1]
    frames = [ cv2.absdiff(im1, im0) for im1 in frames ]
    return np.max(frames, axis=0)

N = 3
THRESH = 20

frames = []
cap = cv2.VideoCapture(0)

while True:
    _, im = cap.read()

    im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    frames.append(im)
    if len(frames) < N:
        continue

    im = calc_max_diff(frames)
    im = cv2.medianBlur(im, 5)
    im = cv2.threshold(im, THRESH, 255, cv2.THRESH_BINARY)[1]

    frames = frames[1:]

    cv2.imshow('preview', im)

    if cv2.waitKey(5) & 0xFF == 27:
        break
```
