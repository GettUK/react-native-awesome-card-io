import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableWithoutFeedback, DatePickerAndroid, TimePickerAndroid,
  Platform, TouchableOpacity, DatePickerIOS
} from 'react-native';
import { HourFormat } from 'react-native-hour-format';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import { changeFields, asyncChangeFields } from 'actions/booking';
import { Icon, Button, Modal } from 'components';

import { withTheme } from 'providers';

import { minutesForward, momentDate, convertToZone, timeFormat } from 'utils';

import styles from './styles';

class PickUpTime extends PureComponent {
  static propTypes = {
    booking: PropTypes.object,
    requestVehicles: PropTypes.func,
    changeFields: PropTypes.func,
    wrapperStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ])
  };

  state = {
    date: minutesForward(30).toDate(),
    minDate: minutesForward(30).toDate(),
    isModalOpened: false
  };

  componentDidUpdate({ vehicleName: vehicleNameProps }) {
    this.setFutureTimeLimitForVehicleType({ vehicleNameProps });
  }

  setFutureTimeLimitForVehicleType = ({ vehicleNameProps }) => {
    const { vehicleName, booking: { scheduledAt } } = this.props;

    if (vehicleName && vehicleName !== vehicleNameProps) {
      const timeWithDelay = this.getMinimalFutureOrderTime().toDate();

      this.setState({ date: scheduledAt ? moment(scheduledAt).toDate() : timeWithDelay, minDate: timeWithDelay });
    }
  };

  openPickerModal = () => {
    const { booking: { scheduledAt } } = this.props;
    const minDate = this.getMinimalFutureOrderTime();

    this.setState({
      isModalOpened: true,
      date: (scheduledAt ? moment(scheduledAt) : minDate).toDate(),
      minDate: minDate.toDate()
    });
  };

  getMinimalFutureOrderTime = () => {
    const { vehicleName, vehicles, disableNow } = this.props;
    const delay = vehicles.data.find(vehicle => vehicle.name === vehicleName);
    const earliestAvailable = (delay && delay.earliestAvailableIn) || 60;
    const minutes = disableNow ? 1440 : earliestAvailable;
    return minutesForward(minutes);
  };

  closePickerModal = () => {
    this.setState({ isModalOpened: false });
  };

  handleDateChange = (date) => {
    const minDate = this.getMinimalFutureOrderTime().toDate();

    this.setState({ date: date || minDate, minDate });
  };

  setTimePickerTime = (time) => {
    const { date } = this.state;
    const moment = momentDate(date);
    const toTime = time ? moment.set({ ...time }) : moment;
    const minDate = this.getMinimalFutureOrderTime();

    if (minDate.isBefore(toTime)) {
      this.handleDateChange(toTime.toDate());
    } else {
      this.handleDateChange(minDate.toDate());
    }
  };

  handleUpdateSchedule = async (type = 'now') => {
    const { date } = this.state;
    const { requestVehicles, asyncChangeFields } = this.props;
    const minDate = this.getMinimalFutureOrderTime();
    const scheduledAt = type === 'later'
      ? (minDate.isBefore(momentDate(date)) && momentDate(date)) || minDate
      : null;

    this.closePickerModal();
    await asyncChangeFields({ scheduledType: type, scheduledAt });
    requestVehicles();
  };

  handleNowSubmit = () => {
    this.handleUpdateSchedule('now');
  };

  handleDateSubmit = () => {
    this.handleUpdateSchedule('later');
  };

  openDatePickerAndroid = async () => {
    const { date, minDate } = this.state;
    const moment = momentDate(date);

    try {
      const { action, year, month, day } = await DatePickerAndroid.open({ date, minDate });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.handleDateChange(moment.set({ year, month, date: day }).toDate());
      }
    } catch ({ code, message }) {
      // eslint-disable-next-line no-console
      console.warn('Cannot open date picker', message);
    }
  };

  openTimePickerAndroid = async () => {
    const { date } = this.state;
    const moment = momentDate(date);
    const { is24HourFormat } = HourFormat;

    try {
      this.setTimePickerTime();
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: moment.get('hour'),
        minute: moment.get('minute'),
        is24Hour: is24HourFormat()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setTimePickerTime({ hour, minute });
      }
    } catch ({ code, message }) {
      // eslint-disable-next-line no-console
      console.warn('Cannot open time picker', message);
    }
  };

  renderSelectedValue = (value, handler, icon) => {
    const isAndroid = Platform.OS === 'android';
    return (
      isAndroid
        ?
        (
          <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={handler}>
            {value}
            {icon}
          </TouchableOpacity>
        )
        : value
    );
  };

  renderSelected = () => {
    const { theme } = this.props;
    const { date } = this.state;
    const moment = momentDate(date);
    const timeText =
      <Text style={[styles.time, { color: theme.color.primaryText }]}>
        {moment.format(timeFormat())}
      </Text>;
    const dateText =
      <Text style={[styles.date, { color: theme.color.primaryText }]}>
        {moment.format('dddd, MMMM D, YYYY')}
      </Text>;

    return (
      <View style={styles.selectedWrapper}>
        {this.renderSelectedValue(
          timeText,
          this.openTimePickerAndroid,
          <Icon style={styles.TDEditIcon} name="editAndroid" color={theme.color.primaryText} />
        )}
        {this.renderSelectedValue(
          dateText,
          this.openDatePickerAndroid,
          <Icon size={20} name="editAndroid" color={theme.color.primaryText} />
        )}
      </View>
    );
  };

  renderButton = ({ style, styleText, title, onClick }) => (
    <Button
      key={title}
      raised
      style={styles.buttonContainer}
      styleContent={[styles.button, style]}
      onPress={onClick}
    >
      <Text style={[styles.buttonText, styleText]}>{title}</Text>
    </Button>
  );

  renderControlButtons = () => {
    const { disableNow } = this.props;
    const buttons = [
      {
        title: 'Now',
        style: [styles.NowButton, { backgroundColor: this.props.theme.color.bgSecondary }],
        styleText: styles.NowButtonText,
        onClick: this.handleNowSubmit
      },
      { title: 'Set', style: styles.TDButton, styleText: styles.TDButtonText, onClick: this.handleDateSubmit }
    ];

    if (disableNow) {
      buttons.shift();
    }

    return (
      <View style={styles.row}>
        {buttons.map(this.renderButton)}
      </View>
    );
  };

  renderDatePickeriOS = () => {
    const { date, minDate } = this.state;
    const { booking: { pickupAddress, timezone }, theme } = this.props;
    const moment = momentDate(date);
    let timezoneDate = moment;

    if ((pickupAddress && pickupAddress.timezone) || timezone) {
      timezoneDate = convertToZone(moment, pickupAddress.timezone || timezone);
    }

    return Platform.OS === 'ios' &&
      <View style={[styles.TDPickerWrapper, { backgroundColor: theme.color.bgOptions, borderWidth: 0 }]}>
        <DatePickerIOS
          date={date}
          onDateChange={this.handleDateChange}
          minimumDate={minDate}
          timeZoneOffsetInMinutes={timezoneDate.utcOffset()}
        />
      </View>;
  };

  renderTimeDatePicker() {
    const { isModalOpened } = this.state;
    const { theme } = this.props;

    return (
      <Modal
        isVisible={isModalOpened}
        onClose={this.closePickerModal}
        contentStyles={{ backgroundColor: theme.color.bgPrimary }}
      >
        {this.renderSelected()}
        {this.renderDatePickeriOS()}
        {this.renderControlButtons()}
      </Modal>
    );
  }

  render() {
    const { booking: { scheduledType, scheduledAt, asap }, wrapperStyle, theme, title } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.openPickerModal}>
        <View style={[styles.pickupTimeContainer, wrapperStyle, { backgroundColor: theme.color.bgPrimary }]}>
          <Icon name="time" size={24} color={theme.color.pixelLine} />
          <View style={styles.pickupTime}>
            <Text style={[styles.pickupTimeLabel, { color: theme.color.primaryText }]}>{title}</Text>
            <Text style={[styles.pickupTimeValue, { color: theme.color.primaryText }]}>
              {scheduledType === 'later' || asap === false
                ? moment(scheduledAt).format(`D MMM YYYY, ${timeFormat()}`)
                : 'Now'
              }
            </Text>
          </View>
          <View><Icon name="chevron" size={16} color={theme.color.arrowRight} /></View>
          {this.renderTimeDatePicker()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

PickUpTime.defaultProps = {
  title: 'Pickup Time',
  disableNow: false
};

const mapState = ({ booking }) => ({
  vehicleName: booking.bookingForm.vehicleName,
  vehicles: booking.vehicles
});

const mapDispatch = {
  changeFields,
  asyncChangeFields
};

export default connect(mapState, mapDispatch)(withTheme(PickUpTime));
