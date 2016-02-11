# AudioNode のイベントを確実に実行させる

- http://stackoverflow.com/questions/24338144/chrome-onaudioprocess-stops-getting-called-after-a-while

コードから参照されない AudioNode は GC に回収されて、イベントも消えてしまう。

```js
function beep(audioContext) {
  var sine = audioContext.createOscillator();

  sine.start(audioContext.currentTime);
  sine.stop(audioContext.currentTime + 2.0);
  sine.connect(audioContext.destination);

  // この関数を抜けると sine の参照がなくなるため、
  // GC に回収されて、この ended が実行されないケースがある
  sine.onended = function() {
    console.log("END!!");
  };
}
```

以下のような JavaScript 上に参照を残しておくためのオブジェクトを用意するのが良い。

```js
var gcGuard = {
  list: [],
  add(obj) {
    if (this.list.indexOf(obj) === -1) {
      this.list.push(obj);
    }
  },
  remove(obj) {
    var index = this.list.indexOf(obj);

    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }
};

function beep(audioContext) {
  var sine = audioContext.createOscillator();

  sine.start(audioContext.currentTime);
  sine.stop(audioContext.currentTime + 2.0);
  sine.connect(audioContext.destination);

  sine.onended = function() {
    console.log("END!!");
    gcGuard.remove(sine);
  };
  gcGuard.add(sine);
}
```
