import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { curry } from 'lodash';
import { View, BackHandler, TouchableWithoutFeedback, Text, KeyboardAvoidingView, Platform } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { touchField, setTempAddress, changeTempAddressField, changeTempAddress } from 'actions/passenger';
import { Input, AddressModal, DismissKeyboardView } from 'components';
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
    this.props.changeTempAddressField(field, value);
  });

  handleAddressChange = (address) => {
    this.props.changeTempAddress(address);
  };

  toggleAddressModal = () => {
    this.addressInput.blur();
    this.addressModal.open(this.props.address.address);
  };

  renderInput = props => (
    <Input
      labelStyle={styles.inputLabel}
      multiline
      inputStyle={[styles.input, props.last ? styles.inputLast : {}]}
      style={[styles.inputContainer, props.last ? styles.lastItem : {}]}
      allowClearStyle={styles.allowClearStyle}
      clearIconColor="#d2d0dc"
      clearIconStyle={styles.clearIcon}
      selectionColor="#494949"
      {...props}
    />
  );

  renderForm = () => {
    const { address, errors, navigation } = this.props;
    const { editing } = navigation.state.params;

    return (
      <InputScrollView contentContainerStyle={[styles.container, editing ? styles.scrollContainer : {}]}>
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
            last: editing,
            onChangeText: this.handleInputChange('destinationMessage'),
            error: errors.destinationMessage,
            maxLength: 100
          })
        }
      </InputScrollView>
    );
  };

  renderDeleteButton = () => {
    const { address, navigation } = this.props;
    const { onRemove } = navigation.state.params;

    return (
      <TouchableWithoutFeedback onPress={() => onRemove(address.id, null, navigation.goBack)}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteLabel}>{strings('settings.address.addressDelete')}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  getFieldLength = field => (field && field.length) || 0;

  renderPage = () => {
    const { editing } = this.props.navigation.state.params;
    return (
      Platform.OS === 'ios'
        ? this.renderForm()
        : (
          <Fragment>
            <KeyboardAvoidingView
              keyboardVerticalOffset={130}
              behavior="padding"
              style={styles.flex}
            >
              {this.renderForm()}
            </KeyboardAvoidingView>
            {editing && this.renderDeleteButton()}
          </Fragment>
        )
    );
  };

  render() {
    const { editing } = this.props.navigation.state.params;

    return (
      <View style={[styles.flex, styles[`container${editing ? 'Grey' : ''}`]]}>
        <DismissKeyboardView style={styles.flex}>
          {this.renderPage()}
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
