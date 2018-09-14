import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import moment from 'moment';

import { saveFlight, changeFlight, updateBooking } from 'actions/booking';

import { Input, DismissKeyboardView, Icon } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { color } from 'theme';

import { get, timeFormat, throttledAction, getSeparatedDate } from 'utils';

import styles from './styles';

class FlightSettings extends Component {
  state = {
    selected: 0,
    flight: this.props.flight || '',
    verifiedSaved: undefined,
    verifiedFlight: undefined,
    verificationData: null,
    loading: false
  };

  componentDidMount() {
    this.checkFlightVerified();
    this.handleVerify();
  }

  getAirportAddress = ({ name, terminal }) => (
    `${name}${terminal ? ` - Terminal ${terminal}` : ''}`
  );

  setFlightDetails = (flightData) => {
    const { departure, arrival } = flightData;
    const dateFormat = `DD/MM/YYYY ${timeFormat()}`;

    this.setState({
      verificationData: [
        { title: strings('flight.label.flightNumber'), text: `${flightData.carrier} ${flightData.flight}` },
        { title: strings('booking.label.departing'), text: moment(departure.time).format(dateFormat) },
        { title: strings('booking.label.arriving'), text: moment(arrival.time).format(dateFormat) },
        { title: strings('flight.label.from'), text: this.getAirportAddress(departure) },
        { title: strings('flight.label.to'), text: this.getAirportAddress(arrival) }
      ],
      loading: false
    });
  };

  onCloseModal = () => {
    const { changeFlight, onClose } = this.props;
    changeFlight({ flight: '' }, false);
    onClose();
  };

  handleSave = throttledAction(async () => {
    const { saveFlight, changeFlight, updateBooking, updateEnabled } = this.props;
    const { verifiedSaved, flight } = this.state;

    if (verifiedSaved) {
      if (!flight) changeFlight({ flight: '' }, false);
      await saveFlight();
      if (updateEnabled) updateBooking();
      this.onCloseModal();
    }
  });

  handleVerify = () => {
    const { flight } = this.state;

    if (!flight) return;

    const { year, month, day } = getSeparatedDate();

    this.setState({ loading: true, verificationData: null, verifiedFlight: undefined, error: null });

    get('/flightstats/flights', { flight, year, month, day })
      .then(({ data }) => {
        this.props.changeFlight({ flight }, true);

        const flightData = data[0];

        this.setState({ originalData: data, verifiedFlight: flight, selected: 0 }, () => {
          this.setFlightDetails(flightData);
          this.checkFlightVerified();
        });
      })
      .catch(() => {
        this.props.changeFlight({ flight: '' }, false);

        this.setState({
          error: strings('flight.text.notFoundFlightNumber'),
          loading: false
        });
      });
  };

  checkFlightVerified = () => {
    const { flight, verifiedFlight } = this.state;
    const wantToDelete = this.props.flight && this.props.flight !== '' && flight === '';
    const verifiedSaved = verifiedFlight === flight;
    this.setState({ verifiedSaved: verifiedSaved || wantToDelete });
  };

  handleChangeNumber = (flight) => {
    this.setState({ flight, error: null }, this.checkFlightVerified);
  };

  handleChangeSelectedData = (index) => {
    this.setState({ selected: index }, () => {
      this.setFlightDetails(this.state.originalData[index]);
    });
  };

  renderFlightData = item => (
    <View key={item.title} style={styles.results}>
      <Text style={[styles.resultTitle, { color: this.props.theme.color.primaryText }]}>{item.title}</Text>
      <Text style={styles.resultLabel}>{item.text}</Text>
    </View>
  );

  renderButton = ({ onPress, label }) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.verifyButton}>
        <Text style={styles.verifyLabel}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderVerifyButton = () => {
    const { verifiedSaved } = this.state;

    return (
      <View style={styles.row}>
        {verifiedSaved
          ? this.renderButton({ onPress: this.handleSave, label: strings('flight.button.save') })
          : this.renderButton({ onPress: this.handleVerify, label: strings('flight.button.verify') })
        }
      </View>
    );
  };

  renderTabs = () => {
    const { originalData, selected } = this.state;

    return (
      <View style={styles.tabsContainer}>
        {originalData.map((item, index) => {
          const textColor = index === selected ? color.primaryBtns : color.secondaryText;
          const borderColor = index === selected ? color.primaryBtns : color.bgSearch;

          return (
            <TouchableWithoutFeedback
              onPress={() => this.handleChangeSelectedData(index)}
              key={`${item.arrival.code} ${item.departure.code}`}
            >
              <View style={[styles.tab, { width: `${100 / originalData.length}%`, borderBottomColor: borderColor }]}>
                <View style={styles.tabLabelContainer}>
                  <Text style={[styles.tabLabel, { color: textColor }]}>
                    {item.arrival.code}
                  </Text>
                  <Icon name="airplane" size={12} color={textColor} style={styles.tabIcon} />
                  <Text style={[styles.tabLabel, { color: textColor }]}>
                    {item.departure.code}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };

  renderFlightInput = () => {
    const { flight, error } = this.state;

    return (
      <Input
        label={strings('flight.label.flightNumber')}
        value={flight}
        onChangeText={this.handleChangeNumber}
        labelStyle={styles.inputLabel}
        inputStyle={styles.input}
        errorStyle={styles.error}
        style={styles.inputContainer}
        error={error && [error]}
        allowClear={false}
        rightButton={this.renderVerifyButton()}
      />
    );
  };

  render() {
    const { originalData, verificationData, loading } = this.state;

    return (
      <View style={[styles.flex, styles.bg, { backgroundColor: this.props.theme.color.bgSecondary }]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={130}
            behavior="padding"
            style={styles.flex}
          >
            {this.renderFlightInput()}
            <ScrollView keyboardShouldPersistTaps="handled">
              {loading && <ActivityIndicator color={color.primaryBtns} />}

              {originalData && originalData.length > 1 &&
                this.renderTabs()
              }

              {verificationData &&
                <View style={styles.resultsWrapper}>
                  {verificationData.map(this.renderFlightData)}
                </View>
              }
            </ScrollView>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
      </View>
    );
  }
}

const mapState = ({ booking }) => ({
  flight: booking.bookingForm.flight
});

export default connect(mapState, { changeFlight, saveFlight, updateBooking })(withTheme(FlightSettings));
