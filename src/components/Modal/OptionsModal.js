import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { DismissKeyboardView, Icon } from 'components';
import { color } from 'theme';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { isIphoneX } from 'utils';

import ModalWrapper from './ModalWrapper';

import { optionsModalStyle as styles } from './styles';

function OptionsModal({ theme, onClose, options, style, closeLabel, ...rest }) {
  const renderOptions = options => (
    <View style={[styles.wrapper, { backgroundColor: theme.color.bgPrimary }]}>
      {options.map((option, index) => (
        <TouchableWithoutFeedback onPress={option.onPress} key={option.label}>
          <View style={[styles.row, (index + 1) === options.length ? styles.rowLast : {}]}>
            {option.icon && <Icon name={option.icon} size={26} color={theme.color.primaryBtns} />}
            <Text
              style={[
                styles.label,
                styles.flex,
                !option.icon ? styles.labelWithoutIcon : {},
                { color: theme.color.primaryBtns }
              ]}
            >
              {option.label}
            </Text>
            {!option.chevronHide && <Icon name="chevron" width={9} height={13} color={color.arrowRight} />}
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
          <View style={[styles.wrapper, styles.cancel, { backgroundColor: theme.color.bgPrimary }]}>
            <Text style={[styles.label, { color: theme.color.primaryBtns }]}>{closeLabel}</Text>
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
  onClose: () => {},
  closeLabel: strings('modal.label.close')
};

export default withTheme(OptionsModal);
