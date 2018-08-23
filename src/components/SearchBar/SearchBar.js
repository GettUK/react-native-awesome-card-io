import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

import { Icon, Input, Divider } from 'components';
import { withTheme } from 'providers';
import { color } from 'theme';
import styles from './styles';

class SearchBar extends PureComponent {
  static propsTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['inline', 'rounded'])
  };

  renderInlineBar = () => {
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
              inputStyle={[styles.modalSearchInput, inputStyle]}
              clearIcon={<Icon name="close" size={16} color={theme.color.secondaryText} />}
              {...rest}
            />
          </View>
        </View>
        <Divider left={0} />
      </View>
    );
  };

  renderRoundedBar = () => {
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
  };

  render() {
    const { type } = this.props;
    const isInlineBar = type === 'inline';
    return (isInlineBar ? this.renderInlineBar() : this.renderRoundedBar());
  }
}

SearchBar.defaultProps = {
  theme: color.secondaryText,
  type: 'rounded'
};

export default withTheme(SearchBar);
