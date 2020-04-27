import * as React from 'react';
import { Instrument} from "./instrument";
import { Steps } from "./steps";
import { Transport } from 'tone';
import { Controls } from "./controls";
import { BPM} from "./bpm-component";
import { InstrumentElements } from "./instrument-elements";
import { PatternDropdown } from "./dropdown";



export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false],
            selected: null,
            bpm: 120,
        };

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
                <div style={{ display: 'inline-block' }}>
                    <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
                    <Controls play={this.play} pause={this.pause} />
                    <PatternDropdown/>
                </div>
                <InstrumentElements steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Instrument engine='Kick' key='Kick' handleClick={this.selectTone} />
                    <Instrument engine='Hat' key='Hat' handleClick={this.selectTone} />
                    <Instrument engine='Snare' key='Snare' handleClick={this.selectTone} />
                </InstrumentElements>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}
