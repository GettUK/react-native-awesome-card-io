import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import update from 'update-js';

import { sendAddress } from 'actions/passenger';
import { Button, Input, DismissKeyboardView } from 'components';
import AddressModal from 'containers/Map/AddressModal';
import { strings } from 'locales';

import styles from './AddressStyles';

class AddressEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.navigation.state.params.address,
      isAddressModalOpened: false
    };
  }

  static propTypes = {
    address: PropTypes.object,
    navigation: PropTypes.object,
    sendAddress: PropTypes.func
  };

  get isPredefinedAddress() {
    const type = this.props.navigation.state.params.predefinedType;
    return type === 'home' || type === 'work';
  }

  addressInput = null;

  goBack = () => this.props.navigation.goBack(null);

  handleInputChange = (field, value) => {
    this.setState(state => update(state, `address.${field}`, value));
  };

  handleAddressChange = (address) => {
    this.setState(state => update(state, this.isPredefinedAddress ? 'address' : 'address.address', address));
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

  renderInput = (props) => (
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
                onChangeText: (v) => this.handleInputChange('name', v)
              })
            }
            {
              this.renderInput({
                inputRef: el => this.addressInput = el,
                label: 'Address',
                value: this.isPredefinedAddress ? address.line : address.address.line || '',
                onFocus: this.toggleAddressModal,
                allowClear: false
              })
            }
            {!this.isPredefinedAddress &&
              this.renderInput({
                label: `Pick Up Message (${address.pickupMessage.length}/100)`,
                value: address.pickupMessage || '',
                onChangeText: (v) => this.handleInputChange('pickupMessage', v),
                maxLength: 100
              })
            }
            {!this.isPredefinedAddress &&
              this.renderInput({
                label: `Destination Message (${address.destinationMessage.length}/100)`,
                value: address.destinationMessage || '',
                onChangeText: (v) => this.handleInputChange('destinationMessage', v),
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
  sendAddress
};

export default connect(null, mapDispatch)(AddressEditor);
