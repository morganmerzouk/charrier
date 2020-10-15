import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Line, Image } from 'react-konva';
import Spinner from './Spinner';
import TextBox from './TextBox';
import computeDimensions from './computeImageDimensions';
import useImage from 'use-image';

const MyImage = (image) => {
  const [images] = useImage(image.image);
  return <Image image={images} />;
};

class ImageCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: [null, null]
        };
    }

    render() {
        if (!this.props.image) {
          return <div className="ImageCanvas">
            <Spinner />
          </div>;
        }
        const {canvasWidth, canvasHeight} = this.props;
        const {filter, isFocused} = this.props;
        const {image} = this.props;
        const {text} = this.props.body;

        return <div className="ImageCanvas" id="canvas">
              <Stage width={canvasWidth} height={canvasHeight}>
                  <Layer>
                    <MyImage image={image} onMouseDown={this.handleClickOnImage} />
                    <TextBox
                      ref="bodyBox"
                      part="body"
                      cancelEditing={this.props.onCancelEdit}
                      setEditing={this.props.onEdit}
                      setFocus={this.props.onFocus.bind(this, 'body')}
                      moveRect={this.props.onTextRectMove.bind(this)}
                      textRect={this.props.body.textRect}
                      textAttrs={this.props.body.textAttrs}
                      text={this.props.body.text}
                      onEditEnter={() => this.refs.txt.focus()}
                      focusedPart={this.props.isFocused}
                      isEditing={this.props.isEditing} />
                  </Layer>
              </Stage>
            </div>
    }
};

export default computeDimensions(ImageCanvas);
