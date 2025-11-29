import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class Triangle implements InstrumentEngine {
  private ctx: AudioContext;
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.tone = 2000; // High pitched metallic sound
    this.decay = 1.0; // Long sustain like a real triangle
    this.volume = 0.5;
    this.fxAmount = 0;
  }

  setup() {}

  setTone(tone: number) {
    this.tone = tone;
  }

  setVolume(vol: number) {
    this.volume = vol;
  }

  setFXAmount(amount: number) {
    this.fxAmount = amount;
  }

  trigger(time: number) {
    if (this.volume == 0) return;

    const now = time || this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.connect(this.ctx.destination);

    // Create multiple sine wave partials for metallic sound
    // Triangle has inharmonic overtones (not perfect multiples)
    const partials = [
      { freq: 1.0, gain: 1.0 }, // Fundamental
      { freq: 2.76, gain: 0.6 }, // Inharmonic partials
      { freq: 5.40, gain: 0.4 },
      { freq: 8.93, gain: 0.25 },
      { freq: 13.34, gain: 0.15 },
      { freq: 18.64, gain: 0.1 },
    ];

    partials.forEach(({ freq, gain }) => {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(this.tone * freq, now);

      // Slight frequency modulation for shimmer
      osc.frequency.exponentialRampToValueAtTime(
        this.tone * freq * 0.995,
        now + 0.05,
      );

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(this.volume * gain, now + 0.001); // Sharp attack
      oscGain.gain.exponentialRampToValueAtTime(
        this.volume * gain * 0.3,
        now + 0.1,
      );
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + this.decay);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + this.decay);
    });

    // Add high frequency sparkle with noise
    const noiseBuffer = this.ctx.createBuffer(
      1,
      this.ctx.sampleRate * 0.1,
      this.ctx.sampleRate,
    );
    const noiseData = noiseBuffer.getChannelData(0);

    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.02));
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(4000, now);
    noiseFilter.Q.setValueAtTime(5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(this.volume * 0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + 0.1);

    // Master gain envelope
    masterGain.gain.setValueAtTime(1, now);
    masterGain.gain.setValueAtTime(1, now + this.decay * 0.8);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + this.decay);
  }
}
