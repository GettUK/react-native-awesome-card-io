import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull, noop } from 'lodash';
import { Icon, Divider } from 'components';
import { strings } from 'locales';
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
      <Icon style={styles.pickUpIcon} name="pickUpField" size={16} />
      <View style={styles.pickupTextWrapper}>{this.renderAddressLabel('pickupAddress')}</View>
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
            <Divider left={31} />
            <TouchableOpacity
              style={styles.row}
              onPress={() => { onAddressPress(address, { type: 'stops', index: i }); }}
            >
              <Icon
                style={[styles.pickUpIcon, styles.stopPosition]}
                name="pickUpField"
                size={12}
                color="#8d8d8d"
              />
              <Icon style={styles.connector} height={12} name="dottedLine" />
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
    const { data, allowAddingStops, onStopAdd, allowEmptyDestination } = this.props;
    const stopPointsAvailable = allowAddingStops && data.pickupAddress && data.pickupAddress.countryCode === 'GB';

    return ((this.hasAddressType('destinationAddress') || allowEmptyDestination) &&
      <TouchableOpacity
        style={styles.row}
        onPress={this.handleDestinationAddressPress}
      >
        <Icon
          style={styles.pickUpIcon}
          name="destinationMarker"
          width={16}
          height={19}
        />
        {this.hasAddressType('destinationAddress')
          ? (
            <Fragment>
              {stopPointsAvailable && data.stops && data.stops.length
                ? this.renderStopsCount(data.stops.length + 1)
                : this.renderAddressLabel('destinationAddress')
              }
              {stopPointsAvailable &&
                <TouchableOpacity onPress={onStopAdd}>
                  {(!data.stops || data.stops.length < 4)
                    ? <Icon style={styles.btnPlus} name="plus" color="#8d8d8d" size={18} />
                    : <Text style={styles.labelEdit}>Edit</Text>
                  }
                </TouchableOpacity>
              }
            </Fragment>
          )
          : (
            <View style={styles.emptyDestination}>
              <Text style={styles.selectDestinationText} numberOfLines={1}>
                {strings('booking.label.selectDestination')}
              </Text>
            </View>
         )
        }
      </TouchableOpacity>
    );
  };

  render() {
    const { style, allowAddingStops, allowEmptyDestination } = this.props;
    const hasDestination = this.hasAddressType('destinationAddress') || allowEmptyDestination;

    return (
      <View
        onLayout={this.onLayout}
        style={[styles.wrapper, style]}
      >
        {this.renderPickUpItem()}
        {hasDestination &&
          <View><Icon style={[styles.connector, styles.pickUpConnector]} height={12} name="dottedLine" /></View>
        }
        {!allowAddingStops && this.renderStopsItem()}
        {hasDestination &&
          <Divider left={31} />
        }
        {this.renderDestinationItem()}
      </View>
    );
  }
}
