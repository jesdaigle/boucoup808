import * as React from 'react';

export type Tones = 'Kick' | 'Snare' | 'Hat'

export interface InstrumentElementProps {
    steps: boolean[];
    selectedInstrument: Tones
}

export class InstrumentElements extends React.Component <InstrumentElementProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) => {
            if (typeof child === 'object') {
                // @ts-ignore
                if (child.key === this.props.selectedInstrument) {
                    // @ts-ignore
                    return React.cloneElement(child, { steps: this.props.steps, selected: true });
                } else {
                    // @ts-ignore
                    return React.cloneElement(child, { steps: null, selected: false });
                }
            }
            return child;
        });

        return (
            <div style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                {childrenWithProps}
            </div>
        )
    }
}
