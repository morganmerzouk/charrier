import React from 'react';

export default (Component) => {
  return ({ width, height, ...rest }) => {
    const [canvasWidth, canvasHeight] = [width, height];
    return <Component {...rest} {...{canvasWidth, canvasHeight}} />;
  };
};
