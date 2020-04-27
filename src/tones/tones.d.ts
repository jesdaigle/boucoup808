export interface TonesEngine {
    tone: number;
    decay: number;
    volume: number;
    setup: () => void;
    trigger: (time: number) => void;
    setTone: (tone: number) => void;
    setVolume: (vol: number) => void;
}
