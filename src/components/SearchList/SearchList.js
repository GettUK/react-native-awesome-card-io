import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { SearchBar, ListView } from 'components';
import { withTheme } from 'providers';
import { strings } from 'locales';
import styles from './styles';


class SearchList extends Component {
  static propsTypes = {
    data: PropTypes.array,
    searchValue: PropTypes.string,
    onSearchValueChange: PropTypes.func,
    type: PropTypes.oneOf(['inline', 'rounded'])
  };

  render() {
    const { data, searchValue, onSearchValueChange, type, placeholder, ...rest } = this.props;
    return (
      <View style={[styles.flex, styles.container]}>
        <SearchBar
          type={type}
          onChangeText={onSearchValueChange}
          value={searchValue}
          placeholder={placeholder || strings('app.label.startTyping')}
        />
        <View style={[styles.flex, styles.bg]}>
          <ListView
            style={styles.listView}
            typeSections={false}
            items={data}
            {...rest}
          />
        </View>
      </View>
    );
  }
}

export default withTheme(SearchList);
