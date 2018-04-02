import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { curry, isNull } from 'lodash';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import update from 'update-js';

import { sendAddress, touchField } from 'actions/passenger';
import { Button, Input, DismissKeyboardView } from 'components';
import AddressModal from 'containers/Map/AddressModal';
import { strings } from 'locales';

import { emptyAddress } from '../utils';

import styles from './AddressStyles';

class AddressEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.navigation.state.params.address || emptyAddress,
      isAddressModalOpened: false,
      touched: false
    };
  }

  static propTypes = {
    address: PropTypes.object,
    navigation: PropTypes.object,
    sendAddress: PropTypes.func
  };

  componentDidMount() {
    this.props.touchField('address', false);
  }

  componentWillUpdate(_, nextState) {
    if (this.state.touched !== nextState.touched) {
      this.props.touchField('address');
    }
  }

  get isPredefinedAddress() {
    const type = this.props.navigation.state.params.predefinedType;
    return type === 'home' || type === 'work';
  }

  addressInput = null;

  goBack = () => this.props.navigation.goBack(null);

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
    this.setState({ isAddressModalOpened: !this.state.isAddressModalOpened });
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
    const { address, isAddressModalOpened } = this.state;

    return (
      <View style={[styles.flex, styles.container]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={70}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.flex}
          >
            {!this.isPredefinedAddress &&
              this.renderInput({
                label: 'Address Name',
                value: address.name || '',
                onChangeText: this.handleInputChange('name')
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
            <View style={styles.flex}/>
            <Button raised={false} style={styles.submitBtn} onPress={this.handleSubmit}>
              <Text style={styles.submitBtnText}>{strings('settings.save')}</Text>
            </Button>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
        <AddressModal
          isVisible={isAddressModalOpened}
          isTyping={false}
          onChangeTyping={() => {}}
          toggleModal={this.toggleAddressModal}
          value={this.isPredefinedAddress ? address : address.address}
          onChange={this.handleAddressChange}
        />
      </View>
    );
  }
}

const mapDispatch = {
  sendAddress,
  touchField
};

export default connect(null, mapDispatch)(AddressEditor);
