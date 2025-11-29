import Wad from "web-audio-daw";
import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class Kick implements InstrumentEngine {
  private ctx: AudioContext;
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.tone = 35; // 더 낮은 기본 주파수
    this.decay = 0.35;
    this.volume = 1;
    this.fxAmount = 0;
  }

  setup() {}

  trigger(time: number) {
    if (this.volume == 0) return;

    const waitTime = Math.max(0, time - this.ctx.currentTime);

    // 1. 서브 베이스 (매우 낮은 주파수)
    const subBass = new Wad({
      source: "sine",
      pitch: this.tone,
      volume: this.volume * 1.3,
      env: {
        attack: 0.001,
        decay: this.decay * 0.5,
        sustain: 0,
        release: 0.01,
      },
    });

    // 2. 펀치/클릭 사운드 (더 낮은 배수)
    const punch = new Wad({
      source: "triangle",
      pitch: this.tone * 2,
      volume: this.volume * 0.4,
      env: {
        attack: 0.001,
        decay: 0.03,
        sustain: 0,
        release: 0.01,
      },
    });

    // 3. 노이즈 레이어 (어택감 추가)
    const noise = new Wad({
      source: "noise",
      volume: this.volume * 0.2,
      env: {
        attack: 0.001,
        decay: 0.04,
        sustain: 0,
        release: 0.01,
      },
      filter: {
        type: "highpass",
        frequency: 200,
        q: 1,
      },
    });

    subBass.play({ wait: waitTime });
    punch.play({ wait: waitTime });
    noise.play({ wait: waitTime });
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
