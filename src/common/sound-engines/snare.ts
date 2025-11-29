import Wad from "web-audio-daw";
import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class Snare implements InstrumentEngine {
  private ctx: AudioContext;
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;
  private noiseWad: InstanceType<typeof Wad> | null = null;
  private oscWad: InstanceType<typeof Wad> | null = null;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.tone = 100;
    this.decay = 0.15;
    this.volume = 1;
    this.fxAmount = 0;
  }

  setup() {
    // Noise component
    this.noiseWad = new Wad({
      source: "noise",
      volume: this.volume * 1.1,
      env: {
        attack: 0.001,
        decay: this.decay,
        sustain: 0,
        hold: 0,
        release: 0.01,
      },
      filter: {
        type: "highpass",
        frequency: 1200,
        q: 1.5,
      },
    });

    // Tonal component
    this.oscWad = new Wad({
      source: "triangle",
      pitch: this.tone,
      volume: this.volume * 0.5,
      env: {
        attack: 0.001,
        decay: this.decay / 2,
        sustain: 0,
        hold: 0,
        release: 0.01,
      },
    });
  }

  trigger(time: number) {
    if (this.volume == 0) {
      return;
    }
    this.setup();

    const wait = time - this.ctx.currentTime;

    if (this.noiseWad) {
      this.noiseWad.play({ wait });
    }
    if (this.oscWad) {
      this.oscWad.play({ wait });
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
