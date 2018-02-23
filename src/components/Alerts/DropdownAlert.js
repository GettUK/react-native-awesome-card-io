import React, { PureComponent } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import PropTypes from 'prop-types';

import styles from './styles';

const TIME_AWAKEN = 5000;
const TOP_POSITION = 30;

class Alert extends PureComponent {
  showErrorMessage = (title) => {
    this.dropdown.alertWithType('error', title, '');
  }

  showSuccessMessage = (title) => {
    this.dropdown.alertWithType('success', title, '');
  }

  close = () => {
    this.dropdown.close();
  }

  render() {
    const { type, onClose } = this.props;

    return (
      <DropdownAlert
        ref={el => (this.dropdown = el)}

        closeInterval={TIME_AWAKEN}
        endDelta={TOP_POSITION}

        translucent
        updateStatusBar={false}
        panResponderEnabled = {false}

        successColor="#00b22d"
        errorColor="#fc0d1b"

        showCancel={type === 'error'}

        onClose={onClose}

        imageStyle={styles.errorImage}
        defaultContainer={[ styles.errorContainer, type === 'error' ? styles.errorLine : {} ]}
        titleStyle={styles.title}
      />
    );
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func
};

Alert.defaultProps = {
  type: 'success',
  onClose: () => {}
};

export default Alert;
