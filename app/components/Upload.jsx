import React from 'react';
import {connect} from 'react-redux';
import {uploadLogo} from 'actions';

class Upload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.state.file = URL.createObjectURL(event.target.files[0]);
        this.props.onChange(this.state.file)
    }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    file: state.file,
});

const mapDispatchToProps = (dispatch) => ({
  onChange(file) {
    dispatch(uploadLogo(file));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
