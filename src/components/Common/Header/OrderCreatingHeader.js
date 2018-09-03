import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'components';

import { BurgerButton, BackButton, LabeledButton } from './Buttons';

import Header from './Header';

import styles from './style';

const OrderCreatingHeader = ({
  unreadNotifications, handlePressBurger, handlePressBack, handlePressOrder, nightMode, type }) => (
  <Header
    customStyles={styles.prorderHeader}
    leftButton={type === 'dashboard'
      ? (
        <Fragment>
          <BurgerButton theme={nightMode ? 'dark' : 'light'} onClick={handlePressBurger} />
          {!!unreadNotifications &&
            <Badge
              wrapperStyle={styles.badgeWrapperStyle}
              style={styles.badgeStyle}
              textStyle={styles.badgeTextStyle}
              label={unreadNotifications}
            />
          }
        </Fragment>
      )
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
  type: PropTypes.oneOf(['dashboard', 'orderCreating'])
};

OrderCreatingHeader.defaultProps = {
  nightMode: false,
  type: 'dashboard',
  handlePressBurger: () => {},
  handlePressBack: () => {},
  handlePressOrder: () => {}
};

export default OrderCreatingHeader;

