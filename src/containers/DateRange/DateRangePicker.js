import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment-timezone';

import { color } from 'theme';

const initialState = {
  isFromDatePicked: false,
  isToDatePicked: false,
  markedDates: {}
};

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    DateRangePicker.context = this;
  }

  state = initialState;

  componentDidMount() {
    this.setupInitialRange();
  }

  static clear() {
    DateRangePicker.context.setState(initialState);
  }

  onDayPress = (day) => {
    const { isFromDatePicked, isToDatePicked, fromDate, markedDates: MarkedDates } = this.state;
    const { onSuccess } = this.props;

    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      this.setupStartMarker(day);
      onSuccess(day.dateString, day.dateString);
    } else if (!isToDatePicked) {
      const [markedDates, range] = this.setupMarkedDates(fromDate, day.dateString, MarkedDates);

      if (range >= 0) {
        this.setState({ isFromDatePicked: true, isToDatePicked: true, markedDates });
        onSuccess(fromDate, day.dateString);
      } else {
        this.setupStartMarker(day);
        onSuccess(day.dateString, day.dateString);
      }
    }
  };

  markedDatesTheme = () => {
    const { theme: { markColor, markTextColor } } = this.props;
    return { color: markColor, textColor: markTextColor };
  };

  setupStartMarker = (day) => {
    const markedDates = { [day.dateString]: { startingDay: true, endingDay: true, ...this.markedDatesTheme() } };
    this.setState({ isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates });
  };

  setupMarkedDates = (fromDate, toDate, mDates) => {
    const mFromDate = moment(fromDate);
    const mToDate = moment(toDate);
    const range = mToDate.diff(mFromDate, 'days');
    let markedDates = { ...mDates };
    if (range >= 0) {
      if (range === 0) {
        markedDates = { [toDate]: { startingDay: true, endingDay: true, ...this.markedDatesTheme() } };
      } else {
        const FromDate = mFromDate.format('YYYY-MM-DD');
        markedDates[FromDate] = { startingDay: true, ...this.markedDatesTheme() };
        for (let i = 1; i <= range; i += 1) {
          const tempDate = mFromDate.add(1, 'days').format('YYYY-MM-DD');
          if (i < range) {
            markedDates[tempDate] = this.markedDatesTheme();
          } else {
            markedDates[tempDate] = { endingDay: true, ...this.markedDatesTheme() };
          }
        }
      }
    }
    return [markedDates, range];
  };

  setupInitialRange = () => {
    const { initialRange } = this.props;
    if (!initialRange) return;
    const [fromDate, toDate] = initialRange;
    const [markedDates] = this.setupMarkedDates(
      fromDate,
      toDate,
      { [fromDate]: { startingDay: true, ...this.markedDatesTheme() } }
    );
    this.setState({ markedDates, fromDate });
  };

  render() {
    const { fromDate, markedDates } = this.state;

    return (
      <CalendarList
        {...this.props}
        markingType="period"
        current={fromDate}
        markedDates={markedDates}
        onDayPress={this.onDayPress}
      />
    );
  }
}

DateRangePicker.propTypes = {
  initialRange: PropTypes.array,
  onSuccess: PropTypes.func.isRequired
};

DateRangePicker.defaultProps = {
  theme: {
    markColor: color.iconsSettigs,
    markTextColor: color.white,
    todayTextColor: color.bgStatuses
  }
};

export default DateRangePicker;
