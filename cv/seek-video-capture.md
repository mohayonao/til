# VideoCapture の再生位置を指定する

`VideoCapture#set` で `cv2.CAP_PROP_POS_FRAMES` を指定する。

```py
import cv2

cap = cv2.VideoCapture("foobar.mp4")

frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)

for i in xrange(frame_count):
  cap.set(cv2.CAP_PROP_POS_FRAMES, 5)

  im = cap.read()[1]

  cv2.imshow('preview', im)
  if cv2.waitKey(0) & 0xFF == 27:
    break
```
