import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull, map } from 'lodash/fp';
import { Icon } from 'components';
import styles from './styles';

class PointList extends Component {

  renderPickUpItem = () => {
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          if (has('pickupAddress', data)) {
            this.props.onChangeAddress(data.pickupAddress);
          }
          this.props.onChangeAddressType('pickupAddress', {}, null);
          this.props.toggleModal();
        }}>
        <Icon style={styles.pickUpIcon} name="pickUpField" size={18} />
        {has('pickupAddress', data) &&
          !isNull(data.pickupAddress.line) && (
            <Text style={styles.pickUpText} numberOfLines={1}>
              {data.pickupAddress.line}
            </Text>
          )}
      </TouchableOpacity>
    );
  };
  renderStopsItem = () => {
    const { data } = this.props;
    return (
      has('stops', data) &&
      map(
        item => (
          <View key={item.address.line}>
            <View style={styles.delimiter} />
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                if (has('address', item)) {
                  this.props.onChangeAddress(item.address);
                }
                this.props.onChangeAddressType('stops', [], { ...item });
                this.props.toggleModal();
              }}>
              <Icon
                style={[styles.pickUpIcon, { marginLeft: 3 }]}
                name="pickUpField"
                size={12}
                color="#8D8D8D"
              />
              {has('address', item) &&
                !isNull(item.address.line) && (
                  <Text style={styles.pickUpText} numberOfLines={1}>
                    {item.address.line}
                  </Text>
                )}
            </TouchableOpacity>
          </View>
        ),
        data.stops
      )
    );
  };
  renderDestinationItem = () => {
    const { data } = this.props;
    return (
      has('destinationAddress', data) && (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => {
              if (has('destinationAddress', data)) {
                this.props.onChangeAddress(data.destinationAddress);
              }
              this.props.onChangeAddressType('destinationAddress', {}, null);
              this.props.toggleModal();
            }}>
            <Icon
              style={styles.pickUpIcon}
              name="pickUpField"
              color="#FF0000"
              size={18}
            />
            {has('destinationAddress', data) &&
              (!isNull(data.destinationAddress.line) ||
                !isNull(data.destinationAddress.label)) && (
                <Text style={styles.pickUpText} numberOfLines={1}>
                  {data.destinationAddress.label ||
                    data.destinationAddress.line}
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.onChangeAddressType('stops', [], null);
              this.props.toggleModal();
            }}>
            <Icon name="plus" color="#8D8D8D" size={18} />
          </TouchableOpacity>
        </View>
      )
    );
  };
  render() {
    const { style, data } = this.props;

    return (
      <View style={[styles.btn, style]}>
        {this.renderPickUpItem()}
        {this.renderStopsItem()}
        {has('destinationAddress', data) &&
          has('pickupAddress', data) && <View style={styles.delimiter} />}
        {this.renderDestinationItem()}
      </View>
    );
  }
}

PointList.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  data: PropTypes.object.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onChangeAddressType: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

PointList.defaultProps = {
  style: {}
};

export default PointList;
