import * as React from 'react';
import { Time, Transport } from 'tone';
import {Snare} from "../tones";
import {Hat} from "../tones";
import { Kick} from "../tones";
import { areEqual } from '../utils/array-compare';
import { Tones } from './instrument-elements';
import { Slider } from './slider';


export interface InstrumentProps {
    engine: Tones;
    steps?: boolean[];
    selected?: boolean;
    handleClick?: (engine: string, steps: boolean[]) => void;
}

export class Instrument extends React.Component <InstrumentProps, any> {
    private ctx = AudioContext;
    private sound: any;
    private loopId: number;


    constructor(props) {
        super(props);
        this.ctx = AudioContext;
        switch (props.engine) {
            case 'Kick':
                this.sound = new Kick(this.ctx);
                break;
            case 'Snare':
                this.sound = new Snare(this.ctx);
                break;
            case 'Hat':
                this.sound = new Hat(this.ctx);
                break;
        }

        this.state = {
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
            volume: 1,
            tone: 130,
            fxAmount: 0,
        };

        this.loopId = 0;
        Transport.bpm.value = 120;

    }

    componentDidUpdate() {
        if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
            this.setState({
                steps: this.props.steps.slice(0),
            });
            this.createLoop();
        }
    }

    createLoop = () => {
        if (!this.props.steps) { return; }
        Transport.clear(this.loopId);
        const loop = (time: number) => {
            this.state.steps.forEach((s, i) => {
                if (s) {
                    this.sound.trigger(time + i * Time('16n').toSeconds())
                }
            });
        };
        this.loopId = Transport.schedule(loop, "0");
    };

    handleClick = () => {
        if (this.props.handleClick) this.props.handleClick(this.props.engine, this.state.steps.slice(0));
    };

    handleVolume = (volume:number)=> {
        this.sound.setVolume(volume);
        this.setState({volume});
    };

    handleTone = (tone:number) => {
        this.sound.setTone(tone);
        this.setState({tone});
    };

    handleFX = (fxAmount: number) => {
        this.sound.setFXAmount(fxAmount);
        this.setState({ fxAmount })
    };

    render() {
        const InstrumentStyle = {
            height: '3em',
            margin: '0.2em',
            borderRadius: 10,
            padding: 5,
            backgroundColor: this.props.selected ? '#ff4c4a' : '#696969',
            color: 'white',
            boxShadow: '2px 2px 5px #222',
        };
        return (
            <div style={{display: 'inline-block', width: '10em', alignContent: 'center', padding: '2em'}}>
                <div>
                    <Slider label={this.props.engine + ' Tone'} onValueChange={this.handleTone}
                            value={this.state.tone} min={10} max={1000} />
                </div>
                <div>
                    <Slider label={this.props.engine + ' Volume'} onValueChange={this.handleVolume}
                            value={this.state.volume} min={0} max={1} step={0.05}/>
                </div>
                <div>
                    <Slider label={this.props.engine + ' FX'} onValueChange={this.handleFX}
                            value={this.state.fxAmount} min={0} max={100} />
                </div>


                <div style={InstrumentStyle} onClick={this.handleClick}>
                    <p>{this.props.engine}</p>
                </div >
            </div>
        )
    }
}
