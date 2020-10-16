import React from 'react';
import { Stage, Layer, Group, Rect, Text, Circle, Line, Transformer } from 'react-konva';
import PropTypes from 'prop-types';
import { render } from "react-dom";


export default class extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        textAttrs: PropTypes.object.isRequired,
        textEditVisible: PropTypes.bool,
    };
    
    state = {
        selectedShapeName: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            textEditVisible: false,
            text: props.text,
            x: props.x,
            y: props.y,
        };
    }
    
    render() {
        const textAttrs = this.props.textAttrs;
        return (
          <React.Fragment>
              <Group
                name="group"
                x={100}
                y={100}
                draggable
              >
                <Rect
                  name="rect"
                />
                <Text
                    name="text"
                    text={this.props.text}
                    fontStyle={textAttrs.bold ? 'bold' : textAttrs.italic ? 'italic' : '' } 
                    fill={textAttrs.color}
                    fontSize={textAttrs.fontSize}
                    fontFamily={textAttrs.font}
                    padding={5}
                />
              </Group>
            </React.Fragment>
        );
    }
}