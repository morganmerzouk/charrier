import React from 'react';
import { Line } from 'react-konva';

import PropTypes from 'prop-types';

export default class extends React.Component { 

    static propTypes = {
        coords: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y1: PropTypes.number.isRequired,
          y2: PropTypes.number.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
          show: true,
        };
    }  


  componentDidMount() {
    this._blink = setInterval(() => {
      this.setState({ show: !this.state.show });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this._blink);
  }

  render() {
    const {coords: cursorCoords} = this.props;
    const {show} = this.state;

    const color = show ? "rgba(255, 255, 255, 0.75)" : "rgba(0,0,0,0)";
    return <Line color={color} width={1} from={[cursorCoords.x, cursorCoords.y1]} to={[cursorCoords.x, cursorCoords.y2]} />;
  }
}
