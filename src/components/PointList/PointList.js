import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull, isEqual } from 'lodash';

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
    destinationStyleModifier: PropTypes.object,
    onAddressPress: PropTypes.func,
    onStopAdd: PropTypes.func,
    onLayout: PropTypes.func,
    allowEditing: PropTypes.bool,
    stopAsList: PropTypes.bool,
    noItemMargin: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    destinationStyleModifier: { marginTop: -8 },
    allowAddingStops: true,
    allowEditing: false,
    stopAsList: false,
    noItemMargin: true
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
    const { onAddressPress, data, allowEditing } = this.props;
    if (allowEditing) {
      onAddressPress(data[type], { type });
    }
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

  renderPickUpItem = () => (
    <TouchableOpacity
      disabled={!this.props.allowEditing}
      style={[this.styles.row, { marginTop: 8 }]}
      onPress={this.handlePickupAddressPress}
    >
      <Icon style={this.styles.pickUpIcon} name="pickUpField" size={16} />
      <View style={this.styles.pickupTextWrapper}>{this.renderAddressLabel('pickupAddress')}</View>
      {this.renderEditIcon()}
    </TouchableOpacity>
  );

  renderEditIcon = () => (
    this.shouldRenderAddStop() && this.props.allowEditing && <Icon style={this.styles.editIcon} name="Edit" size={16} />
  )

  renderDestinationItem = () => {
    const { allowEmptyDestination, destinationStyleModifier } = this.props;
    const wrapperStyleModifier = this.shouldRenderAddStop()
      ? this.styles.wrapperStyleModifier : destinationStyleModifier;

    return ((this.hasAddressType('destinationAddress') || allowEmptyDestination) &&
      <TouchableOpacity
        disabled={!this.props.allowEditing}
        style={[this.styles.row, wrapperStyleModifier]}
        onPress={this.handleDestinationAddressPress}
      >
        <Icon
          style={this.styles.pickUpIcon}
          name="destinationMarker"
          width={16}
          height={19}
        />
        {this.hasAddressType('destinationAddress')
          ? this.renderAddressLabel('destinationAddress')
          : (
            <View style={this.styles.emptyDestination}>
              <Text style={this.styles.selectDestinationText} numberOfLines={1}>
                {strings('booking.label.selectDestination')}
              </Text>
            </View>
          )
        }
        {this.renderEditIcon()}
      </TouchableOpacity>
    );
  };

  shouldRenderAddStop = () => {
    const { data } = this.props;
    const stopPointsAvailable = Boolean(data.pickupAddress);
    const hasDestination = this.hasAddressType('pickupAddress') && this.hasAddressType('destinationAddress');

    return (
      (hasDestination && stopPointsAvailable
        && (!data || !data.stopAddresses || !data.stopAddresses.length || data.stopAddresses.length <= 5))
          || (data && data.id && !data.asap)
    );
  }

  renderStopsItem = () => {
    const { data, onAddressPress } = this.props;

    return (
      <View style={{ marginTop: 8 }}>
        {data.stopAddresses.map(({ line }, index, array) => (
          <View key={index}>
            {this.renderStopItem(line, onAddressPress, array.length - 1 === index)}
          </View>
        ))}
      </View>
    );
  };

  renderIcon = ({ size = 19, pointsNum = 9, gradientColorStart = '#48B5FF', gradientColorStop = '#615FFF' }) => (
    <Icon
      size={size}
      color={color}
      name="dottedLine"
      pointsNum={pointsNum}
      gradientColorStart={gradientColorStart}
      gradientColorStop={gradientColorStop}
    />
  )

  renderStopItem = (text, onPress, downDottedLine) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={[this.styles.stopsRow, { marginTop: this.props.noItemMargin ? 0 : -8, justifyContent: 'center' }]}>
        <View style={this.styles.leftPanelContainer}>
          {this.renderIcon({})}
          <Icon size={14} color={color.secondaryText} name="pickUpField" />
          {downDottedLine && this.renderIcon({ gradientColorStart: '#615FFF', gradientColorStop: '#48B5FF' })}
        </View>

        <View style={downDottedLine ? this.styles.addStopTextWrapperLast : this.styles.addStopTextWrapper}>
          <Text style={this.styles.addStopText} numberOfLines={1}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderAddStopItem = () => {
    const { data, onStopAdd, stopAsList } = this.props;

    if (!this.shouldRenderAddStop()) {
      return (
        <View style={this.styles.emptyStops}>
          <View style={this.styles.leftPanelContainer}>
            {this.renderIcon({})}
          </View>
          <View style={this.styles.emptyDivider}>
            <Divider left={12} />
          </View>
        </View>
      );
    }

    if (stopAsList) {
      return this.renderStopsItem();
    }

    let addStopsText = strings('booking.label.addStopPoint');
    if (data.stopAddresses && data.stopAddresses.length && data.stopAddresses.length > 0) {
      addStopsText = (
        `${data.stopAddresses.length} ${strings('booking.label.stopPoint')}${data.stopAddresses.length > 1 ? 's' : ''}`
      );
    }

    return this.renderStopItem(addStopsText, onStopAdd, true);
  }

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={[this.styles.wrapper, this.props.style]}
      >
        {this.renderPickUpItem()}

        {this.renderAddStopItem()}

        {this.renderDestinationItem()}
      </View>
    );
  }
}

export default withTheme(PointList);
