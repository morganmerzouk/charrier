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

    var canvas = document.getElementsByTagName("canvas")[0];
    console.log(canvas);
    var ctx = canvas.getContext("2d");
    
    var dt = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to download the file instead of displaying it */
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

    this.href = dt;

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

