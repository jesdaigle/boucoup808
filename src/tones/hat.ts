import { TonesEngine} from "./tones";
import { Time, AudioContext } from 'tone';

export class Hat implements TonesEngine {
    private ctx: AudioContext;
    private ratios: number[];
    public tone: number;
    public decay: number;
    private oscEnvelope: GainNode;
    private bndPass: BiquadFilterNode;
    private hiPass: BiquadFilterNode;
    public volume: number;
    public fxAmount: number;
    private panner: StereoPannerNode;

    constructor(ctx) {
        this.ctx = ctx;
        this.ratios = [1, 1.3420, 1.2312, 1.6532, 1.9523, 2.1523];
        this.tone = 130.81;
        this.decay = 0.5;
        this.volume = 1;
        this.fxAmount = 0;
    }

    setup() {
        const k = this.fxAmount/100;
        this.oscEnvelope = this.ctx.createGain();
        this.bndPass = this.ctx.createBiquadFilter();
        this.bndPass.type = 'bandpass';
        this.bndPass.frequency.value = 20000;
        this.bndPass.Q.value = 0.2;
        this.hiPass = this.ctx.createBiquadFilter();
        this.hiPass.type = "highpass";
        this.hiPass.frequency.value = 5000;
        this.panner = this.ctx.createStereoPanner();

        this.bndPass.connect(this.hiPass);
        this.hiPass.connect(this.oscEnvelope);
        this.oscEnvelope.connect(this.panner);
        this.panner.connect(this.ctx.destination);
    }

    trigger(time: number) {
        this.setup();
        this.panner.pan.value = Math.cos(time * 4) * this.fxAmount/100;
        this.ratios.forEach((ratio) => {
            let osc = this.ctx.createOscillator();
            osc.type = "square";
            osc.frequency.value = this.tone * ratio;
            osc.connect(this.bndPass);
            osc.start(Time);
            osc.stop(time + this.decay);
        });
        this.oscEnvelope.gain.setValueAtTime(0.00001 * this.volume, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(this.volume, time + 0.067 * this.decay);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.3 * this.volume, time + 0.1 * this.decay);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.00001 * this.volume, time + this.decay);
    }

    setTone = (tone: number) => {
        this.tone = tone;
    };

    setVolume = (vol: number) => {
        this.volume = vol;
    };
    setFXAmount = (amount: number) => {
        this.fxAmount = amount;
    }

}
