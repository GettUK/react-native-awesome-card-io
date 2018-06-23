import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Keyboard,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { debounce, isArray } from 'lodash';
import axios from 'axios';

import { Icon, Input, Modal, Alert } from 'components';
import { nullAddress, get, processLocation, geocode } from 'utils';
import { strings } from 'locales';
import styles from './styles';

const CancelToken = axios.CancelToken;

const searchDebounce = 700;
let cancelRequest;

function getAddresses(params) {
  return get('/addresses', params, { cancelToken: new CancelToken((c) => { cancelRequest = c; }) })
    .then(res => res.data.list);
}

export default class AddressModal extends PureComponent {
  static propTypes = {
    defaultValues: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    typingTimeout: 700,
    value: {},
    defaultValues: []
  };

  state = {
    isVisible: false,
    loading: false,
    inputValue: '',
    values: [],
    meta: {}
  };

  open(address, meta) {
    const processedAddress = address || nullAddress('');
    this.setState({
      isVisible: true,
      meta,
      values: this.props.defaultValues,
      inputValue: processedAddress.line,
      loading: !!processedAddress.line
    }, this.searchAddresses);
  }

  close = () => {
    this.setState({ isVisible: false, inputValue: '', values: [] });
  };

  onChangeText = (text) => {
    this.setState({ inputValue: text }, this.searchAddresses);
  };

  onAddressPress = (item) => {
    const { id, text, google, predefined, address } = item;
    Keyboard.dismiss();

    if (text) {
      geocode({
        locationId: id,
        string: text,
        google,
        predefined
      })
        .then(processLocation)
        .then(this.handleSelect)
        .catch(this.alert.show);
    }
    if (address) {
      this.handleSelect(address);
    }
  };

  handleSelect = (address) => {
    this.props.onChange(address, this.state.meta);
    this.setState({ isVisible: false, inputValue: '', values: [], meta: {} });
  };

  getOptionName = opt =>
    (opt.name && opt.address && opt.address.line
      ? `${opt.name}, ${opt.address.line}`
      : opt.text);

  searchAddresses = debounce(() => {
    const { inputValue, loading } = this.state;

    if (!inputValue.length) return;
    if (loading && cancelRequest) {
      cancelRequest();
    }

    this.setState({ loading: true });
    getAddresses({ string: inputValue })
      .then((data) => {
        this.setState({ values: isArray(data) ? data : [], loading: false });
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          this.setState({ values: [], loading: false });
        }
      });
  }, searchDebounce);

  getPointerIconColor() {
    if (!this.state.meta) return null;

    switch (this.state.meta.type) {
      case 'destinationAddress':
        return '#f00';
      case 'stops':
        return '#8d8d8d';
      default:
        return null;
    }
  }

  renderAddressItem = ({ item }) => {
    const { description, ...rest } = item;
    const name = this.getOptionName(rest);
    return (
      <TouchableOpacity
        style={styles.itemAddressView}
        onPress={() => this.onAddressPress(item)}
      >
        <Text style={styles.itemAddressText}>
          {name}
          {name && description ? ', ' : ''}
          {description}
        </Text>
      </TouchableOpacity>
    );
  };

  renderFooter = () => (
    <View style={styles.indicatorView}>
      <ActivityIndicator animating size="small" color="#f68c41" />
    </View>
  );

  keyExtractor = (item, index) => (item.id && String(item.id) + index) || item.text || item.name;

  renderSearchInput() {
    const { inputValue } = this.state;

    return (
      <View style={styles.row}>
        <Icon
          style={styles.pointerIcon}
          name="pickUpField"
          color={this.getPointerIconColor()}
          size={18}
        />
        <View style={styles.flex}>
          <Input
            value={inputValue}
            onChangeText={this.onChangeText}
            style={styles.input}
            autoCorrect={false}
            autoFocus
            allowedError={false}
            inputStyle={styles.inputStyle}
            selectionColor="#000"
            clearIcon={<Icon name="close" size={16} style={styles.clearIcon} color="#8d8d8d" />}
          />
          <View style={styles.delimiter} />
        </View>
      </View>
    );
  }

  renderAddressList() {
    const { values, loading, inputValue } = this.state;
    const { defaultValues } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.flex}
        keyboardVerticalOffset={80}
      >
        <FlatList
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.list}
          removeClippedSubviews={Platform.OS !== 'ios'}
          data={inputValue.length ? values : defaultValues}
          renderItem={this.renderAddressItem}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={loading && this.renderFooter}
        />
      </KeyboardAvoidingView>
    );
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Modal
        isVisible={isVisible}
        onClose={this.close}
        contentStyles={styles.modalContent}
      >
        {this.renderSearchInput()}

        {this.renderAddressList()}

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type="failed"
          message={strings('information.notSupportedAddress')}
          position="bottom"
        />
      </Modal>
    );
  }
}
