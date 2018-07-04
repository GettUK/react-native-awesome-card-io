import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';
import NavImageButton from 'components/Common/NavImageButton';

import styles from './styles';

const BackButton = ({ onClick }) => (
  <NavImageButton
    onClick={onClick}
    styleContainer={[styles.touchZone, styles.shadow]}
    styleView={styles.headerBack}
    icon={<Icon width={10} height={18} name="back" color="#284784" />}
  />
);

BackButton.propTypes = {
  onClick: PropTypes.func
};

BackButton.defaultProps = {
  onClick: () => {}
};

export default BackButton;
