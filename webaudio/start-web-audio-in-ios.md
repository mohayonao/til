# iOS で Web Audio を開始する

> **Note:** On iOS, the Web Audio API requires sounds to be triggered from an explicit user action, such as a tap. Calling noteOn() from an onload event will not play sound.

https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html

iOS ではユーザ操作によって起動しなければならないので、以下のような関数を用意して適当なイベントハンドラから実行させるのが良い。

```js
function startWebAudio(context) {
  if (startWebAudio.done) {
    return;
  }
  if (startWebAudio.bufSrc) {
    startWebAudio.bufSrc.disconnect();
  }
  var bufSrc = context.createBufferSource();

  bufSrc.buffer = context.createBuffer(1, 128, context.sampleRate);
  bufSrc.onended = function() {
    startWebAudio.done = true;
    startWebAudio.bufSrc = null;
    bufSrc.disconnect();
  };
  bufSrc.start(context.currentTime);
  bufSrc.stop(context.currentTime + bufSrc.buffer.duration);
  bufSrc.connect(context.destination);

  startWebAudio.bufSrc = bufSrc;
}
```

ユーザの明示的な操作で開始するのが好ましいが、暗黙的な操作(画面のどこかを触った)で開始させることもできる。後者の場合は `touchstart`, `touchend` の両方にイベントハンドラを登録しておいたほうが良い。

```js
// start explicity
document.getElementById("button").addEventListener("click", () => {
  startWebAudio(audioContext);
});

// start implicity
document.addEventListener("touchstart", () => {
  startWebAudio(audioContext);
});
document.addEventListener("touchend", () => { // for iOS9.0 or iOS9.1
  startWebAudio(audioContext);
});
```
