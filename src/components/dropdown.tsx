import * as React from 'react';


export class PatternDropdown extends React.Component < {},any> {
    constructor(props) {
        super(props);
        this.state = {value: 'patterns'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('You chose: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick a pattern:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="Warm Saturation">Warm Saturation</option>
                        <option value="Back In Black">Back In Black</option>
                        <option value="Warm Tube">Warm Tube</option>
                        <option value="Evolve Drums">Evolve Drums</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
