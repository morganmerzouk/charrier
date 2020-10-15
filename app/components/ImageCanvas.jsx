import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Stage, Layer, Line, Image, Transformer } from 'react-konva';
import Spinner from './Spinner';
import TextBox from './TextBox';
import computeDimensions from './computeImageDimensions';
import useImage from 'use-image';
import Portal from './Portal';
import Upload from 'components/Upload';

const MyImage = (image) => {
    const [images] = useImage(image.image);
    return <Image image={images} crossOrigin="Anonymous" />;
};

class URLImage extends React.Component {
    state = {
        image: null,
        width: null,
        height: null,
    };
    
    componentDidMount() {
        this.loadImage();
        this.trRef.current.nodes([this.shapeRef.current]);
        this.trRef.current.getLayer().batchDraw();
    }
    
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
            this.trRef.current.nodes([this.shapeRef.current]);
            this.trRef.current.getLayer().batchDraw();
        }
    }

    constructor(props) {
        super(props);
        this.shapeRef = React.createRef();
        this.trRef = React.createRef();
    }
    
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    }
    
    render() {
        return (
            <React.Fragment>
                <Image
                    ref={this.shapeRef}
                    x={this.props.x}
                    y={this.props.y}                    
                    width={this.state.width}
                    height={this.state.height}
                    draggable
                    image={this.state.image}
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
                        this.x= node.x();
                        this.y= node.y();
                        // set minimal value
                        this.state.width= Math.max(5, node.width() * scaleX);
                        this.state.height= Math.max(node.height() * scaleY);
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
        const logoUrl = this.props.logo;
        if (!this.props.image) {
          return <div className="ImageCanvas">
            <Spinner />
          </div>;
        }
        const {canvasWidth, canvasHeight} = this.props;
        const {image} = this.props;
        
        return <div className="ImageCanvas" id="canvas" crossOrigin="Anonymous">
                    <Stage width={canvasWidth} height={canvasHeight} crossOrigin="Anonymous">
                        <Layer crossOrigin="Anonymous">
                            <MyImage image={image} onMouseDown={this.handleClickOnImage} crossOrigin="Anonymous" />
                            <TextBox
                              ref="bodyBox"
                              textAttrs={this.props.body.textAttrs}
                              text={this.state.text}
                            />
                            <URLImage src={logoUrl} x={150} y={150} />
                        </Layer>
                    </Stage>
                    <Upload />
                    <textarea
                        value={this.state.text}
                        onChange={this.handleTextEdit}
                        onKeyDown={this.handleTextareaKeyDown}
                        style={{ width: "100%" }}
                    />
                </div>
    }
};


const mapStateToProps = (state) => ({
    logo: state.logo,
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(computeDimensions(ImageCanvas));
