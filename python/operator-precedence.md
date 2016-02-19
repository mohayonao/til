# 演算子の優先順位

http://docs.python.jp/2/reference/expressions.html#operator-precedence

直感に反して、べき乗演算子 `**` は単項演算子 `-@` よりも優先順位が高い。
`-2 ** 4` は `-(2 ** 4)` と解釈されて -16 となる。正しく計算するには `(-2) ** 4` のようにカッコを使う。

以下の表は下にいくほど優先順位が高い。

| operator    | description
|-------------|------------
| lambda      | ラムダ式
| if – else   | 条件演算
| or          | ブール演算 OR
| and         | ブール演算 AND
| not x       | ブール演算 NOT
| in, not in, is, is not, <, <=, >, >=, <>, !=, == | 帰属や同一性のテストを含む比較
| &#124;      | ビット単位 OR
| ^           | ビット単位 XOR
| &           | ビット単位 AND
| <<, >>      | シフト演算
| +, -        | 加算および減算
| *, /, //, % | 乗算、除算、剰余
| +x, -x, ~x  | 正符号、負符号、ビット単位 NOT
| **          | べき乗
| x[index], x[index:index], x(arguments...), x.attribute |  添字指定、スライス操作属性参照
| (expressions...), [expressions...], {key: value...}, \`expressions...\` | 式結合またはタプル表現、リスト表現、辞書表現、文字列への型変換
