import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { curry } from 'lodash';
import { View, ScrollView, BackHandler } from 'react-native';

import { touchField, setTempAddress, changeTempAddressField, changeTempAddress } from 'actions/passenger';
import { Input, AddressModal } from 'components';
import { strings } from 'locales';
import { throttledAction, showConfirmationAlert } from 'utils';

import styles from './AddressStyles';

class AddressEditor extends Component {
  static propTypes = {
    address: PropTypes.object,
    navigation: PropTypes.object,
    setTempAddress: PropTypes.func,
    changeTempAddressField: PropTypes.func,
    changeTempAddress: PropTypes.func
  };

  componentDidMount() {
    const { navigation, setTempAddress } = this.props;
    const { address } = navigation.state.params;
    setTempAddress(address);

    this.backListener = BackHandler.addEventListener('backPress', () => {
      const { touched } = this.props;

      if (touched) {
        showConfirmationAlert({ title: strings('goBack'), handler: this.goBack });
        return true;
      }

      this.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.props.touchField('address', false);

    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  goBack = throttledAction(() => this.props.navigation.goBack(null));

  handleInputChange = curry((field, value) => {
    this.props.changeTempAddressField(field, value.trim());
  });

  handleAddressChange = (address) => {
    this.props.changeTempAddress(address);
  };

  toggleAddressModal = () => {
    this.addressModal.open(this.props.address.address);
    this.addressInput.blur();
  };

  renderInput = props => (
    <Input
      labelStyle={styles.inputLabel}
      multiline
      inputStyle={styles.input}
      style={styles.inputContainer}
      allowClearStyle={styles.allowClearStyle}
      clearIconColor="#d2d0dc"
      clearIconStyle={styles.clearIcon}
      selectionColor="#494949"
      {...props}
    />
  );

  getFieldLength = field => (field && field.length) || 0;

  render() {
    const { address, errors } = this.props;

    return (
      <View style={[styles.flex, styles.container]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          {
            this.renderInput({
              label: `Address Name (${this.getFieldLength(address.name)}/32)`,
              value: address.name || '',
              onChangeText: this.handleInputChange('name'),
              error: errors.name,
              maxLength: 32
            })
          }
          {
            this.renderInput({
              inputRef: (el) => { this.addressInput = el; },
              label: 'Address',
              value: (address.address && address.address.line) || '',
              onFocus: this.toggleAddressModal,
              error: errors['address.line'] || errors['address.lat'] || errors['address.countryCode'],
              allowClear: false
            })
          }
          {
            this.renderInput({
              label: `Pick Up Message (${this.getFieldLength(address.pickupMessage)}/100)`,
              value: address.pickupMessage || '',
              onChangeText: this.handleInputChange('pickupMessage'),
              error: errors.pickupMessage,
              maxLength: 100
            })
          }
          {
            this.renderInput({
              label: `Destination Message (${this.getFieldLength(address.destinationMessage)}/100)`,
              value: address.destinationMessage || '',
              onChangeText: this.handleInputChange('destinationMessage'),
              error: errors.destinationMessage,
              maxLength: 100
            })
          }
        </ScrollView>
        <AddressModal
          ref={(el) => { this.addressModal = el; }}
          onChange={this.handleAddressChange}
        />
      </View>
    );
  }
}

const mapState = ({ passenger }) => ({
  address: passenger.temp.address || {},
  errors: passenger.temp.addressErrors || {},
  touched: passenger.temp.addressTouched
});

const mapDispatch = {
  setTempAddress,
  changeTempAddressField,
  changeTempAddress,
  touchField
};

export default connect(mapState, mapDispatch)(AddressEditor);
