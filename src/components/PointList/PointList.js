import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull, noop } from 'lodash';
import { Icon, Divider } from 'components';
import styles from './styles';

export default class PointList extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    data: PropTypes.object.isRequired,
    onAddressPress: PropTypes.func,
    onStopAdd: PropTypes.func,
    onLayout: PropTypes.func
  };

  static defaultProps = {
    style: {},
    onAddressPress: () => noop,
    allowAddingStops: true
  };

  onLayout = (e) => {
    this.props.onLayout(e.nativeEvent.layout);
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

  renderStopsCount = count => (
    <Text style={[styles.pickUpText, { fontWeight: '600' }]} numberOfLines={1}>
      {`${count} Stops Points`}
    </Text>
  );

  renderPickUpItem = () => (
    <TouchableOpacity
      style={styles.row}
      onPress={this.handlePickupAddressPress}
    >
      <View style={styles.iconContainer}>
        <Icon style={styles.pickUpIcon} name="pickUpField" size={16} />
        {this.hasAddressType('destinationAddress') &&
          <Icon style={[styles.connecter, styles.pickUpConnecter]} height={12} name="dottedLine" />
        }
      </View>
      {this.props.isLoadingPickup
        ? <Text style={[styles.pickUpText, styles.pickUpTextLoading]} numberOfLines={1}>Locating...</Text>
        : this.renderAddressLabel('pickupAddress')
      }
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
            <Divider />
            <TouchableOpacity
              style={styles.row}
              onPress={() => { onAddressPress(address, { type: 'stops', index: i }); }}
            >
              <View style={styles.iconContainer}>
                <Icon
                  style={[styles.pickUpIcon, styles.stopPosition]}
                  name="pickUpField"
                  size={12}
                  color="#8d8d8d"
                />
                <Icon style={styles.connecter} height={12} name="dottedLine" />
              </View>
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
    const { data, allowAddingStops, onStopAdd } = this.props;

    return (
      this.hasAddressType('destinationAddress') &&
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.rowView}
          onPress={this.handleDestinationAddressPress}
        >
          <Icon
            style={styles.pickUpIcon}
            name="destinationMarker"
            width={16}
            height={19}
          />
          {allowAddingStops && data.stops && data.stops.length
            ? this.renderStopsCount(data.stops.length + 1)
            : this.renderAddressLabel('destinationAddress')
          }
        </TouchableOpacity>

        {allowAddingStops && (!data.stops || data.stops.length < 4) &&
          <TouchableOpacity
            style={styles.btnPlus}
            onPress={onStopAdd}>
            <Icon name="plus" color="#8d8d8d" size={18} />
          </TouchableOpacity>
        }
      </View>
    );
  };

  render() {
    const { style, allowAddingStops } = this.props;

    return (
      <View
        onLayout={this.onLayout}
        style={[styles.wrapper, style]}
      >
        {this.renderPickUpItem()}
        {!allowAddingStops && this.renderStopsItem()}
        {this.hasAddressType('destinationAddress') && this.hasAddressType('pickupAddress') &&
          <Divider />
        }
        {this.renderDestinationItem()}
      </View>
    );
  }
}
