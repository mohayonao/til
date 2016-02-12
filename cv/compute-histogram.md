# ヒストグラムを計算する

`np.histogram` で `range=(0, 256)` を指定すると単純な輝度値ごとのカウントができる。

```py
import cv2
import numpy as np

cap = cv2.VideoCapture(0)

def compute_histogram(im):
    return np.histogram(im, 256, range=(0, 256))[0]

def create_histogram_image(hist):
    im = np.zeros((100, 256), np.uint8)
    hist = hist / float(np.max(hist))
    for x, value in enumerate(hist):
        y = im.shape[0] - int(im.shape[0] * value)
        im[y:, x] = 255
    return im

while True:
    _, im = cap.read()

    im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    hist = compute_histogram(im)
    hist = create_histogram_image(hist)

    cv2.imshow('preview', im)
    cv2.imshow('histogram', hist)

    if cv2.waitKey(10) & 0xFF == 27:
        break
```
