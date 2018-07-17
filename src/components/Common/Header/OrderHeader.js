import React from 'react';
import PropTypes from 'prop-types';

import { CUSTOMER_CARE_STATUS, FINAL_STATUSES } from 'utils/orderStatuses';

import { BackButton, LabeledButton } from './Buttons';

import Header from './Header';

import styles from './style';

const OrderHeader = ({ status, handlePressBack, handlePressCreateNew }) => {
  const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
  const isFinalStatus = FINAL_STATUSES.includes(status);
  const isRightButtonAvailable = isFinalStatus && !isCustomerCareStatus;

  return (
    <Header
      customStyles={styles.prorderHeader}
      leftButton={<BackButton onClick={handlePressBack} />}
      rightButton={isRightButtonAvailable && <LabeledButton type="createNew" onClick={handlePressCreateNew} />}
    />
  );
};

OrderHeader.propTypes = {
  handlePressBack: PropTypes.func,
  handlePressCreateNew: PropTypes.func,
  status: PropTypes.string
};

OrderHeader.defaultProps = {
  status: '',
  handlePressBack: () => {},
  handlePressCreateNew: () => {}
};

export default OrderHeader;
