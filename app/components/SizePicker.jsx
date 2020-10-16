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
            <span className="dimension">
                Largeur:
                <input type="number" maxLength="3" size="3" value={width} onChange={this.updateWidth} /><br />
            </span>
            <span className="dimension">
                Hauteur:
                <input type="number" maxLength="3" size="3" value={height} onChange={this.updateHeight} />
            </span>
        </div>;
    }
}

