import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull } from 'lodash';
import { Icon } from 'components';
import styles from './styles';

export default class PointList extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    data: PropTypes.object.isRequired,
    onAddressPress: PropTypes.func
  };

  static defaultProps = {
    style: {},
    onAddressPress: () => {},
    allowAddingStops: true
  };

  handleAddressPress = (type) => {
    const { onAddressPress, data } = this.props;
    onAddressPress(data[type], { type });
  };

  handlePickupAddressPress = () => this.handleAddressPress('pickupAddress');

  handleDestinationAddressPress = () => this.handleAddressPress('destinationAddress');

  hasAddressType = type => has(this.props.data, type) && !!this.props.data[type];

  renderAddressLabel(name) {
    const { data } = this.props;
    return (
      this.hasAddressType(name) && !isNull(data[name].line) &&
        <Text style={styles.pickUpText} numberOfLines={1}>
          {data[name].label || data[name].line}
        </Text>
    );
  }

  renderPickUpItem = () => (
    <TouchableOpacity
      style={styles.row}
      onPress={this.handlePickupAddressPress}
    >
      <Icon style={styles.pickUpIcon} name="pickUpField" size={18} />
      {this.renderAddressLabel('pickupAddress')}
    </TouchableOpacity>
  );

  renderStopsItem = () => {
    const { data, onAddressPress } = this.props;
    return (
      this.hasAddressType('stops') &&
      data.stops.map((item, i) => {
        const address = item.address ? item.address : item;
        return (
          <View key={address.line + i}>
            <View style={styles.delimiter} />
            <TouchableOpacity
              style={styles.row}
              onPress={() => { onAddressPress(address, { type: 'stops', index: i }); }}
            >
              <Icon
                style={[styles.pickUpIcon, { marginLeft: 3 }]}
                name="pickUpField"
                size={12}
                color="#8d8d8d"
              />
              {!isNull(address.line) &&
                <Text style={styles.pickUpText} numberOfLines={1}>
                  {address.label || address.line}
                </Text>
              }
            </TouchableOpacity>
          </View>
        );
      })
    );
  };

  renderDestinationItem = () => {
    const { data, allowAddingStops, onAddressPress } = this.props;
    return (
      this.hasAddressType('destinationAddress') &&
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.rowView}
          onPress={this.handleDestinationAddressPress}
        >
          <Icon
            style={styles.pickUpIcon}
            name="pickUpField"
            color="#f00"
            size={18}
          />
          {this.renderAddressLabel('destinationAddress')}
        </TouchableOpacity>

        {allowAddingStops && (!data.stops || data.stops.length < 4) &&
          <TouchableOpacity
            style={styles.btnPlus}
            onPress={() => { onAddressPress(null, { type: 'stops' }); }}>
            <Icon name="plus" color="#8d8d8d" size={18} />
          </TouchableOpacity>
        }
      </View>
    );
  };

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.wrapper, style]}>
        {this.renderPickUpItem()}
        {this.renderStopsItem()}
        {this.hasAddressType('destinationAddress') && this.hasAddressType('pickupAddress') &&
          <View style={styles.delimiter} />
        }
        {this.renderDestinationItem()}
      </View>
    );
  }
}
