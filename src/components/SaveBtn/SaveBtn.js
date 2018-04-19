import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import { strings } from 'locales';

export default function SaveBtn({ onPress, enabled }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingRight: 14 }}>
      <Text style={{ fontSize: 17, color: enabled ? '#284784' : '#bcbbc1' }}>
        {strings('save')}
      </Text>
    </TouchableOpacity>
  );
}

SaveBtn.propTypes = {
  onPress: PropTypes.func,
  enabled: PropTypes.bool
};
