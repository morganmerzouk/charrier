import React from 'react';
import {getImage} from 'utils/imageCache';
import useImage from 'use-image';

export default (Component) => {

  const [images] = useImage('https://konvajs.org/assets/lion.png');
  return class extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }  

    loadImage(url) {
      if (!url) return Promise.resolve();
      if (this.props.image !== url) this.setState({ image: null });
      return getImage(url).then(img => {
        this.setState({ image: img });
      });
    }

    componentDidUpdate(nextProps) {
      this.loadImage(nextProps.image).then(() => this.forceUpdate());
    }

    componentDidMount() {
      this.loadImage(this.props.image);
    }
    render() {
      const {image: _, ...rest} = this.props;
      const {image} = this.state;
      return <Component image={images} {...rest} />;
    }
  };
};