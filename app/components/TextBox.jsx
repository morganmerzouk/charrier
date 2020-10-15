import React from 'react';
import { Stage, Layer, Group, Rect, Text, Circle, Line, Transformer } from 'react-konva';
import PropTypes from 'prop-types';

export default class extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        textAttrs: PropTypes.object.isRequired,
        textEditVisible: PropTypes.bool,
    };

    componentDidMount() {
        this.trRef.current.nodes([this.shapeRef.current]);
        this.trRef.current.getLayer().batchDraw();
    }
    
    componentDidUpdate() {
        this.trRef.current.nodes([this.shapeRef.current]);
        this.trRef.current.getLayer().batchDraw();
    }

    constructor(props) {
        super(props);
        this.shapeRef = React.createRef();
        this.trRef = React.createRef();
        this.state = {
            textEditVisible: false,
            text: props.text,
            x: props.x,
            y: props.y
        };
    }

    handleTextDblClick = e => {
        const canvasCoords = document.getElementsByTagName("canvas")[0].getBoundingClientRect();
        const absPos = e.target.getAbsolutePosition();
        
        this.setState({
            textEditVisible: true,
            textareaX: canvasCoords.x + absPos.x,
            textareaY: canvasCoords.y + absPos.y
        });
    }

    render() {
        const {textAttrs, textRect} = this.props;
        return (
            <React.Fragment>
                <Text 
                    draggable
                    ref={this.shapeRef}
                    text={this.props.text}
                    fontStyle={textAttrs.bold ? 'bold' : textAttrs.italic ? 'italic' : '' } 
                    fill={textAttrs.color}
                    fontSize={textAttrs.fontSize}
                    fontFamily={textAttrs.font}
                    frame={textRect} 
                    x={textAttrs.x} 
                    y={textAttrs.y}
                    textAttrs={textAttrs} 
                    onDblClick={this.handleTextDblClick}
                    onDragEnd={this.props.changeSize}
                    onDragStart={this.props.changeSize}
                    onTransformEnd={(e) => {
                        // transformer is changing scale of the node
                        // and NOT its width or height
                        // but in the store we have only width and height
                        // to match the data better we will reset scale on transform end
                        const node = this.shapeRef.current;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();

                        // we will reset it back
                        node.scaleX(1);
                        node.scaleY(1);
                        onChange({
                            x: node.x(),
                            y: node.y(),
                            // set minimal value
                            width: Math.max(5, node.width() * scaleX),
                            height: Math.max(node.height() * scaleY),
                        });
                    }}
                />
                <Transformer
                  ref={this.trRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
            </React.Fragment>
        );
    }
}