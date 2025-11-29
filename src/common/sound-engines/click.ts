import type { InstrumentEngine } from "@/common/sound-engines/InstrumentEngine.ts";

export class Click implements InstrumentEngine {
  private ctx: AudioContext;
  public tone: number;
  public decay: number;
  public volume: number;
  public fxAmount: number;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.tone = 1500; // High frequency for crisp click
    this.decay = 0.05; // Very short
    this.volume = 3;
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

    // Create short, crisp reverb using convolver
    const convolver = this.ctx.createConvolver();
    const reverbLength = this.ctx.sampleRate * 0.3; // Short 300ms reverb
    const impulse = this.ctx.createBuffer(2, reverbLength, this.ctx.sampleRate);
    const impulseL = impulse.getChannelData(0);
    const impulseR = impulse.getChannelData(1);

    // Generate crisp impulse response with fast decay
    for (let i = 0; i < reverbLength; i++) {
      const decay = Math.pow(1 - i / reverbLength, 3); // Fast exponential decay
      impulseL[i] = (Math.random() * 2 - 1) * decay;
      impulseR[i] = (Math.random() * 2 - 1) * decay;
    }

    convolver.buffer = impulse;

    const reverbGain = this.ctx.createGain();
    reverbGain.gain.setValueAtTime(0.3 + this.fxAmount * 0.4, now);

    // Highpass filter on reverb to keep it crisp
    const reverbHighpass = this.ctx.createBiquadFilter();
    reverbHighpass.type = "highpass";
    reverbHighpass.frequency.setValueAtTime(1200, now);

    convolver.connect(reverbHighpass);
    reverbHighpass.connect(reverbGain);
    reverbGain.connect(this.ctx.destination);

    // Sharp transient using noise burst
    const noiseBuffer = this.ctx.createBuffer(
      1,
      this.ctx.sampleRate * this.decay,
      this.ctx.sampleRate,
    );
    const noiseData = noiseBuffer.getChannelData(0);

    // Create a very short, sharp noise burst
    for (let i = 0; i < noiseData.length; i++) {
      const decay = Math.exp(-i / (this.ctx.sampleRate * 0.003)); // Very fast decay
      noiseData[i] = (Math.random() * 2 - 1) * decay;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Bandpass filter for the "click" character
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(this.tone, now);
    filter.Q.setValueAtTime(15, now); // High Q for narrow, crisp sound

    // Additional highpass for extra crispness
    const highpass = this.ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(800, now);

    // Gain envelope
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + this.decay);

    // Short oscillator for tonal component
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(this.tone * 2, now);
    osc.frequency.exponentialRampToValueAtTime(this.tone * 0.5, now + 0.01);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(this.volume * 0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

    // Connect audio graph - split to direct and reverb
    const splitter = this.ctx.createGain();
    splitter.gain.setValueAtTime(1, now);

    noiseSource.connect(filter);
    filter.connect(highpass);
    highpass.connect(gainNode);
    gainNode.connect(splitter);

    // Direct sound
    splitter.connect(this.ctx.destination);
    // Reverb sound
    splitter.connect(convolver);

    osc.connect(oscGain);
    oscGain.connect(splitter);

    // Start and stop
    noiseSource.start(now);
    noiseSource.stop(now + this.decay);
    osc.start(now);
    osc.stop(now + 0.01);
  }
}
