import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { Icon, Input, Button } from 'components';
import Modal from 'react-native-modal';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';
import {
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition
} from 'actions/app/map';
import { changeBookingDate } from 'actions/app/booking';
import { strings } from 'locales';
import moment from 'moment';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    const { map: { options } } = this.props;
    setTimeout(() => {
      this.getCurrentPosition();
    }, 500);
    this.watchID = navigator.geolocation.watchPosition(
      this.props.changePosition,
      this.props.errorPosition,
      options
    );
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
      },
      this.props.errorPosition,
      options
    );
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

  handleDateChange = (date) => {
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
        !isAndroid
          ?
          <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={handler}>
            {value}
            {icon}
          </TouchableOpacity>
          : value
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
      map: { currentPosition, regionPosition, addressModal, fields }
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
            <Button style={styles.orderBtn} raised={false} size="sm" onPress={this.goToOrders}>
              <Text style={styles.orderBtnText}>Orders</Text>
            </Button>
          }
        />
        <Modal
          style={styles.bottomModal}
          isVisible={addressModal}
          backdropColor="#284784"
          backdropOpacity={0.6}>
          <DismissKeyboardView style={styles.modalContent}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={this.toggleAddressModal}>
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
                  value={fields.address}
                  onChangeText={this.props.changeAddress}
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
          </DismissKeyboardView>
        </Modal>
        <Button onPress={this.toggleAddressModal} style={styles.pickUpBtn}>
          <Icon style={styles.pickUpIcon} name="pickUpField" size={18} />
          <Text style={styles.pickUpText} numberOfLines={1}>
            11 Soho Square, Soho, London W1D sdfsdlfjsldk flsd flssdfsdf sdf sdf
            sdf df
          </Text>
        </Button>
        <View style={styles.footer}>
          <Button
            style={styles.currentPositionBtn}
            onPress={this.getCurrentPosition}
          >
            <Icon name="myLocation" height={22} color="#284784" />
          </Button>
          <ScrollView
            horizontal
            contentContainerStyle={styles.destinationBtns}
            showsHorizontalScrollIndicator={false}>
            <Button style={styles.destinationBtn}>
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
            <Button style={styles.destinationBtn}>
              <Text style={styles.customDestinationText}>Home</Text>
            </Button>
            <Button>
              <Text style={styles.customDestinationText}>Work</Text>
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
  changeAddress: PropTypes.func.isRequired,
  addressVisibleModal: PropTypes.func.isRequired,
  initialRegionPosition: PropTypes.func.isRequired,
  changeRegionPosition: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired
};

Map.defaultProps = {};

const select = ({ app }) => ({
  map: app.map
});

const bindActions = {
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition,
  changeBookingDate
};

export default connect(select, bindActions)(Map);
