import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {

  static propTypes = {
      drawing: PropTypes.string
  };

  constructor(props) {
    super(props)
  }

  handleDownload(e) {
    const uri = this.props.drawing;
    const link = e.target;
    link.href = uri;
    link.click();
  }

  render() {
    return <div>
        <a className="Button" download="test.jpg" target="_blank" onClick={this.handleDownload.bind(this)}>Télécharger</a>
    </div>;
  }
}

