import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon, SearchList, Divider } from 'components';
import { debounce } from 'lodash';
import { withTheme } from 'providers';
import { color } from 'theme';
import { get } from 'utils';
import styles from './styles';

class ReferenceValueSelector extends PureComponent {
  state = {
    loading: false,
    searchValue: '',
    items: []
  };

  componentDidMount() {
    this.getReferenceEntries();
  }

  getReferenceEntries = debounce(() => {
    const id = this.props.reference.id;
    this.setState({ loading: true });
    return get(`booking_references/${id}/reference_entries?search_term=${this.state.searchValue}`)
      .then(({ data }) => { this.setState({ items: data.items, loading: false }); })
      .catch(() => { this.setState({ loading: false }); });
  }, 300);

  handleSearchValueChange = (searchValue) => {
    this.setState({ searchValue }, this.getReferenceEntries);
  };

  getListData() {
    const { items, searchValue } = this.state;
    return searchValue.length ? [{ value: searchValue }, ...items] : items;
  }

  keyExtractor = item => String(item.id || item.value);

  renderItem = ({ item }) => {
    const { reference, changeReference, onClose, theme } = this.props;
    const textStyles = [styles.flex, styles.valueName];

    const isSelected = reference.value === item.value;
    if (isSelected) textStyles.push(styles.valueNameSelected);
    const handlerValueSelect = () => {
      changeReference({ ...reference, value: item.value });
      onClose();
    };

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.referenceItem}
        onPress={handlerValueSelect}
      >
        <Text style={[textStyles, { color: theme.color.primaryText }]}>{item.value}</Text>
        {isSelected &&
          <Icon name="check" size={13} color={color.bgStatuses} />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <Divider left={15} />;

  render() {
    const { searchValue, loading } = this.state;
    return (
      <SearchList
        type="inline"
        loading={loading}
        keyboardShouldPersistTaps="handled"
        searchValue={searchValue}
        onSearchValueChange={this.handleSearchValueChange}
        data={this.getListData()}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }
}

export default withTheme(ReferenceValueSelector);
