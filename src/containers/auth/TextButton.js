import React from 'react';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './style';

const TextButton = props => (
  <Button
    {...props}

    disabled={props.loading || props.disabled}
    disabledStyle={styles.disabledBtn}

    containerViewStyle={styles.btnContainer}
    buttonStyle={styles.btn}
    textStyle={styles.btnText}
  />
);

TextButton.propTypes = {
  loading: PropTypes.bool,
  onPress: PropTypes.func
};

TextButton.defaultProps = {
  loading: false,
  onPress: () => {}
};

export default TextButton;
