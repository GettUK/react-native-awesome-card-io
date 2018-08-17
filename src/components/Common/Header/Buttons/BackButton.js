import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';
import NavImageButton from 'components/Common/NavImageButton';

import { withTheme } from 'providers';

import styles from './styles';

const BackButton = ({ onClick, theme }) => (
  <NavImageButton
    onClick={onClick}
    styleContainer={styles.touchZone}
    styleView={[styles.headerBack, styles.shadow, { backgroundColor: theme.color.bgPrimary }]}
    icon={<Icon width={10} height={18} name="back" color={theme.color.primaryBtns} />}
  />
);

BackButton.propTypes = {
  onClick: PropTypes.func
};

BackButton.defaultProps = {
  onClick: () => {}
};

export default withTheme(BackButton);
