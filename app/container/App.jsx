import React from 'react';
import {connect} from 'react-redux';
import {cacheDrawing, setText, setTextRect, setFocus, setEditing, setNoFocus, setNoEditing} from 'actions';

import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ImageCanvas from 'components/ImageCanvas';
import Card from 'components/Card';

export class App extends React.Component {
  updateDrawnImage(data) {
    if (this.props.drawing === data) return;
    this.props.onCacheDrawing(data);
  }

  render() {
    const selectedUrl = this.props.selected && this.props.selected.url;
    
    const {text, textRect, textAttrs, width, height} = this.props;
    return (
      <div className="Container">
        <LeftSidebar />
        <div className="MainCol">
        <Card title="Rendu">
            <ImageCanvas
              image={selectedUrl}
              body={{
                text, textAttrs, textRect
              }}
              width={width}
              length={length}
              isFocused={this.props.focused}
              isEditing={this.props.editing}
              onFocus={this.props.onFocus}
              onEdit={this.props.onEdit}
              onBlur={this.props.onBlur}
              onCancelEdit={this.props.onCancelEdit}
              onTextRectMove={this.props.onTextRectMove}
              onChange={this.props.updateDrawnImage}
              onTextChange={this.props.onTextChange} />
        </Card>
        </div>
        <RightSidebar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    textAttrs: state.textAttrs,
    width: state.width,
    height: state.height,
    selected: state.selectedImage,
    drawing: state.drawing,
    text: state.text,
    textRect: state.textRect,
    focused: state.focused,
    editing: state.editing
});

const mapDispatchToProps = (dispatch) => ({
  onCacheDrawing(drawing) {
    dispatch(cacheDrawing(drawing));
  },

  onTextChange(text) {
    dispatch(setText(text));
  },

  onTextRectMove(part, rect) {
    dispatch(setTextRect(part, rect));
  },

  onFocus(part) {
    dispatch(setFocus(part));
  },

  onEdit() {
    dispatch(setEditing());
  },

  onBlur() {
    dispatch(setNoFocus());
  },

  onCancelEdit() {
    dispatch(setNoEditing());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
