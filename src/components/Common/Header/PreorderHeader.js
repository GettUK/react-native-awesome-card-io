import React from 'react';
import PropTypes from 'prop-types';

import { BurgerButton, BackButton, LabeledButton } from './Buttons';

import Header from './Header';

import styles from './style';

const PreorderHeader = ({ handlePressBurger, handlePressBack, handlePressOrder, type }) => (
  <Header
    customStyles={styles.prorderHeader}
    leftButton={type === 'dashboard'
      ? <BurgerButton onClick={handlePressBurger} />
      : <BackButton onClick={handlePressBack} />
    }
    rightButton={type === 'dashboard' && <LabeledButton type="orders" onClick={handlePressOrder} />}
  />
);

PreorderHeader.propTypes = {
  handlePressBurger: PropTypes.func,
  handlePressBack: PropTypes.func,
  handlePressOrder: PropTypes.func,
  type: PropTypes.oneOf(['dashboard', 'preorder'])
};

PreorderHeader.defaultProps = {
  type: 'dashboard',
  handlePressBurger: () => {},
  handlePressBack: () => {},
  handlePressOrder: () => {}
};

export default PreorderHeader;
