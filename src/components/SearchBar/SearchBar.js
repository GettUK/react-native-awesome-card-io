import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { color } from 'theme';

import { Icon } from 'components';
import styles from './styles';

class SearchBar extends PureComponent {
  static propsTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
  };

  render() {
    const { containerStyle, iconStyle, inputStyle, theme, onChangeText, value, ...rest } = this.props;
    return (
      <View style={[styles.searchContainer, containerStyle]}>
        <Icon name="search" color={theme} size={14} style={[styles.searchIcon, iconStyle]} />
        <TextInput
          onChangeText={onChangeText}
          style={[styles.flex, styles.searchInput, inputStyle]}
          placeholderTextColor={theme}
          value={value}
          {...rest}
        />
      </View>
    );
  }
}

SearchBar.defaultProps = {
  theme: color.secondaryText
};

export default SearchBar;
