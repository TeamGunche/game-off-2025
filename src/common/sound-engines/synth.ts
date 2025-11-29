import Wad from "web-audio-daw";
import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class Synth implements InstrumentEngine {
  private ctx: AudioContext;
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.tone = 440; // A4
    this.decay = 0.25;
    this.volume = 0.9;
    this.fxAmount = 0;
  }

  setup() {}

  trigger(time: number) {
    if (this.volume == 0) return;

    const waitTime = Math.max(0, time - this.ctx.currentTime);

    // Main oscillator - square wave for sharp, digital sound
    const mainOsc = new Wad({
      source: "square",
      pitch: this.tone,
      volume: this.volume * 0.4,
      env: {
        attack: 0.001,
        decay: this.decay * 0.4,
        sustain: 0.2,
        hold: this.decay * 0.2,
        release: this.decay * 0.4,
      },
      filter: {
        type: "lowpass",
        frequency: 2500,
        q: 3,
        env: {
          attack: 0.001,
          frequency: 4000,
        },
      },
    });

    // High-frequency layer for crispness
    const highOsc = new Wad({
      source: "sawtooth",
      pitch: this.tone * 2,
      volume: this.volume * 0.15,
      env: {
        attack: 0.001,
        decay: this.decay * 0.2,
        sustain: 0,
        hold: 0,
        release: this.decay * 0.2,
      },
      filter: {
        type: "highpass",
        frequency: 800,
        q: 1,
      },
    });

    // Sub oscillator for body
    const subOsc = new Wad({
      source: "triangle",
      pitch: this.tone,
      volume: this.volume * 0.25,
      env: {
        attack: 0.001,
        decay: this.decay * 0.3,
        sustain: 0.15,
        hold: this.decay * 0.2,
        release: this.decay * 0.3,
      },
    });

    mainOsc.play({ wait: waitTime });
    highOsc.play({ wait: waitTime });
    subOsc.play({ wait: waitTime });
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
