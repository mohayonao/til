# 再生位置を変更できる BufferSourceNode

再生位置を変えるたびに再生中の AudioBufferSourceNode を停止して、新しい AudioBufferSourceNode を生成する。細切れの AudioBufferSourceNode をまとめるのに GainNode を使うのが良い。

```js
class SeekBufferSourceNode {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
    this.loop = false;
    this.onended = null;

    this._bufSrcQ = [];
    this._gain = context.createGain();
    this._startTime = -1;
    this._stopTime = -1;
    this._duration = Infinity;
    this._ended = false;    
  }

  connect(...args) {
    this._gain.connect(...args);
  }

  disconnect(...args) {
    this._gain.disconnect(...args);
  }

  start(when = 0, offset = 0, duration = Infinity) {
    if (this._startTime === -1){
      this._startTime = when;
      if (this._stopTime === -1) {
        this._duration = duration;
        this.seek(when, offset);
      }
    }
  }

  stop(when = 0) {
    let bufSrc = this._bufSrcQ[this._bufSrcQ.length - 1];

    if (this._stopTime === -1) {
      this._stopTime = when;
      if (bufSrc) {
        bufSrc.stop(when);
      }
    }
  }

  seek(when = 0, offset = 0) {
    if (this._ended) {
      return;
    }

    when = Math.max(0, when, this.context.currentTime);    
    offset = Math.max(0, Math.min(offset, this.buffer.duration));

    let duration = Math.max(0, this._duration - (when - this._startTime));

    this._stopBufSrc(when);
    this._startBufSrc(when, offset, duration);
  }

  _startBufSrc(when, offset, duration) {
    let bufSrc = this.context.createBufferSource();

    bufSrc.buffer = this.buffer;
    bufSrc.loop = this.loop;
    bufSrc.loopStart = offset;
    bufSrc.loopEnd = this.buffer.duration;
    bufSrc.onended = (...args) => {
      let index;

      this._ended = true;
      if (typeof this.onended === "function") {
        this.onended(...args);
      }
      if ((index = _this._bufSrcQ.indexOf(bufSrc)) !== -1) {
        this._bufSrcQ.splice(index, 1);
      }
    };
    this._bufSrcQ.push(bufSrc);
    if (duration === Infinity) {
      bufSrc.start(when, offset);
    } else {
      bufSrc.start(when, offset, duration);
    }
    bufSrc.connect(this._gain);    
  }

  _stopBufSrc(when, offset) {
    let bufSrc = this._bufSrcQ[this._bufSrcQ.length - 1];

    if (bufSrc) {
      bufSrc.stop(when + 0.005);
      bufSrc.onended = () => {
        let index;

        bufSrc.disconnect();
        if ((index = this._bufSrcQ.indexOf(bufSrc)) !== -1) {
          this._bufSrcQ.splice(index, 1);
        }
      };
    }    
  }
}
```
