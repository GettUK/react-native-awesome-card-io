import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, SearchList } from 'components';
import { changeReference } from 'actions/booking';
import { debounce } from 'lodash';
import { color } from 'theme';
import { get } from 'utils';
import styles from './styles';

class ReferenceValueSelector extends PureComponent {
  state = {
    searchValue: '',
    items: []
  };

  componentDidMount() {
    this.getReferenceEntries();
  }

  getReferenceEntries = debounce(() => {
    const id = this.props.navigation.state.params.reference.id;
    return get(`booking_references/${id}/reference_entries?search_term=${this.state.searchValue}`)
      .then(({ data }) => { this.setState({ items: data.items }); });
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
    const { bookerReference, changeReference } = this.props;
    const textStyles = [styles.flex, styles.valueName];

    const isSelected = bookerReference.value === item.value;
    if (isSelected) textStyles.push(styles.valueNameSelected);
    const handlerValueSelect = () => changeReference({ ...bookerReference, value: item.value });

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.referenceItem}
        onPress={handlerValueSelect}
      >
        <Text style={textStyles}>{item.value}</Text>
        {isSelected &&
          <Icon name="check" size={13} color={color.bgStatuses} />
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
        data={this.getListData()}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = ({ booking }, props) => ({
  bookerReference: booking.bookingForm.bookerReferences.find(r => r.id === props.navigation.state.params.reference.id)
});

const mapDispatch = ({
  changeReference
});

export default connect(mapState, mapDispatch)(ReferenceValueSelector);
