import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { Button } from 'components';

import { strings } from 'locales';

import FlightSettings from './FlightSettings';

import { modalStyles } from './styles';

const FlightModal = ({ isVisible, onClose, onSubmit, tempFlight }) => (
  <Modal
    isVisible={isVisible}
    style={modalStyles.container}
    backdropColor="rgba(40, 71, 132, 0.6)"
  >
    <View style={modalStyles.content}>
      <Text style={modalStyles.header}>{strings('flights.header')}</Text>

      <View style={modalStyles.flex}>
        <ScrollView>
          <FlightSettings />
        </ScrollView>
      </View>

      <View style={modalStyles.footer}>
        <Button
          style={modalStyles.cancelButton}
          styleContent={modalStyles.cancelButtonContent}
          onPress={onClose}
        >
          <Text style={modalStyles.buttonLabel}>{strings('flights.cancel')}</Text>
        </Button>

        <Button
          disabled={!tempFlight || !tempFlight.flight}
          disabledStyle={modalStyles.disabledSubmitButton}
          styleContent={modalStyles.submitButton}
          onPress={onSubmit}
        >
          <Text style={modalStyles.buttonLabelSubmit}>{strings('flights.submit')}</Text>
        </Button>
      </View>
    </View>
  </Modal>
);

FlightModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func
};

FlightModal.defaultProps = {
  isVisible: false,
  onClose: () => {}
};

const mapState = ({ booking }) => ({
  tempFlight: booking.tempFlight
});

export default connect(mapState)(FlightModal);
