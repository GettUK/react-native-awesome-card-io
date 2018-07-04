import React from 'react';
import PropTypes from 'prop-types';

import { BurgerButton, BackButton, LabeledButton } from './Buttons';

import Header from './Header';

import styles from './style';

const OrderCreatingHeader = ({ handlePressBurger, handlePressBack, handlePressOrder, nightMode, type }) => (
  <Header
    customStyles={styles.prorderHeader}
    leftButton={type === 'dashboard'
      ? <BurgerButton theme={nightMode ? 'dark' : 'light'} onClick={handlePressBurger} />
      : <BackButton onClick={handlePressBack} />
    }
    rightButton={type === 'dashboard' && <LabeledButton type="orders" onClick={handlePressOrder} />}
  />
);

OrderCreatingHeader.propTypes = {
  nightMode: PropTypes.bool,
  handlePressBurger: PropTypes.func,
  handlePressBack: PropTypes.func,
  handlePressOrder: PropTypes.func,
  type: PropTypes.oneOf(['dashboard', 'preorder'])
};

OrderCreatingHeader.defaultProps = {
  nightMode: false,
  type: 'dashboard',
  handlePressBurger: () => {},
  handlePressBack: () => {},
  handlePressOrder: () => {}
};

export default OrderCreatingHeader;

