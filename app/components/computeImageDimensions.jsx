import React from 'react';

export default (Component) => {
  return ({ width, height, ...rest }) => {
  	console.log(height);
    const [canvasWidth, canvasHeight] = [width, height];
    return <Component {...rest} {...{canvasWidth, canvasHeight}} />;
  };
};
