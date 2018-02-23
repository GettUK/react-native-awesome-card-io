import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import NativeModal from 'react-native-modal';
import { DismissKeyboardView } from 'components';

import styles from './styles';

export default function Modal({ onClose, style, contentStyles, children, ...rest }) {
  return (
    <NativeModal
      backdropColor="#284784"
      backdropOpacity={0.6}
      style={[styles.modal, style]}
      {...rest}
    >
      <DismissKeyboardView style={[styles.content, contentStyles]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        {children}
      </DismissKeyboardView>
    </NativeModal>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  children: PropTypes.node,
  contentStyles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};
