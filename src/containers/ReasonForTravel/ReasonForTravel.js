import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import { changeTravelReasonId } from 'actions/booking';

import { Icon } from 'components';

import { withTheme } from 'providers';

import { color } from 'theme';

import styles from './styles';

class ReasonForTravel extends PureComponent {
  componentDidMount() {
    const { booking, changeTravelReasonId } = this.props;
    changeTravelReasonId(booking.travelReasonId);
  }

  keyExtractor = item => String(item.id);

  renderItem = ({ item }) => {
    const { travelReason, changeTravelReasonId, theme } = this.props;
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
        <Text style={[textStyles, { color: theme.color.primaryText }]}>{item.name}</Text>
        {isSelected &&
          <Icon name="check" size={13} color={color.bgStatuses} />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={[styles.separator, { borderTopColor: this.props.theme.color.pixelLine }]} />;

  render() {
    const { travelReasons, theme } = this.props;

    return (
      <FlatList
        style={[styles.flex, styles.bg, { backgroundColor: theme.color.bgSecondary }]}
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

export default connect(mapState, mapDispatch)(withTheme(ReasonForTravel));
