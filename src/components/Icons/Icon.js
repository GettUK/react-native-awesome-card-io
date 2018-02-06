import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import lib from './lib';

const Icon = ({ name, size, width, height, ...rest }) => {

  if (!name) {
    return null;
  }

  const svg = lib[name];

  if (!svg) {
    console.error(`Requested unknown icon '${name}'`);
    return null;
  }

  const svgWidth = size || width;
  const svgHeight = size || height;

  return createElement(svg, { ...rest, width: svgWidth, height: svgHeight });
};

Icon.defaultProps = {
  height: '44',
  width: '44'
};

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
