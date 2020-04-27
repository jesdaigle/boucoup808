import * as React from 'react';


export interface StepProps{
    id: number;
    onClick: ( id: number ) => void;
    on: true;
}

export class Step extends React.Component<StepProps> {

    render(){
        const style = {
            width: '3em',
            height: '5em',
            backgroundColor: this.props.on ? '#BA6A13' : '#E78419' ,
            borderRadius: '10px',
            margin: 5,
            display: 'inline-block'
        }

        return (
            <div style={style} onClick={this.handleClick}></div>

        )
    }

    private handleClick = () => {
        this.props.onClick(this.props.id);
    }
}