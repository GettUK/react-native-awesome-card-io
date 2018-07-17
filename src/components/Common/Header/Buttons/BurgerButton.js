import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';
import NavImageButton from 'components/Common/NavImageButton';

import styles from './styles';

const BurgerButton = ({ onClick }) => (
  <NavImageButton
    onClick={onClick}
    styleContainer={{ justifyContent: 'center' }}
    styleView={styles.touchZone}
    icon={<Icon size={30} name="burger" color="#000" />}
  />
);

BurgerButton.propTypes = {
  onClick: PropTypes.func
};

BurgerButton.defaultProps = {
  onClick: () => {}
};

export default BurgerButton;
