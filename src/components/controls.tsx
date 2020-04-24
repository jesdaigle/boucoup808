import * as React from 'react';
import '../assets/styles/play.css'

export class Play extends React.Component<any, any> {
    constructor(props){
        super(props);

        this.state = {
            playing: false,
        }
    }

    public handleClick = () => {
        if (this.state.playing) {
            this.props.pause();
        } else {
            this.props.play();
        }
        this.setState({
            playing: !this.state.playing
        });
    };

    render() {
        const playClassName = 'playButton' + (this.state.playing ? 'pauseButton' : '');
        return (
            <div onClick={this.handleClick} className={playClassName}/>
        );
    }
}
