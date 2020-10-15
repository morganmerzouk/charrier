import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        onWidthSelect: PropTypes.func.isRequired,
        onHeightSelect: PropTypes.func.isRequired
    };

    updateWidth = e => {
        this.setState({
            width: e.target.value
        });
        this.props.onWidthSelect(e.target.value);
    }

    updateHeight = e => {
        this.setState({
            height: e.target.value
        });
        this.props.onHeightSelect(e.target.value);
    }

    render() {
        const {width, height, onWidthSelect, onHeightSelect} = this.props;

        return <div className="SizePicker">
            <p>
                Largeur:
                <input type="text" value={width} onChange={this.updateWidth} /><br />
            </p>
            <p>
                Hauteur:
                <input type="text" value={height} onChange={this.updateHeight} />
            </p>
        </div>;
    }
}

