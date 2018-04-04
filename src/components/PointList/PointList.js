import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { has, isNull, map } from 'lodash/fp';
import { Icon } from 'components';
import styles from './styles';

class PointList extends PureComponent {
  renderPickUpItem = () => {
    const { data, onChangeAddress, onChangeAddressType, toggleModal } = this.props;
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          if (has('pickupAddress', data)) {
            onChangeAddress(data.pickupAddress);
          }
          onChangeAddressType('pickupAddress', {}, null);
          toggleModal();
        }}>
        <Icon style={styles.pickUpIcon} name="pickUpField" size={18} />
        {has('pickupAddress', data) && !isNull(data.pickupAddress.line) &&
          <Text style={styles.pickUpText} numberOfLines={1}>
            {data.pickupAddress.label || data.pickupAddress.line}
          </Text>
        }
      </TouchableOpacity>
    );
  };

  renderStopsItem = () => {
    const { data, onChangeAddress, onChangeAddressType, toggleModal } = this.props;
    return (
      has('stops', data) &&
      map(
        (item) => {
          const address = item.address ? item.address : item;
          return (
            <View key={address.line}>
              <View style={styles.delimiter} />
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  onChangeAddress(address);
                  onChangeAddressType('stops', [], { ...item });
                  toggleModal();
                }}>
                <Icon
                  style={[styles.pickUpIcon, { marginLeft: 3 }]}
                  name="pickUpField"
                  size={12}
                  color="#8D8D8D"
                />
                {!isNull(address.line) &&
                  <Text style={styles.pickUpText} numberOfLines={1}>
                    {address.label || address.line}
                  </Text>
                }
              </TouchableOpacity>
            </View>
          );
        },
        data.stops
      )
    );
  };

  renderDestinationItem = () => {
    const { data, onChangeAddress, onChangeAddressType, toggleModal, allowAddingStops } = this.props;
    return (
      has('destinationAddress', data) && (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => {
              if (has('destinationAddress', data)) {
                onChangeAddress(data.destinationAddress);
              }
              onChangeAddressType('destinationAddress', {}, null);
              toggleModal();
            }}>
            <Icon
              style={styles.pickUpIcon}
              name="pickUpField"
              color="#FF0000"
              size={18}
            />
            {has('destinationAddress', data) && !isNull(data.destinationAddress.line) &&
              <Text style={styles.pickUpText} numberOfLines={1}>
                {data.destinationAddress.label || data.destinationAddress.line}
              </Text>
            }
          </TouchableOpacity>

          {allowAddingStops && (!data.stops || data.stops.length < 5) &&
            <TouchableOpacity
              style={styles.btnPlus}
              onPress={() => {
                onChangeAddressType('stops', [], null);
                toggleModal();
              }}>
              <Icon name="plus" color="#8D8D8D" size={18} />
            </TouchableOpacity>
          }
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
        {has('destinationAddress', data) && has('pickupAddress', data) &&
          <View style={styles.delimiter} />
        }
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
  onChangeAddress: PropTypes.func,
  onChangeAddressType: PropTypes.func,
  toggleModal: PropTypes.func
};

PointList.defaultProps = {
  style: {},
  onChangeAddress: () => {},
  onChangeAddressType: () => {},
  toggleModal: () => {},
  allowAddingStops: true
};

export default PointList;
