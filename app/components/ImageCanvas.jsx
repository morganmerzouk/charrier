import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Line, Image } from 'react-konva';
import Spinner from './Spinner';
import TextBox from './TextBox';
import computeDimensions from './computeImageDimensions';
import useImage from 'use-image';
import Portal from './Portal';

const MyImage = (image) => {
    const [images] = useImage(image.image);
    return <Image image={images} crossOrigin="Anonymous" />;
};

class ImageCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.body.text
        };
    }
    handleTextEdit = e => {
        console.log(e.target.value)
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
        if (!this.props.image) {
          return <div className="ImageCanvas">
            <Spinner />
          </div>;
        }
        const {canvasWidth, canvasHeight} = this.props;
        const {image} = this.props;
        
        console.log(this.state.text);
        return <div className="ImageCanvas" id="canvas" crossOrigin="Anonymous">
                    <Stage width={canvasWidth} height={canvasHeight} crossOrigin="Anonymous">
                        <Layer crossOrigin="Anonymous">
                            <MyImage image={image} onMouseDown={this.handleClickOnImage} crossOrigin="Anonymous" />
                            <TextBox
                              ref="bodyBox"
                              textAttrs={this.props.body.textAttrs}
                              text={this.state.text}
                            />
                        </Layer>
                    </Stage>
                    <textarea
                        value={this.state.text}
                        onChange={this.handleTextEdit}
                        onKeyDown={this.handleTextareaKeyDown}
                        style={{ width: "100%" }}
                    />
                </div>
    }
};

export default computeDimensions(ImageCanvas);
