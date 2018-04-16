import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { curry, isNull } from 'lodash';
import { View, Text, KeyboardAvoidingView, ScrollView, BackHandler } from 'react-native';
import update from 'update-js';

import { showConfirmationAlert } from 'utils';

import { sendAddress, touchField } from 'actions/passenger';
import { Button, Input, DismissKeyboardView, AddressModal } from 'components';
import { strings } from 'locales';
import { throttledAction } from 'utils';

import { emptyAddress } from '../utils';

import styles from './AddressStyles';

class AddressEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.navigation.state.params.address || emptyAddress,
      touched: false
    };
  }

  static propTypes = {
    address: PropTypes.object,
    navigation: PropTypes.object,
    sendAddress: PropTypes.func
  };

  componentDidMount() {
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

  componentWillUpdate(_, nextState) {
    if (this.state.touched !== nextState.touched) {
      this.props.touchField('address');
    }
  }

  componentWillUnmount() {
    this.props.touchField('address', false);

    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  get isPredefinedAddress() {
    const type = this.props.navigation.state.params.predefinedType;
    return type === 'home' || type === 'work';
  }

  addressInput = null;

  goBack = throttledAction(() => this.props.navigation.goBack(null));

  handleInputChange = curry((field, value) => {
    this.setState(state => update(state, { [`address.${field}`]: value, touched: true }));
  });

  handleAddressChange = (address) => {
    this.setState(state => update(state, {
      [this.isPredefinedAddress ? 'address' : 'address.address']: address,
      touched: true
    }));
  };

  toggleAddressModal = () => {
    const { address } = this.state;
    this.addressModal.open(this.isPredefinedAddress ? address : address.address);
    this.addressInput.blur();
  };

  handleSubmit = () => {
    const { sendAddress, navigation } = this.props;
    sendAddress(this.state.address, navigation.state.params.predefinedType)
      .then(this.goBack);
  };

  renderInput = props => (
    <Input
      labelStyle={styles.inputLabel}
      multiline
      inputStyle={styles.input}
      style={styles.inputContainer}
      clearIconColor="#d2d0dc"
      clearIconStyle={styles.clearIcon}
      selectionColor="#494949"
      {...props}
    />
  );

  getFieldLength = field => ((!isNull(field) && field.length) || 0);

  render() {
    const { address } = this.state;

    return (
      <View style={[styles.flex, styles.container]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={80}
            behavior="padding"
            style={styles.flex}
          >
            <View style={styles.flex}>
              <ScrollView keyboardShouldPersistTaps="handled">
                {!this.isPredefinedAddress &&
                  this.renderInput({
                    label: `Address Name (${this.getFieldLength(address.name)}/32)`,
                    value: address.name || '',
                    onChangeText: this.handleInputChange('name'),
                    maxLength: 32
                  })
                }
                {
                  this.renderInput({
                    inputRef: (el) => { this.addressInput = el; },
                    label: 'Address',
                    value: this.isPredefinedAddress ? address.line || '' : address.address.line || '',
                    onFocus: this.toggleAddressModal,
                    allowClear: false
                  })
                }
                {!this.isPredefinedAddress &&
                  this.renderInput({
                    label: `Pick Up Message (${this.getFieldLength(address.pickupMessage)}/100)`,
                    value: address.pickupMessage || '',
                    onChangeText: this.handleInputChange('pickupMessage'),
                    maxLength: 100
                  })
                }
                {!this.isPredefinedAddress &&
                  this.renderInput({
                    label: `Destination Message (${this.getFieldLength(address.destinationMessage)}/100)`,
                    value: address.destinationMessage || '',
                    onChangeText: this.handleInputChange('destinationMessage'),
                    maxLength: 100
                  })
                }
              </ScrollView>
            </View>

            <Button raised={false} styleContent={styles.submitBtn} onPress={this.handleSubmit}>
              <Text style={styles.submitBtnText}>{strings('settings.save')}</Text>
            </Button>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
        <AddressModal
          ref={(el) => { this.addressModal = el; }}
          onChange={this.handleAddressChange}
        />
      </View>
    );
  }
}

const mapState = ({ passenger }) => ({
  touched: passenger.temp.addressTouched
});

const mapDispatch = {
  sendAddress,
  touchField
};

export default connect(mapState, mapDispatch)(AddressEditor);
