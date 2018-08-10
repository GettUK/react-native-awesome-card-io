import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { formattedColor } from 'theme';

import { Button } from 'components';

import { strings } from 'locales';

import FlightSettings from './FlightSettings';

import { modalStyles } from './styles';

const FlightModal = ({ navigation, isVisible, onClose, onSubmit, tempFlight }) => (
  <Modal
    isVisible={isVisible}
    style={modalStyles.container}
    backdropColor={formattedColor.primaryBtns.opacity(0.6)}
  >
    <View style={modalStyles.content}>
      <Text style={modalStyles.header}>{strings('flight.text.enterTheFlightNumber')}</Text>

      <View style={modalStyles.flex}>
        <ScrollView>
          <FlightSettings navigation={navigation} />
        </ScrollView>
      </View>

      <View style={modalStyles.footer}>
        <Button
          style={[modalStyles.button, modalStyles.buttonLeft]}
          styleContent={modalStyles.cancelButtonContent}
          onPress={onClose}
        >
          <Text style={modalStyles.buttonLabel}>{strings('flight.button.noThanks')}</Text>
        </Button>

        <Button
          disabled={!tempFlight || !tempFlight.flight}
          disabledStyle={modalStyles.disabledSubmitButton}
          style={modalStyles.button}
          styleContent={modalStyles.submitButton}
          onPress={onSubmit}
        >
          <Text style={modalStyles.buttonLabelSubmit}>{strings('flight.button.ok')}</Text>
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
