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

import { changeFlight } from 'actions/booking';

import { Icon, Input, DismissKeyboardView } from 'components';

import { strings } from 'locales';

import { get } from 'utils';

import styles from './styles';

class FlightSettings extends Component {
  state = {
    flightType: this.props.flightType || 'departing',
    flight: this.props.flight || '',
    verificationData: null,
    loading: false
  };

  getAirportAddress = ({ name, terminal }) => (
    `${name}${terminal ? ` - Terminal ${terminal}` : ''}`
  );

  setFlightDetails = (flightData) => {
    const { departure, arrival } = flightData;
    const dateFormat = 'DD/MM/YYYY hh:mm a';

    this.setState({
      verificationData: [
        { title: strings('flight.label.flightNumber'), text: `${flightData.carrier} ${flightData.flight}` },
        { title: strings('booking.label.departure'), text: moment(departure.time).format(dateFormat) },
        { title: strings('booking.label.arrival'), text: moment(arrival.time).format(dateFormat) },
        { title: strings('flight.label.from'), text: this.getAirportAddress(departure) },
        { title: strings('flight.label.to'), text: this.getAirportAddress(arrival) }
      ],
      loading: false
    });
  };

  handleVerify = () => {
    const { flight, flightType } = this.state;

    const date = moment();

    const year = date.format('YYYY');
    const month = date.format('M');
    const day = date.format('DD');

    this.setState({ loading: true, verificationData: null, error: null });

    get('/flightstats/schedules', { flight, flightType, year, month, day, scheduledAt: date.toISOString() })
      .then(({ data }) => {
        this.props.changeFlight({ flight, flightType }, true);

        const flightData = data[0][0];

        this.setFlightDetails(flightData);
      })
      .catch(() => {
        this.props.changeFlight({ flight: '', flightType: '' }, false);

        this.setState({
          error: strings('flight.text.notFoundFlightNumber'),
          loading: false
        });
      });
  };

  handleChangeNumber = (flight) => {
    this.setState({ flight, error: null });
  };

  renderFlightData = item => (
    <View key={item.title} style={styles.results}>
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultLabel}>{item.text}</Text>
    </View>
  );

  renderToggleButton = (type) => {
    const isActive = this.state.flightType === type;

    return (
      <TouchableWithoutFeedback onPress={() => this.setState({ flightType: type })}>
        <View style={[styles.toggleButton, isActive && styles.toggleButtonActive]}>
          <Icon name={type} color={isActive ? '#fff' : ''} style={styles.toggleIcon} />
          <Text style={[styles.toggleLabel, isActive && styles.toggleLabelActive]}>
            {strings(`booking.label.${type}`)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderVerifyButton = () => (
    <TouchableWithoutFeedback onPress={this.handleVerify}>
      <View style={styles.verifyButton}>
        <Text style={styles.verifyLabel}>{strings('flight.button.verify')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

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
    const { verificationData, loading } = this.state;

    return (
      <View style={[styles.flex, styles.bg]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={80}
            behavior="padding"
            style={styles.flex}
          >
            <ScrollView>
              {this.renderFlightInput()}
              <View style={styles.toggler}>
                {this.renderToggleButton('departure')}
                {this.renderToggleButton('arrival')}
              </View>

              {loading && <ActivityIndicator color="#2a4982" />}

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
  flight: booking.bookingForm.flight,
  flightType: booking.bookingForm.flightType
});

export default connect(mapState, { changeFlight })(FlightSettings);
