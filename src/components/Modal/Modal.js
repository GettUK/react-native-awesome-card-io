import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import { DismissKeyboardView } from 'components';

import { isIphoneX } from 'utils';
import { strings } from 'locales';

import { withTheme } from 'providers';

import ModalWrapper from './ModalWrapper';

import { modalStyles as styles } from './styles';

function Modal({
  theme, onClose, label, title, titleStyles, contentStyles, children, ...rest
}) {
  return (
    <ModalWrapper onClose={onClose} {...rest}>
      <DismissKeyboardView style={[{ backgroundColor: theme.color.bgPrimary }, contentStyles]}>
        <View style={styles.header}>
          <Text style={[styles.defaultText, titleStyles]}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>{label}</Text>
          </TouchableOpacity>
        </View>
        {children}
        {isIphoneX() && <View style={styles.separator} />}
      </DismissKeyboardView>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  label: PropTypes.string,
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

Modal.defaultProps = {
  label: strings('modal.label.close')
};

export default withTheme(Modal);
