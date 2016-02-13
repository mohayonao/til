# クラスを取得する

`__class__` で取得できる。

```py
import numpy as np

np.zeros((16, 16)).__class__
# → <type 'numpy.ndarray'>
```

コンストラクタとしても使用できる。

```py
(0).__class__(100)
# → 100
```
