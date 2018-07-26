import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';
import { color } from 'theme';
import NavImageButton from 'components/Common/NavImageButton';

import styles from './styles';

const BackButton = ({ onClick }) => (
  <NavImageButton
    onClick={onClick}
    styleContainer={styles.touchZone}
    styleView={[styles.headerBack, styles.shadow]}
    icon={<Icon width={10} height={18} name="back" color={color.primaryBtns} />}
  />
);

BackButton.propTypes = {
  onClick: PropTypes.func
};

BackButton.defaultProps = {
  onClick: () => {}
};

export default BackButton;
