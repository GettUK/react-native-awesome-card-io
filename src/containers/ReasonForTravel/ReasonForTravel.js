import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import { color } from 'theme';
import { changeTravelReasonId } from 'actions/booking';
import styles from './styles';

class ReasonForTravel extends PureComponent {
  componentDidMount() {
    const { booking, changeTravelReasonId } = this.props;
    changeTravelReasonId(booking.travelReasonId);
  }

  keyExtractor = item => String(item.id);

  renderItem = ({ item }) => {
    const { travelReason, changeTravelReasonId } = this.props;
    const travelReasonId = item.id.toString();
    const isSelected = travelReason === travelReasonId;
    const textStyles = [styles.flex, styles.reasonName];
    if (isSelected) textStyles.push(styles.reasonNameSelected);

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => changeTravelReasonId(travelReasonId, true)}
      >
        <Text style={textStyles}>{item.name}</Text>
        {isSelected &&
          <Icon name="check" size={13} color={color.bgStatuses} />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator}/>;

  render() {
    const { travelReasons } = this.props;
    return (
      <FlatList
        style={[styles.flex, styles.bg]}
        data={travelReasons}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = ({ booking }) => ({
  booking: booking.currentOrder.id ? booking.currentOrder : booking.bookingForm,
  travelReasons: booking.formData.travelReasons,
  travelReason: booking.tempTravelReasonId
});

const mapDispatch = ({
  changeTravelReasonId
});

export default connect(mapState, mapDispatch)(ReasonForTravel);
