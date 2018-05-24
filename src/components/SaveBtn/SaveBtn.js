import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import { strings } from 'locales';

export default function SaveBtn({ onPress, enabled, enabledColor, defaultColor, title, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[{ paddingRight: 14 }, style]}>
      <Text style={{ fontSize: 17, color: enabled ? enabledColor || '#284784' : defaultColor || '#bcbbc1' }}>
        {title || strings('save')}
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
