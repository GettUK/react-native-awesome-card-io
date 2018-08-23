import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ListView } from 'components';
import { withTheme } from 'providers';
import { strings } from 'locales';
import inline from 'components/SearchBar/InlineBar';
import rounded from 'components/SearchBar/RoundedBar';
import styles from './styles';

class SearchList extends Component {
  static propsTypes = {
    data: PropTypes.array,
    searchValue: PropTypes.string,
    onSearchValueChange: PropTypes.func,
    type: PropTypes.oneOf(['inline', 'rounded'])
  };

  renderSearchBar = () => {
    const { type, defaultType } = this.props;
    const searchType = type || defaultType;
    const renderAs = { inline, rounded };

    return renderAs[searchType];
  };

  render() {
    const { data, searchValue, onSearchValueChange, placeholder, theme, ...rest } = this.props;
    const SearchBar = this.renderSearchBar();
    return (
      <View style={[styles.flex, styles.container, { backgroundColor: theme.color.bgSecondary }]}>
        <SearchBar
          onChangeText={onSearchValueChange}
          value={searchValue}
          placeholder={placeholder || strings('app.label.startTyping')}
        />
        <View style={[styles.flex, styles.bg, { backgroundColor: theme.color.bgSecondary }]}>
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

SearchList.defaultProps = {
  defaultType: 'rounded'
};

export default withTheme(SearchList);
