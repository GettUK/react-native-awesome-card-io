import React from 'react';
import PropTypes from 'prop-types';
import NativeModal from 'react-native-modal';

import { withTheme } from 'providers';

import { modalStyles as styles } from './styles';

function ModalWrapper({
  onClose, style, theme, children, ...rest
}) {
  return (
    <NativeModal
      backdropColor={theme.color.backdrop}
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

export default withTheme(ModalWrapper);
