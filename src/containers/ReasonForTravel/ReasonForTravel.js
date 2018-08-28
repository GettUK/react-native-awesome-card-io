import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { Icon, Divider, SearchList } from 'components';
import { color } from 'theme';
import { filterBySearchValue } from 'utils';
import { changeFields } from 'actions/booking';
import { withTheme } from 'providers';
import styles from './styles';

class ReasonForTravel extends PureComponent {
  state = {
    searchValue: ''
  };

  keyExtractor = item => String(item.id);

  onChangeTravelReason = (travelReasonId) => {
    const { onClose, changeFields } = this.props;
    onClose();
    setTimeout(() => changeFields({ travelReasonId }), 350); // for smooth animation
  };

  renderItem = ({ item }) => {
    const { booking: { travelReasonId: travelReason }, theme } = this.props;
    const travelReasonId = item.id.toString();
    const isSelected = travelReason === travelReasonId;
    const textStyles = [styles.flex, styles.reasonName];
    if (isSelected) textStyles.push(styles.reasonNameSelected);

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => this.onChangeTravelReason(travelReasonId)}
      >
        <Text style={[textStyles, { color: theme.color.primaryText }]}>{item.name}</Text>
        {isSelected &&
          <Icon name="check" size={13} color={color.bgStatuses} />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <Divider />;

  filterItems = () => filterBySearchValue(this.props.travelReasons, ['name', 'id'], this.state.searchValue);

  handleSearchValueChange = (searchValue) => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <SearchList
        type="inline"
        searchValue={searchValue}
        onSearchValueChange={this.handleSearchValueChange}
        placeholder="Search Reason"
        data={this.filterItems()}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }
}

const mapState = ({ booking }) => ({
  travelReasons: booking.formData.travelReasons
});

const mapDispatch = ({
  changeFields
});

export default connect(mapState, mapDispatch)(withTheme(ReasonForTravel));
