import React from 'react';
import { Rect } from 'react-konva';
import {shrinkRect} from 'utils/pixels';
import PropTypes from 'prop-types';

const MIN_TEXT_WIDTH = 100;

export default class extends React.Component {

    static propTypes = {
        frame: PropTypes.array.isRequired,
        textRect: PropTypes.array.isRequired,
        color: PropTypes.string.isRequired,
        direction: PropTypes.oneOf(['left', 'right']),
        onMove: PropTypes.func.isRequired
    };

    handleResizeStart(e, mousePos) {
        this.startPos = mousePos;
        this.mouseHeld = true;
    }

    handleResizeMove(e, mousePos) {
        if (!this.mouseHeld) return;

        const {startPos} = this;
        const mouseDiff = {
            x: startPos.x - mousePos.x,
            y: startPos.y - mousePos.y
        };
        // resize text
        const rect = this.props.textRect;
        const newRect = shrinkRect(rect, this.props.direction, mouseDiff.x);
        if (newRect[2] <= MIN_TEXT_WIDTH) return;
            this.props.onMove(newRect);
            this.startPos = mousePos;
    }

    handleResizeEnd() {
        this.mouseHeld = false;
    }

    render() {
        const {frame, color} = this.props;

        return <Rect
            frame={frame}
            fill={color}
            mouseSnap={true}
            onMouseDown={this.handleResizeStart}
            onMouseMove={this.handleResizeMove}
            onMouseUp={this.handleResizeEnd} />;
    }
}

