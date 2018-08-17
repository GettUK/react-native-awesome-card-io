import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Icon, Input, Divider } from 'components';
import { withTheme } from 'providers';
import styles from './styles';

class InlineBar extends PureComponent {
  static propsTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
  };

  render() {
    const { containerStyle, iconStyle, inputStyle, labelColor, onChangeText, value, theme, ...rest } = this.props;
    return (
      <View style={[styles.modalSearchContainer, containerStyle]}>
        <View style={styles.row}>
          <Icon
            style={[styles.modalSearchIcon, iconStyle]}
            name="search"
            color={labelColor || theme.color.secondaryText}
            size={12}
          />
          <View style={styles.flex}>
            <Input
              value={value}
              onChangeText={onChangeText}
              autoCorrect={false}
              autoFocus
              allowedError={false}
              inputStyle={[styles.modalSearchInput, inputStyle, { color: theme.color.primaryText }]}
              clearIcon={<Icon name="close" size={16} color={theme.color.secondaryText} />}
              placeholderTextColor={labelColor || theme.color.secondaryText}
              {...rest}
            />
          </View>
        </View>
        <Divider left={0} />
      </View>
    );
  }
}

export default withTheme(InlineBar);
