import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { color } from 'theme';

import { Icon } from 'components';

import { withTheme } from 'providers';

import { fbStyles } from './styles';

const FloatButton = ({ label, iconName, style, theme, loading, onPress, labelStyle, content }) => {
  const icons = {
    dispatcher: { name: 'dispatcher', size: 30 },
    cancel: { name: 'closeThick', color: color.danger },
    walker: { name: 'walker', color: color.success },
    dots: { name: 'dots', color: color.primaryBtns },
    myLocation: { name: 'myLocation', color: color.primaryBtns }
  };

  const handlePress = () => {
    if (!loading) {
      onPress();
    }
  };

  const renderInner = () => (content || <Icon {...icons[iconName]} />);

  return (
    <View style={[fbStyles.container, style]}>
      <TouchableOpacity
        onPress={handlePress}
        style={fbStyles.buttonArea}
        activeOpacity={0.6}
      >
        <View style={[fbStyles.button, { backgroundColor: theme.color.bgPrimary }]}>
          {loading
            ? <ActivityIndicator size="small" color={icons[iconName].color} />
            : renderInner()
          }
        </View>
      </TouchableOpacity>
      <Text style={[fbStyles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

FloatButton.propTypes = {
  label: PropTypes.string,
  iconName: PropTypes.oneOf(['cancel', 'walker', 'dots', 'myLocation']),
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
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

export default withTheme(FloatButton);
