// Sound Effects Utility
// Using Web Audio API for crisp, low-latency sounds

class SoundManager {
    private audioContext: AudioContext | null = null;
    private enabled: boolean = true;

    constructor() {
        // Initialize on first interaction (browsers require user gesture)
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    private playTone(frequency: number, duration: number, volume: number = 0.3) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);

        // Cleanup: Disconnect nodes after sound finishes to prevent memory leak
        setTimeout(() => {
            oscillator.disconnect();
            gainNode.disconnect();
        }, duration * 1000 + 100);
    }

    // Move sound - subtle click
    playMove() {
        this.playTone(800, 0.05, 0.15);
    }

    // Number hit sound - pleasant chime
    playNumberHit() {
        if (!this.enabled || !this.audioContext) return;

        // Play two tones for a chord
        this.playTone(523.25, 0.15, 0.2); // C5
        setTimeout(() => this.playTone(659.25, 0.15, 0.15), 50); // E5
    }

    // Win sound - celebratory arpeggio
    playWin() {
        if (!this.enabled || !this.audioContext) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C-E-G-C major chord
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 0.2), i * 80);
        });
    }

    // Error sound - low buzz
    playError() {
        if (!this.enabled || !this.audioContext) return;

        this.playTone(200, 0.1, 0.2);
        setTimeout(() => this.playTone(180, 0.1, 0.2), 100);
    }

    // Hint sound - gentle notification
    playHint() {
        if (!this.enabled || !this.audioContext) return;

        this.playTone(1046.50, 0.1, 0.15); // C6
        setTimeout(() => this.playTone(880, 0.15, 0.12), 80); // A5
    }
}

export const soundManager = new SoundManager();
