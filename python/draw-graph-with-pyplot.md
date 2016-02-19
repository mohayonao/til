# PyPlot を使ったグラフの描画

```py
import numpy as np
import matplotlib as plt

x = np.arange(-2*np.pi, +2*np.pi, 0.05)
y = np.cos(x)

# 描画場所を 2x1 の最初にする
plt.subplot(211)

# グラフのタイトル
plt.title("cos")

# X 軸の範囲
plt.xlim(-2 * np.pi, +2 * np.pi)

# Y 軸の範囲
plt.ylim(-1.5, +1.5)

# 描画
plt.plot(x, y)

# 表示
plt.show()
```
