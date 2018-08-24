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
import { connect } from 'react-redux';
import { debounce, isArray } from 'lodash';
import axios from 'axios';

import { getSuggestedAddresses } from 'actions/booking';

import { Icon, Input, Modal, Alert } from 'components';

import { strings } from 'locales';

import { color } from 'theme';

import { withTheme } from 'providers';

import { nullAddress, get, processLocation, geocode } from 'utils';

import AddressTabBar from './AddressTabBar';

import styles from './styles';

const CancelToken = axios.CancelToken; // TODO: move work with axios to utils

const searchDebounce = 700;
let cancelRequest;

function getAddresses(params) {
  return get('/addresses', params, { cancelToken: new CancelToken((c) => { cancelRequest = c; }) })
    .then(res => res.data.list);
}

class AddressModal extends PureComponent {
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
    meta: {},
    activeTab: 'favorites'
  };

  open(address, meta) {
    const processedAddress = address || nullAddress('');
    this.setState({
      isVisible: true,
      meta,
      inputValue: processedAddress.line,
      loading: !!processedAddress.line
    }, this.searchAddresses);
  }

  close = () => {
    this.setState({ isVisible: false, inputValue: '', values: [] });
  };

  onChangeTab = (activeTab) => {
    const { suggestedAddresses, getSuggestedAddresses } = this.props;

    this.setState({ activeTab });

    if (activeTab !== 'favorites' && (!suggestedAddresses[activeTab] || !suggestedAddresses[activeTab].loaded)) {
      getSuggestedAddresses(activeTab);
    }
  }

  onChangeText = (text) => {
    this.setState({ inputValue: text }, this.searchAddresses);
  };

  onAddressPress = (item) => {
    const { activeTab, inputValue } = this.state;
    const { id, text, google, predefined, address } = item;
    const googleParam = google || (activeTab !== 'favourites' && !inputValue);

    Keyboard.dismiss();

    const payload = {
      locationId: id,
      string: text,
      predefined
    };

    if (googleParam) payload.google = googleParam;

    if (text) {
      geocode(payload)
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
    this.setState({ isVisible: false });
    setTimeout(() => this.setState({ inputValue: '', values: [], meta: {} }), 500); // for smooth animation
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

  getPointerIconData() {
    const defaultIcon = { name: 'pickUpField' };
    if (!this.state.meta) return defaultIcon;

    switch (this.state.meta.type) {
      case 'destinationAddress':
        return { color: color.danger, name: 'destinationMarker' };
      case 'stops':
        return { ...defaultIcon, color: color.secondaryText };
      default:
        return defaultIcon;
    }
  }

  renderAddressItem = ({ item }) => {
    const { theme } = this.props;
    const { inputValue, activeTab } = this.state;
    const { type, types, name, address, text } = item;

    const icons = {
      favorite: 'favorites',
      airport: 'airport',
      trainStation: 'trainStation',
      lodging: 'lodging',
      restaurant: 'restaurant',
      pointOfInterest: 'pointOfInterest',
      home: 'homeAddress',
      work: 'workAddress'
    };

    const typedIcon = activeTab && activeTab !== 'favorites' && !inputValue.length
      ? activeTab
      : (type || types) && icons[type || types[0]];

    return (
      <TouchableOpacity style={styles.itemAddressView} onPress={() => this.onAddressPress(item)}>
        <Icon name={typedIcon || 'defaultAddress'} style={styles.iconSpace} height={20} />
        <View style={styles.flex}>
          <Text numberOfLines={1} style={[styles.itemAddressText, { color: theme.color.primaryText }]}>
            {name || text}
          </Text>
          {address &&
            <Text numberOfLines={1} style={{ paddingTop: 6, color: theme.color.secondaryText }}>{address.line}</Text>
          }
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => (
    <View style={styles.indicatorView}>
      <ActivityIndicator animating size="small" color={color.warning} />
    </View>
  );

  keyExtractor = (item, index) => (item.id && String(item.id) + index) || item.text || item.name;

  renderSearchInput() {
    const { inputValue } = this.state;

    return (
      <View style={styles.row}>
        <Icon
          style={styles.pointerIcon}
          {...this.getPointerIconData()}
          size={18}
        />
        <View style={styles.flex}>
          <Input
            placeholder="Enter the address..."
            value={inputValue}
            onChangeText={this.onChangeText}
            style={styles.input}
            autoCorrect={false}
            allowedError={false}
            inputStyle={styles.inputStyle}
            clearIcon={<Icon name="close" size={16} style={styles.clearIcon} color={color.secondaryText} />}
          />
          <View style={[styles.delimiter, { borderColor: this.props.theme.color.pixelLine }]} />
        </View>
      </View>
    );
  }

  renderAddressList() {
    const { values, loading, loadingTab, activeTab, inputValue } = this.state;
    const { defaultValues, suggestedAddresses, theme } = this.props;

    const addresses = activeTab === 'favorites' ? defaultValues : suggestedAddresses[activeTab].list;
    const data = inputValue.length ? values : addresses;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.flex} keyboardVerticalOffset={80}>
        {data && data.length && loadingTab !== activeTab
          ? <FlatList
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.list}
            removeClippedSubviews={Platform.OS !== 'ios'}
            data={data}
            renderItem={this.renderAddressItem}
            keyExtractor={this.keyExtractor}
            ListFooterComponent={loading && this.renderFooter}
          />
          : <Text style={[styles.emptyLabel, { color: theme.color.primaryText }]}>
            {strings('app.label.emptyResult')}
          </Text>
        }
      </KeyboardAvoidingView>
    );
  }

  render() {
    const { loadingTab, theme } = this.props;
    const { isVisible, activeTab, inputValue } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        onClose={this.close}
        contentStyles={[styles.modalContent, { backgroundColor: this.props.theme.color.bgPrimary }]}
      >
        {this.renderSearchInput()}

        {!inputValue.length &&
          <AddressTabBar theme={theme} activeTab={activeTab} onChangeTab={this.onChangeTab} />
        }

        {loadingTab === activeTab ? <Text style={styles.loading}>Loading...</Text> : this.renderAddressList()}

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type="failed"
          message={strings('alert.message.notSupportedAddress')}
          position="bottom"
        />
      </Modal>
    );
  }
}

const mapState = ({ booking }) => ({
  loadingTab: booking.suggestedAddresses.loadingType,
  error: booking.suggestedAddresses.loadingError,
  suggestedAddresses: booking.suggestedAddresses
});

export default connect(mapState, { getSuggestedAddresses })(withTheme(AddressModal));
