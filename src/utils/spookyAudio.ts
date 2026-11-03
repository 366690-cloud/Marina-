// Safe client-side Web Audio API synthesizer for Halloween spooky atmosphere

class SpookySoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public playEerieAmbience(): boolean {
    try {
      this.init();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) return true;

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 2);

      // Low ominous drone (C2 frequency)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(65.41, now); // C2

      // Spooky detuned harmonic (G2 detuned slightly)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(98.00, now); // G2

      // Subtle low pass filter for mystery warmth
      const biquadFilter = this.ctx.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      biquadFilter.frequency.setValueAtTime(320, now);

      this.osc1.connect(biquadFilter);
      this.osc2.connect(biquadFilter);
      biquadFilter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stopEerieAmbience() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      if (this.gainNode) {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      }
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
        } catch {
          // ignore
        }
        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }

  public playTrickOrTreatJingle() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Play a delightful spooky chime progression: D4 -> F4 -> A4 -> C5
      const notes = [293.66, 349.23, 440.0, 523.25];
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const start = this.ctx.currentTime + index * 0.12;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        noteGain.gain.setValueAtTime(0.001, start);
        noteGain.gain.exponentialRampToValueAtTime(0.15, start + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);

        osc.connect(noteGain);
        noteGain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Audio not supported
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stopEerieAmbience();
      return false;
    } else {
      return this.playEerieAmbience();
    }
  }
}

export const spookyAudio = new SpookySoundEngine();
