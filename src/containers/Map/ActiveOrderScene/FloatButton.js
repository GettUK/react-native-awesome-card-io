import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import { fbStyles } from './styles';

const FloatButton = props => {
  const { label, iconName, style, onPress } = props;

  const icons = {
    cancel: { name: 'closeThick', color: '#ff0000' },
    walker: { name: 'walker', color: '#6bc11a' },
    dots: { name: 'dots', color: '#284784' }
  }

  return (
    <View style={[fbStyles.container, style]}>
      <TouchableHighlight
        onPress={onPress}
        style={fbStyles.button}
        underlayColor='rgba(135, 206, 235, 0.3)'
      >
        <View style={fbStyles.button}>
          <Icon {...icons[iconName]} />
        </View>
      </TouchableHighlight>
      <Text style={fbStyles.label}>{label}</Text>
    </View>
  );
};

FloatButton.propTypes = {
  label: PropTypes.string,
  iconName: PropTypes.oneOf(['cancel', 'walker', 'dots']),
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onPress: PropTypes.func
};

FloatButton.defaultProps = {
  label: 'Submit',
  iconName: 'cancel',
  style: {},
  onPress: () => {}
};

export default FloatButton;
