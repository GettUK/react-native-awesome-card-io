import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';
import { color } from 'theme';
import NavImageButton from 'components/Common/NavImageButton';

import styles from './styles';

const BurgerButton = ({ theme, onClick }) => (
  <NavImageButton
    onClick={onClick}
    styleContainer={{ justifyContent: 'center' }}
    styleView={styles.touchZone}
    icon={<Icon size={30} name="burger" color={theme === 'light' ? color.primaryText : color.white} />}
  />
);

BurgerButton.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  onClick: PropTypes.func
};

BurgerButton.defaultProps = {
  theme: 'light',
  onClick: () => {}
};

export default BurgerButton;
