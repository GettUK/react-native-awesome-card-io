import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';

import { SearchBar } from 'components';

import { strings } from 'locales';
import styles from './styles';


class SearchList extends Component {
  static propsTypes = {
    data: PropTypes.array,
    searchValue: PropTypes.string,
    onSearchValueChange: PropTypes.func
  };

  render() {
    const { data, searchValue, onSearchValueChange, ...rest } = this.props;
    return (
      <View style={[styles.flex, styles.container]}>
        <SearchBar
          onChangeText={onSearchValueChange}
          value={searchValue}
          placeholder="Start typing…"
        />
        {data && data.length
          ? <FlatList
            style={[styles.flex, styles.bg]}
            data={data}
            {...rest}
          />
          : <View style={[styles.flex, styles.container]}>
            <Text style={styles.emptyResult}>{strings('app.label.emptyResult')}</Text>
          </View>
        }
      </View>
    );
  }
}

export default SearchList;
