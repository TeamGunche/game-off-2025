import Wad from "web-audio-daw";
import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class HiHat implements InstrumentEngine {
  private ctx: AudioContext;
  private ratios: number[];
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;
  private poly: InstanceType<typeof Wad.Poly> | null = null;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.ratios = [1, 1.3420, 1.2312, 1.6532, 1.9523, 2.1523];
    this.tone = 130.81;
    this.decay = 0.7;
    this.volume = 1;
    this.fxAmount = 0;
  }

  setup() {
    this.poly = new Wad.Poly({
      filter: {
        type: "highpass",
        frequency: 12000,
        q: 0.4,
      },
    });

    // Add oscillators for each ratio
    this.ratios.forEach((ratio) => {
      const osc = new Wad({
        source: "square",
        pitch: this.tone * ratio,
        volume: this.volume / this.ratios.length,
        env: {
          attack: 0.001,
          decay: this.decay * 0.05,
          sustain: 0.0,
          hold: this.decay * 0.01,
          release: this.decay * 0.5,
        },
        filter: {
          type: "bandpass",
          frequency: 20000,
          q: 0.2,
        },
        panning: Math.cos(this.ctx.currentTime * 4) * this.fxAmount / 100,
      });
      this.poly!.add(osc);
    });
  }

  trigger(time: number) {
    if (this.volume == 0) {
      return;
    }
    this.setup();

    const wait = time - this.ctx.currentTime;

    if (this.poly) {
      this.poly.play({ wait });
    }
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
