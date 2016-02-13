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

N = 3
THRESH = 20

frames = []
cap = cv2.VideoCapture(0)

while True:
    _, im = cap.read()

    im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    frames.append(im)
    frames = frames[-N:]

    if len(frames) < N:
        continue

    im = np.max([ cv2.absdiff(im, im1) for im1 in frames[:-1] ], axis=0)
    im = cv2.medianBlur(im, 5)
    im = cv2.threshold(im, THRESH, 255, cv2.THRESH_BINARY)[1]

    cv2.imshow('preview', im)

    if cv2.waitKey(10) & 0xFF == 27:
        break
```
