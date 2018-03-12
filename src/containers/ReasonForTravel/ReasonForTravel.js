import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import { changeTravelReason } from 'actions/booking';
import styles from './styles';

class ReasonForTravel extends Component {
  keyExtractor = item => String(item.id);

  renderItem = ({ item }) => {
    const { travelReason, changeTravelReason } = this.props;
    const isSelected = travelReason === item.id;
    const textStyles = [styles.flex, styles.reasonName];
    if (isSelected) textStyles.push(styles.reasonNameSelected);

    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.item} onPress={() => changeTravelReason(item.id)}>
        <Text style={textStyles}>{item.name}</Text>
        {isSelected &&
          <Icon name="check" size={13} color="#007aff" />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return <View style={styles.separator}/>
  };

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

const mapState = ({ bookings }) => ({
  travelReasons: bookings.formData.travelReasons,
  travelReason: bookings.new.travelReason
});

const mapDispatch = ({
  changeTravelReason
});

export default connect(mapState, mapDispatch)(ReasonForTravel);
