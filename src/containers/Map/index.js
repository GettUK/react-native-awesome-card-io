import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { has, isNull, compose, isEqual } from 'lodash/fp';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon, Button } from 'components';
import Modal from 'react-native-modal';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';

import {
  addAddressPoint,
  changeAddressType,
  changeAddressTyping,
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition
} from 'actions/ui/map';
import { getFormData, changeBookingDate, createOrder } from 'actions/app/booking';
import {
  passegerViewEmpty,
  receivePassegerView
} from 'actions/ui/passenger-view';
import { geocodeEmpty, receiveGeocode } from 'actions/ui/geocode';

import { nullAddress } from 'utils';
import { strings } from 'locales';
import moment from 'moment';
import AddressModal from './AddressModal';
import PointList from './PointList';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    const { map: { options }, passengerView: { results, errors }, getFormData } = this.props;
    getFormData();

    if (!isNull(errors)) {
      this.receivePasseger();
    } else if (isNull(results)) {
      this.receivePasseger();
    }
    setTimeout(() => {
      this.getCurrentPosition();
    }, 750);

    this.watchID = navigator.geolocation.watchPosition(
      this.props.changePosition,
      this.props.errorPosition,
      options
    );
  }
  componentWillReceiveProps({ network: { isConnected } }) {
    const {
      network: { isConnected: oldIsConnected },
      sessionData: { member_id: memberId }
    } = this.props;

    if (!isEqual(oldIsConnected, isConnected)) {
      this.props.receivePassegerView(memberId);
    }
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getCurrentPosition = () => {
    const { map: { options } } = this.props;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.initialRegionPosition(position);
        this.props.changePosition(position);
        this.props
          .receiveGeocode({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          .then(result => {
            this.addPoint(result);
          })
          .catch(() => {
            this.addPoint(nullAddress());
          });
      },
      this.props.errorPosition,
      options
    );
  };
  addPoint = name => {
    this.props.geocodeEmpty();
    this.props.changeAddress(name);
    this.props.changeAddressType('pickup_address', {}, null);
    this.props.addAddressPoint();
  };
  receivePasseger = () => {
    const {
      network: { isConnected },
      sessionData: { member_id: memberId }
    } = this.props;
    if (isConnected) {
      this.props.receivePassegerView(memberId);
    } else {
      this.props.passegerViewEmpty();
    }
  };
  toggleAddressModal = () => {
    const { map: { addressModal } } = this.props;
    this.props.addressVisibleModal(!addressModal);
  };
  watchID = null;

  goToSettings = () => {
    this.props.navigation.navigate('SettingsView', {});
  };

  goToOrders = () => {
    this.props.navigation.navigate('OrdersView', {});
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleDateSubmit = () => {
    this.props.changeBookingDate(this.state.date);
  };

  renderTimeDatePicker() {
    const { date } = this.state;
    const momentDate = moment(date);

    const openDatePickerAndroid = async () => {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date,
          minDate: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.handleDateChange(momentDate.set({ year, month, date: day }).toDate());
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    };

    const openTimePickerAndroid = async () => {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: momentDate.get('hour'),
          minute: momentDate.get('minute'),
          is24Hour: true
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.handleDateChange(momentDate.set({ hour, minute }).toDate());
        }
      } catch ({ code, message }) {
        console.warn('Cannot open time picker', message);
      }
    };

    const renderSelectedValue = (value, handler, icon) => {
      const isAndroid = Platform.OS === 'android';
      return (
        !isAndroid ?
          <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={handler}>
            {value}
            {icon}
          </TouchableOpacity> :
          value
      );
    };

    const renderSelected = () => {
      const time = <Text style={styles.time}>{momentDate.format('H:mm')}</Text>;
      const date = <Text style={styles.date}>{momentDate.format('dddd, MMMM D, YYYY')}</Text>;

      return (
        <View style={styles.selectedWrapper}>
          {renderSelectedValue(date, openDatePickerAndroid, <Icon size={20} name="editAndroid" />)}
          {renderSelectedValue(time, openTimePickerAndroid, <Icon style={styles.TDEditIcon} name="editAndroid" />)}
        </View>
      );
    };

    return (
      <Modal
        style={styles.bottomModal}
        isVisible={false}
        backdropColor="#284784"
        backdropOpacity={0.6}
      >
        <DismissKeyboardView style={styles.TDModal}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={this.toggleAddressModal}>
              <Text style={styles.closeModalText}>
                {strings('map.label.close')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flex}>
            {renderSelected()}

            {Platform.OS === 'ios' &&
              <View style={styles.TDPickerWrapper}>
                <DatePickerIOS
                  date={date}
                  onDateChange={this.handleDateChange}
                  minimumDate={new Date()}
                />
              </View>
            }
            <Button raised={false} style={styles.TDButton} onPress={this.handleDateSubmit}>
              <Text style={styles.TDButtonText}>Set the Time</Text>
            </Button>
          </View>
        </DismissKeyboardView>
      </Modal>
    );
  }

  render() {
    const {
      map: { currentPosition, regionPosition, addressModal, address, fields },
      passengerView: { results }
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Header
          customStyles={[styles.header]}
          leftButton={
            <NavImageButton
              onClick={this.goToSettings}
              styleContainer={{ justifyContent: 'center' }}
              icon={<Icon size={30} name="burger" color="#000" />}
            />
          }
          rightButton={
            <Button
              style={styles.orderBtn}
              raised={false}
              size="sm"
              onPress={this.goToOrders}
            >
              <Text style={styles.orderBtnText}>Orders</Text>
            </Button>
          }
        />
        <AddressModal
          isVisible={addressModal}
          toggleModal={compose(
            this.props.addAddressPoint,
            this.toggleAddressModal
          )}
          value={address.value}
          onChange={this.props.changeAddress}
          isTyping={address.isTyping}
          onChangeTyping={this.props.changeAddressTyping}
          typingTimeout={address.typingTimeout}
        />
        <PointList
          style={styles.pickUpBtn}
          onChangeAddress={this.props.changeAddress}
          onChangeAddressType={this.props.changeAddressType}
          toggleModal={this.toggleAddressModal}
          data={{ ...fields }}
        />
        <View style={styles.footer}>
          <Button
            style={styles.currentPositionBtn}
            onPress={this.getCurrentPosition}
          >
            <Icon name="myLocation" height={22} color="#284784" />
          </Button>
          <Button
            style={styles.currentPositionBtn}
            onPress={this.props.createOrder}
          >
            <Icon name="pickUpCenter" height={22} color="#284784" />
          </Button>
          <ScrollView
            horizontal
            contentContainerStyle={styles.destinationBtns}
            showsHorizontalScrollIndicator={false}>
            <Button
              onPress={() => {
                if (has('destination_address', fields)) {
                  this.props.changeAddress(fields.destination_address);
                }
                this.props.changeAddressType('destination_address', {}, null);
                // this.props.changeAddressType('stops', [], null);
                this.toggleAddressModal();
              }}
              style={styles.destinationBtn}
            >
              <Icon
                style={styles.searchIcon}
                name="search"
                color="#284784"
                size={18}
              />
              <Text style={styles.selectDestinationText}>
                Select Destination
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.props.changeAddress({
                  ...results.home_address,
                  label: strings('label.home')
                });
                this.props.changeAddressType('destination_address', {}, null);
                this.props.addAddressPoint();
              }}
              style={styles.destinationBtn}
            >
              <Text style={styles.customDestinationText}>
                {strings('label.home')}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.props.changeAddress({
                  ...results.work_address,
                  label: strings('label.work')
                });
                this.props.changeAddressType('destination_address', {}, null);
                this.props.addAddressPoint();
              }}
            >
              <Text style={styles.customDestinationText}>
                {strings('label.work')}
              </Text>
            </Button>
          </ScrollView>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          onRegionChangeComplete={position =>
            this.props.changeRegionPosition(position)
          }
          region={regionPosition}>
          <MapView.Marker coordinate={currentPosition} />
        </MapView>
        {this.renderTimeDatePicker()}
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  sessionData: PropTypes.object.isRequired,
  passengerView: PropTypes.object.isRequired,
  addAddressPoint: PropTypes.func.isRequired,
  changeAddressType: PropTypes.func.isRequired,
  changeAddressTyping: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  addressVisibleModal: PropTypes.func.isRequired,
  initialRegionPosition: PropTypes.func.isRequired,
  changeRegionPosition: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired,
  geocodeEmpty: PropTypes.func.isRequired,
  receiveGeocode: PropTypes.func.isRequired,
  passegerViewEmpty: PropTypes.func.isRequired,
  receivePassegerView: PropTypes.func.isRequired,
  changeBookingDate: PropTypes.func.isRequired
};

Map.defaultProps = {};

const mapState = ({ session, network, ui }) => ({
  network,
  map: ui.map,
  sessionData: session.result,
  passengerView: ui.passengerView
});


const mapDispatch = {
  addAddressPoint,
  changeAddressType,
  changeAddressTyping,
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition,
  geocodeEmpty,
  receiveGeocode,
  passegerViewEmpty,
  receivePassegerView,
  changeBookingDate,
  createOrder,
  getFormData
};

export default connect(mapState, mapDispatch)(Map);
