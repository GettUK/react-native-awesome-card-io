import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';

import { SearchBar } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './styles';


class SearchList extends Component {
  static propsTypes = {
    data: PropTypes.array,
    searchValue: PropTypes.string,
    onSearchValueChange: PropTypes.func
  };

  render() {
    const { data, searchValue, theme, onSearchValueChange, ...rest } = this.props;

    return (
      <View style={[styles.flex, styles.container]}>
        <SearchBar
          onChangeText={onSearchValueChange}
          value={searchValue}
          placeholder="Start typing…"
        />
        {data && data.length
          ? <FlatList
            style={[styles.flex, styles.bg, { backgroundColor: theme.color.bgSecondary }]}
            data={data}
            {...rest}
          />
          : <View style={[styles.flex, styles.container, styles.bg, { backgroundColor: theme.color.bgSecondary }]}>
            <Text style={[styles.emptyResult, { color: theme.color.primaryText }]}>
              {strings('app.label.emptyResult')}
            </Text>
          </View>
        }
      </View>
    );
  }
}

export default withTheme(SearchList);
