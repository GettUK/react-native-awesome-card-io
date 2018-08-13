import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components';

import paymentsOptions from 'containers/PaymentsOptions/PaymentsOptions';
import reasonForTravel from 'containers/ReasonForTravel/ReasonForTravel';
import messageToDriver from 'containers/MessageToDriver/MessageToDriver';
import passengersList from 'containers/PassengersList/PassengersList';
import flightSettings from 'containers/FlightSettings/FlightSettings';
import references from 'containers/References/References';
import styles from './styles';

const DEFAULT_RENDER_CONTENT = 'flightSettings';

const renderAs = {
  paymentsOptions,
  reasonForTravel,
  messageToDriver,
  passengersList,
  flightSettings,
  references
};

class ModalWithContent extends PureComponent {
  static propTypes = {
    modalContent: PropTypes.string
  };

  render() {
    const { isVisible, modalContent, onClose, title, contentStyles, referenceIndex } = this.props;
    const content = modalContent || DEFAULT_RENDER_CONTENT;
    const Component = renderAs[content];

    return (
      <Modal
        title={title}
        titleStyles={styles.messageLength}
        isVisible={isVisible}
        contentStyles={[styles.container, contentStyles]}
        onClose={onClose}
      >
        <Component onClose={onClose} referenceIndex={referenceIndex} />
      </Modal>
    );
  }
}


export default ModalWithContent;
