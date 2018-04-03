import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import { Icon } from 'components';

import styles from './styles';

const InformView = ({ type, children, style, iconStyle }) => (
  <View style={[styles.container, style]}>
    <Icon name={`inform${capitalize(type)}`} width={50} height={41} style={[styles.icon, iconStyle]}/>
    {children}
  </View>
);

InformView.propTypes = {
  type: PropTypes.oneOf(['warning']),
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  iconStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

InformView.defaultProps = {
  type: 'warning'
};

export default InformView;
