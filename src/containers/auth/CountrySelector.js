import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, SearchList } from 'components';
import { countriesList, filterBySearchValue } from 'utils';
import styles from '../ReferenceValueSelector/styles';

class CountrySelector extends PureComponent {
  state = {
    selectItem: this.props.navigation.state.params.select || null,
    searchValue: ''
  };

  filterItems = () => filterBySearchValue(countriesList, ['label', 'value'], this.state.searchValue);

  handleSearchValueChange = (searchValue) => {
    this.setState({ searchValue });
  };

  keyExtractor = item => String(item.id || item.value);

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const { selectItem } = this.state;
    const textStyles = [styles.flex, styles.valueName];

    const isSelected = selectItem.value === item.value;
    if (isSelected) textStyles.push(styles.valueNameSelected);
    const handlerValueSelect = () => {
      this.setState({ selectItem: item });
      navigation.state.params.onSelect(item);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.referenceItem}
        onPress={handlerValueSelect}
      >
        <Text style={textStyles}>{item.label}</Text>
        {isSelected &&
          <Icon name="check" size={13} color="#007aff" />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator}/>;

  render() {
    const { searchValue } = this.state;

    return (
      <SearchList
        keyboardShouldPersistTaps="handled"
        searchValue={searchValue}
        onSearchValueChange={this.handleSearchValueChange}
        data={this.filterItems()}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default CountrySelector;
