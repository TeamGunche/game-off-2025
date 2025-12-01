import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class Bottle implements InstrumentEngine {
  private ctx: AudioContext;
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.tone = 2000; // Base frequency for the pop sound
    this.decay = 0.4; // Duration of the hiss
    this.volume = 1;
    this.fxAmount = 0;
  }

  setup() {}

  trigger(time: number) {
    if (this.volume == 0) return;

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
    popFilter.frequency.value = this.tone;

    const popGain = this.ctx.createGain();
    popGain.gain.setValueAtTime(0.3 * this.volume, now);
    popGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    popNoise.connect(popFilter);
    popFilter.connect(popGain);
    popGain.connect(this.ctx.destination);
    popNoise.start(now);
    popNoise.stop(now + 0.05);

    // 2. 가스 방출 "쉬익" 소리 (긴 노이즈)
    const hissNoise = this.ctx.createBufferSource();
    const hissBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * this.decay, this.ctx.sampleRate);
    const hissData = hissBuffer.getChannelData(0);

    for (let i = 0; i < hissData.length; i++) {
      hissData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
    }

    hissNoise.buffer = hissBuffer;

    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = "bandpass";
    hissFilter.frequency.value = this.tone * 2;
    hissFilter.Q.value = 2;

    const hissGain = this.ctx.createGain();
    hissGain.gain.setValueAtTime(0, now + 0.02);
    hissGain.gain.linearRampToValueAtTime(0.2 * this.volume, now + 0.05);
    hissGain.gain.exponentialRampToValueAtTime(0.01, now + this.decay);

    hissNoise.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(this.ctx.destination);
    hissNoise.start(now + 0.02);
    hissNoise.stop(now + this.decay);
  }

  setTone = (tone: number) => {
    this.tone = tone;
  };

  setVolume = (vol: number) => {
    this.volume = vol;
  };

  setFXAmount = (amount: number) => {
    this.fxAmount = amount;
  };
}
