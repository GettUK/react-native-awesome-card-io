import React from 'react';
import { View, Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import { fbStyles } from './styles';

const FloatButton = ({ label, iconName, style, loading, onPress }) => {
  const icons = {
    cancel: { name: 'closeThick', color: '#ff0000' },
    walker: { name: 'walker', color: '#6bc11a' },
    dots: { name: 'dots', color: '#284784' }
  };

  const handlePress = () => {
    if (!loading) {
      onPress();
    }
  };

  return (
    <View style={[fbStyles.container, style]}>
      <TouchableHighlight
        onPress={handlePress}
        style={fbStyles.buttonArea}
        underlayColor="rgba(135, 206, 235, 0.3)"
      >
        <View style={fbStyles.button}>
          {loading
            ? <ActivityIndicator size="small" color={icons[iconName].color} />
            : <Icon {...icons[iconName]} />
          }
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
  onPress: PropTypes.func,
  loading: PropTypes.bool
};

FloatButton.defaultProps = {
  label: 'Submit',
  iconName: 'cancel',
  style: {},
  onPress: () => {},
  loading: false
};

export default FloatButton;
