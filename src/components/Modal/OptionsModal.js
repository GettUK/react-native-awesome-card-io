import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { DismissKeyboardView, Icon } from 'components';

import { strings } from 'locales';

import { isIphoneX } from 'utils';

import ModalWrapper from './ModalWrapper';

import { optionsModalStyle as styles } from './styles';

export default function OptionsModal({
  onClose, options, style, ...rest
}) {
  const renderOptions = options => (
    <View style={styles.wrapper}>
      {options.map((option, index) => (
        <TouchableWithoutFeedback onPress={option.onPress} key={option.label}>
          <View style={[styles.row, (index + 1) === options.length ? styles.rowLast : {}]}>
            <Icon name={option.icon} size={26} />
            <Text style={[styles.label, styles.flex]}>{option.label}</Text>
            <Icon name="chevron" width={9} height={13} color="#c7c7cc" />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );

  return (
    <ModalWrapper onClose={onClose} {...rest}>
      <DismissKeyboardView style={[styles.container, { height: 96 + (options.length * 56) + (isIphoneX() ? 16 : 0) }]}>
        {renderOptions(options)}

        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.wrapper, styles.cancel]}>
            <Text style={styles.label}>{strings('modal.label.cancel')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </DismissKeyboardView>
    </ModalWrapper>
  );
}

OptionsModal.propTypes = {
  options: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

OptionsModal.defaultProps = {
  onClose: () => {}
};
