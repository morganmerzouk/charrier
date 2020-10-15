import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const SizeItem = ({ name, code, currentCode, onSelect }) => {
  const onClick = (e) => {
    e.preventDefault();
    onSelect(code);
  };
  const className = `SizePicker-size SizePicker-size--${code}`;

  return <div className={className} onClick={onClick}>
    <Option selected={code === currentCode}>
      {name}
    </Option>
  </div>
};

export default class extends React.Component {
  static propTypes = {
      size: PropTypes.oneOf(['tall', 'square', 'wide']).isRequired,
      onSizeSelect: PropTypes.func.isRequired
  };
  render() {
    const {size, onSizeSelect} = this.props;

    return <div className="SizePicker">
      <SizeItem name="1" code="tall" currentCode={size} onSelect={onSizeSelect} />
      <SizeItem name="2" code="square" currentCode={size} onSelect={onSizeSelect} />
      <SizeItem name="3" code="wide" currentCode={size} onSelect={onSizeSelect} />
    </div>;
  }
}

