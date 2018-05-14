import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import { changeFields } from 'actions/booking';
import styles from './styles';

class ReasonForTravel extends Component {
  keyExtractor = item => String(item.id);

  renderItem = ({ item }) => {
    const { travelReason, changeFields } = this.props;
    const travelReasonId = item.id.toString();
    const isSelected = travelReason === travelReasonId;
    const textStyles = [styles.flex, styles.reasonName];
    if (isSelected) textStyles.push(styles.reasonNameSelected);

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => changeFields({ travelReasonId })}
      >
        <Text style={textStyles}>{item.name}</Text>
        {isSelected &&
          <Icon name="check" size={13} color="#007aff" />
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
  travelReasons: booking.formData.travelReasons,
  travelReason: booking.bookingForm.travelReasonId || ''
});

const mapDispatch = ({
  changeFields
});

export default connect(mapState, mapDispatch)(ReasonForTravel);
