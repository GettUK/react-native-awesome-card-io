import React from 'react';
import PropTypes from 'prop-types';
import NativeModal from 'react-native-modal';
import { color } from 'theme';

import { modalStyles as styles } from './styles';

export default function ModalWrapper({
  onClose, style, children, ...rest
}) {
  return (
    <NativeModal
      backdropColor={color.primaryBtns}
      backdropOpacity={0.6}
      style={[styles.modal, style]}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      {...rest}
    >
      {children}
    </NativeModal>
  );
}

ModalWrapper.propTypes = {
  onClose: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  children: PropTypes.node
};
