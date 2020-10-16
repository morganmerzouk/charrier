import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Stage, Layer, Line, Image, Group, Rect, Transformer } from 'react-konva';
import Spinner from './Spinner';
import TextBox from './TextBox';
import TransformerComponent from './TransformerComponent';
import computeDimensions from './computeImageDimensions';
import useImage from 'use-image';
import Portal from './Portal';
import Card from 'components/Card';

const MyImage = (image) => {
    const [images] = useImage(image.image);
    return <Image image={images} crossOrigin="Anonymous" />;
};

class LogoImage extends React.Component {
    state = {
        image: null,
        width: null,
        height: null,
    };
    
    componentDidMount() {
        this.loadImage();
    }
    
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }

    constructor(props) {
        super(props);
    }
    
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.width = this.state.width ?? 150;
        this.image.height = this.state.height ?? 150;
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

    onChange = (e) => {
        this.state.width = e.width;
        this.state.height = e.height;
        this.handleLoad();
    }
    
    render() {
        return (
            <React.Fragment>
              <Group
                name="group2"
                x={100}
                y={100}
                draggable
              >
                <Rect
                  name="rect2"
                />
                    <Image
                        name="image"
                        ref={this.shapeRef}
                        x={this.props.x}
                        y={this.props.y}
                        width={this.state.width}
                        height={this.state.height}
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
                            this.onChange({
                                x: node.x(),
                                y: node.y(),
                                // set minimal value
                                width: Math.max(5, node.width() * scaleX),
                                height: Math.max(node.height() * scaleY),
                            });
                        }}
                    />
                </Group>
            </React.Fragment>
        );
    }
}

class ImageCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.body.text,
            selectedShapeName: ""
        };
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
  handleStageMouseDown = (e) => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    // const rect = this.state.rectangles.find(r => r.name === name);
    if (name) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ""
      });
    }
  };

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
                    <Stage width={canvasWidth} height={canvasHeight} style={{overflow: "auto"}} 
        onMouseDown={this.handleStageMouseDown} crossOrigin="Anonymous">
                        <Layer crossOrigin="Anonymous">
                            <MyImage image={image} onMouseDown={this.handleClickOnImage} crossOrigin="Anonymous" />
                            <TextBox
                              ref="bodyBox"
                              textAttrs={this.props.body.textAttrs}
                              text={this.state.text}
                            />
                            <LogoImage 
                                src={logoUrl} 
                                x={0} 
                                y={0}
                            />
                              <TransformerComponent
                                selectedShapeName={this.state.selectedShapeName}
                              />
                        </Layer>
                    </Stage>
                    <p>
                    <div className="Card-header">
                        <h4>Texte</h4>
                    </div>
                    </p>
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
    width: state.width,
    height: state.height,
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(computeDimensions(ImageCanvas));
