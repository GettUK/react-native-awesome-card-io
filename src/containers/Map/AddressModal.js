import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { has, isNull, compose } from 'lodash/fp';
import Modal from 'react-native-modal';

import { Icon, Input } from 'components';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import { geocodeEmpty, geocode } from 'actions/ui/geocode';
import { addressesEmpty, getAddresses } from 'actions/ui/addresses';
import { strings } from 'locales';
import { nullAddress } from 'utils';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class AddressModal extends Component {

  componentDidMount() {
    this.props.addressesEmpty();
    // this.props.onChange(nullAddress(''));
  }

  onChangeText = text => {
    const { onChange, onChangeTyping, isTyping } = this.props;
    onChange(nullAddress(text));
    this.resetStopTypingTimeout();
    if (!isTyping) {
      onChangeTyping(true);
    }
  };

  onSelect = item => {
    const { id, text, google, predefined } = item;
    this.props
      .geocode({
        locationId: id,
        string: text,
        google,
        predefined
      })
      .then(this.addPoint)
      .catch(() => {
        this.addPoint(nullAddress(text));
      });
  };

  getOptionName = opt =>
    opt.name && opt.address && opt.address.line ?
      `${opt.name}, ${opt.address.line}` :
      opt['formatted_address'] || opt.text;

  addPoint = name => {
    this.props.onChange(name);
    this.props.toggleModal();
    this.props.addressesEmpty();
    this.props.geocodeEmpty();
  };

  stoppedTyping = () => {
    const { value } = this.props;
    this.props.getAddresses({
      string: (value && value.line) || '',
      filters: 'uk'
    });
  };

  resetStopTypingTimeout = () => {
    if (!isNull(this.stopTypingTimeout)) {
      clearTimeout(this.stopTypingTimeout);
    }
    this.stopTypingTimeout = setTimeout(() => {
      this.props.onChangeTyping(false);
      this.stoppedTyping();
      this.stopTypingTimeout = null;
    }, this.props.typingTimeout);
  };

  stopTypingTimeout = null;

  renderItem = ({ item }) => {
    const { description, ...rest } = item;
    const name = this.getOptionName(rest);
    return (
      <TouchableOpacity
        style={styles.itemAddressView}
        onPress={() => this.onSelect(item)}
      >
        <Text style={styles.itemAddressText}>
          {name}
          {name && description ? ', ' : ''}
          {description}
        </Text>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    const { addresses: { busy } } = this.props;
    return (
      busy && (
        <View style={styles.indicatorView}>
          <ActivityIndicator animating size="small" color="#F68C41" />
        </View>
      )
    );
  };

  render() {
    const { isVisible, value, addresses: { results } } = this.props;
    return (
      <Modal
        style={styles.bottomModal}
        isVisible={isVisible}
        backdropColor="#284784"
        backdropOpacity={0.6}>
        <DismissKeyboardView style={styles.modalContent}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={compose(
                this.props.addressesEmpty,
                this.props.geocodeEmpty,
                this.props.toggleModal
              )}>
              <Text style={styles.closeModalText}>
                {strings('map.label.close')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Icon
              style={styles.pickUpAddress}
              name="pickUpField"
              color="#FF0000"
              size={18}
            />
            <View style={{ flex: 1 }}>
              <Input
                value={(value && value.line) || ''}
                onChangeText={this.onChangeText}
                style={styles.input}
                autoCorrect={false}
                autoFocus
                inputStyle={styles.inputStyle}
                keyboardType="email-address"
                selectionColor="#000"
                clearIcon={<Icon name="close" size={16} color="#8D8D8D" />}
              />
              <View style={styles.delimiter} />
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}>
            <FlatList
              style={{}}
              contentContainerStyle={{ flexGrow: 1 }}
              removeClippedSubviews={Platform.OS !== 'ios'}
              data={
                !isNull(results) &&
                has('list', results) &&
                results.list.length > 0 ?
                  results.list :
                  []
              }
              renderItem={this.renderItem}
              keyExtractor={item => item.text}
              ListFooterComponent={this.renderFooter}
            />
          </KeyboardAvoidingView>
        </DismissKeyboardView>
      </Modal>
    );
  }
}

AddressModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  typingTimeout: PropTypes.number,
  isTyping: PropTypes.bool.isRequired,
  value: PropTypes.shape({
    line: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  addresses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTyping: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  addressesEmpty: PropTypes.func.isRequired,
  getAddresses: PropTypes.func.isRequired,
  geocodeEmpty: PropTypes.func.isRequired,
  geocode: PropTypes.func.isRequired
};

AddressModal.defaultProps = {
  typingTimeout: 700,
  value: {}
};

const select = ({ ui }) => ({
  addresses: ui.addresses
});

const bindActions = {
  addressesEmpty,
  getAddresses,
  geocodeEmpty,
  geocode
};

export default connect(select, bindActions)(AddressModal);
