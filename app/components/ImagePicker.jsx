import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

export default class extends React.Component {
  
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })).isRequired,
        selected: PropTypes.shape({ url: PropTypes.string }),
        onSelect: PropTypes.func
    };
    
    handleSelect(image) {
        this.props.onSelect && this.props.onSelect(image);
    }

    render() {
        const selected = this.props.selected || {};
        return <div className="ImagePicker">
          {this.props.images.map(image => {
            const sel = image.url === selected.url;
            const className = 'ImagePicker-image' + (sel ? ' ImagePicker-image--selected' : '');
            const imageUrl = image.url;
            const label = image.label;

            return <div className={className} onClick={this.handleSelect.bind(this, image)} key={imageUrl}>
              <Option selected={sel} borderStyle="thick-transparent">
                  <img src={imageUrl} / >
                  <p className="label">{label}</p>
              </Option>
            </div>;
          })}
        </div>;
    }
}

