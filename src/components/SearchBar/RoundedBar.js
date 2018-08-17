import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

import { Icon } from 'components';
import { withTheme } from 'providers';
import styles from './styles';

class RoundedBar extends PureComponent {
  static propsTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
  };

  render() {
    const { containerStyle, iconStyle, inputStyle, theme, labelColor, onChangeText, value, ...rest } = this.props;
    return (
      <View style={[styles.searchContainer, containerStyle, !labelColor && { backgroundColor: theme.color.bgSearch }]}>
        <Icon
          name="search"
          color={labelColor || theme.color.secondaryText}
          size={14}
          style={[styles.searchIcon, iconStyle]}
        />
        <TextInput
          onChangeText={onChangeText}
          style={[styles.flex, styles.searchInput, inputStyle]}
          placeholderTextColor={labelColor || theme.color.secondaryText}
          value={value}
          {...rest}
        />
      </View>
    );
  }
}


export default withTheme(RoundedBar);
