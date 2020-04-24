import * as React from 'react';
import { Instrument} from "./instrument";
import { Steps } from "./steps";
import { InstrumentElements } from "./instrument-elements";
import { Transport } from 'tone';
import { Play } from "./play";
import { BPM} from "./bpm-component";


export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false],
            selected: null,
            bpm: 120,
        }

        Transport.loop = true;
        Transport.loopEnd = '1m'
    }

    pause = () => {
        Transport.stop();
    };

    play = () => {
        Transport.start();
    };

    private handleStepChange = (id: number) => {
        const s = this.state.steps;
        s[id] = !s[id];
        this.setState({
            steps: s,
        })
    };

    private selectTone = (selected: string, steps: boolean[]) => {
        if (this.state.selected === selected) {
            this.setState({
                selected: null,
                steps: [false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false]
            })
        } else {
            this.setState({selected, steps})
        }
    };

    handleBPMChange = (bpm: number) => {
        Transport.bpm.value = bpm;
        this.setState({ bpm });
    };


    render () {
        return (
            <div>
                <h1 style={{color: 'black'}}>Bocoup 808</h1>
                <div style={{ display: 'block' }}>
                    <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
                    <Play play={this.play} pause={this.pause} />
                </div>
                <InstrumentElements steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Tone='Kick' key='Kick' handleClick={this.selectTone} />
                    <Tones engine='Hat' key='Hat' handleClick={this.selectTone} />
                    <Tones engine='Snare' key='Snare' handleClick={this.selectTone} />
                </InstrumentElements>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}
