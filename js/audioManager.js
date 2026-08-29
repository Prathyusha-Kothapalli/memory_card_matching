class AudioManager {
    constructor() {
        this.muted = false;
    }
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
    playSound(soundEvent) {
        if (this.muted) return false;
        return true;
    }
}
if (typeof module !== 'undefined') module.exports = AudioManager;