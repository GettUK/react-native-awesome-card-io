import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, TextInput } from 'react-native';
import { color } from 'theme';

import { Icon } from 'components';

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
        <View style={styles.searchContainer}>
          <Icon name="search" color={color.secondaryText} size={14} style={styles.searchIcon} />
          <TextInput
            onChangeText={onSearchValueChange}
            style={[styles.flex, styles.searchInput]}
            value={searchValue}
            placeholder="Start typing…"
          />
        </View>
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
