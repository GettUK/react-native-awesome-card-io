import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull, noop, isEqual } from 'lodash';

import { Icon, Divider } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { color } from 'theme';

import prepareStyles from './styles';

class PointList extends Component {
  constructor(props) {
    super(props);

    this.styles = prepareStyles(props.theme.color);
  }

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
    allowAddingStops: true,
    allowEditing: true
  };

  componentDidUpdate({ theme: oldTheme }) {
    const { theme } = this.props;

    if (!isEqual(oldTheme, theme)) {
      this.styles = prepareStyles(theme.color);
    }
  }

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
        <Text style={this.styles.pickUpText} numberOfLines={1}>
          {data[name].label || data[name].line}
        </Text>
    );
  }

  renderStopsCount = count => (
    <Text style={[this.styles.pickUpText, { fontWeight: '600' }]} numberOfLines={1}>
      {`${count} Stops Points`}
    </Text>
  );

  renderPickUpItem = () => (
    <TouchableOpacity
      disabled={!this.props.allowEditing}
      style={this.styles.row}
      onPress={this.handlePickupAddressPress}
    >
      <Icon style={this.styles.pickUpIcon} name="pickUpField" size={16} />
      <View style={this.styles.pickupTextWrapper}>{this.renderAddressLabel('pickupAddress')}</View>
    </TouchableOpacity>
  );

  renderStopsItem = () => {
    const { data, onAddressPress, allowEditing } = this.props;

    return (
      this.hasAddressType('stops') &&
      data.stops.map((item, i) => {
        const address = item.address ? item.address : item;
        return (
          <View key={address.line + i}>
            <Divider left={31} style={this.styles.divider} />
            <TouchableOpacity
              disabled={!allowEditing}
              style={this.styles.row}
              onPress={() => { onAddressPress(address, { type: 'stops', index: i }); }}
            >
              <Icon
                style={[this.styles.pickUpIcon, this.styles.stopPosition]}
                name="pickUpField"
                size={12}
                color={color.secondaryText}
              />
              <Icon style={this.styles.connector} height={12} name="dottedLine" />
              {!isNull(address.line) &&
                <Text style={this.styles.pickUpText} numberOfLines={1}>
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
    const { data, allowAddingStops, onStopAdd, allowEmptyDestination, allowEditing } = this.props;
    const stopPointsAvailable = allowAddingStops && data.pickupAddress && data.pickupAddress.countryCode === 'GB';

    return ((this.hasAddressType('destinationAddress') || allowEmptyDestination) &&
      <TouchableOpacity
        style={this.styles.row}
        onPress={this.handleDestinationAddressPress}
        disabled={!allowEditing}
      >
        <Icon
          style={this.styles.pickUpIcon}
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
                    ? <Icon style={this.styles.btnPlus} name="plus" color={color.secondaryText} size={18} />
                    : <Text style={this.styles.labelEdit}>Edit</Text>
                  }
                </TouchableOpacity>
              }
            </Fragment>
          )
          : (
            <View style={this.styles.emptyDestination}>
              <Text style={this.styles.selectDestinationText} numberOfLines={1}>
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
        style={[this.styles.wrapper, style]}
      >
        {this.renderPickUpItem()}
        {hasDestination &&
          <View>
            <Icon style={[this.styles.connector, this.styles.pickUpConnector]} height={12} name="dottedLine" />
          </View>
        }
        {!allowAddingStops && this.renderStopsItem()}
        {hasDestination &&
          <Divider left={31} style={this.styles.divider} />
        }
        {this.renderDestinationItem()}
      </View>
    );
  }
}

export default withTheme(PointList);
