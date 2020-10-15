import React from 'react';
import { Stage, Layer, Group, Rect, Text, Circle, Line, Image } from 'react-konva';
import Snap from './TextBoxSnap';
import Cursor from './TextBoxCursor';
import {findIdxForCursor, findPosForCursor, findCoordsForPos, findRectsForSelection} from 'utils/text';
import {keys} from 'utils/keyboard';
import {rectCenter, moveRect} from 'utils/pixels';
import PropTypes from 'prop-types';
import Portal from './Portal';

export default class extends React.Component {
    
    static propTypes = {
        text: PropTypes.string.isRequired,
        textAttrs: PropTypes.object.isRequired,
        textRect: PropTypes.array.isRequired,
        focusedPart: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
        isEditing: PropTypes.bool.isRequired,
        part: PropTypes.string.isRequired,
        cancelEditing: PropTypes.func.isRequired,
        setFocus: PropTypes.func.isRequired,
        moveRect: PropTypes.func.isRequired,
        textEditVisible: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            textEditVisible: false,
            text: props.text
        };
    }

    getCursors() {
        return this.props.selection;
    }

    getSnapFrames() {
        const rect = this.props.textRect;
        const [x, y, w, h] = rect;
        const size = 15;
        const {y: yCenter} = rectCenter(rect);
        const left = [x - size/2, yCenter - size/2, size, size];
        const right = [x + w - size/2, yCenter - size/2, size, size];

        return {left, right};
    }

    getSelectionRects() {
        const {textRect, textAttrs, text} = this.props;
        const {cursor1, cursor2} = this.getCursors();
        const {isEditing} = this.getFocusState();

        if (isEditing && cursor1 >= 0 && cursor2 >= 0) {
          const rects = findRectsForSelection(_ctx, textRect, cursor1, cursor2, textAttrs, text);
          if (rects) {
            return rects.map((rect, i) => {
              const {x1,x2,y1,y2} = rect;
              return [x1, y1, x2-x1, y2-y1];
            });
          }
        }

        return [];
    }

    getCursorCoords(selRects = []) {
        const {textRect, textAttrs, text} = this.props;
        const {cursor} = this.getCursors();
        const {isEditing} = this.getFocusState();

        if (isEditing && selRects.length === 0) {
            const pos = findPosForCursor(_ctx, cursor, textRect, textAttrs, text);
            if (pos) {
                return findCoordsForPos(_ctx, textRect, textAttrs, text, pos);
            }
        }
    }

    getFocusState() {
        const {focusedPart, isEditing} = this.props;
        return {
          isFocused: focusedPart === this.props.part,
          isEditing: focusedPart === this.props.part && isEditing
        };
    }

    cancelEdit(e) {
        if (keys[e.which] === 'escape') {
            this.props.cancelEditing();
            e.target.blur();
        }
    }

    handleMouseDown(e, mousePos, sub) {
        this.startPos = mousePos;

        this.mouseHeld = true;
        if (this.getFocusState().isFocused) {
            this.mouseDown = new Date;
        }
        this.props.setFocus();
    }

    handleMouseMove(e, mousePos) {
        if (!this.mouseHeld) return;

        const {startPos} = this;
        const mouseDiff = {
          x: startPos.x - mousePos.x,
          y: startPos.y - mousePos.y
        };

        const {isFocused, isEditing} = this.getFocusState();

        if (isFocused && !isEditing && !this.snap) {
          // drag text box
          const {textRect} = this.props;
          const newRect = moveRect(textRect, mouseDiff);
          this.props.moveRect(newRect);
          this.startPos = mousePos;
        } else if (isFocused && isEditing) {
          //select text
          const cursor1 = startPos;
          const cursor2 = mousePos;

          const {textRect, textAttrs, text} = this.props;
          let idx1 = findIdxForCursor(_ctx, textRect, cursor1, textAttrs, text);
          let idx2 = findIdxForCursor(_ctx, textRect, cursor2, textAttrs, text);
          this.props.onAreaSelection(idx1, idx2);
        }
    }

    handleMouseUp(e) {
        if (this.mouseDown && (new Date - this.mouseDown) < 200) {
              const {startPos} = this;
              const {text, textAttrs, textRect} = this.props;
              const cursor = findIdxForCursor(_ctx, textRect, startPos, textAttrs, text);
              this.props.onSetCursor(cursor);
              this.props.setEditing();
              this.props.onEditEnter();
        }

        this.mouseDown = null;
        this.mouseHeld = false;
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
    handleTextEdit = e => {
        this.setState({
            text: e.target.value
        });
    }
    handleTextareaKeyDown = e => {
        if (e.keyCode === 13) {
            this.setState({
                textEditVisible: false
            });
        }
    }

    render() {
        const {isFocused, isEditing} = this.getFocusState();
        const {textAttrs, textRect} = this.props;
        const {mouseHeld} = this;

        const selectionRectFrames = this.getSelectionRects();
        const selectionRects = selectionRectFrames.map((frame, i) => {
            return <Rect key={i} fill={makeBlue(0.5)} frame={frame} />;
        });

        const {left: leftSnapFrame, right: rightSnapFrame} = this.getSnapFrames();
        const cursorCoords = this.getCursorCoords(selectionRects);
        const outlineColor = mouseHeld ? makeBlue(0.5) : '#0092d1';

        // invisible rect to allow text selection/dragging
        return (
            <React.Fragment>
                <Text 
                    draggable
                    text={this.state.text}
                    fontStyle={textAttrs.bold ? 'bold' : textAttrs.italic ? 'italic' : '' } 
                    fill={textAttrs.color}
                    fontSize={textAttrs.fontSize}
                    fontFamily={textAttrs.font}
                    frame={textRect} 
                    x={this.state.x} 
                    y={this.state.y}
                    textAttrs={textAttrs} 
                    onDblClick={this.handleTextDblClick}
                    onDragEnd={this.props.changeSize}
                    onDragStart={this.props.changeSize}
                />
                <Portal>
                    <textarea
                        value={this.state.text}
                        style={{
                            display: this.state.textEditVisible ? 'block' : 'none',
                            position: 'absolute',
                            top: this.state.textareaY + 'px',
                            left: this.state.textareaX + 'px',
                            background: 'transparent',
                            color: 'transparent'
                        }}
                        onChange={this.handleTextEdit}
                        onKeyDown={this.handleTextareaKeyDown}
                    />
                </Portal>
            </React.Fragment>
        );
    }
}