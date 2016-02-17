# 実行中ファイルのあるディレクトリへの相対パスを取得する

実行中のファイルへの相対パスからディレクトリ部分を抜き出す。

```py
import os

print os.path.dirname(__file__)
```

絶対パスの場合

```py
import os

print os.path.abspath(os.path.dirname(__file__))
```
