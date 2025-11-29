export class Bottle {
  private ctx: AudioContext;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
  }

  trigger(time: number) {
    const now = time || this.ctx.currentTime;

    // 1. 병뚜껑 열리는 "탁" 소리 (짧은 노이즈)
    const popNoise = this.ctx.createBufferSource();
    const popBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.05, this.ctx.sampleRate);
    const popData = popBuffer.getChannelData(0);

    for (let i = 0; i < popData.length; i++) {
      popData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.01));
    }

    popNoise.buffer = popBuffer;

    const popFilter = this.ctx.createBiquadFilter();
    popFilter.type = "highpass";
    popFilter.frequency.value = 2000;

    const popGain = this.ctx.createGain();
    popGain.gain.setValueAtTime(0.3, now);
    popGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    popNoise.connect(popFilter);
    popFilter.connect(popGain);
    popGain.connect(this.ctx.destination);
    popNoise.start(now);
    popNoise.stop(now + 0.05);

    // 2. 가스 방출 "쉬익" 소리 (긴 노이즈)
    const hissNoise = this.ctx.createBufferSource();
    const hissBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.4, this.ctx.sampleRate);
    const hissData = hissBuffer.getChannelData(0);

    for (let i = 0; i < hissData.length; i++) {
      hissData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
    }

    hissNoise.buffer = hissBuffer;

    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = "bandpass";
    hissFilter.frequency.value = 4000;
    hissFilter.Q.value = 2;

    const hissGain = this.ctx.createGain();
    hissGain.gain.setValueAtTime(0, now + 0.02);
    hissGain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    hissGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    hissNoise.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(this.ctx.destination);
    hissNoise.start(now + 0.02);
    hissNoise.stop(now + 0.4);
  }
}
