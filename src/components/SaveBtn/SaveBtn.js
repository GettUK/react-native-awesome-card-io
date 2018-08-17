import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import { strings } from 'locales';

import { withTheme } from 'providers';

function SaveBtn({ onPress, enabled, enabledColor, defaultColor, theme, title, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[{ paddingRight: 14 }, style]}>
      <Text
        style={{
          fontSize: 17,
          color: enabled ? enabledColor || theme.color.primaryBtns : defaultColor || theme.color.disabledLink
        }}
      >
        {title || strings('header.button.save')}
      </Text>
    </TouchableOpacity>
  );
}

SaveBtn.propTypes = {
  onPress: PropTypes.func,
  enabled: PropTypes.bool,
  enabledColor: PropTypes.string,
  title: PropTypes.string,
  style: Text.propTypes.style
};

export default withTheme(SaveBtn);
